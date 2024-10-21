import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/collapse/constants';
import CollapseFoundation, {
  CollapseAdapter,
  CollapseProps,
  CollapseState,
} from '@douyinfe/semi-foundation/collapse/foundation';
import CollapsePanel from './item';
import '@douyinfe/semi-foundation/collapse/collapse.scss';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { isEqual } from 'lodash';
import CollapseContext from './collapse-context';
import { CSSProperties, defineComponent, h, onBeforeUnmount, PropType, reactive, useSlots, VNode, watch } from 'vue';
import { useBaseComponent } from '../_base/baseComponent';
import { CombineProps } from '../interface';

export type { CollapsePanelProps } from './item';

export interface CollapseReactProps extends CollapseProps {
  expandIcon?: VNode;
  collapseIcon?: VNode;
  // children?: VNode;
  style?: CSSProperties;
  onChange?: (activeKey: CollapseProps['activeKey'], e: MouseEvent) => void;
  lazyRender?: boolean;
}

export type { CollapseState };

const propTypes: CombineProps<CollapseReactProps> = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accordion: PropTypes.bool,
  clickHeaderToExpand: PropTypes.bool,
  onChange: PropTypes.func as PropType<CollapseReactProps['onChange']>,
  expandIcon: PropTypes.node as PropType<CollapseReactProps['expandIcon']>,
  collapseIcon: PropTypes.node as PropType<CollapseReactProps['collapseIcon']>,
  style: PropTypes.object,
  className: PropTypes.string,
  keepDOM: PropTypes.bool,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  expandIconPosition: PropTypes.string as PropType<CollapseReactProps['expandIconPosition']>,
  lazyRender: PropTypes.bool as PropType<CollapseReactProps['lazyRender']>,
};

const defaultProps = {
  defaultActiveKey: '',
  clickHeaderToExpand: true,
  onChange: noop,
  expandIconPosition: 'right',
  lazyRender: false,
};
export const vuePropsType = vuePropsMake<CollapseReactProps>(propTypes, defaultProps);
const Collapse = defineComponent({
  props: { ...vuePropsType },
  name: 'Collapse',
  setup(props, {}) {
    const slots = useSlots();

    const state = reactive<CollapseState>({
      activeSet: new Set(),
    });
    const { adapter: adapterInject, getDataAttr } = useBaseComponent<CollapseReactProps>(props, state);

    function adapter_(): CollapseAdapter {
      return {
        ...adapterInject(),
        handleChange: (activeKey: CollapseProps['activeKey'], e: MouseEvent) => props.onChange(activeKey, e),
        addActiveKey: (activeSet: CollapseState['activeSet']) => (state.activeSet = activeSet),
      };
    }

    const adapter = adapter_();
    const foundation = new CollapseFoundation(adapter);
    const initKeys = foundation.initActiveKey();
    state.activeSet = new Set(initKeys);

    function getDerivedStateFromProps(props: CollapseReactProps, state: CollapseState) {
      if (props.activeKey) {
        const keys = Array.isArray(props.activeKey) ? props.activeKey : [props.activeKey];
        const newSet = new Set(keys);
        if (!isEqual(newSet, state.activeSet)) {
          return {
            ...state,
            activeSet: newSet,
          };
        }
        return state;
      }
      return state;
    }

    watch(
      [() => props.activeKey, () => state.activeSet],
      () => {
        const newState = getDerivedStateFromProps({ ...props }, {...state});
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      },
      { deep: true }
    );

    onBeforeUnmount(() => {
      foundation.destroy();
    });

    const onChange = (activeKey: string, e: MouseEvent) => {
      foundation.handleChange(activeKey, e);
    };

    return () => {
      const children = slots.default?.();
      // eslint-disable-next-line max-len
      const {
        defaultActiveKey,
        lazyRender,
        accordion,
        style,
        motion,
        className,
        keepDOM,
        expandIconPosition,
        expandIcon,
        collapseIcon,
        clickHeaderToExpand,
        ...rest
      } = props;
      const clsPrefix = cls(cssClasses.PREFIX, className);
      const { activeSet } = state;
      return (
        <div class={clsPrefix} style={style} {...getDataAttr()}>
          <CollapseContext.Provider
            value={{
              activeSet,
              expandIcon,
              collapseIcon,
              clickHeaderToExpand,
              keepDOM,
              expandIconPosition,
              onClick: onChange,
              motion,
              lazyRender,
            }}
          >
            {children}
          </CollapseContext.Provider>
        </div>
      );
    };
  },
});


export type CollapseType = typeof Collapse & {
  Panel: typeof CollapsePanel;
}
const BaseCollapse = Collapse as CollapseType;
BaseCollapse.Panel = CollapsePanel

export default BaseCollapse;
export { CollapsePanel };
