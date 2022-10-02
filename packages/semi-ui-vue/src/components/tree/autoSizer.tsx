import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/tree/constants';
import ResizeObserver from '../resizeObserver';
import type { ResizeEntry } from '../resizeObserver';
import { get } from 'lodash';
import {defineComponent, h, onMounted, reactive, useSlots} from "vue";
import {VueJsxNode} from "../interface";

export interface AutoSizerProps {
    defaultHeight?: number;
    defaultWidth?: number;
}

export interface AutoSizerState {
    height: number;
}

const prefixcls = cssClasses.PREFIX;

const propTypes = {
    defaultHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
    defaultHeight: '100%',
    defaultWidth: '100%',
};
export const vuePropsType = {
    name: String
}
const AutoSizer = defineComponent<AutoSizerProps>((props, {}) => {
    const slots = useSlots()

    const state = reactive<AutoSizerState>({
        height: props.defaultHeight || 0,
    });
    
    onMounted(()=>{
        const { height } = state;
        // if height is a number, pass it directly to virtual-list
        if (typeof height === 'number') {
            return;
        }
    })

    const _onResize = (entries: ResizeEntry[]) => {
        // observe parent node height
        const target = entries && entries[1] && entries[1].target;
        if (target) {
            const height = get(target, 'offsetHeight') || 0;
            const style = window.getComputedStyle(target) || {};
            const paddingTop = parseInt(get(style, 'paddingTop'), 10) || 0;
            const paddingBottom = parseInt(get(style, 'paddingBottom'), 10) || 0;
            const newHeight = height - paddingTop - paddingBottom;
            if (state.height !== newHeight) {
                state.height = height - paddingTop - paddingBottom
            }
        }
    };

    return () => {
        const { defaultWidth, defaultHeight } = props;
        const { height } = state;
        // Avoid rendering children before the initial measurements have been collected.
        // At best this would just be wasting cycles. Refer to https://github.com/bvaughn/react-virtualized-auto-sizer/
        let bailoutOnChildren = false;

        if (height === 0 || typeof height !== 'number') {
            bailoutOnChildren = true;
        }
        return (
          <ResizeObserver observeParent onResize={_onResize}>
              <div
                style={{
                    height: defaultHeight,
                    overflow: 'visible',
                }}
                class={`${prefixcls}-auto-wrapper`}
              >
                  {!bailoutOnChildren && slots.default?.({ height, width: defaultWidth })}
              </div>
          </ResizeObserver>
        );
    }
})

AutoSizer.props = vuePropsType
AutoSizer.name = 'AutoSizer'

export default AutoSizer
