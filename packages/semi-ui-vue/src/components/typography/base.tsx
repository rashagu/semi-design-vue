import {
  defineComponent,
  ref,
  h,
  Fragment,
  VNode,
  CSSProperties,
  reactive,
  onMounted,
  watchEffect,
  onUnmounted, cloneVNode, watch, useSlots, ComponentObjectPropsOptions, PropType
} from 'vue'
import cls from 'classnames';
import {cssClasses, strings} from '@douyinfe/semi-foundation/typography/constants';
import Typography from './typography';
import Copyable from './copyable';
import {IconSize as Size} from '../icons';
import {isUndefined, omit, merge, isString, isNull} from 'lodash';
import Tooltip from '../tooltip';
import Popover from '../popover';
import getRenderText from './util';
import warning from '@douyinfe/semi-foundation/utils/warning';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import LocaleConsumer from '../locale/localeConsumer';
import {Locale} from '../locale/interface';
import {Ellipsis, EllipsisPos, ShowTooltip, TypographyBaseSize, TypographyBaseType} from './interface';
import {CopyableConfig, LinkType} from './title';
import {BaseProps} from '../_base/baseComponent';
import {isSemiIcon} from '../_utils/index';
import ResizeObserver from '../resizeObserver';


export interface BaseTypographyProps extends BaseProps {
  children: any,
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  icon?: VNode;
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
  component_?: any;
  spacing?: string;
  heading?: string;
  weight?: string | number

  class?: string
  id?: string
  'x-semi-prop'?: string
}

interface BaseTypographyState {
  editable: boolean;
  copied: boolean;
  isOverflowed: boolean;
  ellipsisContent: string;
  expanded: boolean;
  isTruncated: boolean;
  first: boolean;
  prevChildren: VNode | VNode[];
}

const prefixCls = cssClasses.PREFIX;
const ELLIPSIS_STR = '...';


export const vuePropsType:ComponentObjectPropsOptions<BaseTypographyProps> = {
  children: [Object, Array, Function],
  style: {
    type: [Object, String] as PropType<BaseTypographyProps['style']>,
    default: {}
  },
  className: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default:''
  },
  id: {
    type: String,
    default:''
  },
  'x-semi-prop': {
    type: String,
    default:''
  },
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
  icon: {
    type: [Object, String] as PropType<BaseTypographyProps['icon']>,
    default: ()=>null,
  },
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
  link: {
    type: [Boolean, Object],
    default: false,
  },
  strong: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<BaseTypographyProps['type']>,
    default: 'primary',
  },
  size: {
    type: String as PropType<BaseTypographyProps['size']>,
    default: 'normal',
  },
  code: Boolean,
  component_: [String, Array, Boolean, Object, Number],
  spacing: {
    type: String,
    default: 'normal',
  },
  heading: String,
}


