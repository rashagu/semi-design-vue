import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  PropType,
  CSSProperties,
  shallowRef,
  reactive,
  onMounted,
  watch,
} from 'vue';
import "@douyinfe/semi-foundation/codeHighlight/codeHighlight.scss";
import { CombineProps } from '../interface';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import CodeHighlightFoundation, {
  CodeHighlightAdapter,
  CodeHighlightBaseProps,
  CodeHighlightBaseState,
} from '@douyinfe/semi-foundation/codeHighlight';
import { useBaseComponent } from '../_base/baseComponent';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/codeHighlight/constants';

interface CodeHighlightProps extends CodeHighlightBaseProps {
  className?: string;
  style?: CSSProperties;
  defaultTheme?: boolean;
}

interface CodeHighlightState extends CodeHighlightBaseState {}

const propTypes: CombineProps<CodeHighlightProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  code: {
    type: PropTypes.string,
    required: true,
  },
  language: {
    type: PropTypes.string,
    required: true,
  },
  lineNumber: {
    type: PropTypes.bool,
    required: true,
  },
  defaultTheme: PropTypes.bool,
};

const defaultProps = {
  lineNumber: true,
  defaultTheme: true,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'index',
  setup(props, { attrs }) {
    const slots = useSlots();
    const codeRef = shallowRef();
    const state = reactive({});
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): CodeHighlightAdapter<CodeHighlightProps, CodeHighlightState> {
      return {
        ...adapterInject(),
      };
    }
    const adapter = adapter_();
    const foundation = new CodeHighlightFoundation(adapter);

    onMounted(() => {
      if (codeRef.value) {
        foundation.highlightCode(codeRef.value, props.language);
      }
    });

    watch([() => props.code, () => props.language], (value, [prevPropsCode, prevPropsLanguage], onCleanup) => {
      if ((codeRef.value && prevPropsCode !== props.code) || prevPropsLanguage !== props.language) {
        foundation.highlightCode(codeRef.value, props.language);
      }
    });

    return () => {
      return (
        <div
          style={props.style}
          class={cls(props.className, cssClasses.PREFIX, 'semi-light-scrollbar', {
            [`${cssClasses.PREFIX}-defaultTheme`]: props.defaultTheme,
          })}
          {...getDataAttr()}
        >
          <pre>
            <code ref={codeRef}>{props.code}</code>
          </pre>
        </div>
      );
    };
  },
});

export default index;
