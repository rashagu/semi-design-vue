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
        d="M20 3c-.83 0-1.5.67-1.5 1.5v16a1.5 1.5 0 0 0 3 0v-16c0-.83-.67-1.5-1.5-1.5Zm-7 5.5a1.5 1.5 0 0 1 3 0v12a1.5 1.5 0 0 1-3 0v-12ZM9 11c-.83 0-1.5.67-1.5 1.5v8a1.5 1.5 0 0 0 3 0v-8c0-.83-.67-1.5-1.5-1.5Zm-5.5 4c-.83 0-1.5.67-1.5 1.5v4a1.5 1.5 0 0 0 3 0v-4c0-.83-.67-1.5-1.5-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSignal',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'signal'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
