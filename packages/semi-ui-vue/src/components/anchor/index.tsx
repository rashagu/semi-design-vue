import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/anchor/constants';
import AnchorFoundation, { AnchorAdapter } from '@douyinfe/semi-foundation/anchor/foundation';
import Link from './link';
import AnchorContext from './anchor-context';
import '@douyinfe/semi-foundation/anchor/anchor.scss';
import { noop, debounce, throttle, isEqual } from 'lodash';
import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import { ArrayElement } from '../_base/base';
import { ShowTooltip } from '../typography/interface';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { useConfigContext } from '../configProvider/context/Consumer';
import { useBaseComponent } from '../_base/baseComponent';
import { vuePropsMake } from '../PropTypes';
import { AriaAttributes } from '../AriaAttributes';

const prefixCls = cssClasses.PREFIX;

export type { LinkProps } from './link';

export interface AnchorProps {
  autoCollapse?: boolean;
  className?: string;
  defaultAnchor?: string;
  getContainer?: () => HTMLElement | Window;
  maxHeight?: string | number;
  maxWidth?: string | number;
  offsetTop?: number;
  position?: ArrayElement<typeof strings.POSITION_SET>;
  railTheme?: ArrayElement<typeof strings.SLIDE_COLOR>;
  scrollMotion?: boolean;
  showTooltip?: boolean | ShowTooltip;
  size?: ArrayElement<typeof strings.SIZE>;
  style?: CSSProperties;
  targetOffset?: number;
  onChange?: (currentLink: string, previousLink: string) => void;
  onClick?: (e: MouseEvent, currentLink: string) => void;
  'aria-label'?: AriaAttributes['aria-label'];
}

export interface AnchorState {
  activeLink: string;
  links: string[];
  clickLink: boolean;
  scrollHeight: string;
  slideBarTop: string;
}

const propTypes: ComponentObjectPropsOptions<Required<AnchorProps>> = {
  size: PropTypes.string as PropType<AnchorProps['size']>,
  railTheme: PropTypes.string as PropType<AnchorProps['railTheme']>,
  className: PropTypes.string,
  style: PropTypes.object,
  scrollMotion: PropTypes.bool,
  autoCollapse: PropTypes.bool,
  offsetTop: PropTypes.number,
  targetOffset: PropTypes.number,
  showTooltip: PropTypes.bool,
  position: PropTypes.string as PropType<AnchorProps['position']>,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getContainer: PropTypes.func as PropType<AnchorProps['getContainer']>,
  onChange: PropTypes.func as PropType<AnchorProps['onChange']>,
  onClick: PropTypes.func as PropType<AnchorProps['onClick']>,
  defaultAnchor: PropTypes.string,
  'aria-label': PropTypes.string,
};

