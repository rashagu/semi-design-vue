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
      <rect x={3} y={11} width={18} height={2} fill="#AAB2BF" />
      <circle cx={4} cy={12} r={3} fill="#DDE3E8" />
      <circle cx={12} cy={12} r={3} fill="#DDE3E8" />
      <circle cx={20} cy={12} r={3} fill="#4CC3FA" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTimeline',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'timeline'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
