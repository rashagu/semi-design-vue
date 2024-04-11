/* eslint-disable max-len */
/* argus-disable unPkgSensitiveInfo */
import { cloneDeepWith, set, get } from 'lodash';
import warning from '@douyinfe/semi-foundation/utils/warning';
import { findAll } from '@douyinfe/semi-foundation/utils/getHighlight';
import {ComponentInternalInstance, h, isVNode, VNode} from "vue";
import { isHTMLElement } from '@douyinfe/semi-foundation/utils/dom';
import {VueJsxNode} from "../interface";
import type {SetupContext} from "vue";
/**
 * stop propagation
 *
 * @param e
 * @param {boolean} noImmediate Skip stopping immediate propagation
 */
export function stopPropagation(e: any, noImmediate?: boolean) {
    if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
    }

    if (!noImmediate && e && typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
    }
}

/**
 * use in Table, Form, Navigation
 *
 * skip clone function and react element
 */
export function cloneDeep<T>(value: T): T;
export function cloneDeep<T>(value: T, customizer: (value: any) => any): any;
export function cloneDeep(value: any, customizer?: (value: any) => any) {
    return cloneDeepWith(value, v => {
        if (typeof customizer === 'function') {
            return customizer(v);
        }
        if (typeof v === 'function' || isVNode(v)) {
            return v;
        }
        if (Object.prototype.toString.call(v) === '[object Error]') {
            return v;
        }
        // it is tricky
        // when array length beyond max length, array.length will be 0
        if (Array.isArray(v) && v.length === 0) {
            const keys: string[] = Object.keys(v);
            if (keys.length) {
                const newArray: any[] = [];
                keys.forEach(key => {
                    // @ts-ignore
                    set(newArray, key, v[key]);
                });
                // internal-issues:887
                warning(
                    get(process, 'env.NODE_ENV') !== 'production',
                    `[Semi] You may use an out-of-bounds array. In some cases, your program may not behave as expected.
                    The maximum length of an array is 4294967295.
                    Please check whether the array subscript in your data exceeds the maximum value of the JS array subscript`
                );
                return newArray;
            } else {
                return undefined;
            }
        }
        return undefined;
    });
}

/**
 * [getHighLightTextHTML description]
 *
 * @param   {string} sourceString [source content text]
 * @param   {Array<string>} searchWords [keywords to be highlighted]
 * @param   {object} option
 * @param   {true}      option.highlightTag [The tag wrapped by the highlighted content, mark is used by default]
 * @param   {true}      option.highlightClassName
 * @param   {true}      option.highlightStyle
 * @param   {boolean}   option.caseSensitive
 *
 * @return  {Array<object>}
 */
export const getHighLightTextHTML = ({
    sourceString = '',
    searchWords = [],
    option = { autoEscape: true, caseSensitive: false }
}: GetHighLightTextHTMLProps) => {
    const chunks: HighLightTextHTMLChunk[] = findAll({ sourceString, searchWords, ...option });
    const markEle = option.highlightTag || 'mark';
    const highlightClassName = option.highlightClassName || '';
    const highlightStyle = option.highlightStyle || {};
    return chunks.map((chunk: HighLightTextHTMLChunk) => {
        const { end, start, highlight } = chunk;
        const text = sourceString.substr(start, end - start);
        if (highlight) {
            return h(
                markEle,
                {
                    style: highlightStyle,
                    className: highlightClassName,
                },
                text
            );
        } else {
            return text;
        }
    });
};

export interface RegisterMediaQueryOption {
    match?: (e: MediaQueryList | MediaQueryListEvent) => void;
    unmatch?: (e: MediaQueryList | MediaQueryListEvent) => void;
    callInInit?: boolean;
}

/**
 * register matchFn and unMatchFn callback while media query
 * @param {string} media media string
 * @param {object} param param object
 * @returns function
 */
export const registerMediaQuery = (media: string, { match, unmatch, callInInit = true }: RegisterMediaQueryOption): () => void => {
    if (typeof window !== 'undefined') {
        const mediaQueryList = window.matchMedia(media);
        function handlerMediaChange(e: MediaQueryList | MediaQueryListEvent): void {
            if (e.matches) {
                match && match(e);
            } else {
                unmatch && unmatch(e);
            }
        }
        callInInit && handlerMediaChange(mediaQueryList);
        mediaQueryList.addEventListener('change', handlerMediaChange);
        return (): void => mediaQueryList.removeEventListener('change', handlerMediaChange);
    }
    return null;
};
export interface GetHighLightTextHTMLProps {
    sourceString?: string;
    searchWords?: any[];
    option: HighLightTextHTMLOption;
}

