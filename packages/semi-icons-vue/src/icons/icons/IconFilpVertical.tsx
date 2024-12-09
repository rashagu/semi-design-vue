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
        d="M20.88 10.88a1.25 1.25 0 0 0 .44-2.42L3.57 1.7a1.25 1.25 0 0 0-1.7 1.17v6.75c0 .69.56 1.24 1.25 1.24h17.75Zm-16.5-2.5v-3.7l9.7 3.7h-9.7ZM22.1 13.9c-.1-.6-.62-1.03-1.23-1.03H3.13c-.69 0-1.25.56-1.25 1.26v6.74a1.25 1.25 0 0 0 1.7 1.17l17.75-6.75c.56-.21.9-.8.78-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconFilpVertical',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'filp_vertical'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
