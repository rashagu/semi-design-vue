import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/card/constants';
import cls from 'classnames';
import Space from '../space';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useHasInProps } from '../_base/baseComponent';
import { CombineProps } from '../interface';

const prefixcls = cssClasses.PREFIX;

export type CardGroupType = 'grid';

export interface CardGroupProps {
  /** Card group style class name */
  className?: string;
  /** Card Spacing */
  spacing?: number | number[];
  /** Card group inline style */
  style?: CSSProperties;
  /** Card set type */
  type?: CardGroupType;
}
const propTypes: CombineProps<CardGroupProps> = {
  className: PropTypes.string,
  spacing: [PropTypes.number, PropTypes.array],
  style: PropTypes.object,
  type: PropTypes.string as PropType<CardGroupProps['type']>,
};

const defaultProps = {
  spacing: 16,
};
export const vuePropsType = vuePropsMake<CardGroupProps>(propTypes, defaultProps);
const CardGroup = defineComponent({
  props: vuePropsType,
  name: 'CardGroup',
  setup(props, {}) {
    const {getProps} = useHasInProps()
    const slots = useSlots();

    return () => {
      const children = slots.default?.();
      const { className, spacing, style, type, ...others } = getProps(props);
      const isGrid = type === 'grid';
      const cardGroupCls = cls(`${prefixcls}-group`, className, {
        [`${prefixcls}-group-grid`]: isGrid,
      });

      return (
        <Space spacing={isGrid ? 0 : spacing} wrap={true} className={cardGroupCls} style={style} {...others}>
          {children}
        </Space>
      );
    };
  },
});

export default CardGroup;
