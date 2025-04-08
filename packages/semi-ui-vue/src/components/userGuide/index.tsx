import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  VNode,
  CSSProperties,
  PropType,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, numbers, strings } from '@douyinfe/semi-foundation/userGuide/constants';
import UserGuideFoundation, { UserGuideAdapter } from '@douyinfe/semi-foundation/userGuide/foundation';
import { Position } from '../tooltip/index';
import Popover from '../popover';
import Button, { ButtonProps } from '../button';
import Modal from '../modal';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import '@douyinfe/semi-foundation/userGuide/userGuide.scss';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
import { Locale } from '../locale/interface';
import LocaleConsumer from '../locale/localeConsumer';
import { getScrollbarWidth } from '../_utils';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';
import { omit } from 'lodash';

const prefixCls = cssClasses.PREFIX;

export interface UserGuideProps extends BaseProps {
  className?: string;
  current?: number;
  finishText?: string;
  mask?: boolean;
  mode?: 'popup' | 'modal';
  nextButtonProps?: ButtonProps & { children?: VNode | string | number };
  onChange?: (current: number) => void;
  onFinish?: () => void;
  onNext?: (current: number) => void;
  onPrev?: (current: number) => void;
  onSkip?: () => void;
  position?: Position;
  prevButtonProps?: ButtonProps & { children?: VNode | string | number };
  showPrevButton?: boolean;
  showSkipButton?: boolean;
  spotlightPadding?: number;
  steps: StepItem[];
  style?: CSSProperties;
  theme?: 'default' | 'primary';
  visible?: boolean;
  getPopupContainer?: () => HTMLElement;
  zIndex?: number;
}

export interface StepItem {
  className?: string;
  cover?: VNode;
  target?: (() => Element) | Element;
  title?: string | VNode;
  description?: VNode;
  mask?: boolean;
  showArrow?: boolean;
  spotlightPadding?: number;
  theme?: 'default' | 'primary';
  position?: Position;
}

export interface UserGuideState {
  current: number;
  spotlightRect: DOMRect | null;
}

