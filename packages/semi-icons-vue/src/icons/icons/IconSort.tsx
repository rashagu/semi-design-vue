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
        d="m6.45 8.34 4.8-6.48a1 1 0 0 1 1.5 0l4.8 6.48A1 1 0 0 1 16.8 10H7.2a1 1 0 0 1-.75-1.66Z"
        fill="currentColor"
      />
      <path
        d="m17.55 15.66-4.8 6.48a1 1 0 0 1-1.5 0l-4.8-6.48A1 1 0 0 1 7.2 14h9.6a1 1 0 0 1 .75 1.66Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSort',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'sort'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
