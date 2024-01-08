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
      <path d="M16 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H16V2Z" fill="#6A6F7F" />
      <rect x={3.5} y={7} width={12.5} height={5} fill="#4CC3FA" />
      <path d="M3.5 17H16V20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V17Z" fill="#DDE3E8" />
      <path d="M18.9991 4L20.2981 6.25H17.7L18.9991 4Z" fill="#AAB2BF" />
      <path d="M18.999 20.25L17.7 18H20.2981L18.999 20.25Z" fill="#AAB2BF" />
      <rect x={18} y={8} width={2} height={6} rx={1} fill="#DDE3E8" />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconScrollList',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'scroll-list'} {...props}>
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
