import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  VNode,
  CSSProperties,
  reactive,
  onMounted,
  isVNode,
  watch
} from 'vue'
import * as PropTypes from '../PropTypes'
import cls from 'classnames';
import {
  noop,
  isString,
  isArray,
  isNull,
  isUndefined,
  isFunction
} from 'lodash';
import {cssClasses, strings} from '@douyinfe/semi-foundation/tagInput/constants';
import '@douyinfe/semi-foundation/tagInput/tagInput.scss';
import TagInputFoundation, {TagInputAdapter, OnSortEndProps} from '@douyinfe/semi-foundation/tagInput/foundation';
import {ArrayElement} from '../_base/base';
import {useBaseComponent} from '../_base/baseComponent';
import Tag from '../tag';
import Input from '../input';
import Popover, {PopoverProps} from '../popover';
import Paragraph from '../typography/Paragraph';
import {IconClear} from '@kousum/semi-icons-vue';
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";
import {isSemiIcon} from "../_utils";
// import {TooltipProps} from "../tooltip/Index";
// import {AvatarProps, AvatarState} from "../avatar/Index";

export type Size = ArrayElement<typeof strings.SIZE_SET>;
export type RestTagsPopoverProps = PopoverProps;
type ValidateStatus = "default" | "error" | "warning";

export interface TagInputProps {
  className?: string;
  defaultValue?: string[];
  disabled?: boolean;
  inputValue?: string;
  maxLength?: number;
  max?: number;
  maxTagCount?: number;
  showRestTagsPopover?: boolean;
  restTagsPopoverProps?: RestTagsPopoverProps;
  showContentTooltip?: boolean;
  allowDuplicates?: boolean;
  addOnBlur?: boolean;
  draggable?: boolean;
  expandRestTagsOnClick?: boolean;
  onAdd?: (addedValue: string[]) => void;
  onBlur?: (e: MouseEvent) => void;
  onChange?: (value: string[]) => void;
  onExceed?: ((value: string[]) => void);
  onFocus?: (e: MouseEvent) => void;
  onInputChange?: (value: string, e: MouseEvent) => void;
  onInputExceed?: ((value: string) => void);
  onKeyDown?: (e: MouseEvent) => void;
  onRemove?: (removedValue: string, idx: number) => void;
  placeholder?: string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  prefix?: VNode | string;
  renderTagItem?: (value: string, index: number, onClose: () => void) => VueJsxNode;
  separator?: string | string[] | null;
  showClear?: boolean;
  size?: Size;
  style?: CSSProperties;
  suffix?: VNode | string;
  validateStatus?: ValidateStatus;
  value?: string[] | undefined;
  autoFocus?: boolean;
  'aria-label'?: string;
  preventScroll?: boolean


}

export interface TagInputState {
  tagsArray?: string[];
  inputValue?: string;
  focusing?: boolean;
  hovering?: boolean;
  active?: boolean
}

const prefixCls = cssClasses.PREFIX;

const propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  allowDuplicates: PropTypes.bool,
  max: PropTypes.number,
  maxTagCount: PropTypes.number,
  maxLength: PropTypes.number,
  showRestTagsPopover: PropTypes.bool,
  restTagsPopoverProps: PropTypes.object,
  showContentTooltip: PropTypes.bool,
  defaultValue: PropTypes.array,
  value: PropTypes.array,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  showClear: PropTypes.bool,
  addOnBlur: PropTypes.bool,
  draggable: PropTypes.bool,
  expandRestTagsOnClick: PropTypes.bool,
  autoFocus: PropTypes.bool,
  renderTagItem: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onExceed: PropTypes.func,
  onInputExceed: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onKeyDown: PropTypes.func,
  size: PropTypes.string,
  validateStatus: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  'aria-label': PropTypes.string,
  preventScroll: PropTypes.bool,

}
const defaultProps = {
  showClear: false,
  addOnBlur: false,
  allowDuplicates: true,
  showRestTagsPopover: true,
  autoFocus: false,
  draggable: false,
  expandRestTagsOnClick: true,
  showContentTooltip: true,
  separator: ',',
  size: 'default' as const,
  validateStatus: 'default' as const,
  onBlur: noop,
  onFocus: noop,
  onChange: noop,
  onInputChange: noop,
  onExceed: noop,
  onInputExceed: noop,
  onAdd: noop,
  onRemove: noop,
  onKeyDown: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Index = defineComponent<TagInputProps>((props, {expose}) => {
  const slots = useSlots()
  const inputRef = ref(null);
  const tagInputRef = ref<any>(null);
  let clickOutsideHandler:any = null;
  const state = reactive({
    tagsArray: props.defaultValue || [],
    inputValue: '',
    focusing: false,
    hovering: false,
    active: false,
  });

  const {cache, adapter: adapterInject, log, context} = useBaseComponent<TagInputProps>(props, state)

  const foundation = new TagInputFoundation(adapter());

  function adapter(): TagInputAdapter {
    return {
      ...adapterInject<TagInputProps, TagInputState>(),
      setInputValue: (inputValue: string) => {
        state.inputValue = inputValue
      },
      setTagsArray: (tagsArray: string[]) => {
        state.tagsArray = tagsArray
      },
      setFocusing: (focusing: boolean) => {
        state.focusing = focusing
      },
      toggleFocusing: (isFocus: boolean) => {
        const { preventScroll } = props;
        const input = inputRef.value;
        if (isFocus) {
          input && input.focus({ preventScroll });
        } else {
          input && input.blur();
        }
        state.focusing = isFocus
      },
      setHovering: (hovering: boolean) => {
        state.hovering = hovering
      },
      setActive: (active: boolean) => {
        state.active = active
      },
      getClickOutsideHandler: () => {
        return clickOutsideHandler;
      },
      notifyBlur: (e: MouseEvent) => {
        props.onBlur(e);
      },
      notifyFocus: (e: MouseEvent) => {
        props.onFocus(e);
      },
      notifyInputChange: (v: string, e: MouseEvent) => {
        props.onInputChange(v, e);
      },
      notifyTagChange: (v: string[]) => {
        props.onChange(v);
      },
      notifyTagAdd: (v: string[]) => {
        props.onAdd(v);
      },
      notifyTagRemove: (v: string, idx: number) => {
        props.onRemove(v, idx);
      },
      notifyKeyDown: e => {
        props.onKeyDown(e);
      },
      registerClickOutsideHandler: cb => {
        clickOutsideHandler = (e: Event) => {
          const tagInputDom = tagInputRef.value;
          const target = e.target as Element;
          if (tagInputDom && !tagInputDom.contains(target)) {
            cb(e);
          }
        };
        document.addEventListener('click', clickOutsideHandler, false);
      },
      unregisterClickOutsideHandler: () => {
        document.removeEventListener('click', clickOutsideHandler, false);
        clickOutsideHandler = null;
      },
    };
  }

  // ok
  function getDerivedStateFromProps(nextProps: TagInputProps, prevState: TagInputState) {
    const {value, inputValue} = nextProps;
    const {tagsArray: prevTagsArray} = prevState;
    let tagsArray: string[];
    if (isArray(value)) {
      tagsArray = value;
    } else if ('value' in nextProps && !value) {
      tagsArray = [];
    } else {
      tagsArray = prevTagsArray;
    }
    return {
      tagsArray,
      inputValue: isString(inputValue) ? inputValue : prevState.inputValue
    };
  }
  watch(()=>props, (val)=>{
    const newState = getDerivedStateFromProps(props, state)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  }, {deep: true})

  onMounted(()=>{
    const { disabled, autoFocus, preventScroll } = props;
    if (!disabled && autoFocus) {
      inputRef.value.focus({ preventScroll });
      foundation.handleClick();
    }
    foundation.init();
  })

  const handleInputChange = (e: any) => {
    foundation.handleInputChange(e);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    foundation.handleKeyDown(e);
  };

  const handleInputFocus = (e: MouseEvent) => {
    foundation.handleInputFocus(e);
  };

  const handleInputBlur = (e: MouseEvent) => {
    foundation.handleInputBlur(e);
  };

  const handleClearBtn = (e: MouseEvent) => {
    foundation.handleClearBtn(e);
  };

  const handleClearEnterPress = (e: KeyboardEvent) => {
    foundation.handleClearEnterPress(e);
  };

  const handleTagClose = (idx: number) => {
    foundation.handleTagClose(idx);
  };

  const handleInputMouseLeave = (e: MouseEvent) => {
    foundation.handleInputMouseLeave();
  };

  const handleClick = (e: MouseEvent) => {
    foundation.handleClick(e);
  };

  const handleInputMouseEnter = (e: MouseEvent) => {
    foundation.handleInputMouseEnter();
  };

  const handleClickPrefixOrSuffix = (e: MouseEvent) => {
    foundation.handleClickPrefixOrSuffix(e);
  };

  const handlePreventMouseDown = (e: MouseEvent) => {
    foundation.handlePreventMouseDown(e);
  };

  function renderClearBtn() {
    const { hovering, tagsArray, inputValue } = state;
    const { showClear, disabled } = props;
    const clearCls = cls(`${prefixCls}-clearBtn`, {
      [`${prefixCls}-clearBtn-invisible`]: !hovering || (inputValue === '' && tagsArray.length === 0) || disabled,
    });
    if (showClear) {
      return (
        <div
          role="button"
          tabindex={0}
          aria-label="Clear TagInput value"
          class={clearCls}
          onClick={e => handleClearBtn(e)}
          onKeypress={e => handleClearEnterPress(e)}
        >
          <IconClear />
        </div>
      );
    }
    return null;
  }

  function renderPrefix() {
    const { prefix, insetLabel, insetLabelId } = props;
    const labelNode = prefix || insetLabel;
    if (isNull(prefix) || isUndefined(prefix)) {
      return null;
    }
    const prefixWrapperCls = cls(`${prefixCls}-prefix`, {
      [`${prefixCls}-inset-label`]: insetLabel,
      [`${prefixCls}-prefix-text`]: labelNode && isString(labelNode),
      // eslint-disable-next-line max-len
      [`${prefixCls}-prefix-icon`]: isSemiIcon(labelNode),
    });
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <div
        class={prefixWrapperCls}
        onMousedown={handlePreventMouseDown}
        onClick={handleClickPrefixOrSuffix}
        id={insetLabelId} x-semi-prop="prefix"
      >
        {labelNode}
      </div>
    );
  }

  function renderSuffix() {
    const { suffix } = props;
    if (isNull(suffix) || isUndefined(suffix)) {
      return null;
    }
    const suffixWrapperCls = cls(`${prefixCls}-suffix`, {
      [`${prefixCls}-suffix-text`]: suffix && isString(suffix),
      // eslint-disable-next-line max-len
      [`${prefixCls}-suffix-icon`]: isSemiIcon(suffix),
    });
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        class={suffixWrapperCls}
        onMousedown={handlePreventMouseDown}
        onClick={handleClickPrefixOrSuffix}
        x-semi-prop="suffix"
      >
        {suffix}
      </div>
    );
  }
  const getAllTags = () => {
    const {
      size,
      disabled,
      renderTagItem,
      showContentTooltip,
      draggable,
    } = props;
    const { tagsArray, active } = state;
    const showIconHandler = active && draggable;
    const tagCls = cls(`${prefixCls}-wrapper-tag`, {
      [`${prefixCls}-wrapper-tag-size-${size}`]: size,
      [`${prefixCls}-wrapper-tag-icon`]: showIconHandler,
    });
    const typoCls = cls(`${prefixCls}-wrapper-typo`, {
      [`${prefixCls}-wrapper-typo-disabled`]: disabled,
    });
    const itemWrapperCls = cls({
      [`${prefixCls}-drag-item`]: showIconHandler,
      [`${prefixCls}-wrapper-tag-icon`]: showIconHandler,
    });
    const DragHandle = SortableHandle(() => <IconHandle className={`${prefixCls}-drag-handler`}></IconHandle>);
    return tagsArray.map((value, index) => {
      const elementKey = showIconHandler ? value : `${index}${value}`;
      const onClose = () => {
        !disabled && handleTagClose(index);
      };
      if (isFunction(renderTagItem)) {
        return showIconHandler? (<div class={itemWrapperCls} key={elementKey}>
          <DragHandle />
          {renderTagItem(value, index, onClose)}
        </div>) : renderTagItem(value, index, onClose);
      } else {
        return (
          <Tag
            className={tagCls}
            color="white"
            size={size === 'small' ? 'small' : 'large'}
            type="light"
            onClose={onClose}
            closable={!disabled}
            key={elementKey}
            visible
            aria-label={`${!disabled ? 'Closable ' : ''}Tag: ${value}`}
          >
            {showIconHandler && <DragHandle />}
            <Paragraph
              className={typoCls}
              ellipsis={{ showTooltip: showContentTooltip, rows: 1 }}
            >
              {value}
            </Paragraph>
          </Tag>
        );
      }
    });
  }

  const onSortEnd = (callbackProps: OnSortEndProps) => {
    foundation.handleSortEnd(callbackProps);
  }
  function renderTags() {
    const {
      disabled,
      maxTagCount,
      showRestTagsPopover,
      restTagsPopoverProps = {},
      draggable,
      expandRestTagsOnClick,
    } = props;
    const { tagsArray, active } = state;
    const restTagsCls = cls(`${prefixCls}-wrapper-n`, {
      [`${prefixCls}-wrapper-n-disabled`]: disabled,
    });
    const allTags = getAllTags();
    let restTags: Array<VueJsxNode> = [];
    let tags: Array<VueJsxNode> = [...allTags];
    if (( !active || !expandRestTagsOnClick) && maxTagCount && maxTagCount < allTags.length){
      tags = allTags.slice(0, maxTagCount);
      restTags = allTags.slice(maxTagCount);
    }

    const restTagsContent = (
      <span class={restTagsCls}>+{tagsArray.length - maxTagCount}</span>
    );

    const sortableListItems = allTags.map((item, index) => ({
      item: item,
      key: tagsArray[index],
    }));

    if (active && draggable && sortableListItems.length > 0) {
      // helperClass：add styles to the helper(item being dragged) https://github.com/clauderic/react-sortable-hoc/issues/87
      // @ts-ignore skip SortableItem type check
      return <SortableList useDragHandle helperClass={`${prefixCls}-drag-item-move`} items={sortableListItems} onSortEnd={onSortEnd} axis={"xy"} />;
    }
    return (
      <>
        {tags}
        {
          restTags.length > 0 &&
          (
            showRestTagsPopover ?
              (
                <Popover
                  content={restTags as VueJsxNode}
                  showArrow
                  trigger="hover"
                  position="top"
                  autoAdjustOverflow
                  {...restTagsPopoverProps}
                >
                  {restTagsContent}
                </Popover>
              ) : restTagsContent
          )
        }
      </>
    );
  }

  function blur() {
    inputRef.current.blur();
  }

  function focus() {
    inputRef.current.focus();
  }

  expose({
    blur,
    focus,
  })

  return () => {

    const {
      size,
      style,
      className,
      disabled,
      placeholder,
      validateStatus,
    } = props;

    const {
      focusing,
      hovering,
      tagsArray,
      inputValue,
      active,
    } = state;

    const tagInputCls = cls(prefixCls, className, {
      [`${prefixCls}-focus`]: focusing,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-hover`]: hovering && !disabled,
      [`${prefixCls}-error`]: validateStatus === 'error',
      [`${prefixCls}-warning`]: validateStatus === 'warning'
    });

    const inputCls = cls(`${prefixCls}-wrapper-input`, `${prefixCls}-wrapper-input-${size}`);

    const wrapperCls = cls(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-${size}`);


    return (
      <div
        ref={tagInputRef}
        style={style}
        class={tagInputCls}
        aria-disabled={disabled}
        aria-label={props['aria-label']}
        aria-invalid={validateStatus === 'error'}
        onMouseenter={e => {
          handleInputMouseEnter(e);
        }}
        onMouseleave={e => {
          handleInputMouseLeave(e);
        }}
        onClick={e => {
          handleClick(e);
        }}
      >
        {renderPrefix()}
        <div class={wrapperCls}>
          {renderTags()}
          <Input
            aria-label='input value'
            ref={inputRef as any}
            className={inputCls}
            disabled={disabled}
            value={inputValue}
            size={size}
            placeholder={tagsArray.length === 0 ? placeholder : ''}
            onKeyDown={(e: KeyboardEvent) => {
              handleKeyDown(e);
            }}
            onChange={(v: string, e: any) => {
              console.log(v,e)
              handleInputChange(e);
            }}
            onBlur={(e: FocusEvent) => {
              handleInputBlur(e as any);
            }}
            onFocus={(e: FocusEvent) => {
              handleInputFocus(e as any);
            }}
          />
        </div>
        {renderClearBtn()}
        {renderSuffix()}
      </div>
    );
  }
})

Index.props = vuePropsType

export default Index

