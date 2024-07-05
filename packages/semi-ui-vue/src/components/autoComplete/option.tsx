import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import { isString } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/autoComplete/constants';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import { IconTick } from '@kousum/semi-icons-vue';
import { getFragmentChildren, getHighLightTextHTML } from '../_utils/index';
import { Locale } from '../locale/interface';
import { BasicOptionProps } from '@douyinfe/semi-foundation/autoComplete/optionFoundation';
import { VueJsxNode } from '../interface';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { StateOptionItem } from '@douyinfe/semi-foundation/autoComplete/foundation';

const LocaleConsumer = LocaleConsumerFunc<Locale['Select']>();

export interface OptionProps extends BasicOptionProps {
  [x: string]: any;
  value?: string | number;
  label?: string | number | VueJsxNode;
  children?: VueJsxNode;
  disabled?: boolean;
  showTick?: boolean;
  className?: string;
  style?: CSSProperties;
  option?: StateOptionItem;
}
interface renderOptionContentArgument {
  config: {
    searchWords: any;
    sourceString: VueJsxNode;
  };
  children: VueJsxNode;
  inputValue: string;
  prefixCls: string;
}

const propTypes: ComponentObjectPropsOptions<OptionProps> = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  label: PropTypes.node,
  empty: PropTypes.bool,
  emptyContent: PropTypes.node,
  onSelect: PropTypes.func,
  focused: PropTypes.bool,
  showTick: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onMouseEnter: PropTypes.func,
  prefixCls: PropTypes.string,
  renderOptionItem: PropTypes.func,
  inputValue: PropTypes.string,
  option: PropTypes.object,
};

const defaultProps = {
  prefixCls: cssClasses.PREFIX_OPTION,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Option = defineComponent({
  props: vuePropsType,
  name: 'Option',
  setup(props, {}) {
    const slots = useSlots();
    function onClick({ value, label, children, ...rest }: Partial<OptionProps>, event: MouseEvent) {
      const isDisabled = props.disabled;
      if (!isDisabled) {
        props.onSelect({ ...rest, value, label: label || children }, event);
      }
    }

    function renderOptionContent({ config, children, inputValue, prefixCls }: renderOptionContentArgument) {
      if (isString(children) && inputValue) {
        return getHighLightTextHTML(config as any);
      }
      return children;
    }

    return () => {
      const children = getFragmentChildren(slots);
      const {
        disabled,
        value,
        selected,
        label,
        empty,
        emptyContent,
        onSelect,
        focused,
        showTick,
        className,
        style,
        onMouseEnter,
        prefixCls,
        renderOptionItem,
        inputValue,
        ...rest_
      } = props;
      const rest = {
        ...rest_,
        ...props.option,
      };
      const optionClassName = classNames(prefixCls, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-selected`]: selected,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-empty`]: empty,
        [className]: className,
      });
      const selectedIconClassName = classNames([`${prefixCls}-icon`]);

      if (empty) {
        if (emptyContent === null) {
          return null;
        }
        return (
          <LocaleConsumer componentName="Select">
            {(locale: Locale['Select']) => (
              <div class={optionClassName} x-semi-prop="emptyContent">
                {emptyContent || locale.emptyText}
              </div>
            )}
          </LocaleConsumer>
        );
      }

      // Since there are empty, locale and other logic, the custom renderOptionItem is directly converged to the internal option instead of being placed in Select/index
      if (typeof renderOptionItem === 'function') {
        return renderOptionItem({
          disabled,
          focused,
          selected,
          style,
          label,
          value,
          inputValue,
          onMouseEnter: (e: MouseEvent) => onMouseEnter(e),
          onClick: (e: MouseEvent) => onClick({ value, label, children, ...rest }, e),
          ...rest,
        });
      }

      const config = {
        searchWords: inputValue,
        sourceString: children,
        option: {
          highlightClassName: `${prefixCls}-keyword`,
        },
      };
      return (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
        <div
          class={optionClassName}
          onClick={(e) => {
            onClick({ value, label, children, ...rest }, e);
          }}
          onMouseenter={(e) => onMouseEnter && onMouseEnter(e)}
          role="option"
          aria-selected={selected ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : 'false'}
          style={style}
        >
          {showTick ? (
            <div class={selectedIconClassName}>
              <IconTick />
            </div>
          ) : null}
          {isString(children) ? (
            <div class={`${prefixCls}-text`}>{renderOptionContent({ children, config, inputValue, prefixCls })}</div>
          ) : (
            children
          )}
        </div>
      );
    };
  },
});

// @ts-ignore
Option.isSelectOption = true;
export default Option;
