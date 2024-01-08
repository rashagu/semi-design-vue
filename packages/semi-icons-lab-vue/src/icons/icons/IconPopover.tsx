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
      <rect x={9} y={9} width={13} height={13} rx={2} fill="#6A6F7F" />
      <rect x={2} y={7} width={12} height={12} rx={2} fill="#AAB2BF" />
      <rect x={8} y={2} width={11} height={11} rx={2} fill="#DDE3E8" />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconPopover',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'popover'} {...props}>
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
