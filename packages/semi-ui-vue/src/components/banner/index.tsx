import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import Button from '../iconButton';
import { strings, cssClasses } from '@douyinfe/semi-foundation/banner/constants';
import BannerFoundation, { BannerAdapter } from '@douyinfe/semi-foundation/banner/foundation';
import '@douyinfe/semi-foundation/banner/banner.scss';
import {Title, Paragraph} from '../typography/index';
import { IconClose, IconAlertTriangle, IconInfoCircle, IconTickCircle, IconAlertCircle } from '@kousum/semi-icons-vue';

import warning from '@douyinfe/semi-foundation/utils/warning';
import {useBaseComponent} from '../_base/baseComponent';
import {
    ComponentObjectPropsOptions,
    CSSProperties,
    defineComponent,
    h,
    onMounted,
    onUnmounted, PropType,
    reactive,
    useSlots
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {VueJsxNode} from "../interface";

const prefixCls = cssClasses.PREFIX;
const types = strings.TYPE;


export type Type = 'info' | 'danger' | 'warning' | 'success';
export interface BannerProps {
    type?: Type;
    className?: string;
    fullMode?: boolean;
    title?: VueJsxNode;
    description?: VueJsxNode;
    icon?: VueJsxNode;
    closeIcon?: VueJsxNode;
    style?: CSSProperties;
    bordered?: boolean;
    onClose?(e: MouseEvent):void;
}

export interface BannerState {
    visible: boolean;
}


const propTypes:ComponentObjectPropsOptions<BannerProps> = {
    // target: PropTypes.func,
    fullMode: PropTypes.bool,
    // insertAfter: PropTypes.func,
    type: String as PropType<BannerProps['type']>,
    title: PropTypes.node,
    description: PropTypes.node,
    icon: PropTypes.node,
    closeIcon: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onClose: PropTypes.func as PropType<BannerProps['onClose']>,
    bordered: PropTypes.bool,
};

const defaultProps = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => { },
    type: 'info',
    fullMode: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Banner = defineComponent((props, {}) => {

    warning(
      'target' in props,
      '[Semi Banner] \'target\' has been deprecated, please write JSX directly instead.'
    );

    const slots = useSlots()

    const state = reactive<BannerState>({
        visible: true,
    })

    let foundation:BannerFoundation


    const {adapter: adapterInject, getDataAttr} = useBaseComponent<BannerProps>(props, state)
    function adapter_(): BannerAdapter<BannerProps, BannerState> {
        return {
            ...adapterInject(),
            setVisible: () => {
                state.visible = false
            },
            notifyClose: (e: MouseEvent) => {
                const { onClose } = props;
                onClose(e);
            },
        };
    }
    const adapter = adapter_()


    onMounted(()=>{
        foundation = new BannerFoundation(adapter);
        foundation.init();
    })

    onUnmounted(()=>{
        foundation.destroy();
    })



    const remove = (e:MouseEvent) => {
        e && e.stopPropagation();
        foundation.removeBanner(e);
    };

    function renderCloser() {
        const { closeIcon } = props;
        if (closeIcon === null) {
            return closeIcon;
        }
        const closer = (
          <Button
            className={`${prefixCls}-close`}
            onClick={remove}
            icon={closeIcon || <IconClose x-semi-prop="closeIcon" aria-hidden={true}/>}
            theme="borderless"
            size="small"
            type="tertiary"
            aria-label='Close'
          />
        );
        return closer;
    }

    function renderIcon() {
        const { type, icon } = props;
        const iconMap = {
            warning: <IconAlertTriangle size="large" aria-label='warning'/>,
            success: <IconTickCircle size="large" aria-label='success'/>,
            info: <IconInfoCircle size="large" aria-label='info'/>,
            danger: <IconAlertCircle size="large" aria-label='danger'/>
        };
        let iconType: VueJsxNode = iconMap[type];
        const iconCls = cls({
            [`${prefixCls }-icon`]: true,
            // [prefixCls + '-' + type]: true,
        });
        if (typeof icon !== 'undefined') {
            iconType = icon;
        }
        if (iconType) {
            return (
              <div class={iconCls} x-semi-prop="icon">
                  {iconType}
              </div>
            );
        }
        return null;
    }


    return () => {
        const children = slots.default?.()
        const { type, className, style, bordered, title, description, fullMode } = props;
        const { visible } = state;
        const wrapper = cls(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-full`]: fullMode,
            [`${prefixCls}-in-container`]: !fullMode,
            [`${prefixCls}-bordered`]: !fullMode && bordered,
        });
        const banner = visible ? (
          <div class={wrapper} style={style} role="alert" {...getDataAttr()}>
              <div class={`${prefixCls}-content-wrapper`}>
                  <div class={`${prefixCls}-content`}>
                      {renderIcon()}
                      <div class={`${prefixCls}-content-body`}>
                          {title ? <Title heading={5} className={`${prefixCls}-title`} component_="div" x-semi-prop="title">{title}</Title> : null}
                          {description ? <Paragraph className={`${prefixCls}-description`} component_="div" x-semi-prop="description">{description}</Paragraph> : null}
                      </div>
                  </div>
                  {renderCloser()}
              </div>
              {children ? <div class={`${prefixCls}-extra`} x-semi-prop="children">{children}</div> : null}
          </div>
        ) : null;
        return banner;
    }
}, {
    props: vuePropsType,
    name: 'Banner'
})



export default Banner
