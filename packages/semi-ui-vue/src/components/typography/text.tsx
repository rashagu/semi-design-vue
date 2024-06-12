import {
  defineComponent,
  ref,
  h,
  Fragment,
  HTMLAttributes,
  CSSProperties,
  ComponentObjectPropsOptions,
  PropType
} from 'vue'
import Base from './base';
import { Ellipsis, TypographyBaseSize, TypographyBaseType, OmitTypographyProps } from './interface';
import { CopyableConfig, LinkType } from './title';

type OmitTextProps = OmitTypographyProps;

export interface TextProps extends Omit<HTMLAttributes, OmitTextProps> {
  children?: any;
  className?: string;
  code?: boolean;
  component_?: any;
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: Ellipsis | boolean;
  icon?: any | string;
  link?: LinkType;
  mark?: boolean;
  size?: TypographyBaseSize;
  strong?: boolean;
  style?: CSSProperties;
  type?: TypographyBaseType;
  underline?: boolean;
  weight?: number
}


export const vuePropsType:ComponentObjectPropsOptions<TextProps> = {
  copyable: {
    type: [Object, Boolean],
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object,String],
    default: '',
  },
  // editable: false,
  ellipsis: {
    type: [Object, Boolean],
    default: false,
  },
  mark: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: false,
  },
  strong: {
    type: Boolean,
    default: false,
  },
  link: {
    type: [Boolean, Object],
    default: false,
  },
  type: {
    type: String as PropType<TextProps['type']>,
    default: 'primary',
  },
  style: {
    type: Object,
    default: {},
  },
  size: {
    type: String as PropType<TextProps['size']>,
    default: 'normal',
  },
  className: {
    type: String,
    default: '',
  },
  weight: Number,
  code: Boolean,
}


const Text = defineComponent<TextProps>((props, {slots}) => {

  return () => {
    return <Base children={slots.default?.()} component_={'span'} {...props} >
      {{
        default: slots.default
      }}
    </Base>;
  }
}, {
  props: vuePropsType,
  name: 'Text'
})


export default Text

