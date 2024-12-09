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
        d="M9.93 4.93c.25.8-.2 1.63-.99 1.88a7.02 7.02 0 0 0-4.08 3.32A5.02 5.02 0 0 1 11 15a5 5 0 0 1-10 0v-1.5a10 10 0 0 1 7.06-9.56c.8-.24 1.63.2 1.87 1Zm12 0c.25.8-.2 1.63-.99 1.88a7.02 7.02 0 0 0-4.08 3.32A5.02 5.02 0 0 1 23 15a5 5 0 0 1-10 0v-1.5a10 10 0 0 1 7.06-9.56c.8-.24 1.63.2 1.87 1Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconQuote',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'quote'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
