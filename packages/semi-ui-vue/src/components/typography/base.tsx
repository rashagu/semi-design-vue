import {
  cloneVNode,
  type ComponentObjectPropsOptions,
  type CSSProperties,
  defineComponent,
  Fragment,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  type PropType,
  reactive,
  ref,
  useSlots,
  type VNode,
  watch,
} from 'vue';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/typography/constants';
import Typography from './typography';
import Copyable from './copyable';
import { IconSize as Size } from '../icons';
import { isFunction, isNull, isString, isUndefined, merge, omit } from 'lodash';
import Tooltip from '../tooltip';
import Popover from '../popover';
import getRenderText from './util';
import warning from '@douyinfe/semi-foundation/utils/warning';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import LocaleConsumer from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
import type { Ellipsis, EllipsisPos, ShowTooltip, TypographyBaseSize, TypographyBaseType } from './interface';
import type { CopyableConfig, LinkType } from './title';
import type { BaseProps } from '../_base/baseComponent';
import { isSemiIcon, runAfterTicks } from '../_utils';
import ResizeObserver, { ObserverProperty, ResizeEntry } from '../resizeObserver';
import SizeContext from './context';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { useTypographyBaseSizeContext } from './context/Consumer';
import { CombineProps } from '../interface';

export interface BaseTypographyProps extends BaseProps {
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  icon?: VNode;
  /**
   * ellipsis 用于设置截断相关参数.
   * Ellipsis is used to set ellipsis related parameters.
   * ellipsis 仅支持纯文本的截断，不支持 reactNode 等复杂类型，请确保 children 传入内容类型为 string.
   * Ellipsis only supports ellipsis of plain text, and does not support complex types such as reactNode.
   * Please ensure that the content type of children is string.
   * Semi 截断有两种策略， CSS 截断和 JS 截断。
   * Semi ellipsis has two strategies, CSS ellipsis and JS ellipsis.
   *  - 当设置中间截断（pos='middle')、可展开（expandable)、有后缀（suffix 非空）、可复制（copyable），启用 JS 截断策略
   *  - When setting middle ellipsis (pos='middle')、expandable、suffix is not empty string、copyable,
   * the JS ellipsis strategy is enabled
   *  - 非以上场景，启用 CSS 截断策略
   *  - Otherwise, enable the CSS ellipsis strategy
   *
   * 通常来说 CSS 截断的性能优于 JS 截断。在 children 不变， 容器尺寸不变的情况下，CSS 截断只涉及 1-2 次计算，js 截断基于二分法，可能涉及多次计算。
   * In general CSS ellipsis performs better than JS ellipsis. when the children and container size remain unchanged,
   * CSS ellipsis only involves 1-2 calculations, while JS ellipsis is based on dichotomy and may require multiple calculations.
   * 同时使用大量带有截断功能的 Typography 需注意性能消耗，如在 Table 中，可通过设置合理的页容量进行分页减少性能损耗
   * Pay attention to performance consumption when using a large number of Typography with ellipsis. For example, in Table,
   * you can reduce performance loss by setting a reasonable pageSize for paging
   */
  ellipsis?: Ellipsis | boolean;
  mark?: boolean;
  underline?: boolean;
  link?: LinkType;
  strong?: boolean;
  type?: TypographyBaseType;
  size?: TypographyBaseSize;
  style?: CSSProperties;
  className?: string;
  code?: boolean;
  children?: any;
  component?: any;
  spacing?: string;
  heading?: string;
  weight?: string | number;

  component_?: any;

  class?: string;
  id?: string;
  'x-semi-prop'?: string;
}

interface BaseTypographyState {
  editable: boolean;
  copied: boolean;
  isOverflowed: boolean;
  ellipsisContent: string | VNode;
  expanded: boolean;
  isTruncated: boolean;
  prevChildren: VNode | VNode[];
}

const prefixCls = cssClasses.PREFIX;
const ELLIPSIS_STR = '...';

