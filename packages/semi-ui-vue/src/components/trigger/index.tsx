import { defineComponent, ref, h, Fragment, VNode, CSSProperties, ComponentObjectPropsOptions, PropType } from 'vue';
import { CombineProps, VueJsxNode } from '../interface';

export interface TriggerProps {
  triggerRender?: (props?: any) => VueJsxNode;
  componentName?: string;
  componentProps?: Record<string, any>;
  value?: any;
  inputValue?: string;
  placeholder?: string | string[];
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string, event: any)=>void;
  showClearIgnoreDisabled?: boolean
  onClear?: (e: MouseEvent)=>void;
  onSearch?: (value: string, event: any)=>void;
  onRemove?: (value: any, event: any)=>void;
  disabled?: boolean
}

export const vuePropsType: CombineProps<TriggerProps> = {
  triggerRender: Function as PropType<TriggerProps['triggerRender']>,
  componentName: String,
  componentProps: Object,
  value: [Object, Number, String, Array],
  inputValue: String,
  placeholder: [String, Array],
  className: String,
  style: [Object],
  showClearIgnoreDisabled: Boolean,
  onChange: {
    type: Function as PropType<TriggerProps['onChange']>,
  },
  onClear: Function as PropType<TriggerProps['onClear']>,
  disabled: Boolean,
  onSearch: Function as PropType<TriggerProps['onSearch']>,
  onRemove: Function as PropType<TriggerProps['onRemove']>,
};

const Index = defineComponent({
  props: vuePropsType,
  name: 'Trigger',
  setup(props, { slots, attrs }) {
    return () => {
      // eslint-disable-next-line no-unused-vars
      const { triggerRender, componentName, ...rest } = props;
      return triggerRender({ ...attrs, ...rest });
    };
  },
});

export default Index;
