import {defineComponent, ref, h, Fragment, VNode, CSSProperties} from 'vue'

export interface TriggerProps {
  triggerRender?: (props?: any) => VNode;
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

const Index = defineComponent<TriggerProps>((props, {slots}) => {


  return () => {
    // eslint-disable-next-line no-unused-vars
    const { triggerRender, componentName, ...rest } = props;
    return triggerRender({ ...rest });
  }
})

Index.props = vuePropsType

export default Index

