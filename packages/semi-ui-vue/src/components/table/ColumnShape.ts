import * as PropTypes from '../PropTypes';
import { ComponentObjectPropsOptions, PropType } from 'vue';
import {ColumnProps} from "./interface";

const ColumnShape: ComponentObjectPropsOptions<Required<ColumnProps>> = {
    align: String as PropType<ColumnProps['align']>,
    className: PropTypes.string,
    colSpan: PropTypes.number,
    dataIndex: PropTypes.string,
    defaultSortOrder: String as PropType<ColumnProps['defaultSortOrder']>,
    filterChildrenRecord: PropTypes.bool,
    filterDropdownProps: PropTypes.object,
    filterDropdown: PropTypes.node,
    filterDropdownVisible: PropTypes.bool,
    filterIcon: [PropTypes.object, PropTypes.func] as PropType<ColumnProps['filterIcon']>,
    filterMultiple: PropTypes.bool,
    filteredValue: PropTypes.array,
    filters: PropTypes.array,
    fixed: String as PropType<ColumnProps['fixed']>,
    onCell: PropTypes.func as PropType<ColumnProps['onCell']>,
    onFilter: PropTypes.func as PropType<ColumnProps['onFilter']>,
    onFilterDropdownVisibleChange: PropTypes.func as PropType<ColumnProps['onFilterDropdownVisibleChange']>,
    onHeaderCell: PropTypes.func as PropType<ColumnProps['onHeaderCell']>,
    //@ts-ignore
    onSorterChange: PropTypes.func as PropType<ColumnProps['onSorterChange']>, // TODO: future api
    render: PropTypes.func as PropType<ColumnProps['render']>,
    renderFilterDropdownItem: PropTypes.func as PropType<ColumnProps['renderFilterDropdownItem']>,
    sortChildrenRecord: PropTypes.bool,
    sortDirections: String, // TODO: future api
    sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    useFullRender: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
export default ColumnShape
