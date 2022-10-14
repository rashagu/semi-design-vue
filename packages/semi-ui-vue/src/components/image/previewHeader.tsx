
import { IconClose } from "@kousum/semi-icons-vue";
import { cssClasses } from "@douyinfe/semi-foundation/image/constants";
import cls from "classnames";
import { HeaderProps } from "./interface";
import { PreviewContext } from "./previewContext";
import {CSSProperties, FunctionalComponent, h, PropType} from "vue";
import {VueJsxNode} from "../interface";

const prefixCls = `${cssClasses.PREFIX}-preview-header`;

const Header: FunctionalComponent<HeaderProps> = ({ onClose, titleStyle, className, renderHeader }) => (
    <PreviewContext.Consumer>
        {({ currentIndex, titles }) => {
            let title;
            if (titles && typeof currentIndex === "number") {
                title = titles[currentIndex];
            }
            return (
                <section class={cls(prefixCls, className)}>
                    <section class={`${prefixCls}-title`} style={titleStyle}>{renderHeader ? renderHeader(title) : title}</section>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <section class={`${prefixCls}-close`} onMouseup={onClose}>
                        <IconClose />
                    </section>
                </section>
            );
        }}
    </PreviewContext.Consumer>
);

Header.props = {
    renderHeader:Function as PropType<(info: any) => VueJsxNode>,
    title: String,
    titleStyle: Object as PropType<CSSProperties>,
    className: String,
    onClose:Function as PropType< () => void>,
}

export default Header;
