import * as PropTypes from '../PropTypes';
import {PropType, VNode} from "vue";

export const PanelShape = {
    panelHeader: PropTypes.node as PropType<VNode | string>,
    panelFooter: PropTypes.node as PropType<VNode | string>,
};

export const PanelShapeDefaults = {};
