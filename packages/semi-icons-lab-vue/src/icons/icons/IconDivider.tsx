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
      <rect x={2.75} y={2.75} width={18.5} height={18.5} rx={3} fill="white" stroke="#AAB2BF" stroke-width={1.5} />
      <rect x={5} y={11} width={4} height={2} fill="#4CC3FA" />
      <rect x={15} y={11} width={4} height={2} fill="#4CC3FA" />
      <rect x={10} y={11} width={4} height={2} fill="#324350" />
      <rect x={10} y={11} width={4} height={2} fill="#4CC3FA" />
      <rect x={5} y={16} width={14} height={2} fill="#324350" />
      <rect x={5} y={6} width={14} height={2} fill="#324350" />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconDivider',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'divider'} {...props}>
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
