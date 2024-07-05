import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/card/constants';
import cls from 'classnames';
import { CSSProperties, defineComponent, h, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';

const prefixcls = cssClasses.PREFIX;

export type Shadows = 'hover' | 'show';

export interface MetaProps {
  /** Avatar */
  avatar?: VueJsxNode;
  /** Style class name */
  className?: string;
  /** Description */
  description?: VueJsxNode;
  /** Inline style */
  style?: CSSProperties;
  /** Title */
  title?: VueJsxNode;
}
const propTypes = {
  avatar: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
};
export const vuePropsType = vuePropsMake(propTypes, {});
const Meta = defineComponent({
  props: vuePropsType,
  name: 'Meta',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      // const children = slots.default?.()
      const { avatar, className, description, style, title, ...others } = props;
      const metaCls = cls(`${prefixcls}-meta`, className);
      const avatarNode = avatar && <div class={`${prefixcls}-meta-avatar`}>{avatar}</div>;
      const titleNode = title && <div class={`${prefixcls}-meta-wrapper-title`}>{title}</div>;
      const descriptionNode = description && <div class={`${prefixcls}-meta-wrapper-description`}>{description}</div>;
      const wrapper =
        title || description ? (
          <div class={`${prefixcls}-meta-wrapper`}>
            {titleNode}
            {descriptionNode}
          </div>
        ) : null;

      return (
        <div {...others} class={metaCls} style={style}>
          {avatarNode}
          {wrapper}
        </div>
      );
    };
  },
});

export default Meta;
