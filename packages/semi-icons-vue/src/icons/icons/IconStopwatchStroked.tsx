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
        d="M8.5 1a1 1 0 0 0 0 2h7a1 1 0 1 0 0-2h-7ZM12 4a9.5 9.5 0 1 0 6.67 2.74l1.04-1.03a1 1 0 0 0-1.42-1.42L17.1 5.5A9.46 9.46 0 0 0 12 4Zm-7.5 9.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0ZM13 9a1 1 0 1 0-2 0v4.5a1 1 0 1 0 2 0V9Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconStopwatchStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'stopwatch_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
