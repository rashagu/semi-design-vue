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
        d="M8.5.5A4.5 4.5 0 0 0 4 5v14a4.5 4.5 0 0 0 4.5 4.5h7A4.5 4.5 0 0 0 20 19V5A4.5 4.5 0 0 0 15.5.5h-7ZM7 5c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 7 19V5Zm5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPhoneStroke',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'phone_stroke'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
