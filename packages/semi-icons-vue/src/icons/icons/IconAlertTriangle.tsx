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
        d="M10.2268 2.3986L1.52616 19.0749C0.831449 20.4064 1.79747 22 3.29933 22H20.7007C22.2025 22 23.1686 20.4064 22.4739 19.0749L13.7732 2.3986C13.0254 0.965441 10.9746 0.965442 10.2268 2.3986ZM13.1415 14.0101C13.0603 14.5781 12.5739 15 12.0001 15C11.4263 15 10.9398 14.5781 10.8586 14.0101L10.2829 9.97992C10.1336 8.93495 10.9445 8.00002 12.0001 8.00002C13.0556 8.00002 13.8665 8.93495 13.7172 9.97992L13.1415 14.0101ZM13.5001 18.5C13.5001 19.3284 12.8285 20 12.0001 20C11.1716 20 10.5001 19.3284 10.5001 18.5C10.5001 17.6716 11.1716 17 12.0001 17C12.8285 17 13.5001 17.6716 13.5001 18.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconAlertTriangle',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'alert_triangle'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
