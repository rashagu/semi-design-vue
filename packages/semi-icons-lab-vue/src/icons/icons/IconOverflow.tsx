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
      <rect x={1} y={4} width={22} height={16} rx={3} fill="#DDE3E8" />
      <circle cx={6} cy={12} r={2} fill="#6A6F7F" />
      <circle cx={12} cy={12} r={2} fill="#6A6F7F" />
      <circle cx={18} cy={12} r={2} fill="#6A6F7F" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconOverflow',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'overflow'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
