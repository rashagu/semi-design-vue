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
        d="M20.36 12a8.36 8.36 0 1 1-16.72 0 8.36 8.36 0 0 1 16.72 0ZM23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Zm-5.45-2.15A1.32 1.32 0 1 0 15.7 8l-5.67 5.66-2.37-2.36a1.32 1.32 0 0 0-1.86 1.86l3.3 3.3a1.32 1.32 0 0 0 1.86 0l6.6-6.6Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconStoryStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'story_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
