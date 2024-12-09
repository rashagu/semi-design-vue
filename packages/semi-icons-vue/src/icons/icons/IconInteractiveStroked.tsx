import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 25 24"
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
        d="M12.5 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm8.18-10a8.18 8.18 0 1 1-16.36 0 8.18 8.18 0 0 1 16.36 0Zm-1.82 0a6.36 6.36 0 1 1-12.72 0 6.36 6.36 0 0 1 12.72 0Zm-6.36 4.55a4.55 4.55 0 1 0 0-9.1 4.55 4.55 0 0 0 0 9.1ZM15.23 12a2.73 2.73 0 1 1-5.46 0 2.73 2.73 0 0 1 5.46 0Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconInteractiveStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'interactive_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
