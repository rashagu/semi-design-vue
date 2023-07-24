import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import {cssClasses, strings} from '@douyinfe/semi-foundation/collapse/constants';
import CollapseFoundation, {
  ArgsType,
  CollapseAdapter,
  CollapseProps,
  CollapseState
} from '@douyinfe/semi-foundation/collapse/foundation';
import CollapsePanel from './item';
import '@douyinfe/semi-foundation/collapse/collapse.scss';
import {noop} from '@douyinfe/semi-foundation/utils/function';
import {isEqual} from 'lodash';
import CollapseContext from './collapse-context';
import {CSSProperties, defineComponent, h, onBeforeUnmount, PropType, reactive, useSlots, VNode, watch} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";
import {AnchorProps} from "../anchor";
import {ComponentObjectPropsOptions} from "vue";

export type {CollapsePanelProps} from './item';

export interface CollapseReactProps extends CollapseProps {
  expandIcon?: VNode;
  collapseIcon?: VNode;
  children?: VNode;
  style?: CSSProperties;
  onChange?: (activeKey: CollapseProps['activeKey'], e: MouseEvent) => void
}


export type {CollapseState};

const propTypes: ComponentObjectPropsOptions<CollapseProps> = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accordion: PropTypes.bool,
  clickHeaderToExpand: PropTypes.bool,
  onChange: PropTypes.func as PropType<CollapseProps['onChange']>,
  expandIcon: PropTypes.node,
  collapseIcon: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  keepDOM: PropTypes.bool,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  expandIconPosition: PropTypes.string as PropType<CollapseProps['expandIconPosition']>,
};

const defaultProps = {
  defaultActiveKey: '',
  clickHeaderToExpand: true,
  onChange: noop,
  expandIconPosition: 'right'
};
export const vuePropsType = vuePropsMake<CollapseProps>(propTypes, defaultProps)
const Collapse = defineComponent<CollapseProps>((props, {}) => {
  const slots = useSlots()


  const state = reactive<CollapseState>({
    activeSet: new Set()
  });
  const {adapter: adapterInject, getDataAttr} = useBaseComponent<CollapseProps>(props, state)

  function adapter_(): CollapseAdapter {
    return {
      ...adapterInject(),
      handleChange: (activeKey: CollapseProps['activeKey'], e: MouseEvent) => props.onChange(activeKey, e),
      addActiveKey: (activeSet: CollapseState['activeSet']) => state.activeSet = activeSet,
    };
  }

  const adapter = adapter_()
  const foundation = new CollapseFoundation(adapter);
  const initKeys = foundation.initActiveKey();
  state.activeSet = new Set(initKeys)


  function getDerivedStateFromProps(props: CollapseReactProps) {
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

  watch([
    () => props.activeKey,
    () => state.activeSet
  ], () => {
    const newState = getDerivedStateFromProps(props)
    if (newState) {
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    }
  }, {deep: true})

  onBeforeUnmount(() => {
    foundation.destroy();
  })

  const onChange = (activeKey: string, e: MouseEvent) => {
    foundation.handleChange(activeKey, e);
  };

  return () => {

    const children = slots.default?.()
    // eslint-disable-next-line max-len
    const {
      defaultActiveKey,
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
    const {activeSet} = state;
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
            motion
          }}
        >
          {children}
        </CollapseContext.Provider>
      </div>
    );
  }
}, {
  props: vuePropsType,
  name: 'Collapse'
})



export default Collapse
export {
  CollapsePanel
}

