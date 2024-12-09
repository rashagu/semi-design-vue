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
        d="M1 12a11 11 0 1 1 22 0 11 11 0 0 1-22 0Zm11-8a8 8 0 0 0-8 8h4.71A4.29 4.29 0 0 1 13 16.29c0 .39-.32.71-.71.71H10c-.5 0-.91.5-.91 1.5S10 20 10.5 20H12a8 8 0 0 0 7.9-6.77c-.69.49-1.51.77-2.4.77a4.51 4.51 0 0 1-4.13-3H10c-.55 0-1.01-.45-.91-1 .51-2.81 2.41-4 4.78-3.95.19-.29.4-.55.64-.8.29-.27.24-.78-.14-.9A8 8 0 0 0 12 4Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconGlobe',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'globe'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
