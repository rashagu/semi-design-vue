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
      <rect x={1} y={2} width={2} height={20} rx={1} fill="#DDE3E8" />
      <rect x={21} y={2} width={2} height={20} rx={1} fill="#DDE3E8" />
      <path d="M6 12h12" stroke="#4CC3FA" stroke-width={2} stroke-linecap="round" />
      <path d="m15 9 3 3-3 3" stroke="#4CC3FA" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
      <path d="m9 9-3 3 3 3" stroke="#4CC3FA" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSpace',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'space'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
