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
        d="M17.66 19.78a1.5 1.5 0 0 0 2.12-2.12L14.12 12l5.66-5.66a1.5 1.5 0 0 0-2.12-2.12L12 9.88 6.34 4.22a1.5 1.5 0 1 0-2.12 2.12L9.88 12l-5.66 5.66a1.5 1.5 0 0 0 2.12 2.12L12 14.12l5.66 5.66Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconClose',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'close'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
