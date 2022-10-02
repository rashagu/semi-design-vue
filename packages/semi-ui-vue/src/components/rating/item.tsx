import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/rating/constants';
import '@douyinfe/semi-foundation/rating/rating.scss';
import { IconStar } from '@kousum/semi-icons-vue';
import { RatingItemFoundation, RatingItemAdapter } from '@douyinfe/semi-foundation/rating/foundation';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import {defineComponent, h, reactive, ref, useSlots} from 'vue';
import {VueHTMLAttributes, VueJsxNode} from '../interface';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

export interface RatingItemProps extends BaseProps {
    value: number;
    index: number;
    prefixCls: string;
    allowHalf: boolean;
    onHover: (e: MouseEvent, index: number) => void;
    onClick: (e: MouseEvent | KeyboardEvent, index: number) => void;
    character: VueJsxNode;
    focused: boolean;
    disabled: boolean;
    count: number;
    ariaLabelPrefix: string;
    size: number | ArrayElement<typeof strings.SIZE_SET>;
    'aria-describedby'?: AriaAttributes['aria-describedby'];
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    preventScroll?: boolean;
}

export interface RatingItemState {
    firstStarFocus: boolean;
    secondStarFocus: boolean;
}

const propTypes = {
    value: PropTypes.number,
    index: PropTypes.number,
    prefixCls: PropTypes.string,
    allowHalf: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    character: PropTypes.node,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    count: PropTypes.number,
    ariaLabelPrefix: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'aria-describedby': PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    preventScroll: PropTypes.bool,
};
export const vuePropsType = vuePropsMake(propTypes, {});
const Item = defineComponent<RatingItemProps>((props, {expose}) => {
    const slots = useSlots();

    const state = reactive<RatingItemState>({
        firstStarFocus: false,
        secondStarFocus: false,
    });

    const { adapter: adapterInject } = useBaseComponent<RatingItemProps>(props, state);
    function adapter_(): RatingItemAdapter<RatingItemProps, RatingItemState> {
        return {
            ...adapterInject<RatingItemProps, RatingItemState>(),
            setFirstStarFocus: value => {
                state.firstStarFocus = value;
            },
            setSecondStarFocus: value => {
                state.secondStarFocus = value;
            },
        };
    }
    const adapter = adapter_();
    const foundation = new RatingItemFoundation(adapter);

    const firstStar = ref();
    const secondStar = ref();

    const onHover = e => {
        const { onHover, index } = props;
        onHover(e, index);
    };

    const onClick = e => {
        const { onClick, index } = props;
        onClick(e, index);
    };

    const onFocus = (e, star) => {
        const { onFocus } = props;
        onFocus && onFocus(e);
        foundation.handleFocusVisible(e, star);
    };

    const onBlur = (e, star) => {
        const { onBlur } = props;
        onBlur && onBlur(e);
        foundation.handleBlur(e, star);
    };

    const onKeyDown = e => {
        const { onClick, index } = props;
        if (e.keyCode === 13) {
            onClick(e, index);
        }
    };

    const starFocus = () => {
        const { value, index, preventScroll } = props;
        if (value - index === 0.5) {
            firstStar.value.focus({ preventScroll });
        } else {
            secondStar.value.focus({ preventScroll });
        }
    };

    expose({
        starFocus
    })

    return () => {
        const {
            index,
            prefixCls,
            character,
            count,
            value,
            disabled,
            allowHalf,
            focused,
            size,
            ariaLabelPrefix,
        } = props;
        const { firstStarFocus, secondStarFocus } = state;
        const starValue = index + 1;
        const diff = starValue - value;
        // const isHalf = allowHalf && value + 0.5 === starValue;
        const isHalf = allowHalf && diff < 1 && diff > 0;
        const firstWidth = 1 - diff;
        const isFull = starValue <= value;
        const isCustomSize = typeof size === 'number';
        const starCls = cls(prefixCls, {
            [`${prefixCls}-half`]: isHalf,
            [`${prefixCls}-full`]: isFull,
            [`${prefixCls}-${size}`]: !isCustomSize,
        });
        const sizeStyle = isCustomSize
            ? {
                  width: size,
                  height: size,
                  fontSize: size,
              }
            : {};
        const iconSize = isCustomSize ? 'inherit' : size === 'small' ? 'default' : 'extra-large';
        const content = character ? character : <IconStar size={iconSize} style={{ display: 'block' }} />;
        const isEmpty = index === count;
        const starWrapCls = cls(`${prefixCls}-wrapper`, {
            [`${prefixCls}-disabled`]: disabled,
            [`${cssClasses.PREFIX}-focus`]: (firstStarFocus || secondStarFocus) && value !== 0,
        });
        const starWrapProps:VueHTMLAttributes = {
            onClick: disabled ? null : onClick,
            onKeydown: disabled ? null : onKeyDown,
            onMousemove: disabled ? null : onHover,
            class: starWrapCls,
        };
        const AriaSetSize = allowHalf ? count * 2 + 1 : count + 1;
        const firstStarProps:VueHTMLAttributes = {
            ref: firstStar as any,
            role: 'radio',
            'aria-checked': value === index + 0.5,
            'aria-posinset': 2 * index + 1,
            'aria-setsize': AriaSetSize,
            'aria-disabled': disabled,
            'aria-label': `${index + 0.5} ${ariaLabelPrefix}s`,
            'aria-labelledby': props['aria-describedby'],
            'aria-describedby': props['aria-describedby'],
            class: cls(`${prefixCls}-first`, `${cssClasses.PREFIX}-no-focus`),
            tabindex: !disabled && value === index + 0.5 ? 0 : -1,
            onFocus: e => {
                onFocus(e, 'first');
            },
            onBlur: e => {
                onBlur(e, 'first');
            },
        };

        const secondStarTabIndex = !disabled && (value === index + 1 || (isEmpty && value === 0)) ? 0 : -1;
        const secondStarProps = {
            ref: secondStar as any,
            role: 'radio',
            'aria-checked': isEmpty ? value === 0 : value === index + 1,
            'aria-posinset': allowHalf ? 2 * (index + 1) : index + 1,
            'aria-setsize': AriaSetSize,
            'aria-disabled': disabled,
            'aria-label': `${isEmpty ? 0 : index + 1} ${ariaLabelPrefix}${index === 0 ? '' : 's'}`,
            'aria-labelledby': props['aria-describedby'],
            'aria-describedby': props['aria-describedby'],
            className: cls(`${prefixCls}-second`, `${cssClasses.PREFIX}-no-focus`),
            tabIndex: secondStarTabIndex,
            onFocus: e => {
                onFocus(e, 'second');
            },
            onBlur: e => {
                onBlur(e, 'second');
            },
        };

        return (
            <li class={starCls} style={{ ...sizeStyle }} key={index}>
                <div {...(starWrapProps as any)}>
                    {allowHalf && !isEmpty && (
                        <div {...firstStarProps} style={{ width: `${firstWidth * 100}%` }}>
                            {content}
                        </div>
                    )}
                    <div {...secondStarProps} x-semi-prop="character">
                        {content}
                    </div>
                </div>
            </li>
        );
    };
});

Item.props = vuePropsType;
Item.name = 'Item';

export default Item;
