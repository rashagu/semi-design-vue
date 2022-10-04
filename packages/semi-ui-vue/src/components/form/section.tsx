import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';
import {CSSProperties, defineComponent, h, useSlots} from "vue";
import {VueJsxNode} from "../interface";

const prefix = cssClasses.PREFIX;

export interface SectionProps {
    className?: string;
    style?: CSSProperties;
    text?: VueJsxNode;
}


export const vuePropsType = {
    text: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
}
const Section = defineComponent<SectionProps>((props, {}) => {
    const slots = useSlots()

    return () => {
        const { text, className, style,  } = props;
        const cls = classNames({
            [prefix + '-section']: true,
        }, className);
        const textCls = prefix + '-section-text';

        return (
          <section class={cls} style={style}>
              <h5 class={textCls}>{text}</h5>
              {slots.default?.()}
          </section>
        );
    }
})

Section.props = vuePropsType
Section.name = 'Section'

export default Section
