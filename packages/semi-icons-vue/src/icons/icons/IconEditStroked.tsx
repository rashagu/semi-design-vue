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
        d="M18.58 2.59a2 2 0 0 0-2.83 0L13.62 4.7l-.7.7-9.8 9.8a1 1 0 0 0-.28.55l-.83 5.08a1 1 0 0 0 1.15 1.15l5.08-.83a1 1 0 0 0 .55-.28l9.8-9.8.7-.7 2.12-2.13a2 2 0 0 0 0-2.83l-2.83-2.83Zm0 5.66L20 6.84 17.16 4l-1.41 1.42 2.83 2.83Zm-1.42 1.42-2.83-2.83-9.56 9.56-.56 3.39 3.39-.56 9.56-9.56Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconEditStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'edit_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
