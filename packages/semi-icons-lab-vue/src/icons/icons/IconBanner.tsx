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
      <rect x={6} y={19} width={12} height={1} fill="#6A6F7F" />
      <rect
        x={7.942}
        y={0.897}
        width={2}
        height={22.2633}
        rx={1}
        transform="rotate(10 7.94241 0.896553)"
        fill="#AAB2BF"
      />
      <rect
        x={14.085}
        y={1.229}
        width={2}
        height={22.3119}
        rx={1}
        transform="rotate(-10 14.0853 1.22887)"
        fill="#AAB2BF"
      />
      <rect x={1} y={3} width={22} height={14} rx={2} fill="#FBCD2C" />
      <rect x={4} y={6} width={16} height={2} fill="#324350" />
      <rect x={4} y={11} width={9} height={2} fill="#324350" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBanner',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'banner'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
