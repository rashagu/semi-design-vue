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
      <path d="M12 8.5S12.5 6 11 4 8 2 8 2" stroke="#AAB2BF" stroke-width={2} stroke-linecap="round" />
      <rect x={1} y={6} width={22} height={15} rx={2} fill="#DDE3E8" />
      <rect x={3} y={8} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={8} y={8} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={13} y={8} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={18} y={8} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={3} y={12} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={8} y={12} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={13} y={12} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={18} y={12} width={3} height={3} rx={1.5} fill="#6A6F7F" />
      <rect x={6} y={17} width={12} height={2} rx={1} fill="#6A6F7F" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconInput',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'input'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
