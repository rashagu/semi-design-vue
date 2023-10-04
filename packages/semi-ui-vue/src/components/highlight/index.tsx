import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/highlight/constants';
import { getHighLightTextHTML } from '../_utils/index';
import '@douyinfe/semi-foundation/highlight/highlight.scss';
import {CSSProperties, defineComponent, h, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

export interface HighlightProps {
    autoEscape?: boolean;
    caseSensitive?: boolean;
    sourceString?: string;
    searchWords?: Array<string>;
    highlightStyle?: CSSProperties;
    highlightClassName?: string;
    component?: string
}

const prefixCls = cssClasses.PREFIX;

const propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    autoEscape: PropTypes.bool,
    caseSensitive: PropTypes.bool,
    sourceString: PropTypes.string,
    searchWords: PropTypes.array,
    highlightStyle: PropTypes.object,
    highlightClassName: PropTypes.string,
    component: PropTypes.string
};

const defaultProps = {
    component: 'mark',
    autoEscape: true,
    caseSensitive: false,
    sourceString: '',
};
export const vuePropsType = vuePropsMake<HighlightProps>(propTypes, defaultProps)
const Highlight = defineComponent<HighlightProps>((props, {}) => {
    const slots = useSlots()


    return () => {

        const {
            searchWords,
            sourceString,
            component,
            highlightClassName,
            highlightStyle,
            caseSensitive,
            autoEscape,
        } = props;

        const tagCls = cls({
            [`${prefixCls}-tag`]: true,
        }, highlightClassName);

        const option = {
            highlightTag: component,
            highlightClassName: tagCls,
            highlightStyle,
            caseSensitive,
            autoEscape,
        };

        return (
          getHighLightTextHTML({ sourceString, searchWords, option })
        );
    }
},{
    props:vuePropsType,
    name:'Highlight'
})


export default Highlight
