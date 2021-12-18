import {defineComponent, ref, h, StyleValue, isVNode, Fragment} from 'vue'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import { strings as iconStrings } from '@douyinfe/semi-foundation/icons/constants';
import Button, { Theme, ButtonProps } from '../button/Button';
import SpinIcon from '../spin/Icon';
import { noop } from 'lodash';
import '@douyinfe/semi-foundation/button/iconButton.scss';


const iconSizes = iconStrings.SIZE;

export type HorizontalPaddingType = 'left' | 'right';

export interface IconButtonProps extends ButtonProps {
  icon?: any;
  iconPosition?: 'left' | 'right';
  iconSize?: any;
  iconStyle?: StyleValue;
  loading?: boolean;
  theme?: Theme;
  style?: StyleValue;
  className?: string;
  disabled?: boolean;
  noHorizontalPadding?: boolean | HorizontalPaddingType | HorizontalPaddingType[];
  prefixCls?: string;
}

// TODO: add a buttonGroup component
// TODO: icon configuration
const Index = defineComponent<IconButtonProps>((props, {slots}) => {

  const {
    iconPosition,
    iconSize,
    iconStyle,
    style: originStyle,
    icon,
    noHorizontalPadding,
    theme,
    className,
    prefixCls,
    loading,
    ...otherProps
  } = props;

  const style:any = originStyle;
  // TODO: review check
  if (Array.isArray(noHorizontalPadding)) {
    noHorizontalPadding.includes('left') && (style.paddingLeft = 0);
    noHorizontalPadding.includes('right') && (style.paddingRight = 0);
  } else if (noHorizontalPadding === true) {
    style.paddingLeft = 0;
    style.paddingRight = 0;
  }

  let finalChildren = null;



  const btnTextCls = classNames({
    [`${prefixCls}-content-left`]: iconPosition === 'right',
    [`${prefixCls}-content-right`]: iconPosition === 'left',
  });


  return ()=>(
    <Button {...otherProps} className={classNames(className, `${prefixCls}-with-icon`, {
      [`${prefixCls}-with-icon-only`]: slots.default == null || (slots.default as any) === '',
      [`${prefixCls}-loading`]: loading,
    })} theme={theme} style={style}>
      {
        (()=>{
          let IconElem = ():any=>null;

          if (loading && !otherProps.disabled) {
            IconElem = ()=><SpinIcon />;
          } else if (isVNode(icon)) {
            IconElem = ()=>icon;
          }
          const children = ()=>slots.default != null? <span class={IconElem()?btnTextCls:''}>{slots.default()}</span> : null;
          if (iconPosition === 'left') {
            return ()=>(
              <>
                {IconElem()}
                {children()}
              </>
            );
          } else {
            return ()=>(
              <>
                {children()}
                {IconElem()}
              </>
            );
          }
        })()
      }
    </Button>
  );
})

export const VuePropsType = {
  icon: [Object, String],
  iconPosition: {
    type:String,
    default: strings.DEFAULT_ICON_POSITION,
  },
  iconSize: String,
  iconStyle: Object,
  loading:{
    type:Boolean,
    default: false,
  },
  theme: String,
  style: {
    type: Object,
    default: {},
  },
  className: String,
  disabled: Boolean,
  noHorizontalPadding: [Boolean, String, Array],
  prefixCls: String,
}

Index.props = VuePropsType

export default Index
