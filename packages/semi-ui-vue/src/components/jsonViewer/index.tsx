
import * as PropTypes from '../PropTypes';
import classNames from 'classnames';
import JsonViewerFoundation, {
  JsonViewerOptions,
  JsonViewerAdapter,
} from '@douyinfe/semi-foundation/jsonViewer/foundation';
import '@douyinfe/semi-foundation/jsonViewer/jsonViewer.scss';
import { cssClasses } from '@douyinfe/semi-foundation/jsonViewer/constants';
import ButtonGroup from '../button/ButtonGroup';
import Button from '../button';
import Input from '../input';
import DragMove from '../dragMove';
import {
  IconCaseSensitive,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconRegExp,
  IconSearch,
  IconWholeWord,
} from '@kousum/semi-icons-vue';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import {
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  onMounted,
  PropType,
  reactive,
  shallowRef, Teleport,
  useSlots, VNode,
  watch,
} from 'vue';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { styleNum } from '../_utils';
import { isEqual } from 'lodash';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
const LocaleConsumer = LocaleConsumerFunc<Locale['JsonViewer']>();

const prefixCls = cssClasses.PREFIX;

export type { JsonViewerOptions };
export interface JsonViewerProps extends BaseProps {
  value: string;
  width: number | string;
  height: number | string;
  showSearch?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string) => void;
  renderTooltip?: (value: string, el: HTMLElement) => HTMLElement;
  options?: JsonViewerOptions
}

export interface JsonViewerState {
  searchOptions: SearchOptions;
  showSearchBar: boolean;
  customRenderMap: Map<HTMLElement, VNode>
}

export interface SearchOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean
}

