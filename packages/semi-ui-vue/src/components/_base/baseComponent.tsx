import {
  defineComponent,
  ref,
  shallowRef,
  h,
  CSSProperties,
  Ref,
  getCurrentInstance,
  useAttrs,
  toRaw,
  ShallowRef,
} from 'vue';
import baseLog from '@douyinfe/semi-foundation/utils/log';
import { DefaultAdapter } from '@douyinfe/semi-foundation/base/foundation';
import { VALIDATE_STATUS } from '@douyinfe/semi-foundation/base/constants';
import getDataAttr_ from '@douyinfe/semi-foundation/utils/getDataAttr';
import { ArrayElement } from './base';
import type { ContextValue } from '../configProvider/context';
import { useConfigContext } from '../configProvider/context/Consumer';

const { hasOwnProperty } = Object.prototype;

export type ValidateStatus = ArrayElement<typeof VALIDATE_STATUS>;

export type BaseProps = {
  style?: CSSProperties;
  className?: string;

  // [key: string]: any,
};

export function getProps(props: Record<string, any>) {
  let newProps: any = {};
  for (let i in props) {
    if (props[i] !== undefined) {
      newProps[i] = props[i];
    }
  }
  // console.log('value' in newProps)
  return newProps;
}
export const useBaseComponent: <U extends BaseProps = {}, S = Record<string, any>>(
  props: U,
  state: S
) => {
  isControlled: (key: any) => boolean;
  cache: any;
  adapter: <P extends BaseProps, S = {}>() => DefaultAdapter<P, S>;
  log: (text: string, ...rest: any) => any;
  context: Ref<ContextValue>;
  foundation: ShallowRef<any>;
  state: any;
  getDataAttr: () => Record<string, any>;
  setStateAsync: (state: Partial<S>)=>Promise<void>;
} = (props, state) => {
  const attrs = useAttrs();
  const cache = shallowRef<any>({});
  const foundation = shallowRef<any>(null);
  const {getProps: getPropsUseHasInProps} = useHasInProps()

  const isControlled = (key: any) => {
    return Boolean(key && props && typeof props === 'object' && hasOwnProperty.call(adapter().getProps(), key));
  };

  const { context } = useConfigContext();
  const currentInstance = getCurrentInstance();
  function adapter<P extends BaseProps = {}, S = {}>(): DefaultAdapter<P, S> {
    return {
      getContext: (key) => {
        // eslint-disable-line
        // @ts-ignore
        const contexts: Record<string, Ref> = currentInstance.provides;
        let context_ = { ...context.value };
        Object.keys(contexts).forEach((key) => {
          context_ = { ...context_, ...contexts[key].value };
        });

        if (context_ && key) {
          // @ts-ignore
          return context_[key];
        }
      },
      getContexts: () => {
        // @ts-ignore
        const contexts: Record<string, Ref> = currentInstance.provides;
        let context_ = { ...context.value };
        Object.keys(contexts).forEach((key) => {
          context_ = { ...context_, ...contexts[key].value };
        });

        return context_;
      }, // eslint-disable-line
      getProp: (key) => {
        return props[key];
      }, // eslint-disable-line
      // return all props
      // @ts-ignore
      getProps: () => {
        return getPropsUseHasInProps(props)
      }, // eslint-disable-line
      getState: (key) => {
        return toRaw(state[key]);
      }, // eslint-disable-line
      getStates: () => toRaw(state) as any, // eslint-disable-line
      setState: (states, cb) => {
        // console.log('setState', states)
        for (let i in states) {
          if (states.hasOwnProperty(i)) {
            //@ts-ignore
            state[i] = states[i];
          }
        }
        // this.setState({ ...states }, cb)
      }, // eslint-disable-line
      getCache: (key) => key && cache.value[key], // eslint-disable-line
      getCaches: () => cache.value, // eslint-disable-line
      setCache: (key, value) => key && (cache.value[key] = value), // eslint-disable-line
      stopPropagation: (e) => {
        // eslint-disable-line
        try {
          e.stopPropagation();
          e && e.stopImmediatePropagation && e.stopImmediatePropagation();
        } catch (error) {}
      },
      persistEvent: (e: KeyboardEvent | MouseEvent) => {
        // e && e.persist && typeof e.persist === 'function' ? e.persist() : null;
      },
    };
  }

  function log(text: string, ...rest: any): any {
    return baseLog(text, ...rest);
  }
  function getDataAttr() {
    return getDataAttr_({ ...props, ...attrs });
  }
  function setStateAsync(state_: Partial<any>){
    return new Promise<void>(resolve=>{
      Object.keys(state_).forEach(key=>{
        state[key] = state_[key]
      })
      resolve()
    });
  }
  return {
    cache,
    foundation,
    state,
    isControlled,
    context,
    adapter,
    log,
    getDataAttr,
    setStateAsync,
  };
};

export function useHasInProps() {
  const instance = getCurrentInstance();

  function hasInProps(key: string): boolean | undefined {
    if (instance) {
      // 检查vnode的props是否包含value键
      return instance.vnode.props && key in instance.vnode.props;
    }
  }

  function getProps_<P>(props: P): P {
    if (!instance.vnode.props) {
      return getProps(props);
    }
    const tProps: any = {};
    for (const tPropsKey in props) {
      if (props.hasOwnProperty(tPropsKey) && tPropsKey in instance.vnode.props) {
        tProps[tPropsKey] = props[tPropsKey];
      }

      if (props.hasOwnProperty(tPropsKey) && props[tPropsKey] !== undefined && props[tPropsKey] !== false) {
        tProps[tPropsKey] = props[tPropsKey];
      }
      //@ts-ignore
      const defaultProps = instance.propsOptions[0]
      if(tProps[tPropsKey] === undefined && defaultProps[tPropsKey].default !== undefined) {
        tProps[tPropsKey] = defaultProps[tPropsKey].default;
      }
    }
    return tProps;
  }

  return {
    hasInProps,
    getProps: getProps_,
  };
}
