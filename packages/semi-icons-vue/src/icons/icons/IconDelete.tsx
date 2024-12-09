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
        d="M9.38 2a1 1 0 0 0-.9.55L7.02 5.5H3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-4L15.5 2.55a1 1 0 0 0-.9-.55H9.39Zm5.48 3.5-.72-1.25a.5.5 0 0 0-.43-.25h-3.42a.5.5 0 0 0-.43.25L9.14 5.5h5.72Zm3.86 4.5H5.28a1 1 0 0 0-.97 1.24l2.12 8.49A3 3 0 0 0 9.34 22h5.32a3 3 0 0 0 2.9-2.27l2.13-8.49a1 1 0 0 0-.97-1.24Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconDelete',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'delete'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
