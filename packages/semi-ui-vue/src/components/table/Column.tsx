import * as PropTypes from '../PropTypes';
import ColumnShape from './ColumnShape';
import { ColumnProps } from './interface';
import {defineComponent, h, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

const propTypes = {
    ...ColumnShape,
};
export const vuePropsType = vuePropsMake<ColumnProps>(propTypes, {});
const Column = defineComponent<ColumnProps>((props, {}) => {
    const slots = useSlots();

    return () => null;
}, {
    props: vuePropsType,
    name: 'Column'
});


export default Column;
