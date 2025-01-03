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
      <path d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Z" fill="#FF7D95" />
      <path
        d="M13.35 17.26c0-.07-.18-2.61-.33-3.56.76.6 2.92 2 2.98 2.01.24.14.5.2.75.18.63-.04 1.2-.44 1.23-1.2.08-.49-.1-.93-.6-1.18-.06-.05-2.41-1.15-3.33-1.51.92-.36 3.24-1.44 3.27-1.47.5-.25.74-.79.65-1.28-.04-.59-.57-1.1-1.25-1.14a1.2 1.2 0 0 0-.7.16c-.06.02-2.24 1.44-3 2.03.15-.95.33-3.47.33-3.54 0-.67-.6-1.26-1.34-1.26a1.3 1.3 0 0 0-1.34 1.31c0 .06.18 2.53.33 3.47-.77-.59-2.96-2.01-3.03-2.03-.2-.12-.44-.17-.7-.16-.63.04-1.2.52-1.23 1.14-.1.5.14 1.03.62 1.28.08.05 2.41 1.13 3.33 1.49-.92.36-3.3 1.47-3.36 1.51-.46.23-.7.67-.61 1.15.04.79.59 1.21 1.23 1.25.26.01.52-.04.75-.18.06-.02 2.23-1.42 2.98-2.03a83.1 83.1 0 0 0-.31 3.5c-.02.75.6 1.3 1.34 1.3.74 0 1.34-.59 1.34-1.24Z"
        fill="white"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBadgeStar',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'badge-star'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
