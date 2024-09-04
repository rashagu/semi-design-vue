import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <rect width={8} height={8} rx={4} fill="#F0B114" />
      <rect y={10} width={8} height={8} rx={4} fill="#E91E63" />
      <rect x={10} width={8} height={8} rx={4} fill="#0077FA" />
      <rect x={10} y={10} width={8} height={8} rx={4} fill="#00B3A1" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconToken',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'token'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
