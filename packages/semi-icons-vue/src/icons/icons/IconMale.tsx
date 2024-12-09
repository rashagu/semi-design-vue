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
        d="M11.88 3.5c0-.83.67-1.5 1.5-1.5h6.5a2.5 2.5 0 0 1 2.5 2.5V11a1.5 1.5 0 0 1-3 0V7.12l-3.94 4.04a7.5 7.5 0 1 1-2.03-2.22L17.27 5h-3.88a1.5 1.5 0 0 1-1.5-1.5ZM4.5 15a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconMale',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'male'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
