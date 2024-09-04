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
      <rect x={2} y={11} width={21} height={3} fill="#DDE3E8" />
      <rect x={2} y={15} width={21} height={3} fill="#DDE3E8" />
      <rect x={11} y={2} width={12} height={3} fill="#AAB2BF" />
      <rect x={11} y={6} width={9} height={3} fill="#AAB2BF" />
      <rect x={2} y={19} width={11} height={3} fill="#DDE3E8" />
      <rect x={2} y={2} width={7} height={7} fill="#6A6F7F" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSkeleton',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'skeleton'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
