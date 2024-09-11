import { CSSProperties, onMounted, onUnmounted, PropType, reactive, VNode } from 'vue';
import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import HotKeysFoudation, { HotKeysAdapter } from '@douyinfe/semi-foundation/hotKeys/foundation';
import { cssClasses, Keys } from '@douyinfe/semi-foundation/hotKeys/constants';

import { noop } from 'lodash';
import '@douyinfe/semi-foundation/hotKeys/hotKeys.scss';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;

export interface HotKeysProps {
  preventDefault?: boolean;
  hotKeys?: KeyboardEvent['key'][];
  content?: string[];
  onClick?: () => void;
  onHotKey?: (e: KeyboardEvent) => void;
  mergeMetaCtrl?: boolean;
  render?: () => VNode | VNode[];
  getListenerTarget?: () => HTMLElement;
  className?: string;
  style?: CSSProperties;
}

export interface HotKeysState {}

const propTypes: CombineProps<HotKeysProps> = {
  preventDefault: PropTypes.bool,
  hotKeys: PropTypes.array,
  content: PropTypes.array,
  onClick: PropTypes.func as PropType<HotKeysProps['onClick']>,
  onHotKey: PropTypes.func as PropType<HotKeysProps['onHotKey']>,
  mergeMetaCtrl: PropTypes.bool,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  getListenerTarget: PropTypes.func as PropType<HotKeysProps['getListenerTarget']>,
  className: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps: Partial<HotKeysProps> = {
  preventDefault: false,
  hotKeys: null,
  content: null,
  onClick: noop,
  onHotKey: noop,
  mergeMetaCtrl: false,
  render: undefined,
  getListenerTarget: () => document.body,
  className: '',
  style: null,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);

const HotKeys = defineComponent({
  props: { ...vuePropsType },
  name: 'HotKeys',
  setup(props, { attrs }) {
    const slots = useSlots();

    const state = reactive<HotKeysState>({});

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): HotKeysAdapter<HotKeysProps, HotKeysState> {
      return {
        ...adapterInject(),
        notifyHotKey: (e: KeyboardEvent) => {
          props.onHotKey?.(e);
        },
        getListenerTarget: () => {
          return props.getListenerTarget?.() ?? document.body;
        },
      };
    }
    const adapter = adapter_();

    const foundation = new HotKeysFoudation(adapter);

    return () => {
      const { hotKeys, content, onClick, render, getListenerTarget, className, style, ...rest } = props;

      if (typeof render !== 'undefined') {
        if (render === null || (typeof render === 'function' && render() === null)) {
          return null;
        }
        return (
          <div onClick={onClick} class={classNames(prefixCls, className)} style={style} {...getDataAttr()}>
            {typeof render === 'function' ? render() : render}
          </div>
        );
      }
      const renderContent = content ?? hotKeys;

      return (
        <div onClick={onClick} class={classNames(prefixCls, className)} style={style} {...getDataAttr()}>
          {renderContent.map((key: KeyboardEvent['key'], index) => {
            return index === 0 ? (
              <span key={index}>
                <span class={prefixCls + '-content'}>{key}</span>
              </span>
            ) : (
              <span key={index}>
                <span class={prefixCls + '-split'}>+</span>
                <span class={prefixCls + '-content'}>{key}</span>
              </span>
            );
          })}
        </div>
      );
    };
  },
});

export type HotKeys = typeof HotKeys & {
    Keys: typeof Keys
}
const baseHotKeys = HotKeys as HotKeys
baseHotKeys.Keys = Keys
export default baseHotKeys;
