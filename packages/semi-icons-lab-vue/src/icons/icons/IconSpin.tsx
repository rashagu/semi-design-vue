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
      <path d="M13.5 2.5a1.5 1.5 0 0 0-3 0v4a1.5 1.5 0 0 0 3 0v-4Z" fill="#AAB2BF" />
      <path d="M13.5 17.5a1.5 1.5 0 0 0-3 0v4a1.5 1.5 0 0 0 3 0v-4Z" fill="#AAB2BF" />
      <path d="M4.52 5.95a1.5 1.5 0 1 0-1.5 2.6l3.47 2a1.5 1.5 0 0 0 1.5-2.6l-3.47-2Z" fill="#AAB2BF" />
      <path d="M17.51 13.45a1.5 1.5 0 0 0-1.5 2.6l3.47 2a1.5 1.5 0 1 0 1.5-2.6l-3.47-2Z" fill="#AAB2BF" />
      <path d="M3.02 15.45a1.5 1.5 0 1 0 1.5 2.6l3.47-2a1.5 1.5 0 1 0-1.5-2.6l-3.47 2Z" fill="#AAB2BF" />
      <path d="M16.01 7.95a1.5 1.5 0 0 0 1.5 2.6l3.47-2a1.5 1.5 0 1 0-1.5-2.6l-3.47 2Z" fill="#FF7D95" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSpin',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'spin'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
