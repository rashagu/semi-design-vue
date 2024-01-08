import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
import type { IconProps } from '../components/Icon';
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
      <rect x={2} y={1} width={20} height={10} rx={5} fill="#DDE3E8" />
      <circle cx={7.5} cy={5.99997} r={3.5} fill="white" />
      <rect x={2} y={13} width={20} height={10} rx={5} fill="#3BCE4A" />
      <circle cx={16.5} cy={18} r={3.5} fill="white" />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconSwitch',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'switch'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
IconComponent.props = iconVuePropsType;
export default IconComponent;
export { SvgComponent };
