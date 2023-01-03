import {defineComponent, ref, h, Fragment, HTMLAttributes, CSSProperties} from 'vue'
import { strings } from '@douyinfe/semi-foundation/typography/constants';
import Base from './Base';
import { Ellipsis, TypographyBaseSize, TypographyBaseType, OmitTypographyProps } from './interface';
import { CopyableConfig, LinkType } from './Title';

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
}


export const vuePropsType = {
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
    type: String,
    default: 'primary',
  },
  style: {
    type: Object,
    default: {},
  },
  size: {
    type: String,
    default: 'normal',
  },
  className: {
    type: String,
    default: '',
  },
}


const Text = defineComponent<TextProps>((props, {slots}) => {

  return () => {
    return <Base children={slots.default?.()} component_={'span'} {...props} >
      {{
        default: slots.default
      }}
    </Base>;
  }
})

Text.props = vuePropsType

export default Text

