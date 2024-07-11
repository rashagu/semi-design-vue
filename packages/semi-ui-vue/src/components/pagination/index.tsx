import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import { FixedSizeList as List } from '@kousum/vue3-window';
import { noop } from 'lodash';

import PaginationFoundation, {
  AdapterPageList,
  KeyDownHandler,
  PageList,
  PaginationAdapter,
} from '@douyinfe/semi-foundation/pagination/foundation';
import { cssClasses, numbers } from '@douyinfe/semi-foundation/pagination/constants';
import '@douyinfe/semi-foundation/pagination/pagination.scss';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { IconChevronLeft, IconChevronRight } from '@kousum/semi-icons-vue';
import warning from '@douyinfe/semi-foundation/utils/warning';

import LocaleConsumer from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
import Select, { SelectOption } from '../select/index';
import InputNumber from '../inputNumber/index';
import Popover from '../popover/index';
import { Position } from '../tooltip';
import { CombineProps, VueJsxNode } from '../interface';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { useConfigContext } from '../configProvider/context/Consumer';
import { useBaseComponent } from '../_base/baseComponent';
import { vuePropsMake } from '../PropTypes';

const prefixCls = cssClasses.PREFIX;

export interface PaginationProps {
  total?: number;
  showTotal?: boolean;
  pageSize?: number;
  pageSizeOpts?: Array<number>;
  size?: 'small' | 'default';
  currentPage?: number;
  defaultCurrentPage?: number;
  onPageChange?: (currentPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  onChange?: (currentPage: number, pageSize: number) => void;
  prevText?: VueJsxNode;
  nextText?: VueJsxNode;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  popoverZIndex?: number;
  popoverPosition?: PopoverPosition;
  style?: CSSProperties;
  className?: string;
  hideOnSinglePage?: boolean;
  hoverShowPageSelect?: boolean;
  disabled?: boolean;

  position?: string;
}

export interface PaginationState {
  total: number;
  showTotal: boolean;
  currentPage: number;
  pageSize: number;
  pageList: PageList;
  prevDisabled: boolean;
  quickJumpPage: string | number;
  nextDisabled: boolean;
  restLeftPageList: number[];
  restRightPageList: number[];
  allPageNumbers: number[];
}

export type PaginationLocale = Locale['Pagination'];
export type PopoverPosition = Position;
export type { PageList };

const propTypes: CombineProps<PaginationProps> = {
  total: PropTypes.number,
  showTotal: PropTypes.bool,
  pageSize: PropTypes.number,
  pageSizeOpts: PropTypes.array,
  size: PropTypes.string as PropType<PaginationProps['size']>,
  currentPage: PropTypes.number,
  defaultCurrentPage: PropTypes.number,
  onPageChange: PropTypes.func as PropType<PaginationProps['onPageChange']>,
  onPageSizeChange: PropTypes.func as PropType<PaginationProps['onPageSizeChange']>,
  onChange: PropTypes.func as PropType<PaginationProps['onChange']>,
  prevText: PropTypes.node,
  nextText: PropTypes.node,
  showSizeChanger: PropTypes.bool,
  popoverZIndex: PropTypes.number,
  popoverPosition: PropTypes.string as PropType<PaginationProps['popoverPosition']>,
  style: PropTypes.object,
  className: PropTypes.string,
  hideOnSinglePage: PropTypes.bool,
  hoverShowPageSelect: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  disabled: PropTypes.bool,

  position: PropTypes.string as PropType<PaginationProps['position']>,
};

const defaultProps = {
  total: 1,
  popoverZIndex: popoverNumbers.DEFAULT_Z_INDEX,
  showTotal: false,
  pageSize: null as null,
  pageSizeOpts: numbers.PAGE_SIZE_OPTION,
  defaultCurrentPage: 1,
  size: 'default',
  onPageChange: noop,
  onPageSizeChange: noop,
  onChange: noop,
  showSizeChanger: false,
  className: '',
  hideOnSinglePage: false,
  showQuickJumper: false,
  disabled: false,
};
export const vuePropsType = vuePropsMake<PaginationProps>(propTypes, defaultProps);
const Pagination = defineComponent({
  props: { ...vuePropsType },
  name: 'Pagination',
  setup(props, {}) {
    const slots = useSlots();
    const { context } = useConfigContext();
    const total = props.total;

    const pageSize = props.pageSize || props.pageSizeOpts[0] || numbers.DEFAULT_PAGE_SIZE; // Use pageSize first, use the first of pageSizeOpts when not, use the default value when none

    const shouldFillAllNumber = props.size === 'small' && props.hoverShowPageSelect && !props.disabled;

    const state = reactive<PaginationState>({
      total,
      showTotal: props.showTotal,
      currentPage: props.currentPage || props.defaultCurrentPage,
      pageSize,
      pageList: [],
      prevDisabled: false,
      nextDisabled: false,
      restLeftPageList: [],
      restRightPageList: [],
      quickJumpPage: '',
      allPageNumbers: shouldFillAllNumber ? Array.from({ length: Math.ceil(total / pageSize) }, (v, i) => i + 1) : [], // only need to count in smallPage mode, when props.size = small
    });

    const { adapter: adapterInject, getDataAttr } = useBaseComponent<PaginationProps>(props, state);
    function adapter_(): PaginationAdapter<PaginationProps, PaginationState> {
      return {
        ...adapterInject(),
        setPageList: (pageListState: AdapterPageList) => {
          const { pageList, restLeftPageList, restRightPageList } = pageListState;
          state.pageList = pageList;
          state.restLeftPageList = restLeftPageList;
          state.restRightPageList = restRightPageList;
        },
        setDisabled: (prevIsDisabled: boolean, nextIsDisabled: boolean) => {
          state.prevDisabled = prevIsDisabled;
          state.nextDisabled = nextIsDisabled;
        },
        updateTotal: (total: number) => (state.total = total),
        updatePageSize: (pageSize: number) => (state.pageSize = pageSize),
        updateQuickJumpPage: (quickJumpPage: string | number) => (state.quickJumpPage = quickJumpPage),
        // updateRestPageList: () => {},
        setCurrentPage: (pageIndex: number) => {
          state.currentPage = pageIndex;
        },
        registerKeyDownHandler: (handler: KeyDownHandler) => {
          document.addEventListener('keydown', handler);
        },
        updateAllPageNumbers: (allPageNumbers: number[]) => (state.allPageNumbers = allPageNumbers),
        unregisterKeyDownHandler: (handler: KeyDownHandler) => {
          document.removeEventListener('keydown', handler);
        },
        notifyPageChange: (pageIndex: number) => {
          props.onPageChange(pageIndex);
        },
        notifyPageSizeChange: (pageSize: number) => {
          props.onPageSizeChange(pageSize);
        },
        notifyChange: (pageIndex: number, pageSize: number) => {
          props.onChange(pageIndex, pageSize);
        },
      };
    }

    const adapter = adapter_();
    const foundation = new PaginationFoundation(adapter);
    warning(
      Boolean(props.showSizeChanger && props.hideOnSinglePage),
      '[Semi Pagination] You should not use showSizeChanger and hideOnSinglePage in ths same time. At this time, hideOnSinglePage no longer takes effect, otherwise there may be a problem that the switch entry disappears'
    );
    onMounted(() => {
      foundation.init();
    });
    onUnmounted(() => {
      foundation.destroy();
    });
    watch(
      [() => props.currentPage, () => props.total, () => props.pageSize],
      (value, [prevPropsCurrentPage, prevPropsTotal, prevPropsPageSize], onCleanup) => {
        const pagerProps = {
          currentPage: props.currentPage,
          total: props.total,
          pageSize: props.pageSize,
        };

        let pagerHasChanged = false;
        let allPageNumberNeedUpdate = false;

        if (prevPropsCurrentPage !== props.currentPage) {
          pagerHasChanged = true;
          // foundation.updatePage(props.currentPage);
        }

        if (prevPropsTotal !== props.total) {
          pagerHasChanged = true;
          allPageNumberNeedUpdate = true;
        }

        if (prevPropsPageSize !== props.pageSize) {
          pagerHasChanged = true;
          allPageNumberNeedUpdate = true;
        }

        if (pagerHasChanged) {
          foundation.updatePage(pagerProps.currentPage, pagerProps.total, pagerProps.pageSize);
        }

        if (allPageNumberNeedUpdate) {
          foundation.updateAllPageNumbers(pagerProps.total, pagerProps.pageSize);
        }
      }
    );

    function renderPrevBtn() {
      const { prevText, disabled } = props;
      const { prevDisabled } = state;
      const isDisabled = prevDisabled || disabled;
      const preClassName = classNames({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-prev`]: true,
        [`${prefixCls}-item-disabled`]: isDisabled,
      });
      return (
        <li
          role="button"
          aria-disabled={isDisabled ? true : false}
          aria-label="Previous"
          onClick={(e) => !isDisabled && foundation.goPrev()}
          class={preClassName}
          x-semi-prop="prevText"
        >
          {prevText || <IconChevronLeft size="large" />}
        </li>
      );
    }

    function renderNextBtn() {
      const { nextText, disabled } = props;
      const { nextDisabled } = state;
      const isDisabled = nextDisabled || disabled;
      const nextClassName = classNames({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-disabled`]: isDisabled,
        [`${prefixCls}-next`]: true,
      });
      return (
        <li
          role="button"
          aria-disabled={isDisabled ? true : false}
          aria-label="Next"
          onClick={(e) => !isDisabled && foundation.goNext()}
          class={nextClassName}
          x-semi-prop="nextText"
        >
          {nextText || <IconChevronRight size="large" />}
        </li>
      );
    }

    function renderPageSizeSwitch(locale: PaginationLocale) {
      // rtl modify the default position
      const { direction } = context.value;
      const defaultPopoverPosition = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
      const { showSizeChanger, popoverPosition = defaultPopoverPosition, disabled, popoverZIndex } = props;
      const { pageSize } = state;
      const switchCls = classNames(`${prefixCls}-switch`);
      if (!showSizeChanger) {
        return null;
      }

      const newPageSizeOpts = foundation.pageSizeInOpts();
      const pageSizeToken = locale.pageSize;
      const options = newPageSizeOpts.map((size: number) => (
        <SelectOption value={size} key={size}>
          <span>{pageSizeToken.replace('${pageSize}', size.toString())}</span>
        </SelectOption>
      ));
      return (
        <div class={switchCls}>
          <Select
            aria-label="Page size selector"
            disabled={disabled}
            onChange={(newPageSize) => {
              foundation.changePageSize(newPageSize as any);
            }}
            value={pageSize}
            key={pageSize}
            position={popoverPosition || 'bottomRight'}
            clickToHide
            zIndex={popoverZIndex}
            dropdownClassName={`${prefixCls}-select-dropdown`}
          >
            {options}
          </Select>
        </div>
      );
    }

    function renderQuickJump(locale: PaginationLocale) {
      const { showQuickJumper, disabled } = props;
      const { quickJumpPage, total, pageSize } = state;
      if (!showQuickJumper) {
        return null;
      }
      const totalPageNum = foundation._getTotalPageNumber(total, pageSize);
      const isDisabled = totalPageNum === 1 || disabled;
      const quickJumpCls = classNames({
        [`${prefixCls}-quickjump`]: true,
        [`${prefixCls}-quickjump-disabled`]: isDisabled,
      });

      return (
        <div class={quickJumpCls}>
          <span>{locale.jumpTo}</span>
          <InputNumber
            value={quickJumpPage}
            className={`${prefixCls}-quickjump-input-number`}
            hideButtons
            disabled={isDisabled}
            onBlur={(e: FocusEvent) => foundation.handleQuickJumpBlur()}
            onEnterPress={(e: KeyboardEvent) => foundation.handleQuickJumpEnterPress((e.target as any).value)}
            onChange={(v: string | number) => foundation.handleQuickJumpNumberChange(v)}
          />
          <span>{locale.page}</span>
        </div>
      );
    }

    function renderPageList() {
      const { pageList, currentPage, restLeftPageList, restRightPageList } = state;
      const { popoverPosition, popoverZIndex, disabled } = props;

      return pageList.map((page, i) => {
        const pageListClassName = classNames(`${prefixCls}-item`, {
          [`${prefixCls}-item-active`]: currentPage === page,
          [`${prefixCls}-item-all-disabled`]: disabled,
          [`${prefixCls}-item-all-disabled-active`]: currentPage === page && disabled,
          // [`${prefixCls}-item-rest-opening`]: (i < 3 && isLeftRestHover && page ==='...') || (i > 3 && isRightRestHover && page === '...')
        });
        const pageEl = (
          <li
            key={`${page}${i}`}
            onClick={() => !disabled && foundation.goPage(page)}
            class={pageListClassName}
            aria-label={page === '...' ? 'More' : `Page ${page}`}
            aria-current={currentPage === page ? 'page' : false}
          >
            {page}
          </li>
        );
        if (page === '...' && !disabled) {
          let content;
          i < 3 ? (content = restLeftPageList) : (content = restRightPageList);
          return (
            <Popover
              rePosKey={props.currentPage}
              trigger="hover"
              // onVisibleChange={visible=>handleRestHover(visible, i < 3 ? 'left' : 'right')}
              content={renderRestPageList(content)}
              key={`${page}${i}`}
              position={popoverPosition}
              zIndex={popoverZIndex}
            >
              {pageEl}
            </Popover>
          );
        }
        return pageEl;
      });
    }

    function renderRestPageList(restList: ('...' | number)[]) {
      // The number of pages may be tens of thousands, here is virtualized with the help of react-window
      const { direction } = context.value;
      const className = classNames(`${prefixCls}-rest-item`);
      const count = restList.length;
      const row = (item: { index: number; style: CSSProperties }) => {
        const { index, style } = item;
        const page = restList[index];
        return (
          <div
            role="listitem"
            key={`${page}${index}`}
            class={className}
            onClick={() => foundation.goPage(page)}
            style={style}
            aria-label={`${page}`}
          >
            {page}
          </div>
        );
      };
      const itemHeight = 32;
      const listHeight = count >= 5 ? itemHeight * 5 : itemHeight * count;
      return (
        // @ts-ignore skip type check cause react-window not update with @types/react 18
        <List
          className={`${prefixCls}-rest-list`}
          itemData={restList}
          itemSize={itemHeight}
          width={78}
          itemCount={count}
          height={listHeight}
          style={{ direction }}
        >
          {row}
        </List>
      );
    }

    function renderSmallPageSelect(content: VNode) {
      const allPageNumbers = state.allPageNumbers;
      const pageList = renderRestPageList(allPageNumbers);

      return <Popover content={pageList}>{content}</Popover>;
    }

    function renderSmallPage(locale: PaginationLocale) {
      const { className, style, hideOnSinglePage, hoverShowPageSelect, showSizeChanger, disabled, ...rest } = props;
      const paginationCls = classNames(`${prefixCls}-small`, prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
      });
      const { currentPage, total, pageSize } = state;
      const totalPageNum = Math.ceil(total / pageSize);
      if (totalPageNum < 2 && hideOnSinglePage && !showSizeChanger) {
        return null;
      }

      const pageCls = classNames({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-small`]: true,
        [`${prefixCls}-item-all-disabled`]: disabled,
      });

      const content = (
        <div class={pageCls}>
          {currentPage}/{totalPageNum}{' '}
        </div>
      );

      return (
        <div class={paginationCls} style={style} {...getDataAttr()}>
          {renderPrevBtn()}
          {hoverShowPageSelect && !disabled ? renderSmallPageSelect(content) : content}
          {renderNextBtn()}
          {renderQuickJump(locale)}
        </div>
      );
    }

    function renderDefaultPage(locale: PaginationLocale) {
      const { total, pageSize } = state;
      const { showTotal, className, style, hideOnSinglePage, showSizeChanger, disabled, ...rest } = props;
      const paginationCls = classNames(className, `${prefixCls}`, { [`${prefixCls}-disabled`]: disabled });
      const showTotalCls = `${prefixCls}-total`;
      const totalPageNum = Math.ceil(total / pageSize);
      if (totalPageNum < 2 && hideOnSinglePage && !showSizeChanger) {
        return null;
      }
      const totalNum = Math.ceil(total / pageSize);
      const totalToken = locale.total.replace('${total}', totalNum.toString());

      return (
        <ul class={paginationCls} style={style} {...getDataAttr()}>
          {showTotal ? <span class={showTotalCls}>{totalToken}</span> : null}
          {renderPrevBtn()}
          {renderPageList()}
          {renderNextBtn()}
          {renderPageSizeSwitch(locale)}
          {renderQuickJump(locale)}
        </ul>
      );
    }

    return () => {
      const { size } = props;
      return (
        <LocaleConsumer componentName="Pagination">
          {(locale: PaginationLocale) => (size === 'small' ? renderSmallPage(locale) : renderDefaultPage(locale))}
        </LocaleConsumer>
      );
    };
  },
});

export default Pagination;
