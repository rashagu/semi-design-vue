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
      <rect x={1} y={4} width={22} height={16} rx={2} fill="#DDE3E8" />
      <rect x={5} y={8} width={14} height={4} fill="#AAB2BF" />
      <rect x={5} y={14} width={8} height={2} fill="#AAB2BF" />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconCard',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'card'} {...props}>
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
