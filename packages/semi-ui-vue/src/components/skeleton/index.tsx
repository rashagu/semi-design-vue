import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/skeleton/constants';
import '@douyinfe/semi-foundation/skeleton/skeleton.scss';
import { Avatar, Image, Title, Button, Paragraph } from './item';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, useSlots } from 'vue';
import type { VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';

export type { ParagraphProps, AvatarProps, GenericProps } from './item';

const prefixCls = cssClasses.PREFIX;

export interface SkeletonProps {
  active?: boolean;
  className?: string;
  loading?: boolean;
  placeholder?: VueJsxNode;
  style?: CSSProperties;
}

const defaultProps = {
  loading: true,
};
const propTypes: ComponentObjectPropsOptions<Required<SkeletonProps>> = {
  active: PropTypes.bool,
  placeholder: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.bool,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Skeleton = defineComponent({
  props: vuePropsType,
  name: 'Skeleton',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const children = slots.default?.();
      const { placeholder, active, className, loading, style, ...others } = props;
      const skCls = cls(
        prefixCls,
        {
          [`${prefixCls}-active`]: Boolean(active),
        },
        className
      );
      let content;
      if (loading) {
        content = (
          <div class={skCls} style={style} {...others} x-semi-prop="placeholder">
            {placeholder}
          </div>
        );
      } else {
        content = children;
      }
      return content;
    };
  },
});

export {
  Avatar as SkeletonAvatar,
  Image as SkeletonImage,
  Title as SkeletonTitle,
  Button as SkeletonButton,
  Paragraph as SkeletonParagraph,
};
export default Skeleton;
