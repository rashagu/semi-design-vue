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
        d="M14 5.5a3.5 3.5 0 1 1 1 2.45l-5.13 3.11a3.5 3.5 0 0 1 .03 1.79l5.22 3.08A3.49 3.49 0 0 1 21 18.5a3.5 3.5 0 1 1-6.9-.85l-5.22-3.08A3.49 3.49 0 0 1 3 12a3.5 3.5 0 0 1 5.8-2.63l5.27-3.19A3.51 3.51 0 0 1 14 5.5ZM17.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-11 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconShareStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'share_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
