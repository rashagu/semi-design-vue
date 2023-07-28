import {defineComponent, ref, h, Fragment, VNode, CSSProperties} from 'vue'
import {VueJsxNode} from "../interface";

export interface TriggerProps {
  triggerRender?: (props?: any) => VueJsxNode;
  componentName?: string;
  componentProps?: Record<string, any>;
  value?: any;
  inputValue?: string;
  placeholder?: string | string[];
  className?: string;
  style?: CSSProperties;
  [x: string]: any;
}

export const vuePropsType = {
  triggerRender:Function,
  componentName: String,
  componentProps:Object,
  value:[Object,Number,String,Array],
  inputValue: String,
  placeholder: [String, Array],
  className: String,
  style: [Object, String],
}

// @ts-ignore
const Index = defineComponent<TriggerProps>((props, {slots}) => {


  return () => {
    // eslint-disable-next-line no-unused-vars
    const { triggerRender, componentName, ...rest } = props;
    return triggerRender({ ...rest });
  }
}, {
  props: vuePropsType,
  name: 'Trigger'
})


export default Index

