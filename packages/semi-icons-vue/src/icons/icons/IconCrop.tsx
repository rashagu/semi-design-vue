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
        d="M21.5 19a1.5 1.5 0 0 0 0-3H19V8c0-1.5-1.5-3-3-3H8V2.5a1.5 1.5 0 1 0-3 0V5H2.5a1.5 1.5 0 1 0 0 3H5v8c0 1.5 1.5 3 3 3h8v2.5a1.5 1.5 0 0 0 3 0V19h2.5ZM16 16V9a1 1 0 0 0-1-1H8v7a1 1 0 0 0 1 1h7Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCrop',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'crop'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