const propTypes: CombineProps<JsonViewerProps> = {
  style: Object,
  className: String,
  value: {
    type: String,
    required: true,
  },
  height: {
    type: [Number, String],
    required: true,
  },
  width: {
    type: [Number, String],
    required: true,
  },
  showSearch: Boolean,
  onChange: PropTypes.func as PropType<JsonViewerProps['onChange']>,
  options: Object,
  renderTooltip: PropTypes.func as PropType<JsonViewerProps['renderTooltip']>,

}
const defaultProps: Partial<JsonViewerProps> = {
  width: 400,
  height: 400,
  value: '',
  options: {
    readOnly: false,
    autoWrap: true
  }
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const JsonViewerCom = defineComponent({
  props: { ...vuePropsType },
  name: 'JsonViewerCom',
  setup(props, { expose, attrs }) {
    const slots = useSlots();
    const state = reactive<JsonViewerState>({
      searchOptions: {
        caseSensitive: false,
        wholeWord: false,
        regex: false,
      },
      showSearchBar: false,
      customRenderMap: new Map(),
    })
    const editorRef = shallowRef()
    const searchInputRef = shallowRef()
    const replaceInputRef = shallowRef()
    let isComposing: boolean = false;

    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state)

    function adapter_(): JsonViewerAdapter<JsonViewerProps, JsonViewerState> {
      return {
        ...adapterInject(),
        getEditorRef: () => editorRef.value,
        getSearchRef: () => searchInputRef.value,
        notifyChange: value => {
          props.onChange?.(value);
        },
        notifyHover: (value, el) => {
          const res = props.renderTooltip?.(value, el);
          return res;
        },
        notifyCustomRender: (customRenderMap) => {
          state.customRenderMap = customRenderMap;
        },
        setSearchOptions: (key: string) => {
          state.searchOptions = {
            ...state.searchOptions,
            [key]: !state.searchOptions[key],
          }
          nextTick(()=>{
            searchHandler();
          })
        },
        showSearchBar: () => {
          state.showSearchBar = !state.showSearchBar
          state.searchOptions = {
            caseSensitive: false,
            wholeWord: false,
            regex: false,
          }
        },
      };
    }
    const adapter = adapter_()
    const foundation = new JsonViewerFoundation(adapter);

    onMounted(()=>{
      foundation.init();
    })
    watch([
      ()=>props.options,
      ()=>props.value,
    ], ([options, value], [oldOptions, oldValue], onCleanup)=>{
      if (oldValue !== value || !isEqual(options, oldOptions)) {
        foundation.jsonViewer.dispose();
        foundation.init();
      }
    })



    function getValue() {
      return foundation.jsonViewer.getModel().getValue();
    }

    function format() {
      foundation.jsonViewer.format();
    }

    function search(searchText: string, caseSensitive?: boolean, wholeWord?: boolean, regex?: boolean) {
      foundation.search(searchText, caseSensitive, wholeWord, regex);
    }

    function getSearchResults() {
      return foundation.getSearchResults();
    }

    function prevSearch(step?: number) {
      foundation.prevSearch(step);
    }

    function nextSearch(step?: number) {
      foundation.nextSearch(step);
    }

    function replace(replaceText: string) {
      foundation.replace(replaceText);
    }

    function replaceAll(replaceText: string) {
      foundation.replaceAll(replaceText);
    }

    expose({
      getValue,
      format,
      search,
      getSearchResults,
      prevSearch,
      nextSearch,
      replace,
      replaceAll,
    })

    function getStyle() {
      const { width, height } = props;
      return {
        width: styleNum(width),
        height: styleNum(height),
      };
    }

    const searchHandler = () => {
      const value = searchInputRef.value?.value;
      foundation.search(value);
    };

    const changeSearchOptions = (key: string) => {
      foundation.setSearchOptions(key);
    };

    function renderSearchBox() {
      return (
        <div class={`${prefixCls}-search-bar-container`} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          {renderSearchBar()}
          {renderReplaceBar()}
        </div>
      );
    }

    function renderSearchOptions() {
      const searchOptionItems = [
        {
          key: 'caseSensitive',
          icon: IconCaseSensitive,
        },
        {
          key: 'regex',
          icon: IconRegExp,
        },
        {
          key: 'wholeWord',
          icon: IconWholeWord,
        },
      ];

      return (
        <ul class={`${prefixCls}-search-options`}>
          {searchOptionItems.map(({ key, icon: Icon }) => (
            <li
              key={key}
              class={classNames(`${prefixCls}-search-options-item`, {
                [`${prefixCls}-search-options-item-active`]: state.searchOptions[key],
              })}
            >
              <Icon onClick={() => changeSearchOptions(key)} />
            </li>
          ))}
        </ul>
      );
    }

    function renderSearchBar() {
      return (
        <LocaleConsumer
          componentName="JsonViewer"
        >
          {(locale: Locale['JsonViewer'], localeCode: Locale['code']) => (
            <div class={`${prefixCls}-search-bar`}>
              <Input
                placeholder={locale.search}
                className={`${prefixCls}-search-bar-input`}
                onChange={(_value, e) => {
                  e.preventDefault();
                  if (!isComposing) {
                    searchHandler();
                  }
                  searchInputRef.value?.focus();
                }}
                onCompositionstart={() => {
                  isComposing = true;
                }}
                onCompositionend={() => {
                  isComposing = false;
                  searchHandler();
                  searchInputRef.value?.focus();
                }}
                ref={searchInputRef}
              />
              {renderSearchOptions()}
              <ButtonGroup>
                <Button
                  icon={<IconChevronLeft />}
                  onClick={e => {
                    e.preventDefault();
                    foundation.prevSearch();
                  }}
                />
                <Button
                  icon={<IconChevronRight />}
                  onClick={e => {
                    e.preventDefault();
                    foundation.nextSearch();
                  }}
                />
              </ButtonGroup>
              <Button
                icon={<IconClose />}
                size="small"
                theme={'borderless'}
                type={'tertiary'}
                onClick={() => foundation.showSearchBar()}
              />
            </div>
          )}
        </LocaleConsumer>
      );
    }

    function renderReplaceBar() {
      const { readOnly } = props.options;

      return (
        <LocaleConsumer
          componentName="JsonViewer"
        >
          {(locale: Locale['JsonViewer'], localeCode: Locale['code']) => (
            <div class={`${prefixCls}-replace-bar`}>
              <Input
                placeholder={locale.replace}
                className={`${prefixCls}-replace-bar-input`}
                onChange={(value, e) => {
                  e.preventDefault();
                }}
                ref={replaceInputRef}
              />
              <Button
                style={{ width: 'fit-content' }}
                disabled={readOnly}
                onClick={() => {
                  const value = replaceInputRef.value?.value;
                  foundation.replace(value);
                }}
              >
                {locale.replace}
              </Button>
              <Button
                style={{ width: 'fit-content' }}
                disabled={readOnly}
                onClick={() => {
                  const value = replaceInputRef.value?.value;
                  foundation.replaceAll(value);
                }}
              >
                {locale.replaceAll}
              </Button>
            </div>
          )}
        </LocaleConsumer>
      );
    }



    return () => {

      let isDragging = false;
      const { width, className, style, showSearch = true, ...rest } = props;
      return (
        <>
          <div style={{ ...getStyle(), position: 'relative', ...style }} class={className} {...getDataAttr()}>
            <div
              style={{ ...getStyle(), padding: '12px 0' }}
              ref={editorRef}
              class={classNames(prefixCls, `${prefixCls}-background`)}
            ></div>
            {showSearch && <DragMove
              onMouseDown={() => {
                isDragging = false;
              }}
              onMouseMove={() => {
                isDragging = true;
              }}
            >
              <div style={{ position: 'absolute', top: '20px', left: styleNum(width) }}>
                {!state.showSearchBar ? (
                  <Button
                    className={`${prefixCls}-search-bar-trigger`}
                    onClick={e => {
                      e.preventDefault();
                      if (isDragging) {
                        e.stopPropagation();
                        e.preventDefault();
                        return;
                      }
                      foundation.showSearchBar();
                    }}
                    icon={<IconSearch />}
                    style={{ position: 'absolute', top: 20, right: 20 }}
                  />
                ) : (
                  renderSearchBox()
                )}
              </div>
            </DragMove>}
          </div>
          {Array.from(state.customRenderMap.entries()).map(([key, value]) => {
            // key.innerHTML = '';
            return <Teleport to={key}>
              {value}
            </Teleport>
          })}
        </>
      );
    };
  },
});



export default JsonViewerCom;
