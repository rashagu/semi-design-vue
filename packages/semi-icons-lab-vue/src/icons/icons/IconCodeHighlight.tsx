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
      <path d="M0 4.6h11v13H2a2 2 0 0 1-2-2v-11Z" fill="#F9FCFF" />
      <path d="M11 4.6h11v11a2 2 0 0 1-2 2h-9v-13Z" fill="#F9FCFF" />
      <path d="m7 8-3 3 3 3" stroke="#F8CE27" stroke-width={1.5} stroke-linecap="round" stroke-linejoin="round" />
      <path d="m15 8 3 3-3 3" stroke="#49C4FD" stroke-width={1.5} stroke-linecap="round" stroke-linejoin="round" />
      <path d="m12 8-2 6.5" stroke="#E0E4E7" stroke-width={1.5} stroke-linecap="round" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCodeHighlight',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'code-highlight'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
