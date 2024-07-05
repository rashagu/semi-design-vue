/* eslint-disable max-len */
import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import { noop } from 'lodash';

import { cssClasses } from '@douyinfe/semi-foundation/table/constants';
import TableSelectionCellFoundation, { TableSelectionCellAdapter, TableSelectionCellEvent } from '@douyinfe/semi-foundation/table/tableSelectionCellFoundation';

import { Checkbox, CheckboxEvent, CheckboxProps } from '../checkbox';
import {ComponentObjectPropsOptions, defineComponent, h, PropType, reactive, useSlots} from "vue";
import {AriaAttributes} from "../AriaAttributes";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";
import {BaseFormProps} from "../form";

export interface TableSelectionCellProps {
    columnTitle?: string; // TODO: future api
    getCheckboxProps?: () => CheckboxProps;
    type?: string; // TODO: future api
    onChange?: (checked: boolean, e: TableSelectionCellEvent) => void;
    selected?: boolean;
    disabled?: boolean;
    indeterminate?: boolean; // Intermediate state, shown as a solid horizontal line
    prefixCls?: string;
    className?: string;
    'aria-label'?: AriaAttributes['aria-label']
}

/**
 * render selection cell
 */

const propTypes:ComponentObjectPropsOptions<TableSelectionCellProps> = {
    columnTitle: PropTypes.string,
    getCheckboxProps: PropTypes.func as PropType<TableSelectionCellProps['getCheckboxProps']>,
    type: PropTypes.string,
    onChange: PropTypes.func as PropType<TableSelectionCellProps['onChange']>,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    'aria-label': PropTypes.string,
};

const defaultProps = {
    disabled: false,
    onChange: noop,
    prefixCls: cssClasses.PREFIX,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TableSelectionCell = defineComponent((props, {}) => {
    const slots = useSlots();
    const state = reactive({})
    const {adapter: adapterInject} = useBaseComponent<TableSelectionCellProps>(props, state)
    function adapter_(): TableSelectionCellAdapter {
        return {
            ...adapterInject(),
            notifyChange: (...args) => props.onChange(...args),
        };
    }
    const adapter = adapter_()
    const foundation = new TableSelectionCellFoundation(adapter);

    const handleChange = (e: CheckboxEvent) => foundation.handleChange(e);

    return () => {
        const { selected, getCheckboxProps, indeterminate, disabled, prefixCls, className } = props;
        const ariaLabel = props['aria-label'];
        let checkboxProps = {
            onChange: handleChange,
            disabled,
            indeterminate,
            checked: selected,
        };

        if (typeof getCheckboxProps === 'function') {
            checkboxProps = { ...checkboxProps, ...getCheckboxProps() };
        }

        const wrapCls = classnames(
          `${prefixCls}-selection-wrap`,
          {
              [`${prefixCls}-selection-disabled`]: disabled,
          },
          className
        );

        return (
          <span class={wrapCls}>
                <Checkbox aria-label={ariaLabel} {...checkboxProps} />
            </span>
        );
    };
}, {
    props: vuePropsType,
    name: 'TableSelectionCell'
});


export default TableSelectionCell;
