import { defineComponent, ref, h, Fragment, useSlots, PropType, CSSProperties, reactive, watch } from 'vue';
import { CombineProps } from '../interface';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import * as SemiMarkdownComponents from './components';
import MarkdownRenderFoundation, {
  type MarkdownRenderAdapter,
  type MarkdownRenderBaseProps,
  type MarkdownRenderBaseState,
} from '@douyinfe/semi-foundation/markdownRender/foundation';
import "@douyinfe/semi-foundation/markdownRender/markdownRender.scss";
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { useBaseComponent } from '../_base/baseComponent';
import { omit } from 'lodash';
export type { MDXProps } from 'mdx/types';


export interface MarkdownRenderProps extends MarkdownRenderBaseProps {
  style?: CSSProperties;
  className?: string;
}

export interface MarkdownRenderState extends MarkdownRenderBaseState {}
const propTypes: CombineProps<MarkdownRenderProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  format: {
    type: PropTypes.node as PropType<MarkdownRenderProps['format']>,
    required: true,
  },
  components: {
    type: PropTypes.any as PropType<MarkdownRenderProps['components']>,
    required: true,
  },
  raw: {
    type: PropTypes.string as PropType<MarkdownRenderProps['raw']>,
    required: true,
  },
};
const defaultProps = {
  format: 'mdx',
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'index',
  setup(props, { attrs }) {
    const slots = useSlots();
    const state = reactive<MarkdownRenderState>({
      MDXContentComponent: undefined,
    });

    const { adapter: adapterInject, setStateAsync } = useBaseComponent(props, state);

    function RC(a: any, b: any) {
      const na = typeof a ===  'symbol'?Fragment:a
      return h(
        na,
        typeof na === 'string' || na === Fragment ? omit(b, 'children') : b,
        typeof na === 'string' || na === Fragment ? b.children : () => b.children
      );
    }

    function adapter_(): MarkdownRenderAdapter<MarkdownRenderProps, MarkdownRenderState> {
      return {
        ...adapterInject(),
        getRuntime: () => ({
          Fragment: Fragment,
          jsx: RC,
          jsxs: RC,
        }),
      };
    }

    const adapter = adapter_();
    const foundation = new MarkdownRenderFoundation(adapter);
    watch(
      () => props.raw,
      (value) => {
        if (value) {
          state.MDXContentComponent = foundation.evaluateSync(props.raw);
        }
      },
      { immediate: true }
    );

    return () => {
      const ComponentConstructor = state.MDXContentComponent;
      return (
        <div class={cls(cssClasses.PREFIX, props.className)} style={props.style} {...attrs}>
          <ComponentConstructor
            components={{ ...SemiMarkdownComponents, ...props.components } as any}
          ></ComponentConstructor>
        </div>
      );
    };
  },
});

export default index;
