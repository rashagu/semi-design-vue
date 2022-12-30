import {defineComponent, ref, h, Fragment, CSSProperties, HTMLAttributes} from 'vue'
import cls from 'classnames';
import { strings, cssClasses } from '@douyinfe/semi-foundation/typography/constants';
import Base from './Base';
import {
  Ellipsis,
  TypographyBaseSize,
  TypographyBaseSpacing,
  TypographyBaseType,
  OmitTypographyProps
} from './interface';
import { CopyableConfig, LinkType } from './Title';


type OmitParagraphProps = OmitTypographyProps;

export interface ParagraphProps extends Omit<HTMLAttributes, OmitParagraphProps>{
  className?: string;
  component_?: any;
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: Ellipsis | boolean;
  link?: LinkType;
  mark?: boolean;
  size?: TypographyBaseSize;
  spacing?: TypographyBaseSpacing;
  strong?: boolean;
  style?: CSSProperties;
  type?: TypographyBaseType;
  underline?: boolean;
}

const prefixCls = cssClasses.PREFIX;


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
  size: {
    type: String,
    default: 'normal',
  },
  spacing: {
    type: String,
    default: 'normal',
  },
  style: {
    type: Object,
    default: {},
  },
  className: {
    type: String,
    default: '',
  },
}
const paragraph = defineComponent<ParagraphProps>((props, {slots}) => {


  const { className } = props;
  const paragraphCls = cls(className, `${prefixCls}-paragraph`);
  return ()=><Base component_={'p'} {...props} className={paragraphCls} >
    {{
      default: slots.default
    }}
  </Base>;
})

paragraph.props = vuePropsType

export default paragraph

