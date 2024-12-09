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
        d="M7.5 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H13V11h4.5a1 1 0 0 1 1 1v3.5H21a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1h2.5V13h-9v2.5H10a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1h2.5V12a1 1 0 0 1 1-1H11V8.5H8.5a1 1 0 0 1-1-1V3Zm-1 14.5H4V20h5v-2.5H6.5Zm11 0H15V20h5v-2.5h-2.5ZM9.5 4v2.5h5V4h-5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconFlowChartStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'flow_chart_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
