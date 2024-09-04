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
      <rect x={2} y={2} width={20} height={20} rx={3} fill="#DDE3E8" />
      <rect x={5} y={6} width={14} height={2} fill="#324350" />
      <rect x={5} y={11} width={14} height={2} fill="#324350" />
      <rect x={5} y={16} width={10} height={2} fill="#324350" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconChangelog',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'changelog'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
