import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { isEqual, noop } from 'lodash';
import { strings, cssClasses } from '@douyinfe/semi-foundation/autoComplete/constants';
import AutoCompleteFoundation, { AutoCompleteAdapter, StateOptionItem, DataItem } from '@douyinfe/semi-foundation/autoComplete/foundation';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import {useBaseComponent, ValidateStatus} from '../_base/baseComponent';
import { Position } from '../tooltip';
import Spin from '../spin';
import Popover from '../popover';
import Input, {InputProps} from '../input';
import Trigger from '../trigger';

import Option from './option';
import warning from '@douyinfe/semi-foundation/utils/warning';
import '@douyinfe/semi-foundation/autoComplete/autoComplete.scss';
import { Motion } from '../_base/base';
import {AriaAttributes} from "../AriaAttributes";
import {VueHTMLAttributes, VueJsxNode} from "../interface";
import {
    ComponentObjectPropsOptions,
    CSSProperties,
    defineComponent,
    h,
    onMounted,
    onUnmounted, PropType,
    reactive,
    ref,
    useSlots,
    watch
} from "vue";
import {DefineComponent} from "vue";
import {PropObj, vuePropsMake} from "../PropTypes";
import {PreviewImageProps} from "../image";

const prefixCls = cssClasses.PREFIX;
const sizeSet = strings.SIZE;
const positionSet = strings.POSITION;
const statusSet = strings.STATUS;

/**
 * AutoComplete is an enhanced Input (candidates suggest that users can choose or not),
 * and the Select positioning that supports Search is still a selector.
 * 1. When you click to expand, Select will clear all input values, but AutoComplete will not
 * 2. AutoComplete's renderSelectedItem only supports simple string returns, while Select's renderSelectedItem can return VueJsxNode
 * 3. Select props.value supports incoming object, but autoComplete only supports string (because the value needs to be displayed in Input)
 */

export interface BaseDataItem extends DataItem {
    label?: VueJsxNode;
}

export type AutoCompleteItems = BaseDataItem | string | number;

export interface AutoCompleteProps<T extends AutoCompleteItems> {
    'aria-describedby'?: AriaAttributes['aria-describedby'];
    'aria-errormessage'?: AriaAttributes['aria-errormessage'];
    'aria-invalid'?: AriaAttributes['aria-invalid'];
    'aria-label'?: AriaAttributes['aria-label'];
    'aria-labelledby'?: AriaAttributes['aria-labelledby'];
    'aria-required'?: AriaAttributes['aria-required'];
    autoAdjustOverflow?: boolean;
    autoFocus?: boolean;
    className?: string;
    children?: VueJsxNode | undefined;
    data?: T[];
    disabled?: boolean;
    defaultOpen?: boolean;
    defaultValue?: T;
    defaultActiveFirstOption?: boolean;
    dropdownMatchSelectWidth?: boolean;
    dropdownClassName?: string;
    dropdownStyle?: CSSProperties;
    emptyContent?: VueJsxNode;
    getPopupContainer?: () => HTMLElement;
    insetLabel?: VueJsxNode;
    insetLabelId?: string;
    id?: string;
    loading?: boolean;
    motion?: Motion;
    maxHeight?: string | number;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onChange?: (value: string | number) => void;
    onSearch?: (inputValue: string) => void;
    onSelect?: (value: T) => void;
    onClear?: () => void;
    onChangeWithObject?: boolean;
    onSelectWithObject?: boolean;
    onDropdownVisibleChange?: (visible: boolean) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    prefix?: VueJsxNode;
    placeholder?: string;
    position?: Position;
    renderItem?: (option: T) => VueJsxNode;
    renderSelectedItem?: (option: T) => string;
    size?: 'small' | 'default' | 'large';
    style?: CSSProperties;
    suffix?: VueJsxNode;
    showClear?: boolean;
    triggerRender?: (props?: any) => VueJsxNode;
    stopPropagation?: boolean | string;
    value?: string | number;
    validateStatus?: ValidateStatus;
    zIndex?: number;
}

interface KeyboardEventType {
    onKeyDown?: any;
}

interface AutoCompleteState {
    dropdownMinWidth: null | number;
    inputValue: string | undefined | number;
    options: StateOptionItem[];
    visible: boolean;
    focusIndex: number;
    selection: Map<any, any>;
    rePosKey: number;
    keyboardEventSet?: KeyboardEventType;
}

