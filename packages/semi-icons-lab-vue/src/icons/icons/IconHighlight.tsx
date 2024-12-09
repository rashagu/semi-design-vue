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
      <rect x={3} y={8} width={18} height={8} rx={1} fill="#FAC800" />
      <path
        d="M4.44 4.44a.96.96 0 0 0-.28.68v3.06a.96.96 0 0 0 1.93 0v-2.1h4.95v11.83h-2.1a.96.96 0 0 0-.68 1.65l.14-.14-.14.14c.18.18.43.28.68.28h6.12a.96.96 0 0 0 0-1.93h-2.1V6.1h4.95v2.1a.96.96 0 0 0 1.93 0V5.11a.96.96 0 0 0-.96-.96H5.13c-.26 0-.5.1-.69.28Z"
        fill="#6A6F7F"
        stroke="#6A6F7F"
        stroke-width={0.4}
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconHighlight',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'highlight'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
