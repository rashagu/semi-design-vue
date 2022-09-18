import {FunctionalComponent, h, VNode} from "vue";
import { noop } from 'lodash';
import { IconSidebar } from '@kousum/semi-icons-vue';
import Button from '../button';
import Tooltip from '../tooltip';
import { Locale } from '../locale/interface';

export interface CollapseButtonProps {
    prefixCls?: string;
    locale?: Locale['Navigation'];
    collapseText?(isCollapsed: boolean): VNode;
    isCollapsed?: boolean;
    onClick?(e: boolean): void;
}

const CollapseButton:FunctionalComponent<CollapseButtonProps> = function ({ prefixCls, locale, collapseText, isCollapsed, onClick = noop }, ctx) {
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(!isCollapsed);
        }
    };

    const btnProps = {
        icon: <IconSidebar />,
        type: 'tertiary',
        theme: 'borderless',
        onClick: handleClick,
    };

    let finalCollapseText: VNode | string = isCollapsed ? locale?.expandText : locale?.collapseText;

    if (typeof collapseText === 'function') {
        finalCollapseText = collapseText(isCollapsed);
    }

    return (
        <div class={`${prefixCls}-collapse-btn`}>
            {isCollapsed ? (
                <Tooltip content={finalCollapseText} position="right">
                    <Button {...(btnProps as any)} />
                </Tooltip>
            ) : (
                <Button {...(btnProps as any)}>{finalCollapseText}</Button>
            )}
        </div>
    );
}


export default CollapseButton