function AutoCompleteFunc<T extends AutoCompleteItems>(vuePropsType:PropObj = {}) {
    const propTypes:ComponentObjectPropsOptions<AutoCompleteProps<T>> = {
        'aria-label': PropTypes.string,
        'aria-labelledby': PropTypes.string,
        'aria-invalid': PropTypes.bool,
        'aria-errormessage': PropTypes.string,
        'aria-describedby': PropTypes.string,
        'aria-required': PropTypes.bool,
        autoFocus: PropTypes.bool,
        autoAdjustOverflow: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
        data: PropTypes.array,
        defaultOpen: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultActiveFirstOption: PropTypes.bool,
        disabled: PropTypes.bool,
        dropdownMatchSelectWidth: PropTypes.bool,
        dropdownClassName: PropTypes.string,
        dropdownStyle: PropTypes.object,
        emptyContent: PropTypes.node,
        id: PropTypes.string,
        insetLabel: PropTypes.node,
        insetLabelId: PropTypes.string,
        onSearch: PropTypes.func as PropType<AutoCompleteProps<T>['onSearch']>,
        onSelect: PropTypes.func as PropType<AutoCompleteProps<T>['onSelect']>,
        onClear: PropTypes.func as PropType<AutoCompleteProps<T>['onClear']>,
        onBlur: PropTypes.func as PropType<AutoCompleteProps<T>['onBlur']>,
        onFocus: PropTypes.func as PropType<AutoCompleteProps<T>['onFocus']>,
        onChange: PropTypes.func as PropType<AutoCompleteProps<T>['onChange']>,
        onKeyDown: PropTypes.func as PropType<AutoCompleteProps<T>['onKeyDown']>,
        position: String as PropType<AutoCompleteProps<T>['position']>,
        placeholder: PropTypes.string,
        prefix: PropTypes.node,
        onChangeWithObject: PropTypes.bool,
        onSelectWithObject: PropTypes.bool,
        onDropdownVisibleChange: PropTypes.func as PropType<AutoCompleteProps<T>['onDropdownVisibleChange']>,
        renderItem: PropTypes.func as PropType<AutoCompleteProps<T>['renderItem']>,
        renderSelectedItem: PropTypes.func as PropType<AutoCompleteProps<T>['renderSelectedItem']>,
        suffix: PropTypes.node,
        showClear: PropTypes.bool,
        size: String as PropType<AutoCompleteProps<T>['size']>,
        style: PropTypes.object,
        stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
        getPopupContainer: PropTypes.func as PropType<AutoCompleteProps<T>['getPopupContainer']>,
        triggerRender: PropTypes.func as PropType<AutoCompleteProps<T>['triggerRender']>,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        validateStatus: String as PropType<AutoCompleteProps<T>['validateStatus']>,
        zIndex: PropTypes.number,
    };

    const defaultProps = {
        stopPropagation: true,
        motion: true,
        zIndex: popoverNumbers.DEFAULT_Z_INDEX,
        position: 'bottomLeft' as const,
        data: [] as [],
        showClear: false,
        size: 'default' as const,
        onFocus: noop,
        onSearch: noop,
        onClear: noop,
        onBlur: noop,
        onSelect: noop,
        onChange: noop,
        onSelectWithObject: false,
        onDropdownVisibleChange: noop,
        defaultActiveFirstOption: false,
        dropdownMatchSelectWidth: true,
        loading: false,
        maxHeight: 300,
        validateStatus: 'default' as const,
        autoFocus: false,
        emptyContent: null as null,
        onKeyDown: noop,
        // onPressEnter: () => undefined,
        // defaultOpen: false,
    };
    const vuePropsType_ = vuePropsMake(propTypes, defaultProps)

    const AutoComplete = defineComponent<AutoCompleteProps<T>>((props, {}) => {

        const slots = useSlots()

        const initRePosKey = 1;
        const state = reactive<AutoCompleteState>({
            dropdownMinWidth: null,
            inputValue: '',
            // option list
            options: [],
            // popover visible
            visible: false,
            // current focus option index
            focusIndex: props.defaultActiveFirstOption ? 0 : -1,
            // current selected options
            selection: new Map(),
            rePosKey: initRePosKey,
        });
        let clickOutsideHandler: (e: Event) => void | null = null;

        const {adapter: adapterInject, getDataAttr} = useBaseComponent<AutoCompleteProps<T>>(props, state)

        function adapter_(): AutoCompleteAdapter<AutoCompleteProps<T>, AutoCompleteState> {
            const keyboardAdapter = {
                registerKeyDown: (cb: any): void => {
                    const keyboardEventSet = {
                        onKeyDown: cb,
                    };
                    state.keyboardEventSet = keyboardEventSet
                },
                unregisterKeyDown: (cb: any): void => {
                    state.keyboardEventSet = {}
                },
                updateFocusIndex: (focusIndex: number): void => {
                    state.focusIndex = focusIndex
                },
            };
            return {
                ...adapterInject(),
                ...keyboardAdapter,
                getTriggerWidth: () => {
                    const el = triggerRef.value;
                    return el && el.getBoundingClientRect().width;
                },
                setOptionWrapperWidth: width => {
                    state.dropdownMinWidth = width
                },
                updateInputValue: inputValue => {
                    state.inputValue = inputValue
                },
                toggleListVisible: isShow => {
                    state.visible = isShow
                },
                updateOptionList: optionList => {
                    state.options = optionList
                },
                updateSelection: selection => {
                    state.selection = selection
                },
                notifySearch: inputValue => {
                    props.onSearch(inputValue);
                },
                notifyChange: value => {
                    props.onChange(value);
                },
                notifySelect: (option: StateOptionItem | string | number): void => {
                    props.onSelect(option as T);
                },
                notifyDropdownVisibleChange: (isVisible: boolean): void => {
                    props.onDropdownVisibleChange(isVisible);
                },
                notifyClear: () => {
                    props.onClear();
                },
                notifyFocus: (event: FocusEvent) => {
                    props.onFocus(event);
                },
                notifyBlur: (event: FocusEvent) => {
                    props.onBlur(event);
                },
                notifyKeyDown: e => {
                    props.onKeyDown(e);
                },
                rePositionDropdown: () => {
                    let { rePosKey } = state;
                    rePosKey = rePosKey + 1;
                    state.rePosKey = rePosKey
                },
                registerClickOutsideHandler: cb => {
                    const clickOutsideHandler_ = (e: Event) => {
                        const optionInstance = optionsRef && optionsRef.value.getRef?.().vnode.el;
                        const triggerDom = triggerRef && triggerRef.value;
                        // eslint-disable-next-line
                        const optionsDom = optionInstance;
                        const target = e.target as Element;
                        if (
                          optionsDom &&
                          (!optionsDom.contains(target) || !optionsDom.contains(target.parentNode)) &&
                          triggerDom &&
                          !triggerDom.contains(target)
                        ) {
                            cb(e);
                        }
                    };
                    clickOutsideHandler = clickOutsideHandler_;
                    document.addEventListener('mousedown', clickOutsideHandler, false);
                },
                unregisterClickOutsideHandler: () => {
                    if (clickOutsideHandler) {
                        document.removeEventListener('mousedown', clickOutsideHandler, false);
                    }
                },
            };
        }
        const adapter = adapter_()
        const foundation = new AutoCompleteFoundation(adapter);
        const triggerRef = ref();
        const optionsRef = ref();

        warning(
          'triggerRender' in props && typeof props.triggerRender === 'function',
          `[Semi AutoComplete]
            - If you are using the following props: 'suffix', 'prefix', 'showClear', 'validateStatus', and 'size',
            please notice that they will be removed in the next major version.
            Please use 'componentProps' to retrieve these props instead.
            - If you are using 'onBlur', 'onFocus', please try to avoid using them and look for changes in the future.`
        );

        onMounted(()=>{
            foundation.init();
        })

        onUnmounted(()=>{
            foundation.destroy();
        })

        watch(()=>props.value, (value, oldValue, onCleanup)=>{
            if (value !== oldValue) {
                foundation.handleValueChange(props.value);
            }
        })
        watch(()=>props.data, (value, oldValue, onCleanup)=>{
            if (!isEqual(value, oldValue)) {
                foundation.handleDataChange(props.data);
            }
        }, {deep:true})



        const onSelect = (option: StateOptionItem, optionIndex: number, e: MouseEvent | KeyboardEvent): void => {
            foundation.handleSelect(option, optionIndex);
        };

        const onSearch = (value: string, e: HashChangeEvent): void => {
            foundation.handleSearch(value);
        };

        const onBlur = (e: FocusEvent): void => foundation.handleBlur(e);

        const onFocus = (e: FocusEvent): void => foundation.handleFocus(e);

        const onInputClear = (): void => foundation.handleClear();

        const handleInputClick = (e: MouseEvent): void => foundation.handleInputClick(e);

        function renderInput(): VueJsxNode {
            const {
                size,
                prefix,
                insetLabel,
                insetLabelId,
                suffix,
                placeholder,
                style,
                className,
                showClear,
                disabled,
                triggerRender,
                validateStatus,
                autoFocus,
                value,
                id,
            } = props;
            const { inputValue, keyboardEventSet, selection } = state;

            const useCustomTrigger = typeof triggerRender === 'function';

            const outerProps = {
                style,
                className: useCustomTrigger
                  ? cls(className)
                  : cls(
                    {
                        [prefixCls]: true,
                        [`${prefixCls}-disabled`]: disabled,
                    },
                    className
                  ),
                onClick: handleInputClick,
                ref: triggerRef,
                id,
                ...keyboardEventSet,
                // tooltip give tabindex 0 to children by default, autoComplete just need the input get focus, so outer div's tabindex set to -1
                tabIndex: -1,
                ...getDataAttr()
            };

            const innerProps:VueHTMLAttributes & InputProps = {
                disabled,
                placeholder,
                autofocus: autoFocus,
                // @ts-ignore
                onChange: onSearch,
                onClear: onInputClear,
                'aria-label': props['aria-label'],
                'aria-labelledby': props['aria-labelledby'],
                'aria-invalid': props['aria-invalid'],
                'aria-errormessage': props['aria-errormessage'],
                'aria-describedby': props['aria-describedby'],
                'aria-required': props['aria-required'],
                // TODO: remove in next major version
                suffix,
                // @ts-ignore
                prefix: prefix || insetLabel,
                insetLabelId,
                showClear,
                validateStatus,
                size,
                onBlur: onBlur,
                onFocus: onFocus,
            };

            return (
              <div {...outerProps}>
                  {typeof triggerRender === 'function' ? (
                    <Trigger
                      {...innerProps}
                      inputValue={(typeof value !== 'undefined' ? value : inputValue) as string}
                      value={Array.from(selection.values())}
                      triggerRender={triggerRender}
                      componentName="AutoComplete"
                      componentProps={{ ...props }}
                    />
                  ) : (
                    <Input {...innerProps} value={typeof value !== 'undefined' ? value : inputValue} />
                  )}
              </div>
            );
        }

        function renderLoading() {
            const loadingWrapperCls = `${prefixCls}-loading-wrapper`;
            return (
              <div class={loadingWrapperCls}>
                  <Spin />
              </div>
            );
        }

        function renderOption(option: StateOptionItem, optionIndex: number): VueJsxNode {
            const { focusIndex } = state;
            const isFocused = optionIndex === focusIndex;

            return (
              <Option
                showTick={false}
                onSelect={(v: StateOptionItem, e: MouseEvent | KeyboardEvent) => onSelect(v, optionIndex, e)}
                // selected={selection.has(option.label)}
                focused={isFocused}
                onMouseEnter={() => foundation.handleOptionMouseEnter(optionIndex)}
                key={option.key || option.label + option.value + optionIndex}
                {...option}
              >
                  {option.label}
              </Option>
            );
        }

        function renderOptionList(): VueJsxNode {
            const { maxHeight, dropdownStyle, dropdownClassName, loading, emptyContent } = props;
            const { options, dropdownMinWidth } = state;
            const listCls = cls(
              {
                  [`${prefixCls}-option-list`]: true,
              },
              dropdownClassName
            );

            let optionsNode;

            if (options.length === 0) {
                optionsNode = emptyContent;
            } else {
                optionsNode = options.filter(option => option.show).map((option, i) => renderOption(option, i));
            }

            const style = {
                maxHeight: maxHeight,
                minWidth: dropdownMinWidth,
                ...dropdownStyle,
            };
            return (
              <div class={listCls} role="listbox" style={style}>
                  {!loading ? optionsNode : renderLoading()}
              </div>
            );
        }


        return () => {
            const {
                position,
                motion,
                zIndex,
                mouseEnterDelay,
                mouseLeaveDelay,
                autoAdjustOverflow,
                stopPropagation,
                getPopupContainer,
            } = props;
            const { visible, rePosKey } = state;
            const input = renderInput();
            const optionList = renderOptionList();
            return (
              <Popover
                mouseEnterDelay={mouseEnterDelay}
                mouseLeaveDelay={mouseLeaveDelay}
                autoAdjustOverflow={autoAdjustOverflow}
                trigger="custom"
                motion={motion}
                visible={visible}
                content={optionList}
                position={position}
                ref={optionsRef}
                // TransformFromCenter TODO: need to confirm
                zIndex={zIndex}
                stopPropagation={stopPropagation}
                getPopupContainer={getPopupContainer}
                rePosKey={rePosKey}
              >
                  {input}
              </Popover>
            );
        }
    }, {
        props: vuePropsType_,
        name: 'AutoComplete'
    })

    return AutoComplete
}


export {
    AutoCompleteFunc
}

export default AutoCompleteFunc()

