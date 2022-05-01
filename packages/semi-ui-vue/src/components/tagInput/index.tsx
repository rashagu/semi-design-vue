import {defineComponent, ref, h, Fragment, useSlots, VNode, CSSProperties, reactive, onMounted, isVNode} from 'vue'
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
import TagInputFoundation, {TagInputAdapter} from '@douyinfe/semi-foundation/tagInput/foundation';
import {ArrayElement} from '../_base/base';
import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';
import Tag from '../tag';
import Input from '../input';
import Popover, {PopoverProps} from '../popover';
import Paragraph from '../typography/Paragraph';
import {IconClear} from '@kousum/semi-icons-vue';
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
  prefix?: VNode | string;
  renderTagItem?: (value: string, index: number) => VNode | string;
  separator?: string | string[] | null;
  showClear?: boolean;
  size?: Size;
  style?: CSSProperties;
  suffix?: VNode | string;
  validateStatus?: ValidateStatus;
  value?: string[] | undefined;
  autoFocus?: boolean;
  'aria-label'?: string;
}

export interface TagInputState {
  tagsArray?: string[];
  inputValue?: string;
  focusing?: boolean;
  hovering?: boolean;
}

const prefixCls = cssClasses.PREFIX;


export const vuePropsType = {


  showClear: {
    type: Boolean,
    default: false
  },
  addOnBlur: {
    type: Boolean,
    default: false
  },
  allowDuplicates: {
    type: Boolean,
    default: true
  },
  showRestTagsPopover: {
    type: Boolean,
    default: true
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  showContentTooltip: {
    type: Boolean,
    default: true
  },
  separator: {
    type: [String, Array],
    default: ','
  },
  size: {
    type: String,
    default: 'default'
  },
  validateStatus: {
    type: String,
    default: 'default'
  },
  onBlur: {
    type: Function,
    default: noop
  },
  onFocus: {
    type: Function,
    default: noop
  },
  onChange: {
    type: Function,
    default: noop
  },
  onInputChange: {
    type: Function,
    default: noop
  },
  onExceed: {
    type: Function,
    default: noop
  },
  onInputExceed: {
    type: Function,
    default: noop
  },
  onAdd: {
    type: Function,
    default: noop
  },
  onRemove: {
    type: Function,
    default: noop
  },
  onKeyDown: {
    type: Function,
    default: noop
  },


  className: String,
  defaultValue: Array,
  disabled: Boolean,
  inputValue: String,
  maxLength: Number,
  max: Number,
  maxTagCount: Number,
  restTagsPopoverProps: Object,
  placeholder: String,
  prefix: [String, Object],
  renderTagItem: Function,
  style: [Object, String],
  suffix: [Object, String],
  value: Array,
  'aria-label': String,
}
const Index = defineComponent<TagInputProps>((props, {}) => {
  const slots = useSlots()
  const inputRef = ref(null);
  const state = reactive({
    tagsArray: props.defaultValue || [],
    inputValue: '',
    focusing: false,
    hovering: false
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
      setHovering: (hovering: boolean) => {
        state.hovering = hovering
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
    };
  }

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

  onMounted(()=>{
    const { disabled, autoFocus } = props;
    if (!disabled && autoFocus) {
      inputRef.value.focus();
    }
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

  const handleInputMouseEnter = (e: MouseEvent) => {
    foundation.handleInputMouseEnter();
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
    const { prefix } = props;
    if (isNull(prefix) || isUndefined(prefix)) {
      return null;
    }
    const prefixWrapperCls = cls(`${prefixCls}-prefix`, {
      [`${prefixCls}-prefix-text`]: prefix && isString(prefix),
      // eslint-disable-next-line max-len
      [`${prefixCls}-prefix-icon`]: isVNode(prefix) && !(prefix && isString(prefix)),
    });
    return <div class={prefixWrapperCls}>{prefix}</div>;
  }

  function renderSuffix() {
    const { suffix } = props;
    if (isNull(suffix) || isUndefined(suffix)) {
      return null;
    }
    const suffixWrapperCls = cls(`${prefixCls}-suffix`, {
      [`${prefixCls}-suffix-text`]: suffix && isString(suffix),
      // eslint-disable-next-line max-len
      [`${prefixCls}-suffix-icon`]: isVNode(suffix) && !(suffix && isString(suffix)),
    });
    return <div class={suffixWrapperCls}>{suffix}</div>;
  }

  function renderTags() {
    const {
      size,
      disabled,
      renderTagItem,
      maxTagCount,
      showContentTooltip,
      showRestTagsPopover,
      restTagsPopoverProps = {},
    } = props;
    const { tagsArray } = state;
    const tagCls = cls(`${prefixCls}-wrapper-tag`, {
      [`${prefixCls}-wrapper-tag-size-${size}`]: size,
    });
    const typoCls = cls(`${prefixCls}-wrapper-typo`, {
      [`${prefixCls}-wrapper-typo-disabled`]: disabled
    });
    const spanNotWithPopoverCls = cls(`${prefixCls}-wrapper-n`, {
      [`${prefixCls}-wrapper-n-disabled`]: disabled
    });
    const restTags: Array<VNode | string> = [];
    const tags: Array<VNode | string> = [];
    tagsArray.forEach((value, index) => {
      let item = null;
      if (isFunction(renderTagItem)) {
        item = renderTagItem(value, index);
      } else {
        item = (
          <Tag
            className={tagCls}
            color="white"
            size={size === 'small' ? 'small' : 'large'}
            type="light"
            onClose={() => {
              !disabled && handleTagClose(index);
            }}
            closable={!disabled}
            key={`${index}${value}`}
            visible
          >
            <Paragraph
              className={typoCls}
              ellipsis={{ showTooltip: showContentTooltip, rows: 1 }}
            >
              {value}
            </Paragraph>
          </Tag>
        );
      }
      if (maxTagCount && index >= maxTagCount) {
        restTags.push(item);
      } else {
        tags.push(item);
      }
    });
    return (
      <>
        {tags}
        {
          restTags.length > 0 &&
          (
            showRestTagsPopover && !disabled ?
              (
                <Popover
                  content={restTags}
                  showArrow
                  trigger="hover"
                  position="top"
                  autoAdjustOverflow
                  {...restTagsPopoverProps}
                >
                                    <span class={cls(`${prefixCls}-wrapper-n`)}>
                                        +{tagsArray.length - maxTagCount}
                                    </span>
                </Popover>
              ) :
              (
                <span class={spanNotWithPopoverCls}>
                                    {`+${tagsArray.length - maxTagCount}`}
                                </span>
              )
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
      inputValue
    } = state;

    const tagInputCls = cls(prefixCls, className, {
      [`${prefixCls}-focus`]: focusing,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-hover`]: hovering && !disabled,
      [`${prefixCls}-error`]: validateStatus === 'error',
      [`${prefixCls}-warning`]: validateStatus === 'warning'
    });

    const inputCls = cls(`${prefixCls}-wrapper-input`);

    const wrapperCls = cls(`${prefixCls}-wrapper`);

    return (
      <div
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

