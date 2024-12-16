
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
  shallowRef,
  useSlots,
  watch,
} from 'vue';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { styleNum } from '../_utils';
const prefixCls = cssClasses.PREFIX;

export type { JsonViewerOptions };
export interface JsonViewerProps extends BaseProps {
  value: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string) => void;
  renderTooltip?: (value: string, el: HTMLElement) => HTMLElement;
  options?: JsonViewerOptions
}

export interface JsonViewerState {
  searchOptions: SearchOptions;
  showSearchBar: boolean
}

interface SearchOptions {
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
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  onChange: PropTypes.func as PropType<JsonViewerProps['onChange']>,
  options: Object,
  renderTooltip: PropTypes.func as PropType<JsonViewerProps['renderTooltip']>,

}
const defaultProps: Partial<JsonViewerProps> = {
  width: 400,
  height: 400,
  value: '',
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
    })
    const editorRef = shallowRef()
    const searchInputRef = shallowRef()
    const replaceInputRef = shallowRef()

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
        },
      };
    }
    const adapter = adapter_()
    const foundation = new JsonViewerFoundation(adapter);

    onMounted(()=>{
      foundation.init();
    })
    watch(()=>props.options, (value, oldValue, onCleanup)=>{
      if (oldValue !== value) {
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

    expose({
      getValue,
      format,
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
        <div class={`${prefixCls}-search-bar-container`}>
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
        <div class={`${prefixCls}-search-bar`}>
          <Input
            placeholder="查找"
            className={`${prefixCls}-search-bar-input`}
            onChange={(_value, e) => {
              e.preventDefault();
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
      );
    }

    function renderReplaceBar() {
      return (
        <div class={`${prefixCls}-replace-bar`}>
          <Input
            placeholder="替换"
            className={`${prefixCls}-replace-bar-input`}
            onChange={(value, e) => {
              e.preventDefault();
            }}
            ref={replaceInputRef}
          />
          <Button
            onClick={() => {
              const value = replaceInputRef.value?.value;
              foundation.replace(value);
            }}
          >
            替换
          </Button>
          <Button
            onClick={() => {
              const value = replaceInputRef.value?.value;
              foundation.replaceAll(value);
            }}
          >
            全部替换
          </Button>
        </div>
      );
    }



    return () => {

      let isDragging = false;
      const { width, className, style, ...rest } = props;
      return (
        <>
          <div style={{ ...getStyle(), position: 'relative', ...style }} class={className} {...getDataAttr()}>
            <div
              style={{ ...getStyle(), padding: '12px 0' }}
              ref={editorRef}
              class={classNames(prefixCls, `${prefixCls}-background`)}
            ></div>
            <DragMove
              onMouseDown={() => {
                isDragging = false;
              }}
              onMouseMove={() => {
                isDragging = true;
              }}
            >
              <div style={{ position: 'absolute', top: '20px', left: styleNum(width - 52) }}>
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
                  />
                ) : (
                  renderSearchBox()
                )}
              </div>
            </DragMove>
          </div>
        </>
      );
    };
  },
});



export default JsonViewerCom;
