import {defineComponent, ref, h, Fragment, VNode, CSSProperties, ComponentObjectPropsOptions, PropType} from 'vue'
import { strings } from '@douyinfe/semi-foundation/typography/constants';
import Base from './base';
import { Ellipsis, TypographyBaseType, OmitTypographyProps } from './interface';
import { ArrayElement } from '@douyinfe/semi-foundation/utils/type';

type OmitTitleProps = OmitTypographyProps;

export interface CopyableConfig {
  content?: string;
  copyTip?: VNode;
  successTip?: VNode;
  icon?: VNode;
  onCopy?(e: MouseEvent, content: string, res: boolean): void;
}

export type LinkType = any | boolean;



export interface TitleProps extends Omit<any, OmitTitleProps>{
  class?: string;
  component_?: any;
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: Ellipsis | boolean;
  heading?: ArrayElement<typeof strings.HEADING>;
  link?: LinkType;
  mark?: boolean;
  strong?: boolean;
  style?: CSSProperties;
  type?: TypographyBaseType;
  underline?: boolean;
  weight?: ArrayElement<typeof strings.WEIGHT> | number
}
export const vuePropsType:ComponentObjectPropsOptions<TitleProps> = {
  className: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default:''
  },
  id: {
    type: String,
    default:''
  },
  'x-semi-prop': {
    type: String,
    default:''
  },
  component_: [String, Array, Boolean, Object,Number],
  copyable: {
    type: [Object, Boolean],
    default: false,
  },
  delete: {
    type:Boolean,
    default: false
  },
  disabled: {
    type:Boolean,
    default: false
  },
  ellipsis: {
    type: [Object, Boolean],
    default: false
  },
  heading: {
    type: [String, Array, Boolean, Object,Number] as PropType<TitleProps['heading']>,
    default: 1,
  },
  link: {
    type: [Object, Boolean],
    default: false
  },
  mark: {
    type:Boolean,
    default: false
  },
  strong: {
    type:Boolean,
    default: false
  },
  style: {
    type: [String,Object] as PropType<TitleProps['style']>,
    default: {}
  },
  type: {
    type: String as PropType<TitleProps['type']>,
    default: 'primary'
  },
  underline: Boolean,
  weight: [String, Number] as PropType<TitleProps['weight']>,
}
const Title = defineComponent((props, {slots}) => {


  return () => {
    const { heading, component_, ...rest } = props;
    const component = strings.HEADING.indexOf(heading) !== -1 ? `h${heading}` : 'h1';
    // Passing headings to support custom components
    // console.log(props)
    return <Base children={slots.default?.()} component_={component_ || component as any} heading={component} {...rest} >
      {{
        default: slots.default
      }}
    </Base>;
  }
}, {
  props: vuePropsType,
  name: 'Title'
})


export default Title

