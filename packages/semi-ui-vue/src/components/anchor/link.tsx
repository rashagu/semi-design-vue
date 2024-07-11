import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/anchor/constants';
import LinkFoundation, { LinkAdapter } from '@douyinfe/semi-foundation/anchor/linkFoundation';
import { Text as TypographyText } from '../typography/index';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useAnchorContext } from './anchor-content/Consumer';
import { useBaseComponent } from '../_base/baseComponent';
import { TabsProps } from '../tabs';
import { CombineProps, VueJsxNode } from '../interface';
import { isObject } from 'lodash';

const prefixCls = cssClasses.PREFIX;

export interface LinkProps {
  href?: string;
  title?: VueJsxNode;
  className?: string;
  children?: VueJsxNode;
  style?: CSSProperties;
  disabled?: boolean;
  level?: number;
  direction?: 'ltr' | 'rtl';
}

const propTypes: CombineProps<LinkProps> = {
  href: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  level: PropTypes.number,
  direction: PropTypes.string as PropType<LinkProps['direction']>,
  children: PropTypes.node,
};

const defaultProps = {
  href: '#',
  title: '',
  className: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Link = defineComponent({
  props: { ...vuePropsType },
  name: 'Link',
  setup(props, {}) {
    const slots = useSlots();
    const { context } = useAnchorContext();

    const state = reactive({});
    const { adapter: adapterInject } = useBaseComponent<TabsProps>(props, state);
    function adapter_(): LinkAdapter {
      return {
        ...adapterInject(),
        addLink: (href) => {
          context.value.addLink(href);
        },
        removeLink: (href) => {
          context.value.removeLink(href);
        },
      };
    }
    const adapter = adapter_();
    const foundation = new LinkFoundation(adapter);

    function handleAddLink() {
      foundation.handleAddLink();
    }

    function handleRemoveLink() {
      foundation.handleRemoveLink();
    }

    function handleUpdateLink(href: string, prevHref: string) {
      foundation.handleUpdateLink(href, prevHref);
    }

    function handleClick(e: KeyboardEvent | MouseEvent) {
      const { disabled, href } = props;
      const { onClick } = context.value;
      !disabled && onClick(e as any, href);
    }

    onMounted(() => {
      handleAddLink();
    });

    watch(
      () => props.href,
      (value, prevPropsHref) => {
        const prevHref = prevPropsHref;
        const { href } = props;
        handleUpdateLink(href, prevHref);
      }
    );

    onBeforeUnmount(() => {
      handleRemoveLink();
    });

    const renderTitle = () => {
      const { href, title, disabled = false } = props;
      const { activeLink, showTooltip, position, size } = context.value;
      const active = activeLink === href;
      const linkTitleCls = cls(`${prefixCls}-link-tooltip`, {
        [`${prefixCls}-link-tooltip-small`]: size === 'small',
        [`${prefixCls}-link-tooltip-active`]: active,
        [`${prefixCls}-link-tooltip-disabled`]: disabled,
      });
      if (showTooltip) {
        const showTooltipObj = isObject(showTooltip) ? Object.assign({ opts: {} }, showTooltip) : { opts: {} };
        // The position can be set through showTooltip, here it is compatible with the position API
        if (position) {
          showTooltipObj.opts['position'] = position;
        }
        return (
          <TypographyText
            size={size === 'default' ? 'normal' : 'small'}
            ellipsis={{ showTooltip: showTooltipObj as any }}
            type={'tertiary'}
            className={linkTitleCls}
          >
            {title}
          </TypographyText>
        );
      } else {
        return title;
      }
    };

    const renderChildren = () => {
      const { activeLink, childMap } = context.value;
      const { href, children } = props;
      if (!context.value.autoCollapse) {
        return <div role="list">{children}</div>;
      }
      return activeLink === href || (childMap[href] && childMap[href].has(activeLink)) ? (
        <div role="list">{children}</div>
      ) : null;
    };

    return () => {
      const { href, className, style, disabled = false, title, level, direction } = props;
      const { activeLink, showTooltip } = context.value;
      const active = activeLink === href;
      const linkCls = cls(`${prefixCls}-link`, className);
      const linkTitleCls = cls(`${prefixCls}-link-title`, {
        [`${prefixCls}-link-title-active`]: active,
        [`${prefixCls}-link-title-disabled`]: disabled,
      });
      const paddingAttributeKey = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
      const ariaProps = {
        'aria-disabled': disabled,
        style: {
          [paddingAttributeKey]: 8 * level + 'px',
        },
      };
      if (active) {
        ariaProps['aria-details'] = 'active';
      }
      if (!showTooltip && typeof title === 'string') {
        ariaProps['title'] = title;
      }

      return (
        <div class={linkCls} style={style} role="listitem">
          <div
            role="link"
            tabindex={0}
            {...ariaProps}
            class={linkTitleCls}
            onClick={(e) => handleClick(e)}
            onKeypress={(e) => handleClick(e)}
          >
            {renderTitle()}
          </div>
          {renderChildren()}
        </div>
      );
    };
  },
});

export default Link;
