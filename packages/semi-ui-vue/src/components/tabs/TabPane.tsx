import * as PropTypes from '../PropTypes';
import {vuePropsMake} from '../PropTypes';
import cls from 'classnames';
import {cssClasses} from '@douyinfe/semi-foundation/tabs/constants';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import {PlainTab, TabPaneProps} from './interface';
import CSSAnimation from "../_cssAnimation";
import {defineComponent, h, useSlots} from "vue";
import {useTabsContext} from "./tabs-context/Consumer";


const propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    itemKey: PropTypes.string,
    tab: PropTypes.node,
    icon: PropTypes.node,
    closable: PropTypes.bool
};
export const vuePropsType = vuePropsMake(propTypes, {})
const TabPane = defineComponent<TabPaneProps>((props, {}) => {
    const slots = useSlots()

    const {context} = useTabsContext()
    let _active: boolean;


    // get direction from current item key to activeKey
    const getDirection = (activeKey: string, itemKey: string, panes: Array<PlainTab>, lastActiveKey: string): boolean => {
        if (itemKey !== null && activeKey !== null && Array.isArray(panes) && panes.length) {
            const activeIndex = panes.findIndex(pane => pane.itemKey === activeKey);
            const itemIndex = panes.findIndex(pane => pane.itemKey === itemKey);
            const lastActiveIndex = panes.findIndex(pane => pane.itemKey === lastActiveKey);


            if (activeIndex === itemIndex) {
                return lastActiveIndex > activeIndex;
            } else {
                return itemIndex < activeIndex;
            }
        }

        return false;
    };


    const shouldRenderFunc = (): boolean => {
        const { itemKey } = props;
        const { activeKey, lazyRender } = context.value;
        const active = activeKey === itemKey;
        _active = _active || active;
        return lazyRender ? _active : true;
    };

    return () => {

        const children = slots.default?.()
        const { tabPaneMotion: motion, tabPosition, prevActiveKey } = context.value;
        const { className, style, itemKey, tabIndex, ...restProps } = props;
        const active = context.value.activeKey === itemKey;
        const classNames = cls(className, {
            [cssClasses.TABS_PANE_INACTIVE]: !active,
            [cssClasses.TABS_PANE_ACTIVE]: active,
            [cssClasses.TABS_PANE]: true,
        });
        const shouldRender = shouldRenderFunc();
        const startClassName = (() => {
            const direction = getDirection(context.value.activeKey, itemKey, context.value.panes as any, prevActiveKey);
            if (tabPosition === 'top') {
                if (direction) {
                    return cssClasses.TABS_PANE_ANIMATE_RIGHT_SHOW;
                } else {
                    return cssClasses.TABS_PANE_ANIMATE_LEFT_SHOW;
                }
            } else {
                if (direction) {
                    return cssClasses.TABS_PANE_ANIMATE_BOTTOM_SHOW;
                } else {
                    return cssClasses.TABS_PANE_ANIMATE_TOP_SHOW;
                }
            }
        })();

        const isActivatedBecauseOtherTabPaneRemoved = !((context.value.panes as any) as PlainTab[]).find(tabPane => tabPane.itemKey === prevActiveKey);
        const hasMotion = motion && active && !isActivatedBecauseOtherTabPaneRemoved && !context.value.forceDisableMotion;
        return (
          <div
            role="tabpanel"
            id={`semiTabPanel${itemKey}`}
            aria-labelledby={`semiTab${itemKey}`}
            class={classNames}
            style={style}
            aria-hidden={active ? 'false' : 'true'}
            tabindex={tabIndex ? tabIndex : 0}
            {...getDataAttr(restProps)}
            x-semi-prop="children"
          >

              <CSSAnimation
                motion={hasMotion}
                animationState={active ? "enter" : "leave"}
                startClassName={startClassName}
                children={
                    ({ animationClassName, animationEventsNeedBind }) => {
                        return <div
                          class={cls(cssClasses.TABS_PANE_MOTION_OVERLAY, animationClassName)}
                          x-semi-prop="children"
                          {...animationEventsNeedBind}
                        >
                            {shouldRender ? children : null}
                        </div>;
                    }
                }
              >

              </CSSAnimation>
          </div>
        );
    }
})

TabPane.props = vuePropsType
TabPane.name = 'TabPane'
TabPane.isTabPane = true

export default TabPane