export interface HighLightTextHTMLOption {
    highlightTag?: string;
    highlightClassName?: string;
    highlightStyle?: Record<string, any>;
    caseSensitive: boolean;
    autoEscape: boolean;
}

export interface HighLightTextHTMLChunk {
    start?: number;
    end?: number;
    highlight?: any;
}

/**
 * Determine whether the incoming element is a built-in icon
 * @param icon 元素
 * @returns boolean
 */
export const isSemiIcon = (icon: any): boolean => {
    // @ts-ignore
    return  isVNode(icon) && icon.type?.name?.indexOf('Icon') > -1
};


export function getActiveElement(): HTMLElement | null {
    return document ? document.activeElement as HTMLElement : null;
}

export function isNodeContainsFocus(node: HTMLElement) {
    const activeElement = getActiveElement();
    return activeElement === node || node.contains(activeElement);
}



export function getFocusableElements(node: HTMLElement) {
    if (!isHTMLElement(node)) {
        return [];
    }
    const focusableSelectorsList = [
        "input:not([disabled]):not([tabindex='-1'])",
        "textarea:not([disabled]):not([tabindex='-1'])",
        "button:not([disabled]):not([tabindex='-1'])",
        "a[href]:not([tabindex='-1'])",
        "select:not([disabled]):not([tabindex='-1'])",
        "area[href]:not([tabindex='-1'])",
        "iframe:not([tabindex='-1'])",
        "object:not([tabindex='-1'])",
        "*[tabindex]:not([tabindex='-1'])",
        "*[contenteditable]:not([tabindex='-1'])",
    ];
    const focusableSelectorsStr = focusableSelectorsList.join(',');
    // we are not filtered elements which are invisible
    const focusableElements = Array.from(node.querySelectorAll<HTMLElement>(focusableSelectorsStr));
    return focusableElements;
}


export async function runAfterTicks(func: (...args: any) => any, numberOfTicks: number) {
    if (numberOfTicks===0) {
        await func();
        return;
    } else {
        await new Promise<void>(resolve=>{
            setTimeout(async ()=>{
                await runAfterTicks(func, numberOfTicks-1);
                resolve();
            }, 0);
        });
        return;
    }
}




export function getFragmentChildren(slots: SetupContext['slots']):VNode[] {
    const children = slots.default?.()
    if (children && Array.isArray(children) && children.length){
        // for Vitest
        if (typeof children[0].type === 'symbol' && isVNode(children[0])) {
            return slots.default?.()?.[0]?.children as any || []
        } else {
            return slots.default?.() as any || []
        }
    }else{
        return children
    }
}



function getLeg(arr:VNode[], ) {
    let nodes: VNode[] = []
    arr.forEach(item=>{
        if (typeof item.type === 'symbol'){
        (Array.isArray(item.children) && item.children.length > 0) && (nodes = [...nodes, ...getLeg(item.children as VNode[])])
        }else{
            nodes.push(item)
        }
    })
    return nodes
}
/**
 * 当使用vue的v-for时的特殊处理
 */
export function getVNodeChildren(arr:VNode[]){
    return getLeg(arr)
}


export function getScrollbarWidth() {
    if (globalThis && Object.prototype.toString.call(globalThis) === '[object Window]') {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    return 0;
}


export function styleNum(v: string | number) {
    if (isNaN(+v)) {
        return v
    } else {
        return v + 'px'
    }
}



export function isVNodeTypeNotSymbol(children:VNode) {
    if(['Symbol(v-fgt)', 'Symbol(v-cmt)', 'Symbol(v-txt)'].indexOf(children.type.toString()) > -1){
        return false
    }
    return true
}

export function getMultinodeToFragment(slots: SetupContext['slots']):VNode {
    let children = slots.default ? slots.default() : null;

    if (Array.isArray(children) && children.length === 1) {
        return children[0]
    }
    if (Array.isArray(children) && children.length > 1) {
        return <>{children}</>
    }
}
