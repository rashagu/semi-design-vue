import * as PropTypes from '../PropTypes';

export default {
    align: String,
    className: PropTypes.string,
    colSpan: PropTypes.number,
    dataIndex: PropTypes.string,
    defaultSortOrder: String,
    filterChildrenRecord: PropTypes.bool,
    filterDropdownProps: PropTypes.object,
    filterDropdown: PropTypes.node,
    filterDropdownVisible: PropTypes.bool,
    filterIcon: PropTypes.func,
    filterMultiple: PropTypes.bool,
    filteredValue: PropTypes.any,
    filters: PropTypes.array,
    fixed: String,
    onCell: PropTypes.func,
    onFilter: PropTypes.func,
    onFilterDropdownVisibleChange: PropTypes.func,
    onHeaderCell: PropTypes.func,
    onSorterChange: PropTypes.func, // TODO: future api
    render: PropTypes.func,
    renderFilterDropdownItem: PropTypes.func,
    sortChildrenRecord: PropTypes.bool,
    sortDirections: String, // TODO: future api
    sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    useFullRender: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
