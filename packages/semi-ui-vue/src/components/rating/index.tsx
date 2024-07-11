import { useBaseComponent, useHasInProps } from '../_base/baseComponent';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/rating/constants';
import * as PropTypes from '../PropTypes';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import Item from './item';
import Tooltip from '../tooltip';
import RatingFoundation, { RatingAdapter } from '@douyinfe/semi-foundation/rating/foundation';

import '@douyinfe/semi-foundation/rating/rating.scss';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';

export type { RatingItemProps } from './item';
export interface RatingProps {
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  'aria-invalid'?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-required'?: boolean;
  disabled?: boolean;
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  style?: CSSProperties;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  className?: string;
  character?: VueJsxNode;
  tabIndex?: number;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onClick?: (e: MouseEvent | KeyboardEvent, index: number) => void;
  autoFocus?: boolean;
  size?: 'small' | 'default' | number;
  tooltips?: string[];
  id?: string;
  preventScroll?: boolean;
}

export interface RatingState {
  value: number;
  hoverValue: number;
  focused: boolean;
  clearedValue: number;
  emptyStarFocusVisible: boolean;
}

const propTypes: CombineProps<RatingProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  count: PropTypes.number,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func as PropType<RatingProps['onChange']>,
  onHoverChange: PropTypes.func as PropType<RatingProps['onHoverChange']>,
  className: PropTypes.string,
  character: PropTypes.node,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func as PropType<RatingProps['onFocus']>,
  onBlur: PropTypes.func as PropType<RatingProps['onBlur']>,
  onKeyDown: PropTypes.func as PropType<RatingProps['onKeyDown']>,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltips: Array,
  id: PropTypes.string,
  preventScroll: PropTypes.bool,
  onClick: PropTypes.func as PropType<RatingProps['onClick']>,
};

const defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: cssClasses.PREFIX,
  onChange: noop,
  onHoverChange: noop,
  tabIndex: -1,
  size: 'default' as const,
};
export const vuePropsType = vuePropsMake<RatingProps>(propTypes, defaultProps);
const Rating = defineComponent({
  props: { ...vuePropsType },
  name: 'Rating',
  setup(props, {}) {
    const { getProps } = useHasInProps();
    const slots = useSlots();

    const rate = ref();
    const stars: Record<string, VNode> = {};
    const state = reactive<RatingState>({
      value: props.value === undefined ? props.defaultValue : props.value,
      focused: false,
      hoverValue: undefined,
      clearedValue: null,
      emptyStarFocusVisible: false,
    });

    const { adapter: adapterInject, getDataAttr } = useBaseComponent<RatingProps>(props, state);
    function adapter_(): RatingAdapter<RatingProps, RatingState> {
      return {
        ...adapterInject<RatingProps, RatingState>(),
        focus: () => {
          const { disabled, count } = props;
          const { value } = state;
          if (!disabled) {
            const index = Math.ceil(value) - 1;
            // @ts-ignore
            stars[index < 0 ? count : index].starFocus();
          }
        },
        getStarDOM: (index: number) => {
          const instance = stars && stars[index];
          // eslint-disable-next-line react/no-find-dom-node
          // @ts-ignore
          return instance.$el;
        },
        notifyHoverChange: (hoverValue: number, clearedValue: number) => {
          const { onHoverChange } = props;
          state.hoverValue = hoverValue;
          state.clearedValue = clearedValue;
          onHoverChange(hoverValue);
        },
        updateValue: (value: number) => {
          const { onChange } = props;
          if (!('value' in getProps(props))) {
            state.value = value;
          }
          onChange(value);
        },
        clearValue: (clearedValue: number) => {
          state.clearedValue = clearedValue;
        },
        notifyFocus: (e: FocusEvent) => {
          const { onFocus } = props;
          state.focused = true;
          onFocus && onFocus(e);
        },
        notifyBlur: (e: FocusEvent) => {
          const { onBlur } = props;
          state.focused = false;
          onBlur && onBlur(e);
        },
        notifyKeyDown: (e: KeyboardEvent) => {
          const { onKeyDown } = props;
          state.focused = false;
          onKeyDown && onKeyDown(e);
        },
        setEmptyStarFocusVisible: (focusVisible: boolean): void => {
          state.emptyStarFocusVisible = focusVisible;
        },
      };
    }
    const adapter = adapter_();
    const foundation = new RatingFoundation(adapter);

    function getDerivedStateFromProps(nextProps: RatingProps, state: RatingState) {
      if ('value' in nextProps && nextProps.value !== undefined) {
        return {
          ...state,
          value: nextProps.value,
        };
      }
      return state;
    }

    watch(
      () => props.value,
      () => {
        const newState = getDerivedStateFromProps({ ...getProps(props) }, { ...state });
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      }
    );

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    const onHover = (event: MouseEvent, index: number) => {
      foundation.handleHover(event, index);
    };

    const onMouseLeave = () => {
      foundation.handleMouseLeave();
    };

    const onClick: RatingProps['onClick'] = (event, index) => {
      foundation.handleClick(event, index);
    };

    const onFocus: RatingProps['onFocus'] = (e) => {
      foundation.handleFocus(e);
    };

    const onBlur: RatingProps['onBlur'] = (e) => {
      foundation.handleBlur(e);
    };

    const onKeyDown: RatingProps['onKeyDown'] = (event) => {
      const { value } = state;
      foundation.handleKeyDown(event, value);
    };

    const focus = () => {
      const { disabled, preventScroll } = props;
      if (!disabled) {
        rate.value.focus({ preventScroll });
      }
    };

    const blur = () => {
      const { disabled } = props;
      if (!disabled) {
        rate.value.blur();
      }
    };

    const saveRef = (index: number) => (node: any) => {
      stars[index] = node;
    };

    const handleStarFocusVisible = (event: FocusEvent) => {
      foundation.handleStarFocusVisible(event);
    };

    const handleStarBlur = (event: FocusEvent) => {
      foundation.handleStarBlur(event);
    };

    const getAriaLabelPrefix = () => {
      if (props['aria-label']) {
        return props['aria-label'];
      }
      let prefix = 'star';
      const { character } = props;
      if (typeof character === 'string') {
        prefix = character;
      }
      return prefix;
    };

    const getItemList = (ariaLabelPrefix: string) => {
      const { count, allowHalf, prefixCls, disabled, character, size, tooltips } = props;
      const { value, hoverValue, focused } = state;
      // index == count is for Empty rating
      const itemList = [...Array(count + 1).keys()].map((ind) => {
        const content = (
          <Item
            ref={(node) => {
              saveRef(ind)(node);
            }}
            index={ind}
            count={count}
            prefixCls={`${prefixCls}-star`}
            allowHalf={allowHalf}
            value={hoverValue === undefined ? value : hoverValue}
            onClick={disabled ? noop : onClick}
            onHover={disabled ? noop : onHover}
            key={ind}
            disabled={disabled}
            character={character}
            focused={focused}
            size={ind === count ? 0 : size}
            ariaLabelPrefix={ariaLabelPrefix}
            onFocus={disabled || count !== ind ? noop : handleStarFocusVisible}
            onBlur={disabled || count !== ind ? noop : handleStarBlur}
          />
        );
        if (tooltips) {
          const text = tooltips[ind] ? tooltips[ind] : '';
          const showTips = hoverValue - 1 === ind;
          return (
            <Tooltip visible={showTips} trigger="custom" content={text} key={`${ind}-${showTips}`}>
              {content}
            </Tooltip>
          );
        }
        return content;
      });
      return itemList;
    };

    return () => {
      const { style, prefixCls, disabled, className, id, count, tabIndex, ...rest } = props;
      const { value, emptyStarFocusVisible } = state;
      const ariaLabelPrefix = getAriaLabelPrefix();
      const ariaLabel = `Rating: ${value} of ${count} ${ariaLabelPrefix}${value === 1 ? '' : 's'},`;
      const itemList = getItemList(ariaLabelPrefix);
      const listCls = cls(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-focus`]: emptyStarFocusVisible,
        },
        className
      );
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <ul
          aria-label={ariaLabel}
          aria-labelledby={props['aria-labelledby']}
          aria-describedby={props['aria-describedby']}
          class={listCls}
          style={style}
          onMouseleave={disabled ? noop : onMouseLeave}
          tabindex={disabled ? -1 : tabIndex}
          onFocus={disabled ? noop : onFocus}
          onBlur={disabled ? noop : onBlur}
          onKeydown={disabled ? noop : onKeyDown}
          ref={rate}
          id={id}
          {...getDataAttr()}
        >
          {itemList}
        </ul>
      );
    };
  },
});

export default Rating;