const wrapperDecorations = (props: BaseTypographyProps, content: VNode) => {
  const {mark, code, underline, strong, link, disabled} = props;
  let wrapped = content;
  const wrap = (isNeeded: boolean | LinkType, tag: string) => {
    let wrapProps = {};
    if (!isNeeded) {
      return;
    }
    if (typeof isNeeded === 'object') {
      wrapProps = {...isNeeded};
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
const Base = defineComponent<BaseTypographyProps>((props, {}) => {
  const slots = useSlots()


  const wrapperRef = ref<any>(null)
  const expandRef = ref<any>(null)
  const copyRef = ref<any>(null)

  let rafId: ReturnType<typeof requestAnimationFrame>;
  let expandStr: string;
  let collapseStr: string;

  const state = reactive({
    editable: false,
    copied: false,
    // ellipsis
    // if text is overflow in container
    isOverflowed: true,
    ellipsisContent: null,
    expanded: false,
    // if text is truncated with js
    isTruncated: false,
    // record if has click expanded
    first: true,
    prevChildren: null,
  })

  onMounted(() => {
    if (props.ellipsis) {
      getEllipsisState();
      window.addEventListener('resize', onResize);
    }
  })

  // ok
  function getDerivedStateFromProps(props: BaseTypographyProps, prevState: BaseTypographyState) {
    const {prevChildren} = prevState;
    const newState: Partial<BaseTypographyState> = {};
    const children = props.children
    newState.prevChildren = children;

    if (props.ellipsis && prevChildren !== children) {
      // reset ellipsis state if children update
      newState.isOverflowed = true;
      newState.ellipsisContent = null;
      newState.expanded = false;
      newState.isTruncated = false;
      newState.first = true;
    }
    return newState;
  }
  watch(()=>props.ellipsis, (val)=>{
    const newState = getDerivedStateFromProps(props, state)
    newState && Object.keys(newState).forEach(key=>{
      state[key] = newState[key]
    })
  })


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
    if (props.ellipsis) {
      window.removeEventListener('resize', onResize);
    }
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  })
  const onResize = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    rafId = window.requestAnimationFrame(getEllipsisState.bind(this));
  };

  const canUseCSSEllipsis = () => {
    const {copyable} = props;
    const {expandable, expandText, pos, suffix} = getEllipsisOpt();
    return !expandable && isUndefined(expandText) && !copyable && pos === 'end' && !suffix.length;
  };

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
      rows <= 1 ?
        wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth :
        wrapperRef.current.scrollHeight > wrapperRef.current.offsetHeight;
    return updateOverflow;
  };

  const showTooltip = () => {
    const {isOverflowed, isTruncated, expanded} = state;
    const {showTooltip, expandable, expandText} = getEllipsisOpt();
    const overflowed = !expanded && (isOverflowed || isTruncated);
    const noExpandText = !expandable && isUndefined(expandText);
    const show = noExpandText && overflowed && showTooltip;
    if (!show) {
      return show;
    }
    const defaultOpts = {
      type: 'tooltip',
      opts: {},
    };
    if (typeof showTooltip === 'object') {
      if (showTooltip.type && showTooltip.type.toLowerCase() === 'popover') {
        return merge(
          {
            opts: {
              style: {width: '240px'},
              showArrow: true,
            },
          },
          showTooltip
        );
      }
      return {...defaultOpts, ...showTooltip};
    }
    return defaultOpts;
  };

  function getEllipsisState() {
    const {rows, suffix, pos} = getEllipsisOpt();
    const children = props.children
    // wait until element mounted
    if (!wrapperRef || !wrapperRef.current) {
      onResize();
      return false;
    }
    const {ellipsisContent, isOverflowed, isTruncated, expanded} = state;
    const updateOverflow = shouldTruncated(rows);
    const canUseCSSEllipsis_ = canUseCSSEllipsis();

    const needUpdate = updateOverflow !== isOverflowed;

    warning(
      'children' in props && typeof children !== 'string',
      "[Semi Typography] 'Only children with pure text could be used with ellipsis at this moment."
    );
    // If children is null, css/js truncated flag isTruncate is false
    if (isNull(children)) {
      state.isTruncated = false
      state.isOverflowed = false
      return undefined;
    }


    if (!rows || rows < 0 || expanded) {
      return undefined;
    }

    if (canUseCSSEllipsis_) {
      if (needUpdate) {
        state.expanded = !updateOverflow
      }
      return undefined;
    }

    const extraNode = [expandRef.current, copyRef && copyRef.current];
    const content: any = getRenderText(
      wrapperRef.value,
      rows,
      children as any,
      extraNode,
      ELLIPSIS_STR,
      suffix,
      pos
    );
    if (

      children === content) {
      state.expanded = true
    } else if (ellipsisContent !== content || isOverflowed !== updateOverflow) {
      state.ellipsisContent = content
      state.isOverflowed = updateOverflow
      state.isTruncated = children !== content
    }
    return undefined;
  }

  /**
   * Triggered when the fold button is clicked to save the latest expanded state
   * @param {Event} e
   */
  const toggleOverflow = (e: any) => {
    const {onExpand, expandable, collapsible} = getEllipsisOpt();
    const {expanded} = state;
    onExpand && onExpand(!expanded, e);
    if ((expandable && !expanded) || (collapsible && expanded)) {
      state.expanded = !expanded
      state.first = false
    }
  };

  const getEllipsisOpt = (): Ellipsis => {
    const {ellipsis} = props;
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
    const {expandText, expandable, collapseText, collapsible} = getEllipsisOpt();
    const {expanded, first} = state;
    const noExpandText = !expandable && isUndefined(expandText);
    const noCollapseText = !collapsible && isUndefined(collapseText);
    let text;

    if (!expanded && !noExpandText) {
      text = expandText;
    } else if (expanded && !first && !noCollapseText) {
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
    const {ellipsis} = props;
    const {expandable} = getEllipsisOpt();
    if (!ellipsis) {
      return {
        ellipsisCls: '',
        ellipsisStyle: {},
        // ellipsisAttr: {}
      };
    }
    const {rows} = getEllipsisOpt();
    const {isOverflowed, expanded, isTruncated} = state;
    const useCSS = !expanded && canUseCSSEllipsis();
    const ellipsisCls = cls({
      [`${prefixCls}-ellipsis`]: true,
      [`${prefixCls}-ellipsis-single-line`]: rows === 1,
      [`${prefixCls}-ellipsis-multiple-line`]: rows > 1,
      [`${prefixCls}-ellipsis-overflow-ellipsis`]: rows === 1 && useCSS,
    });
    const ellipsisStyle = useCSS && rows > 1 ? {WebkitLineClamp: rows} : {};
    return {
      ellipsisCls,
      ellipsisStyle: isOverflowed ? ellipsisStyle : {},
    };
  };

  const renderEllipsisText = (opt: Ellipsis) => {
    const {suffix} = opt;
    const children = props.children

    const {isTruncated, expanded, isOverflowed, ellipsisContent} = state;
    // console.debug(suffix)
    if (expanded || !isTruncated) {
      return (
        <>
          {children}
          {suffix && suffix.length ? suffix : null}
        </>
      );
    }
    return (
      <span>
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
    const {copyable,} = props;
    const children = props.children
    // console.log(children)
    if (!copyable) {
      return null;
    }
    let copyContent: string;
    let hasObject = false;
    if (Array.isArray(children)) {
      copyContent = '';
      children.forEach(value => {
        // console.debug(value.children)
        if (typeof value.children === 'object') {
          hasObject = true;
        }
        // // console.debug(value.children)
        copyContent += String(value.children);
      });
    } else if (typeof children !== 'object') {
      copyContent = String(children);
    } else {
      console.debug(children)
      hasObject = true;
      copyContent = String(children);
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
    return <Copyable {...copyConfig} forwardRef={copyRef}/>;
  }


  function renderIcon() {
    const {icon, size} = props;
    if (!icon) {
      return null;
    }
    const iconSize: Size = size === 'small' ? 'small' : 'default';
    return (
      <span class={`${prefixCls}-icon`}>
                {isSemiIcon(icon) ? cloneVNode((icon as any), {size: iconSize}) : icon}
            </span>
    );
  }

  function renderContent() {
    // console.log(props)
    const {
      component_,
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
    const children = props.children
    const textProps = omit(rest, [
      'strong',
      'editable',
      'mark',
      'copyable',
      'underline',
      'code',
      'children',
      // 'link',
      'delete',
    ]);
    const iconNode = renderIcon();
    const ellipsisOpt = getEllipsisOpt();
    // console.debug(ellipsisOpt)
    const {ellipsisCls, ellipsisStyle} = getEllipsisStyle();
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
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-link`]: link,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${spacing}`]: spacing,
      [`${prefixCls}-${heading}`]: isHeader,
      [`${prefixCls}-${heading}-weight-${weight}`]: isHeader && weight && isNaN(Number(weight)),

    });
    return (
      <Typography
        className={wrapperCls}
        style={{...style, ...ellipsisStyle}}
        component_={component_}
        forwardRef={wrapperRef}
        {...textProps}
      >
        {{
          default: () => {
            return <>
              {textNode}
              {renderOperations()}
            </>
          }
        }}
      </Typography>
    );
  }


  function renderTipWrapper() {
    const children = props.children
    const showTooltip_ = showTooltip();
    const content = renderContent();
    if (showTooltip_) {
      const {type, opts} = showTooltip_ as ShowTooltip;
      if (type.toLowerCase() === 'popover') {
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

    const content = (
      <LocaleConsumer componentName="Typography">
        {{
          default: (locale: Locale['Typography']) => {
            expandStr = locale.expand;
            collapseStr = locale.collapse;
            // // console.debug(locale)
            return renderTipWrapper();
          }
        }}
      </LocaleConsumer>
    );
    if (props.ellipsis) {
      return (
        <ResizeObserver onResize={onResize} observeParent>
          {content}
        </ResizeObserver>
      );
    }
    return content;
  }
}, {
  props: vuePropsType,
  name: 'Base'
})



export default Base

