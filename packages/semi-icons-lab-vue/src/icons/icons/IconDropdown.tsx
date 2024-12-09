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
      <rect x={1.009} y={3.1} width={20} height={20} rx={3} transform="rotate(-6 1.00949 3.10007)" fill="#6A6F7F" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.65 9.59a1.5 1.5 0 0 1 2.11-.22l4.33 3.5 3.5-4.33a1.5 1.5 0 0 1 2.34 1.9l-4.45 5.49a1.5 1.5 0 0 1-2.11.22l-5.5-4.45a1.5 1.5 0 0 1-.22-2.11Z"
        fill="white"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconDropdown',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'dropdown'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
