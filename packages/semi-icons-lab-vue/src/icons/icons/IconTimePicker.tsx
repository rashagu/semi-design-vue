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
      <circle cx={12} cy={12} r={10.25} fill="white" stroke="#AAB2BF" stroke-width={1.5} />
      <path
        d="M14.5 6.5L12 12L17 17.5"
        stroke="#6A6F7F"
        stroke-width={2.5}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx={12} cy={12} r={2} fill="#324350" />
      <path d="M13 11.625L12 12L5 15" stroke="#FBCD2C" stroke-linecap="round" />
      <circle cx={12} cy={12} r={1} fill="#FBCD2C" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTimePicker',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'time-picker'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
