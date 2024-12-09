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
        d="M4.5 12a7.5 7.5 0 0 1 13.8-4.07l-2-.4a1.5 1.5 0 0 0-.6 2.94l5 1c.76.15 1.51-.3 1.74-1.04l1.5-5a1.5 1.5 0 1 0-2.88-.86l-.43 1.45A10.49 10.49 0 0 0 1.5 12a10.5 10.5 0 0 0 20.4 3.5 1.5 1.5 0 1 0-2.83-1A7.5 7.5 0 0 1 4.5 12Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconRefresh',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'refresh'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