const defaultProps = {
  size: 'default',
  railTheme: 'primary',
  className: '',
  scrollMotion: false,
  autoCollapse: false,
  offsetTop: 0,
  targetOffset: 0,
  showTooltip: false,
  maxWidth: strings.MAX_WIDTH,
  maxHeight: strings.MAX_HEIGHT,
  getContainer: noop,
  onChange: noop,
  onClick: noop,
  defaultAnchor: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Anchor = defineComponent({
  props: vuePropsType,
  name: 'Anchor',
  setup(props, {}) {
    const slots = useSlots();

    const { context } = useConfigContext();
    const state = reactive<AnchorState>({
      activeLink: '',
      links: [],
      clickLink: false,
      scrollHeight: '100%',
      slideBarTop: '0',
    });
    const { adapter: adapterInject, getDataAttr } = useBaseComponent<AnchorProps>(props, state);
    const childrenRef = ref<VNode[]>([]);
    function adapter_(): AnchorAdapter<AnchorProps, AnchorState> {
      return {
        ...adapterInject(),
        getProp: (key) => {
          if (key === 'children') {
            return childrenRef.value;
          }
          return props[key];
        },
        addLink: (value) => {
          state.links = [...state.links, value];
        },
        removeLink: (link) => {
          const links = state.links.slice();
          const index = links.indexOf(link);
          if (index !== -1) {
            links.splice(index, 1);
            state.links = links;
          }
          return undefined;
        },
        setChildMap: (value) => {
          childMap = value;
        },
        setScrollHeight: (height) => {
          state.scrollHeight = height;
        },
        setSlideBarTop: (height) => {
          state.slideBarTop = `${height}px`;
        },
        setClickLink: (value) => {
          state.clickLink = value;
        },
        setActiveLink: (link, cb) => {
          state.activeLink = link;
          nextTick(() => {
            cb();
          });
        },
        setClickLinkWithCallBack: (value, link, cb) => {
          state.clickLink = value;
          nextTick(() => {
            cb(link);
          });
        },
        getContainer: () => {
          const { getContainer } = props;
          const container = getContainer();
          return container ? container : window;
        },
        getContainerBoundingTop: () => {
          const container = adapter.getContainer();
          if ('getBoundingClientRect' in container) {
            return container.getBoundingClientRect().top;
          }
          return 0;
        },
        getLinksBoundingTop: () => {
          const { links } = state;
          const { offsetTop } = props;
          const containerTop = adapter.getContainerBoundingTop();
          const elTop = links.map((link) => {
            let node = null;
            try {
              // Get links from containers
              node = document.querySelector(link);
            } catch (e) {}
            return (node && node.getBoundingClientRect().top - containerTop - offsetTop) || -Infinity;
          });
          return elTop;
        },
        getAnchorNode: (selector) => {
          const selectors = `#${anchorID} ${selector}`;
          return document.querySelector(selectors);
        },
        getContentNode: (selector) => document.querySelector(selector),
        notifyChange: (currentLink, previousLink) => props.onChange(currentLink, previousLink),
        notifyClick: (e, link) => props.onClick(e, link),
        canSmoothScroll: () => 'scrollBehavior' in document.body.style,
      };
    }

    const adapter = adapter_();

    const foundation = new AnchorFoundation(adapter);
    let anchorID: string;
    let scrollContainer: HTMLElement | Window;
    let childMap: Record<string, Set<string>> = {};
    let handler: () => void;
    let clickHandler: () => void;

    const addLink = (link: string) => {
      foundation.addLink(link);
    };

    const removeLink = (link: string) => {
      foundation.removeLink(link);
    };

    const handleScroll = () => {
      foundation.handleScroll();
    };

    const handleClick = (e: MouseEvent, link: string) => {
      foundation.handleClick(e, link);
    };

    // Set click to false after scrolling
    const handleClickLink = () => {
      foundation.handleClickLink();
    };

    const setChildMap = () => {
      foundation.setChildMap();
    };

    const setScrollHeight = () => {
      foundation.setScrollHeight();
    };

    const updateScrollHeight = (prevState: AnchorState, state: AnchorState) => {
      foundation.updateScrollHeight(prevState, state);
    };

    const updateChildMap = (prevState: AnchorState, state: AnchorState) => {
      foundation.updateChildMap(prevState, state);
    };

    const renderChildren = () => {
      const loop = (children: VNode[], level = 1) => {
        return children.map((child) => {
          if (isVNode(child)) {
            const childProps = {
              direction: context.value.direction,
              level,
              children: [],
            };
            const children = child.children as any;
            const hasChildren = children && children.length > 0;
            if (hasChildren) {
              childProps.children = loop(children, level + 1);
            }
            return cloneVNode(child, childProps);
          }
          return null;
        });
      };
      return loop(childrenRef.value);
    };

    onMounted(() => {
      const { defaultAnchor = '' } = props;
      anchorID = getUuid('semi-anchor').replace('.', '');
      scrollContainer = adapter.getContainer();
      handler = throttle(handleScroll, 100);
      clickHandler = debounce(handleClickLink, 100);
      scrollContainer.addEventListener('scroll', handler);
      scrollContainer.addEventListener('scroll', clickHandler);
      setScrollHeight();
      setChildMap();
      Boolean(defaultAnchor) && foundation.handleClick(null, defaultAnchor, false);
    });

    watch(
      [
        () => state.activeLink,
        () => state.links,
        () => state.clickLink,
        () => state.scrollHeight,
        () => state.slideBarTop,
      ],
      (value, oldValue, onCleanup) => {
        if (!isEqual(value, oldValue)) {
          const [prevStateActiveLink, prevStateLinks, prevStateClickLink, prevStateScrollHeight, prevStateSlideBarTop] =
            oldValue;
          const prevState: AnchorState = {
            activeLink: prevStateActiveLink,
            links: prevStateLinks,
            clickLink: prevStateClickLink,
            scrollHeight: prevStateScrollHeight,
            slideBarTop: prevStateSlideBarTop,
          };
          updateScrollHeight(prevState, state);
          updateChildMap(prevState, state);
        }
      }
    );

    onBeforeUnmount(() => {
      scrollContainer.removeEventListener('scroll', handler);
      scrollContainer.removeEventListener('scroll', clickHandler);
    });
    return () => {
      // @ts-ignore
      childrenRef.value = slots.default?.();
      const { size, railTheme, style, className, maxWidth, maxHeight, showTooltip, position, autoCollapse } = props;
      const ariaLabel = props['aria-label'];
      const { activeLink, scrollHeight, slideBarTop } = state;
      const wrapperCls = cls(prefixCls, className, {
        [`${prefixCls}-size-${size}`]: size,
      });
      const slideCls = cls(`${prefixCls}-slide`, `${prefixCls}-slide-${railTheme}`);
      const slideBarCls = cls(`${prefixCls}-slide-bar`, {
        [`${prefixCls}-slide-bar-${size}`]: size,
        [`${prefixCls}-slide-bar-${railTheme}`]: railTheme,
        [`${prefixCls}-slide-bar-active`]: activeLink,
      });
      const anchorWrapper = `${prefixCls}-link-wrapper`;
      const wrapperStyle = {
        ...style,
        maxWidth,
        maxHeight,
      };

      return (
        <AnchorContext.Provider
          value={{
            activeLink,
            showTooltip,
            position,
            childMap: childMap,
            autoCollapse,
            size,
            onClick: (e, link) => handleClick(e, link),
            addLink: addLink,
            removeLink: removeLink,
          }}
        >
          <div
            role="navigation"
            aria-label={ariaLabel || 'Side navigation'}
            class={wrapperCls}
            style={wrapperStyle}
            id={anchorID}
            {...getDataAttr()}
          >
            <div aria-hidden class={slideCls} style={{ height: scrollHeight }}>
              <span class={slideBarCls} style={{ top: slideBarTop }} />
            </div>
            <div class={anchorWrapper} role="list">
              {renderChildren()}
            </div>
          </div>
        </AnchorContext.Provider>
      );
    };
  },
});

export { Link, Link as AnchorLink };
export default Anchor;
