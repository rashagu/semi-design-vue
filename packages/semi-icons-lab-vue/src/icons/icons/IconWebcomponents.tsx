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
      <rect x={2} y={2} width={20} height={20} rx={5} fill="#41B3FF" />
      <rect x={7} y={5.5} width={10} height={3} rx={1.5} fill="#E9E7E7" />
      <rect x={7} y={10.5} width={10} height={3} rx={1.5} fill="#483D3D" />
      <rect x={7} y={15.5} width={10} height={3} rx={1.5} fill="#E9E7E7" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconWebcomponents',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'webcomponents'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
