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
        d="M7 9.63V4a1.5 1.5 0 0 1 0-3h10a1.5 1.5 0 0 1 0 3v5.63l5.07 9.71A2.5 2.5 0 0 1 19.85 23H4.15a2.5 2.5 0 0 1-2.22-3.66L7 9.64ZM14 4h-4v6c0 .24-.06.48-.17.7L8.63 13h6.74l-1.2-2.3A1.5 1.5 0 0 1 14 10V4Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBeaker',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'beaker'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
