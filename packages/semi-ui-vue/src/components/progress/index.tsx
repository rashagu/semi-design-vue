import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/progress/constants';
import '@douyinfe/semi-foundation/progress/progress.scss';
import { Animation } from '@douyinfe/semi-animation';
import { Motion } from '../_base/base';
import { generateColor, StrokeArr } from '@douyinfe/semi-foundation/progress/generates';
import {
    ComponentObjectPropsOptions,
    CSSProperties,
    defineComponent,
    h,
    onUnmounted, PropType,
    reactive, useAttrs,
    useSlots,
    VNode,
    watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import getDataAttr from "@douyinfe/semi-foundation/utils/getDataAttr";

const prefixCls = cssClasses.PREFIX;

export interface ProgressProps {
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-valuetext'?: string | undefined;
    className?: string;
    direction?: 'horizontal' | 'vertical';
    format?: (percent: number) => VNode | string;
    id?: string;
    motion?: Motion;
    orbitStroke?: string;
    percent?: number;
    showInfo?: boolean;
    size?: 'default' | 'small' | 'large';
    stroke?: string | StrokeArr;
    strokeGradient?: boolean;
    strokeLinecap?: 'round' | 'square';
    strokeWidth?: number;
    style?: CSSProperties;
    type?: 'line' | 'circle';
    width?: number;
}

export interface ProgressState {
    percentNumber: number;
}


const propTypes:ComponentObjectPropsOptions<ProgressProps> = {
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    className: PropTypes.string,
    direction: String as PropType<ProgressProps['direction']>,
    format: [Function, ...PropTypes.node] as PropType<ProgressProps['format']>,
    id: PropTypes.string,
    motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
    orbitStroke: PropTypes.string,
    percent: PropTypes.number,
    // scale: PropTypes.number as PropType<ProgressProps['scale']>,
    showInfo: PropTypes.bool,
    size: String as PropType<ProgressProps['size']>,
    stroke: [PropTypes.string, PropTypes.array],
    strokeGradient: PropTypes.bool,
    strokeLinecap: String as PropType<ProgressProps['strokeLinecap']>,
    strokeWidth: PropTypes.number,
    style: PropTypes.object,
    type: String as PropType<ProgressProps['type']>,
    width: PropTypes.number,
};

const defaultProps = {
    className: '',
    direction: strings.DEFAULT_DIRECTION,
    format: ()=>((text: string): string => `${text}%`),
    motion: true,
    orbitStroke: 'var(--semi-color-fill-0)',
    percent: 0,
    showInfo: false,
    size: strings.DEFAULT_SIZE,
    stroke: strings.STROKE_DEFAULT,
    strokeGradient: false,
    strokeLinecap: strings.DEFAULT_LINECAP,
    strokeWidth: 4,
    style: {},
    type: strings.DEFAULT_TYPE,
};
export const vuePropsType = vuePropsMake<ProgressProps>(propTypes, defaultProps)
const Progress = defineComponent<ProgressProps>((props, {}) => {

    const attr = useAttrs()
    const slots = useSlots()
    let _mounted: boolean = true;

    let animation: Animation;
    const state = reactive<ProgressState>({
        percentNumber: props.percent, // Specially used for animation of numbers
    });

    watch(()=>props.percent, (value, oldValue)=>{

        if (isNaN(value) || isNaN(oldValue)) {
            throw new Error('[Semi Progress]:percent can not be NaN');
            return;
        }
    })

    watch(()=>props.percent, (value, oldValue)=>{
        if (!props.motion) {
            // eslint-disable-next-line
            state.percentNumber = props.percent
            return;
        }
        if (animation && animation.destroy) {
            animation.destroy();
        }
        animation = new Animation(
          {
              from: { value: oldValue },
              to: { value: props.percent },
          },
          {
              // easing: 'cubic-bezier(0, .68, .3, 1)'
              easing: 'linear',
              duration: 300,
          }
        );
        animation.on('frame', (props: any) => {
            // prevent setState while component is unmounted but this timer is called
            if (_mounted === false) {
                return;
            }
            // let percentNumber = Number.isInteger(props.value) ? props.value : Math.floor(props.value * 100) / 100;
            const percentNumber = parseInt(props.value);
            state.percentNumber = percentNumber;
        });
        animation.on('rest', () => {
            // prevent setState while component is unmounted but this timer is called
            if (_mounted === false) {
                return;
            }
            state.percentNumber = props.percent
        });
        animation.start();
    })

    onUnmounted(()=>{

        animation && animation.destroy();
        _mounted = false;
    })

    function renderCircleProgress(): VNode {
        const {
            strokeLinecap,
            style,
            className,
            strokeWidth,
            format,
            size,
            stroke,
            strokeGradient,
            showInfo,
            percent,
            orbitStroke,
            id,
          ...rest
        } = props;
        const ariaLabel = props['aria-label'];
        const ariaLabelledBy = props['aria-labelledby'];
        const ariaValueText = props['aria-valuetext'];
        const { percentNumber } = state;
        const classNames = {
            wrapper: cls(`${prefixCls}-circle`, className),
            svg: cls(`${prefixCls}-circle-ring`),
            circle: cls(`${prefixCls}-circle-ring-inner`),
        };
        const perc = calcPercent(percent);
        const percNumber = calcPercent(percentNumber);

        let width;
        if (props.width) {
            width = props.width;
        } else {
            size === strings.DEFAULT_SIZE ? (width = 72) : (width = 24);
        }

        // parse stroke & generate gradients
        const _stroke = selectStroke(stroke, percent, strokeGradient);

        // cx, cy is circle center
        const cy = width / 2;
        const cx = width / 2;
        const radius = (width - strokeWidth) / 2; // radius
        const circumference = radius * 2 * Math.PI;
        const strokeDashoffset = (1 - perc / 100) * circumference; // Offset
        const strokeDasharray = `${circumference} ${circumference}`;

        const text = format(percNumber);

        return (
          <div
            id={id}
            class={classNames.wrapper}
            style={style}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percNumber}
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabel}
            aria-valuetext={ariaValueText}
            {...getDataAttr({...rest, ...attr})}
          >
              <svg key={size} class={classNames.svg} height={width} width={width} aria-hidden>
                  <circle
                    stroke-dashoffset={0}
                    stroke-width={strokeWidth}
                    stroke-dasharray={strokeDasharray}
                    stroke-linecap={strokeLinecap}
                    fill="transparent"
                    stroke={orbitStroke}
                    r={radius}
                    cx={cx}
                    cy={cy}
                    aria-hidden
                  />
                  <circle
                    class={classNames.circle}
                    stroke-dashoffset={strokeDashoffset}
                    stroke-width={strokeWidth}
                    stroke-dasharray={strokeDasharray}
                    stroke-linecap={strokeLinecap}
                    fill="transparent"
                    stroke={_stroke}
                    r={radius}
                    cx={cx}
                    cy={cy}
                    aria-hidden
                  />
              </svg>
              {showInfo && size !== 'small' ? <span class={`${prefixCls}-circle-text`}>{text}</span> : null}
          </div>
        );
    }

    function calcPercent(percent: number): number {
        let perc;
        if (percent > 100) {
            perc = 100;
        } else if (percent < 0) {
            perc = 0;
        } else {
            perc = percent;
        }
        return perc;
    }

    function selectStroke(stroke: string | StrokeArr, percent: number, strokeGradient): string {
        if (typeof stroke === 'string') {
            return stroke;
        }
        const color = generateColor(stroke, percent, strokeGradient);
        if (typeof color !== 'undefined') {
            return color;
        }
        return strings.STROKE_DEFAULT;
    }

    function renderLineProgress(): VNode {
        const {
            className,
            style,
            stroke,
            strokeGradient,
            direction,
            format,
            showInfo,
            size,
            percent,
            orbitStroke,
            id,
          ...rest
        } = props;
        const ariaLabel = props['aria-label'];
        const ariaLabelledBy = props['aria-labelledby'];
        const ariaValueText = props['aria-valuetext'];
        const { percentNumber } = state;
        const progressWrapperCls = cls(prefixCls, className, {
            [`${prefixCls}-horizontal`]: direction === strings.DEFAULT_DIRECTION,
            [`${prefixCls}-vertical`]: direction !== strings.DEFAULT_DIRECTION,
            [`${prefixCls}-large`]: size === 'large',
        });
        const progressTrackCls = cls({
            [`${prefixCls}-track`]: true,
        });
        const innerCls = cls(`${prefixCls}-track-inner`);

        const perc = calcPercent(percent);
        const percNumber = calcPercent(percentNumber);

        // parse stroke & generate gradients
        const _stroke = selectStroke(stroke, percent, strokeGradient);

        const innerStyle: Record<string, any> = {
            background: _stroke,
        };
        if (direction === strings.DEFAULT_DIRECTION) {
            innerStyle.width = `${perc}%`;
        } else {
            innerStyle.height = `${perc}%`;
        }

        const text = format(percNumber);

        return (
          <div
            id={id}
            class={progressWrapperCls}
            style={style}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={perc}
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabel}
            aria-valuetext={ariaValueText}
            {...getDataAttr({...rest, ...attr})}
          >
              <div
                class={progressTrackCls}
                style={orbitStroke ? { backgroundColor: orbitStroke } : {}}
                aria-hidden
              >
                  <div class={innerCls} style={innerStyle} aria-hidden />
              </div>
              {showInfo ? <div class={`${prefixCls}-line-text`}>{text}</div> : null}
          </div>
        );
    }

    return () => {
        const { type } = props;
        if (type === 'line') {
            return renderLineProgress();
        } else {
            return renderCircleProgress();
        }
    }
}, {
    props: vuePropsType,
    name: 'Progress'
})


export default Progress
