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
      <rect x={1.009} y={3.1} width={20} height={20} rx={3} transform="rotate(-6 1.00949 3.10003)" fill="#4CC3FA" />
      <path
        d="M8.07416 12.9153L11.4236 16.0826L15.6645 8.59828"
        stroke="white"
        stroke-width={3}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCheckbox',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'checkbox'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
