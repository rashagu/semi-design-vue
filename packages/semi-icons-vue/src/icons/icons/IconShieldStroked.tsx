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
        d="m3 4.13 9-1.63 9 1.63v5.39c0 5.66-3.62 10.69-9 12.48-5.37-1.8-9-6.82-9-12.49V4.13Z"
        stroke="currentColor"
        stroke-width={2}
        stroke-linejoin="round"
      />
      <path d="M11.97 7.47v8" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.97 11.47h8" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconShieldStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'shield_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
