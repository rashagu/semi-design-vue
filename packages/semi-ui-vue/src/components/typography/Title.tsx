import {defineComponent, ref, h, Fragment, VNode, CSSProperties} from 'vue'
import { strings } from '@douyinfe/semi-foundation/typography/constants';
import Base from './Base';
import { Ellipsis, TypographyBaseType, OmitTypographyProps } from './interface';
import { ArrayElement } from '@douyinfe/semi-foundation/utils/type';

type OmitTitleProps = OmitTypographyProps;

export interface CopyableConfig {
  content?: string;
  copyTip?: VNode;
  successTip?: VNode;
  onCopy?(e: any, content: string, res: boolean): void;
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
}
export const vuePropsType = {
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
    type: [String, Array, Boolean, Object,Number],
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
    type: [String,Object],
    default: {}
  },
  type: {
    type: String,
    default: 'primary'
  },
  underline: Boolean,
}
const Title = defineComponent<TitleProps>((props, {slots}) => {


  return () => {
    const { heading, component_, ...rest } = props;
    const component = strings.HEADING.indexOf(heading) !== -1 ? `h${heading}` : 'h1';
    // Passing headings to support custom components
    // console.log(props)
    return <Base component_={component_ || component as any} heading={component} {...rest} >
      {{
        default: slots.default
      }}
    </Base>;
  }
})

Title.props = vuePropsType

export default Title

