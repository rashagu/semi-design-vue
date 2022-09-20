import {defineComponent, ref, h, StyleValue, cloneVNode, provide, reactive, inject, CSSProperties} from 'vue'
import baseLog from '@douyinfe/semi-foundation/utils/log';
import {DefaultAdapter} from '@douyinfe/semi-foundation/base/foundation';
import {VALIDATE_STATUS} from '@douyinfe/semi-foundation/base/constants';
import {ArrayElement} from './base';
import {ContextValue} from "../configProvider/ConfigContextProvider";

const {hasOwnProperty} = Object.prototype;

export type ValidateStatus = ArrayElement<typeof VALIDATE_STATUS>;

export type BaseProps =  {
  style?: CSSProperties;
  className?: string;

  [key: string]: any,
}


export const useBaseComponent: <U extends BaseProps = {}>(props: U,state:any) =>
  {
    isControlled: (key: any) => boolean,
    cache: any,
    adapter: <P extends BaseProps, S={}>() => DefaultAdapter<P, S>,
    log: (text: string, ...rest: any) => any,
    context: ContextValue, foundation: any, state: any
  }= (props,state)=> {
  const cache = ref<any>({});
  const foundation = ref<any>(null);

  const isControlled = (key: any) => {

    return Boolean(key && props && typeof props === 'object' && hasOwnProperty.call(adapter().getProps(), key))
  };

  const context = inject<ContextValue>('context',{})

  function adapter<P extends BaseProps = {}, S = {}>(): DefaultAdapter<P, S> {
    return {
      getContext: key => { // eslint-disable-line
        if (context && key) {
          // @ts-ignore
          return context[key];
        }
      },
      getContexts: () => context, // eslint-disable-line
      getProp: key => {
        // //console.log(key,props,props[key])
        return props[key]
      }, // eslint-disable-line
      // return all props
      // @ts-ignore
      getProps: () => {
        let newProps:any = {}
        for(let i in props){
          if (props[i] !== undefined){
            newProps[i] = props[i]
          }
        }
        // console.log('value' in newProps)
        return  newProps
      }, // eslint-disable-line
      getState: key => {
        //console.log(key,state,state[key])
        return state[key]
      }, // eslint-disable-line
      getStates: () => state, // eslint-disable-line
      setState: (states, cb) => {
        // console.log('setState', states)
        for (let i in states){
          if (states.hasOwnProperty(i)){
           state[i] = states[i]
          }
        }
        // this.setState({ ...states }, cb)
      }, // eslint-disable-line
      getCache: key => key && cache.value[key], // eslint-disable-line
      getCaches: () => cache.value, // eslint-disable-line
      setCache: (key, value) => key && (cache.value[key] = value), // eslint-disable-line
      stopPropagation: e => { // eslint-disable-line
        try {
          e.stopPropagation();
          e && e.stopImmediatePropagation && e.stopImmediatePropagation();
        } catch (error) {

        }
      }
    };
  }

  function log(text: string, ...rest: any): any {
    return baseLog(text, ...rest);
  }


  return {
    cache,
    foundation,
    state,
    isControlled,
    context,
    adapter,
    log,
  }


}

const BaseComponent = defineComponent<BaseProps>((props, {slots}) => {
  const cache = ref<any>({});
  const foundation = ref<any>(null);
  const state = reactive<any>({})

  // eslint-disable-next-line
  const isControlled = (key: any) => Boolean(key && props && typeof props === 'object' && hasOwnProperty.call(props, key));

  const context = ref<ContextValue>({})


  function adapter<P extends BaseProps = {}, S = {}>(): DefaultAdapter<P, S> {
    return {
      getContext: key => { // eslint-disable-line
        if (context && key) {
          // @ts-ignore
          return context[key];
        }
      },
      getContexts: () => context, // eslint-disable-line
      getProp: key => props[key], // eslint-disable-line
      // return all props
      getProps: () => {
        let newProps = {}
        console.debug(props)

        return  props as P
      }, // eslint-disable-line
      getState: key => state[key], // eslint-disable-line
      getStates: () => state, // eslint-disable-line
      setState: (states, cb) => {
        // this.setState({ ...states }, cb)
      }, // eslint-disable-line
      getCache: key => key && cache[key], // eslint-disable-line
      getCaches: () => cache.value, // eslint-disable-line
      setCache: (key, value) => key && (cache.value[key] = value), // eslint-disable-line
      stopPropagation: e => { // eslint-disable-line
        try {
          e.stopPropagation();
          e.stopImmediatePropagation && e.stopImmediatePropagation()
        } catch (error) {

        }
      }
    };
  }

  function log(text: string, ...rest: any): any {
    return baseLog(text, ...rest);
  }


  provide('cache', cache)
  provide('foundation', foundation)
  provide('adapter', adapter)
  provide('log', log)
  provide('context', context)


  return () => slots.default ? slots.default() : null
})


BaseComponent.props = {
  style: Object,
  className: String,
}

export default BaseComponent
