import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 2a1 1 0 0 1 1 1v6h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6v2a1 1 0 1 1-2 0v-2H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1V3a1 1 0 0 1 1-1Zm0 15h1v-6H4v6h1Zm11-9a1 1 0 0 1 1-1h1V3a1 1 0 1 1 2 0v4h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v4a1 1 0 1 1-2 0v-4h-1a1 1 0 0 1-1-1V8Zm4 7h-2V9h2v6ZM10 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v6a1 1 0 1 0 2 0v-6h1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1V3a1 1 0 1 0-2 0v2h-1Zm2 8h-1V7h2v6h-1Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCandlestickChartStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'candlestick_chart_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
