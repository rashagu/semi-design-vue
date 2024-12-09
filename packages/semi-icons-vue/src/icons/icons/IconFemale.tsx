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
        d="M10.5 9a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM15 1.5a7.5 7.5 0 0 0-6.24 11.66l-1.67 1.66-1.94-1.93A1.5 1.5 0 1 0 3.03 15l1.93 1.94-1.9 1.9a1.5 1.5 0 0 0 2.12 2.13l1.9-1.91L9.03 21a1.5 1.5 0 0 0 2.12-2.12l-1.93-1.93 1.67-1.68A7.5 7.5 0 1 0 15 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconFemale',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'female'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
