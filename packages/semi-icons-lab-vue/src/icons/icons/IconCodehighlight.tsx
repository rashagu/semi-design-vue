import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <rect y={0.406} width={22} height={10} rx={2} fill="#49C4FD" />
      <path d="M0 4.59375H11V17.5938H2C0.895431 17.5938 0 16.6983 0 15.5938V4.59375Z" fill="#F9FCFF" />
      <path d="M11 4.59375H22V15.5938C22 16.6983 21.1046 17.5938 20 17.5938H11V4.59375Z" fill="#F9FCFF" />
      <path d="M7 8L4 11L7 14" stroke="#F8CE27" stroke-width={1.5} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 8L18 11L15 14" stroke="#49C4FD" stroke-width={1.5} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 8L10 14.5" stroke="#E0E4E7" stroke-width={1.5} stroke-linecap="round" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCodehighlight',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'codehighlight'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
