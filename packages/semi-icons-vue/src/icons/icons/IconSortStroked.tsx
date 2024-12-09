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
        d="M6.61 14.04a1 1 0 0 1 .89-.54h9a1 1 0 0 1 .82 1.57l-4.5 6.5a1 1 0 0 1-1.64 0l-4.5-6.5a1 1 0 0 1-.07-1.03Zm2.8 1.46L12 19.24l2.6-3.74H9.4Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2a1 1 0 0 1 .82.43l4.5 6.5a1 1 0 0 1-.82 1.57h-9a1 1 0 0 1-.82-1.57l4.5-6.5A1 1 0 0 1 12 2ZM9.4 8.5h5.2L12 4.76 9.4 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSortStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'sort_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
