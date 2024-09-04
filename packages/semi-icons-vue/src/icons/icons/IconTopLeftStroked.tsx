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
        d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22C3.55228 22 4 21.5523 4 21V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM11 10C10.4477 10 10 10.4477 10 11V21C10 21.5523 10.4477 22 11 22H21C21.5523 22 22 21.5523 22 21V11C22 10.4477 21.5523 10 21 10H11ZM12 20V12H20V20H12Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTopLeftStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'top_left_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
