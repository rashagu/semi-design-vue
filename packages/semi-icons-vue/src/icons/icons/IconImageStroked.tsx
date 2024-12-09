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
        d="M2 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm18 0H4v16h16V4ZM9 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM6 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm11.7 1.8a1 1 0 0 0-1.4 0l-3.87 3.86-1.8-1.44a1 1 0 0 0-1.34.07l-3.5 3.5a1 1 0 1 0 1.42 1.42l2.86-2.87 1.8 1.44a1 1 0 0 0 1.34-.07L17 12.9l.8.8a1 1 0 0 0 1.4-1.42l-1.5-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconImageStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'image_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
