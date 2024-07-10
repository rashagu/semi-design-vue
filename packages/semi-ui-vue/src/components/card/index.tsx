import { omit, isString } from 'lodash';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/card/constants';
import '@douyinfe/semi-foundation/card/card.scss';
import cls from 'classnames';
import Skeleton, { SkeletonParagraph, SkeletonTitle } from '../skeleton';
import { Title } from '../typography';
import Space from '../space';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps, VueJsxNode } from '../interface';
import { useHasInProps } from '../_base/baseComponent';

const prefixcls = cssClasses.PREFIX;

export type Shadows = 'hover' | 'always';

export type { MetaProps } from './meta';

export type { CardGroupProps } from './cardGroup';

export interface CardProps {
  /** Operation group at the bottom of the card content area */
  actions?: VueJsxNode[];
  /** Card content area inline style */
  bodyStyle?: CSSProperties;
  /** Whether there is an outer border */
  bordered?: boolean;
  /** Style class name */
  className?: string;
  children?: VueJsxNode;
  /** Cover */
  cover?: VueJsxNode;
  /** Additional additions to the right of the title */
  headerExtraContent?: VueJsxNode;
  /** Custom end of page */
  footer?: VueJsxNode;
  /** Whether there is an edge between the bottom of the page and the content area */
  footerLine?: boolean;
  /** Inline style at the end of the page */
  footerStyle?: CSSProperties;
  /** Custom head */
  header?: VueJsxNode;
  /** Whether there is an edge line between the head and the content area */
  headerLine?: boolean;
  /** Head inline style */
  headerStyle?: CSSProperties;
  /** Whether to preload */
  loading?: boolean;
  /** Set shadow */
  shadows?: Shadows;
  /** Card inline style */
  style?: CSSProperties;
  /** Title */
  title?: VueJsxNode;
  /** aria label */
  'aria-label'?: string;
}

const propTypes: CombineProps<CardProps> = {
  actions: PropTypes.array,
  bodyStyle: PropTypes.object,
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cover: PropTypes.node,
  footer: PropTypes.node,
  footerLine: PropTypes.bool,
  footerStyle: PropTypes.object,
  header: PropTypes.node,
  headerExtraContent: PropTypes.node,
  headerLine: PropTypes.bool,
  headerStyle: PropTypes.object,
  loading: PropTypes.bool,
  shadows: PropTypes.string as PropType<CardProps['shadows']>,
  style: PropTypes.object,
  title: PropTypes.node,
  'aria-label': PropTypes.string,
};

const defaultProps = {
  bordered: true,
  footerLine: false,
  headerLine: true,
  loading: false,
};
export const vuePropsType = vuePropsMake<CardProps>(propTypes, defaultProps);
const Card = defineComponent({
  props: vuePropsType,
  name: 'Card',
  setup(props, {}) {
    const {getProps} = useHasInProps()
    const slots = useSlots();

    const renderHeader = () => {
      const { title, headerExtraContent, header, headerLine, headerStyle } = props;
      const headerCls = cls(`${prefixcls}-header`, {
        [`${prefixcls}-header-bordered`]: Boolean(headerLine),
      });
      const headerWrapperCls = cls(`${prefixcls}-header-wrapper`);
      const titleCls = cls(`${prefixcls}-header-wrapper-title`, {
        [`${prefixcls}-header-wrapper-spacing`]: Boolean(headerExtraContent),
      });

      if (header || headerExtraContent || title) {
        return (
          <div style={headerStyle} class={headerCls}>
            {header || ( // Priority of header over title and headerExtraContent
              <div class={headerWrapperCls}>
                {headerExtraContent && (
                  <div class={`${prefixcls}-header-wrapper-extra`} x-semi-prop="headerExtraContent">
                    {headerExtraContent}
                  </div>
                )}
                {title && (
                  <div class={titleCls}>
                    {isString(title) ? (
                      <Title heading={6} ellipsis={{ showTooltip: true, rows: 1 }} x-semi-prop="title">
                        {title}
                      </Title>
                    ) : (
                      title
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }
      return null;
    };

    const renderCover = () => {
      const { cover } = props;
      const coverCls = cls(`${prefixcls}-cover`);

      return (
        cover && (
          <div class={coverCls} x-semi-prop="cover">
            {cover}
          </div>
        )
      );
    };

    const renderBody = () => {
      const children = slots.default?.();
      const { bodyStyle, actions, loading } = props;
      const bodyCls = cls(`${prefixcls}-body`);
      const actionsCls = cls(`${prefixcls}-body-actions`);
      const actionsItemCls = cls(`${prefixcls}-body-actions-item`);
      const placeholder = (
        <div>
          <SkeletonTitle />
          <br />
          <SkeletonParagraph rows={3} />
        </div>
      );
      return (
        <div style={bodyStyle} class={bodyCls}>
          {children && (
            <Skeleton placeholder={placeholder} loading={loading} active>
              {children}
            </Skeleton>
          )}
          {Array.isArray(actions) && (
            <div class={actionsCls}>
              <Space spacing={12}>
                {actions.map((item, idx) => (
                  <div key={idx} class={actionsItemCls} x-semi-prop={`actions.${idx}`}>
                    {item}
                  </div>
                ))}
              </Space>
            </div>
          )}
        </div>
      );
    };

    const renderFooter = () => {
      const { footer, footerLine, footerStyle } = props;
      const footerCls = cls(`${prefixcls}-footer`, {
        [`${prefixcls}-footer-bordered`]: footerLine,
      });

      return (
        footer && (
          <div style={footerStyle} class={footerCls} x-semi-prop="footer">
            {footer}
          </div>
        )
      );
    };

    return () => {
      const { bordered, shadows, style, className, children, ...otherProps } = getProps(props);
      const others = omit(otherProps, [
        // Remove APIs in otherProps that do not need to be hung on the outer node
        'actions',
        'bodyStyle',
        'cover',
        'headerExtraContent',
        'footer',
        'footerLine',
        'footerStyle',
        'header',
        'headerLine',
        'headerStyle',
        'loading',
        'title',
      ]);
      const cardCls = cls(prefixcls, className, {
        [`${prefixcls}-bordered`]: bordered,
        [`${prefixcls}-shadows`]: shadows,
        [`${prefixcls}-shadows-${shadows}`]: shadows,
      });

      return (
        <div {...others} aria-busy={props.loading} class={cardCls} style={style}>
          {renderHeader()}
          {renderCover()}
          {renderBody()}
          {renderFooter()}
        </div>
      );
    };
  },
});

export default Card;
