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
        d="M12 1a1.5 1.5 0 0 0 0 3 8 8 0 1 1-4.75 14.44 1.5 1.5 0 1 0-1.79 2.4A11 11 0 1 0 12 1ZM7.5 5.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-3 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.5-9a1.5 1.5 0 0 0-3 0V12c0 .4.16.78.44 1.06l3 3a1.5 1.5 0 0 0 2.12-2.12l-2.56-2.56V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconActivity',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'activity'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