export const propTypes: CombineProps<UserGuideProps> = {
  mask: PropTypes.bool,
  mode: PropTypes.string as PropType<UserGuideProps['mode']>,
  onChange: PropTypes.func as PropType<UserGuideProps['onChange']>,
  onFinish: PropTypes.func as PropType<UserGuideProps['onFinish']>,
  onNext: PropTypes.func as PropType<UserGuideProps['onNext']>,
  onPrev: PropTypes.func as PropType<UserGuideProps['onPrev']>,
  onSkip: PropTypes.func as PropType<UserGuideProps['onSkip']>,
  position: PropTypes.string as PropType<UserGuideProps['position']>,
  showPrevButton: PropTypes.bool,
  showSkipButton: PropTypes.bool,
  theme: PropTypes.string as PropType<UserGuideProps['theme']>,
  visible: PropTypes.bool,
  getPopupContainer: PropTypes.func as PropType<UserGuideProps['getPopupContainer']>,
  zIndex: PropTypes.number,
  className: PropTypes.string,
  current: PropTypes.number,
  finishText: PropTypes.string,
  nextButtonProps: PropTypes.object as PropType<UserGuideProps['nextButtonProps']>,
  prevButtonProps: PropTypes.object as PropType<UserGuideProps['prevButtonProps']>,
  spotlightPadding: PropTypes.number,
  steps: {
    type: PropTypes.array as PropType<UserGuideProps['steps']>,
    required: true,
  },
  style: PropTypes.object as PropType<UserGuideProps['style']>,
};
const defaultProps: UserGuideProps = {
  mask: true,
  mode: 'popup',
  nextButtonProps: {},
  onChange: noop,
  onFinish: noop,
  onNext: noop,
  onPrev: noop,
  onSkip: noop,
  position: 'bottom',
  prevButtonProps: {},
  showPrevButton: true,
  showSkipButton: true,
  steps: [],
  theme: 'default',
  visible: false,
  zIndex: numbers.DEFAULT_Z_INDEX,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const UserGuide = defineComponent({
  props: { ...vuePropsType },
  name: 'UserGuide',
  setup(props, { attrs }) {
    const slots = useSlots();
    let bodyOverflow: string;
    let scrollBarWidth: number = 0;
    let originBodyWidth: string;
    let userGuideId: string = '';

    const state = reactive<UserGuideState>({
      current: props.current || numbers.DEFAULT_CURRENT,
      spotlightRect: null,
    });
    const { adapter: adapterInject, context } = useBaseComponent(props, state);
    function adapter_(): UserGuideAdapter<UserGuideProps, UserGuideState> {
      return {
        ...adapterInject(),
        disabledBodyScroll: () => {
          const { getPopupContainer } = props;
          bodyOverflow = document.body.style.overflow || '';
          if (!getPopupContainer && bodyOverflow !== 'hidden') {
            document.body.style.overflow = 'hidden';
            document.body.style.width = `calc(${originBodyWidth || '100%'} - ${scrollBarWidth}px)`;
          }
        },
        enabledBodyScroll: () => {
          const { getPopupContainer } = props;
          if (!getPopupContainer && bodyOverflow !== 'hidden') {
            document.body.style.overflow = bodyOverflow;
            document.body.style.width = originBodyWidth;
          }
        },
        notifyChange: (current: number) => {
          props.onChange(current);
        },
        notifyFinish: () => {
          props.onFinish();
        },
        notifyNext: (current: number) => {
          props.onNext(current);
        },
        notifyPrev: (current: number) => {
          props.onPrev(current);
        },
        notifySkip: () => {
          props.onSkip();
        },
        setCurrent: (current: number) => {
          state.current = current;
        },
      };
    }

    const adapter = adapter_();
    const foundation = new UserGuideFoundation(adapter);

    function getDerivedStateFromProps(props: UserGuideProps, state: UserGuideState): Partial<UserGuideState> {
      const states: Partial<UserGuideState> = {};
      if (!isNullOrUndefined(props.current) && props.current !== state.current) {
        states.current = props.current;
      }
      return states;
    }

    watch(
      [() => props.current, () => state.current],
      (val) => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state });
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      foundation.init();
      scrollBarWidth = getScrollbarWidth();
      userGuideId = getUuidShort();
    });

    watch(
      [() => props.steps, () => props.mode, () => props.visible, () => state.current],
      (value, [prevPropsSteps, prevPropsMode, prevPropsVisible, prevStatesCurrent], onCleanup) => {
        const { steps, mode, visible } = props;
        const { current } = state;

        if (visible !== prevPropsVisible) {
          if (visible) {
            foundation.beforeShow();
            state.current = 0;
          } else {
            foundation.afterHide();
          }
        }

        if ((mode === 'popup' && prevStatesCurrent !== current && steps[current]) || prevPropsVisible !== visible) {
          updateSpotlightRect();
        }
      }
    );

    onUnmounted(() => {
      foundation.destroy();
    });

    function scrollTargetIntoViewIfNeeded(target: Element) {
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (!isInViewport) {
        target.scrollIntoView({
          behavior: 'auto',
          block: 'center',
        });
      }
    }

    async function updateSpotlightRect() {
      const { steps, spotlightPadding } = props;
      const { current } = state;
      const step = steps[current];

      if (step.target) {
        const target = typeof step.target === 'function' ? step.target() : step.target;
        // Checks if the target element is within the viewport, and scrolls it into view if not
        scrollTargetIntoViewIfNeeded(target);

        const rect = target?.getBoundingClientRect();
        const padding = step?.spotlightPadding || spotlightPadding || numbers.DEFAULT_SPOTLIGHT_PADDING;

        const newRects = new DOMRect(
          rect.x - padding,
          rect.y - padding,
          rect.width + padding * 2,
          rect.height + padding * 2
        );

        requestAnimationFrame(() => {
          state.spotlightRect = newRects;
        });
      }
    }

    function renderPopupContent(step: StepItem, index: number) {
      const { showPrevButton, showSkipButton, theme, steps, finishText, nextButtonProps, prevButtonProps } = props;
      const { current } = state;

      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      const popupPrefixCls = `${prefixCls}-popup-content`;
      const isPrimaryTheme = theme === 'primary' || step?.theme === 'primary';
      const { cover, title, description } = step;

      return (
        <LocaleConsumer componentName="UserGuide">
          {(locale: Locale['UserGuide'], localeCode: Locale['code']) => (
            <div
              class={cls(`${popupPrefixCls}`, {
                [`${popupPrefixCls}-primary`]: isPrimaryTheme,
              })}
            >
              {cover && <div class={`${popupPrefixCls}-cover`}>{cover}</div>}
              <div class={`${popupPrefixCls}-body`}>
                {title && <div class={`${popupPrefixCls}-title`}>{title}</div>}
                {description && <div class={`${popupPrefixCls}-description`}>{description}</div>}
                <div class={`${popupPrefixCls}-footer`}>
                  {steps.length > 1 && (
                    <div class={`${popupPrefixCls}-indicator`}>
                      {current + 1}/{steps.length}
                    </div>
                  )}
                  <div class={`${popupPrefixCls}-buttons`}>
                    {showSkipButton && !isLast && (
                      <Button
                        style={isPrimaryTheme ? { backgroundColor: 'var(--semi-color-fill-2)' } : {}}
                        theme={isPrimaryTheme ? 'solid' : 'light'}
                        type={isPrimaryTheme ? 'primary' : 'tertiary'}
                        onClick={foundation.handleSkip}
                      >
                        {locale.skip}
                      </Button>
                    )}
                    {showPrevButton && !isFirst && (
                      <Button
                        style={isPrimaryTheme ? { backgroundColor: 'var(--semi-color-fill-2)' } : {}}
                        theme={isPrimaryTheme ? 'solid' : 'light'}
                        type={isPrimaryTheme ? 'primary' : 'tertiary'}
                        onClick={foundation.handlePrev}
                        {...omit(prevButtonProps, 'children')}
                      >
                        {prevButtonProps?.children || locale.prev}
                      </Button>
                    )}
                    <Button
                      style={isPrimaryTheme ? { backgroundColor: '#FFF' } : {}}
                      theme={isPrimaryTheme ? 'borderless' : 'solid'}
                      type={'primary'}
                      onClick={foundation.handleNext}
                      {...omit(nextButtonProps, 'children')}
                    >
                      {isLast ? finishText || locale.finish : nextButtonProps?.children || locale.next}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </LocaleConsumer>
      );
    }

    const renderStep = (step: StepItem, index: number) => {
      const { theme, position, visible, className, style, spotlightPadding } = props;
      const { current } = state;

      const isCurrentStep = current === index;
      if (!step.target) {
        return null;
      }

      const basePopoverStyle = { padding: 0 };

      const target = typeof step.target === 'function' ? step.target() : step.target;
      const rect = target.getBoundingClientRect();
      const padding = step?.spotlightPadding || spotlightPadding || numbers.DEFAULT_SPOTLIGHT_PADDING;
      const isPrimaryTheme = theme === 'primary' || step?.theme === 'primary';
      const primaryStyle = isPrimaryTheme ? { backgroundColor: 'var(--semi-color-primary)' } : {};

      return (
        <Popover
          key={`userGuide-popup-${index}`}
          className={cls(`${prefixCls}-popover`, className)}
          style={{ ...basePopoverStyle, ...primaryStyle, ...style }}
          content={renderPopupContent(step, index)}
          position={step.position || position}
          trigger="custom"
          visible={visible && isCurrentStep}
          showArrow={step.showArrow !== false}
        >
          <div
            style={{
              position: 'fixed',
              left: rect.x - padding,
              top: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
              pointerEvents: 'none',
            }}
          ></div>
        </Popover>
      );
    };

    function renderSpotlight() {
      const { steps, mask, zIndex } = props;
      const { spotlightRect, current } = state;
      const step = steps[current];

      if (!step.target) {
        return null;
      }

      if (!spotlightRect) {
        updateSpotlightRect();
      }

      return (
        <>
          {spotlightRect ? (
            <svg class={`${prefixCls}-spotlight`} style={{ zIndex }}>
              <defs>
                <mask id={`spotlight-${userGuideId}`}>
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    class={`${prefixCls}-spotlight-rect`}
                    x={spotlightRect.x}
                    y={spotlightRect.y}
                    width={spotlightRect.width}
                    height={spotlightRect.height}
                    rx={4}
                    fill="black"
                  />
                </mask>
              </defs>
              {mask && (
                <>
                  <rect
                    width="100%"
                    height="100%"
                    fill="var(--semi-color-overlay-bg)"
                    mask={`url(#spotlight-${userGuideId})`}
                  />
                  <rect
                    x={0}
                    y={0}
                    width="100%"
                    height={spotlightRect.y}
                    fill="transparent"
                    class={`${prefixCls}-spotlight-transparent-rect`}
                  />
                  <rect
                    x={0}
                    y={spotlightRect.y}
                    width={spotlightRect.x}
                    height={spotlightRect.height}
                    fill="transparent"
                    class={`${prefixCls}-spotlight-transparent-rect`}
                  />
                  <rect
                    x={spotlightRect.x + spotlightRect.width}
                    y={spotlightRect.y}
                    width={`calc(100% - ${spotlightRect.x + spotlightRect.width}px)`}
                    height={spotlightRect.height}
                    fill="transparent"
                    class={`${prefixCls}-spotlight-transparent-rect`}
                  />
                  <rect
                    y={spotlightRect.y + spotlightRect.height}
                    width="100%"
                    height={`calc(100% - ${spotlightRect.y + spotlightRect.height}px)`}
                    fill="transparent"
                    class={`${prefixCls}-spotlight-transparent-rect`}
                  />
                </>
              )}
            </svg>
          ) : null}
        </>
      );
    }

    const renderIndicator = () => {
      const { steps } = props;
      const { current } = state;
      const indicatorContent: VNode[] = [];
      for (let i = 0; i < steps.length; i++) {
        indicatorContent.push(
          <span
            key={i}
            data-index={i}
            class={cls([`${cssClasses.PREFIX_MODAL}-indicator-item`], {
              [`${cssClasses.PREFIX_MODAL}-indicator-item-active`]: i === current,
            })}
          ></span>
        );
      }
      return indicatorContent;
    };

    const renderModal = () => {
      const { visible, steps, showSkipButton, showPrevButton, finishText, nextButtonProps, prevButtonProps, mask } =
        props;
      const { current } = state;
      const step = steps[current];

      const isFirst = current === 0;
      const isLast = current === steps.length - 1;
      const { cover, title, description } = step;

      console.log(nextButtonProps);
      return (
        <LocaleConsumer componentName="UserGuide">
          {(locale: Locale['UserGuide'], localeCode: Locale['code']) => (
            <Modal
              className={cssClasses.PREFIX_MODAL}
              bodyStyle={{ padding: 0 }}
              header={null}
              visible={visible}
              maskClosable={false}
              mask={mask}
              centered
              footer={null}
            >
              {cover && (
                <>
                  <div class={`${cssClasses.PREFIX_MODAL}-cover`}>{cover}</div>
                  <div class={`${cssClasses.PREFIX_MODAL}-indicator`}>{renderIndicator()}</div>
                </>
              )}
              {(title || description) && (
                <div class={`${cssClasses.PREFIX_MODAL}-body`}>
                  {title && <div class={`${cssClasses.PREFIX_MODAL}-body-title`}>{title}</div>}
                  {description && <div class={`${cssClasses.PREFIX_MODAL}-body-description`}>{description}</div>}
                </div>
              )}
              <div class={`${cssClasses.PREFIX_MODAL}-footer`}>
                {showSkipButton && !isLast && (
                  <Button type="tertiary" onClick={foundation.handleSkip}>
                    {locale.skip}
                  </Button>
                )}
                {showPrevButton && !isFirst && (
                  <Button type="tertiary" onClick={foundation.handlePrev} {...omit(prevButtonProps, 'children')}>
                    {prevButtonProps?.children || locale.prev}
                  </Button>
                )}
                <Button theme="solid" onClick={foundation.handleNext} {...omit(nextButtonProps, 'children')}>
                  {isLast ? finishText || locale.finish : nextButtonProps?.children || locale.next}
                </Button>
              </div>
            </Modal>
          )}
        </LocaleConsumer>
      );
    };

    return () => {
      const { mode, steps, visible } = props;

      if (!visible || !steps.length) {
        return null;
      }

      return (
        <>
          {mode === 'popup' ? (
            <Fragment>
              {steps?.map((step, index) => renderStep(step, index))}
              {renderSpotlight()}
            </Fragment>
          ) : null}
          {mode === 'modal' && renderModal()}
        </>
      );
    };
  },
});

export default UserGuide;
