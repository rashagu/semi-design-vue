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
        d="M4.22 4.22a10.97 10.97 0 0 1 15.56 0l-.7.7.7-.7a10.97 10.97 0 0 1 0 15.56 10.97 10.97 0 0 1-15.56 0l.7-.7-.7.7a10.97 10.97 0 0 1 0-15.56ZM12 3a8.97 8.97 0 0 0-9 9 8.97 8.97 0 0 0 9 9 8.97 8.97 0 0 0 9-9 8.97 8.97 0 0 0-9-9Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 9.31a4 4 0 1 1 5 3.88v1.12a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1 2 2 0 1 0-2-2 1 1 0 0 1-2 0Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 18.81a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconHelpCircleStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'help_circle_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
