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
export interface MarkdownRenderProps extends Omit<MarkdownRenderBaseProps, 'format'> {
  style?: CSSProperties;
  className?: string;
  format?: string
}

export interface MarkdownRenderState extends MarkdownRenderBaseState {}
const propTypes: CombineProps<MarkdownRenderProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  format: {
    type: PropTypes.node as PropType<MarkdownRenderProps['format']>,
    required: false,
  },
  components: {
    type: PropTypes.any as PropType<MarkdownRenderProps['components']>,
    required: true,
  },
  raw: {
    type: PropTypes.string as PropType<MarkdownRenderProps['raw']>,
    required: true,
  },
  remarkPlugins: PropTypes.array,
  rehypePlugins: PropTypes.array,
  remarkGfm: PropTypes.bool,
};
const defaultProps = {
  format: 'mdx',
  remarkGfm: true,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const markdownRender = defineComponent({
  props: { ...vuePropsType },
  name: 'markdownRender',
  setup(props, { attrs }) {
    const slots = useSlots();
    const state = reactive<MarkdownRenderState>({
      MDXContentComponent: undefined,
    });

    const { adapter: adapterInject, setStateAsync } = useBaseComponent(props, state);

    function jsx(type: any, props: any, key: any) {
      const na = typeof type ===  'symbol'?Fragment:type
      if (arguments.length > 2) {
        props.key = key
      }
      return h(
        na,
        typeof na === 'string' || na === Fragment ? omit(props, 'children') : props,
        typeof na === 'string' || na === Fragment ? props.children : () => props.children
      );
    }

    function adapter_(): MarkdownRenderAdapter<MarkdownRenderProps, MarkdownRenderState> {
      return {
        ...adapterInject(),
        getRuntime: () => ({
          Fragment: Fragment,
          jsx: jsx,
          jsxs: jsx,
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

export default markdownRender;