const propTypes: CombineProps<BaseTypographyProps> = {
  copyable: PropTypes.oneOfType([PropTypes.object(), PropTypes.bool]),
  delete: PropTypes.bool,
  disabled: PropTypes.bool,
  // editable: PropTypes.bool,
  ellipsis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mark: PropTypes.bool,
  underline: PropTypes.bool,
  link: [PropTypes.object, PropTypes.bool, PropTypes.string],
  spacing: PropTypes.string,
  strong: PropTypes.bool,
  size: PropTypes.string as PropType<BaseTypographyProps['size']>,
  type: PropTypes.string as PropType<BaseTypographyProps['type']>,
  style: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  heading: PropTypes.string,
  component: PropTypes.string,
  weight: [PropTypes.string, PropTypes.number],

  children: [Object, Array, Function, String],
  class: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  'x-semi-prop': {
    type: String,
    default: '',
  },
  code: Boolean,
  component_: [String, Array, Boolean, Object, Number],
};
const defaultProps = {
  copyable: false,
  delete: false,
  disabled: false,
  // editable: false,
  ellipsis: false,
  icon: '',
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  spacing: 'normal',
  size: 'normal',
  style: {},
  className: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);

const wrapperDecorations = (props: BaseTypographyProps, content: VNode) => {
  const { mark, code, underline, strong, link, disabled } = props;
  let wrapped = content;
  const wrap = (isNeeded: boolean | LinkType, tag: string) => {
    let wrapProps = {};
    if (!isNeeded) {
      return;
    }
    if (typeof isNeeded === 'object') {
      wrapProps = { ...isNeeded };
    }
    wrapped = h(tag, wrapProps, wrapped);
  };
  wrap(mark, 'mark');
  wrap(code, 'code');
  wrap(underline && !link, 'u');
  wrap(strong, 'strong');
  wrap(props.delete, 'del');
  wrap(link, disabled ? 'span' : 'a');
  return wrapped;
};
const Base = defineComponent({
  props: { ...vuePropsType },
  name: 'Base',
  setup(props, {}) {
    const slots = useSlots();

    const { context } = useTypographyBaseSizeContext();
    const wrapperRef = ref<any>(null);
    const expandRef = ref<any>(null);
    const copyRef = ref<any>(null);

    let rafId: ReturnType<typeof requestAnimationFrame>;
    let expandStr: string;
    let collapseStr: string;
    let observerTakingEffect: boolean = false;

    const state = reactive<BaseTypographyState>({
      editable: false,
      copied: false,
      // ellipsis
      // if text is overflow in container
      isOverflowed: false,
      ellipsisContent: props.children,
      expanded: false,
      // if text is truncated with js
      isTruncated: false,
      prevChildren: null,
    });

    onMounted(() => {
      if (props.ellipsis) {
        // runAfterTicks: make sure start observer on the next tick
        onResize().then(() => runAfterTicks(() => (observerTakingEffect = true), 1));
      }
    });

    // ok
    function getDerivedStateFromProps(props: BaseTypographyProps, prevState: BaseTypographyState) {
      const { prevChildren } = prevState;
      const newState: Partial<BaseTypographyState> = {};
      const children = props.children;
      newState.prevChildren = children;

      if (props.ellipsis && prevChildren !== children) {
        // reset ellipsis state if children update
        newState.isOverflowed = false;
        newState.ellipsisContent = props.children;
        newState.expanded = false;
        newState.isTruncated = false;
      }
      return newState;
    }
    watch(
      () => props.ellipsis,
      (val) => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state });
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      }
    );

    watch(
      () => props.children,
      () => {
        if (props.ellipsis) {
          onResize();
        }
      }
    );
    // watchEffect(()=>{
    //   // Render was based on outdated refs and needs to be rerun
    //   if (props.children !== prevProps.children) {
    //     forceUpdate();
    //     if (props.ellipsis) {
    //       getEllipsisState();
    //     }
    //   }
    // })

    onUnmounted(() => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    });
    const onResize = async (entries?: ResizeEntry[]) => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      return new Promise<void>((resolve) => {
        rafId = window.requestAnimationFrame(async () => {
          await getEllipsisState();
          resolve();
        });
      });
    };

    function canUseCSSEllipsis() {
      const { copyable } = props;
      const { expandable, expandText, pos, suffix } = getEllipsisOpt();
      return !expandable && isUndefined(expandText) && !copyable && pos === 'end' && !suffix.length;
    }

    /**
     * whether truncated
     *  rows < = 1 if there is overflow content, return true
     *  rows > 1 if there is overflow height, return true
     * @param {Number} rows
     * @returns {Boolean}
     */
    const shouldTruncated = (rows: number) => {
      if (!rows || rows < 1) {
        return false;
      }
      const updateOverflow =
        rows <= 1 ? compareSingleRow() : wrapperRef.value.scrollHeight > wrapperRef.value.offsetHeight;
      return updateOverflow;
    };

    /**
     * 通过将 content 给到 Range 对象，借助 Range 的 getBoundingClientRect 拿到 content 的准确 width
     * 不受 css ellipsis 与否的影响
     * By giving the content to the Range object, get the exact width of the content with the help of Range's getBoundingClientRect
     * Not affected by css ellipsis or not
     * https://github.com/DouyinFE/semi-design/issues/1731
     */
    function compareSingleRow() {
      if (!(document && document.createRange)) {
        return false;
      }
      const containerNode = wrapperRef.value;
      const containerWidth = containerNode?.getBoundingClientRect().width;
      const childNodes = Array.from(containerNode?.childNodes || []) as Node[];
      const range = document.createRange();
      const contentWidth = childNodes.reduce((acc: number, node: Node) => {
        range.selectNodeContents(node as Node);
        return acc + (range.getBoundingClientRect().width ?? 0);
      }, 0);
      range.detach();
      return contentWidth > containerWidth;
    }

    const showTooltip = () => {
      const { isOverflowed, isTruncated, expanded } = state;
      const { showTooltip, expandable, expandText } = getEllipsisOpt();
      const canUseCSSEllipsis_ = canUseCSSEllipsis();
      // If the css is truncated, use isOverflowed to judge. If the css is truncated, use isTruncated to judge.
      const overflowed = !expanded && (canUseCSSEllipsis_ ? isOverflowed : isTruncated);
      const noExpandText = !expandable && isUndefined(expandText);
      const show = noExpandText && overflowed && showTooltip;
      if (!show) {
        return show;
      }
      const defaultOpts = {
        type: 'tooltip',
      };
      if (typeof showTooltip === 'object') {
        if (showTooltip.type && showTooltip.type.toLowerCase() === 'popover') {
          return merge(
            {
              opts: {
                // style: {width: '240px'},
                showArrow: true,
              },
            },
            showTooltip,
            {
              opts: {
                className: cls({
                  [`${prefixCls}-ellipsis-popover`]: true,
                  [showTooltip?.opts?.className]: Boolean(showTooltip?.opts?.className),
                }),
              },
            }
          );
        }
        return { ...defaultOpts, ...showTooltip };
      }
      return defaultOpts;
    };

    const onHover = () => {
      const canUseCSSEllipsis_ = canUseCSSEllipsis();
      if (canUseCSSEllipsis_) {
        const { rows, suffix, pos } = getEllipsisOpt();
        const updateOverflow = shouldTruncated(rows);
        // isOverflowed needs to be updated to show tooltip when using css ellipsis
        state.isOverflowed = updateOverflow;
        state.isTruncated = false;

        return undefined;
      }
    };
    function getEllipsisState() {
      const { rows, suffix, pos } = getEllipsisOpt();
      const { strong } = props;
      const children = props.children[0].children;
      // wait until element mounted
      if (!wrapperRef || !wrapperRef.value) {
        onResize();
        return false;
      }

      const { expanded } = state;
      const canUseCSSEllipsis_ = canUseCSSEllipsis();
      if (canUseCSSEllipsis_) {
        // const updateOverflow = this.shouldTruncated(rows);
        // // isOverflowed needs to be updated to show tooltip when using css ellipsis
        // this.setState({
        //     isOverflowed: updateOverflow,
        //     isTruncated: false
        // });

        return;
      }

      // If children is null, css/js truncated flag isTruncate is false
      if (isNull(children)) {
        return new Promise<void>((resolve) => {
          state.isOverflowed = false;
          state.isTruncated = false;
          nextTick(() => {
            resolve();
          });
        });
      }

      // Currently only text truncation is supported, if there is non-text,
      // both css truncation and js truncation should throw a warning
      warning(
        'children' in props && typeof children !== 'string',
        '[Semi Typography] Only children with pure text could be used with ellipsis at this moment.'
      );

      if (!rows || rows < 0 || expanded) {
        return;
      }

      const extraNode = { expand: expandRef.value, copy: copyRef && copyRef.value };

      // Perform type conversion on children to prevent component crash due to non-string type of children
      // https://github.com/DouyinFE/semi-design/issues/2167
      const realChildren = Array.isArray(children) ? children.join('') : String(children);

      const content = getRenderText(
        wrapperRef.value,
        rows,
        // Perform type conversion on children to prevent component crash due to non-string type of children
        realChildren,
        extraNode,
        ELLIPSIS_STR,
        suffix,
        pos,
        strong
      );

      return new Promise<void>((resolve) => {
        state.isOverflowed = false;
        state.ellipsisContent = content as unknown as VNode;
        state.isTruncated = realChildren !== content;
        nextTick(() => {
          resolve();
        });
      });
    }

    /**
     * Triggered when the fold button is clicked to save the latest expanded state
     * @param {Event} e
     */
    const toggleOverflow = (e: any) => {
      const { onExpand, expandable, collapsible } = getEllipsisOpt();
      const { expanded } = state;
      onExpand && onExpand(!expanded, e);
      if ((expandable && !expanded) || (collapsible && expanded)) {
        state.expanded = !expanded;
      }
    };

    const getEllipsisOpt = (): Ellipsis => {
      const { ellipsis } = props;
      if (!ellipsis) {
        return {};
      }
      const opt = {
        rows: 1,
        expandable: false,
        pos: 'end' as EllipsisPos,
        suffix: '',
        showTooltip: false,
        collapsible: false,
        expandText: (ellipsis as Ellipsis).expandable ? expandStr : undefined,
        collapseText: (ellipsis as Ellipsis).collapsible ? collapseStr : undefined,
        ...(typeof ellipsis === 'object' ? ellipsis : null),
      };
      return opt;
    };

    const renderExpandable = () => {
      const { expanded, isTruncated } = state;
      if (!isTruncated) return null;

      const { expandText, expandable, collapseText, collapsible } = getEllipsisOpt();
      const noExpandText = !expandable && isUndefined(expandText);
      const noCollapseText = !collapsible && isUndefined(collapseText);
      let text;

      if (!expanded && !noExpandText) {
        text = expandText;
      } else if (expanded && !noCollapseText) {
        // if expanded is true but the text is initally mounted, we dont show collapseText
        text = collapseText;
      }
      if (!noExpandText || !noCollapseText) {
        return (
          // TODO: replace `a` tag with `span` in next major version
          // NOTE: may have effect on style
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            role="button"
            tabindex={0}
            class={`${prefixCls}-ellipsis-expand`}
            key="expand"
            ref={expandRef}
            aria-label={text}
            onClick={toggleOverflow}
            onKeypress={(e) => isEnterPress(e) && toggleOverflow(e as any)}
          >
            {text}
          </a>
        );
      }
      return null;
    };

    /**
     * 获取文本的缩略class和style
     *
     * 截断类型：
     *  - CSS 截断，仅在 rows=1 且没有 expandable、pos、suffix 时生效
     *  - JS 截断，应对 CSS 无法阶段的场景
     * 相关变量
     *  props:
     *      - ellipsis:
     *          - rows
     *          - expandable
     *          - pos
     *          - suffix
     *  state:
     *      - isOverflowed，文本是否处于overflow状态
     *      - expanded，文本是否处于折叠状态
     *      - isTruncated，文本是否被js截断
     *
     * Get the abbreviated class and style of the text
     *
     * Truncation type:
     *  -CSS truncation, which only takes effect when rows = 1 and there is no expandable, pos, suffix
     *  -JS truncation, dealing with scenarios where CSS cannot stage
     * related variables
     *  props:
     *      -ellipsis:
     *          -rows
     *          -expandable
     *          -pos
     *          -suffix
     *  state:
     *      -isOverflowed, whether the text is in an overflow state
     *      -expanded, whether the text is in a collapsed state
     *      -isTruncated, whether the text is truncated by js
     * @returns {Object}
     */
    const getEllipsisStyle = () => {
      const { ellipsis, component_ } = props;
      if (!ellipsis) {
        return {
          ellipsisCls: '',
          ellipsisStyle: {},
          // ellipsisAttr: {}
        };
      }
      const { rows } = getEllipsisOpt();
      const { expanded, isTruncated } = state;
      const useCSS = !expanded && canUseCSSEllipsis();
      const ellipsisCls = cls({
        [`${prefixCls}-ellipsis`]: true,
        [`${prefixCls}-ellipsis-single-line`]: rows === 1,
        [`${prefixCls}-ellipsis-multiple-line`]: rows > 1,
        // component === 'span', Text component, It should be externally displayed inline
        [`${prefixCls}-ellipsis-multiple-line-text`]: rows > 1 && component_ === 'span',
        [`${prefixCls}-ellipsis-overflow-ellipsis`]: rows === 1 && useCSS,
        // component === 'span', Text component, It should be externally displayed inline
        [`${prefixCls}-ellipsis-overflow-ellipsis-text`]: rows === 1 && useCSS && component_ === 'span',
      });
      const ellipsisStyle = useCSS && rows > 1 ? { WebkitLineClamp: rows } : {};
      return {
        ellipsisCls,
        ellipsisStyle,
      };
    };

    const renderEllipsisText = (opt: Ellipsis) => {
      const { suffix } = opt;
      const children = props.children;

      const { isTruncated, expanded, isOverflowed, ellipsisContent } = state;
      // console.debug(suffix)
      if (expanded || !isTruncated) {
        return (
          <span onMouseenter={onHover}>
            {children}
            {suffix && suffix.length ? suffix : null}
          </span>
        );
      }
      return (
        <span onMouseenter={onHover}>
          {ellipsisContent}
          {/* {ELLIPSIS_STR} */}
          {suffix}
        </span>
      );
    };

    function renderOperations() {
      return (
        <Fragment>
          {renderExpandable()}
          {renderCopy()}
        </Fragment>
      );
    }

    function renderCopy() {
      const { copyable } = props;
      const children = props.children;
      // console.log(children)
      if (!copyable) {
        return null;
      }
      // If it is configured in the content of copyable, the copied content will be the content in copyable
      const willCopyContent = (copyable as CopyableConfig)?.content ?? children;
      let copyContent: string;
      let hasObject = false;
      if (Array.isArray(willCopyContent)) {
        copyContent = '';
        willCopyContent.forEach((value) => {
          // console.debug(value.children)
          if (typeof value.children === 'object' && value.type.toString() !== 'Symbol(v-txt)') {
            hasObject = true;
          }
          // // console.debug(value.children)
          copyContent += String(value.children);
        });
      } else if (typeof willCopyContent !== 'object') {
        copyContent = String(willCopyContent);
      } else {
        hasObject = true;
        copyContent = String(willCopyContent);
      }

      warning(
        hasObject,
        'Content to be copied in Typography is a object, it will case a [object Object] mistake when copy to clipboard.'
      );
      const copyConfig = {
        content: copyContent,
        duration: 3,
        ...(typeof copyable === 'object' ? copyable : null),
      };
      return <Copyable {...copyConfig} forwardRef={copyRef} />;
    }

    function renderIcon() {
      const { icon, size } = props;
      const realSize = size === 'inherit' ? context.value : size;
      if (!icon) {
        return null;
      }
      const iconSize: Size = realSize === 'small' ? 'small' : 'default';
      return (
        <span class={`${prefixCls}-icon`} x-semi-prop="icon">
          {isSemiIcon(icon) ? cloneVNode(icon as any, { size: iconSize }) : icon}
        </span>
      );
    }

    function renderContent() {
      // console.log(props)
      const {
        component_,
        component,
        className,
        type,
        spacing,
        disabled,
        style,
        ellipsis,
        icon,
        size,
        link,
        heading,
        weight,
        ...rest
      } = props;
      const children = props.children;
      const textProps = omit(rest, [
        'strong',
        'editable',
        'mark',
        'copyable',
        'underline',
        'code',
        // 'link',
        'delete',
        'children',
      ]);
      const realSize = size === 'inherit' ? context.value : size;
      const iconNode = renderIcon();
      const ellipsisOpt = getEllipsisOpt();
      // console.debug(ellipsisOpt)
      const { ellipsisCls, ellipsisStyle } = getEllipsisStyle();
      let textNode_ = ellipsis ? renderEllipsisText(ellipsisOpt) : children;
      const linkCls = cls({
        [`${prefixCls}-link-text`]: link,
        [`${prefixCls}-link-underline`]: props.underline && link,
      });
      let textNode = wrapperDecorations(
        props,
        <>
          {iconNode}
          {props.link ? <span class={linkCls}>{textNode_}</span> : textNode_}
        </>
      );
      const hTagReg = /^h[1-6]$/;
      const isHeader = isString(heading) && hTagReg.test(heading);
      const wrapperCls = cls(className, ellipsisCls, {
        // [`${prefixCls}-primary`]: !type || type === 'primary',
        [`${prefixCls}-${type}`]: type && !link,
        [`${prefixCls}-${realSize}`]: realSize,
        [`${prefixCls}-link`]: link,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-${spacing}`]: spacing,
        [`${prefixCls}-${heading}`]: isHeader,
        [`${prefixCls}-${heading}-weight-${weight}`]: isHeader && weight && isNaN(Number(weight)),
      });

      const textStyle: CSSProperties = {
        ...(isNaN(Number(weight)) ? {} : { fontWeight: weight }),
        ...style,
      };


      return (
        <Typography
          {...{
            className: wrapperCls,
            style: { ...textStyle, ...ellipsisStyle },
            component_,
            forwardRef: wrapperRef,
            ...textProps,
          }}
        >
          {{
            default: () => {
              return (
                <>
                  {textNode}
                  {renderOperations()}
                </>
              );
            },
          }}
        </Typography>
      );
    }

    function renderTipWrapper() {
      const children = props.children;
      const showTooltip_ = showTooltip();
      const content = renderContent();
      if (showTooltip_) {
        const { type, opts, renderTooltip } = showTooltip_ as ShowTooltip;
        if (isFunction(renderTooltip)) {
          return renderTooltip(children, content);
        } else if (type.toLowerCase() === 'popover') {
          return (
            <Popover content={children ? children[0] : null} position="top" {...opts}>
              {content}
            </Popover>
          );
        }
        return (
          <Tooltip content={children ? children[0] : null} position="top" {...opts}>
            {content}
          </Tooltip>
        );
      } else {
        return content;
      }
    }

    return () => {
      const { size } = props;
      const realSize = size === 'inherit' ? context.value : size;
      const content = (
        <SizeContext.Provider value={realSize}>
          <LocaleConsumer componentName="Typography">
            {{
              default: (locale: Locale['Typography']) => {
                expandStr = locale.expand;
                collapseStr = locale.collapse;
                // // console.debug(locale)
                return renderTipWrapper();
              },
            }}
          </LocaleConsumer>
        </SizeContext.Provider>
      );
      if (props.ellipsis) {
        return (
          <ResizeObserver
            onResize={(...args) => {
              if (observerTakingEffect) {
                onResize(...args);
              }
            }}
            observeParent
            observerProperty={ObserverProperty.Width}
          >
            {content}
          </ResizeObserver>
        );
      }
      return content;
    };
  },
});

export default Base;
