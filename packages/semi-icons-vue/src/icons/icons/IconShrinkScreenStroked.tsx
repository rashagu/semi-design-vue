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
        d="M3.7 2.3a1 1 0 0 0-1.4 1.4l5.79 5.8H4.5a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1v-6a1 1 0 1 0-2 0v3.59l-5.8-5.8Zm8.88 10.82a1 1 0 0 0-.08.38v6a1 1 0 1 0 2 0v-3.59l5.8 5.8a1 1 0 0 0 1.4-1.42l-5.79-5.79h3.59a1 1 0 1 0 0-2h-6a1 1 0 0 0-.7.29l-.01.01a1 1 0 0 0-.21.32Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconShrinkScreenStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'shrink_screen_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
