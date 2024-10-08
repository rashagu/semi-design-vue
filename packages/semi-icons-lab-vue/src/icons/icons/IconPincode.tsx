import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <rect width={22} height={16} rx={2} fill="#4CC3FA" />
      <rect x={3} y={4} width={16} height={8} rx={1} fill="white" />
      <circle cx={6.5} cy={8} r={1} fill="#4CC3FA" />
      <circle cx={9.5} cy={8} r={1} fill="#4CC3FA" />
      <circle cx={12.5} cy={8} r={1} fill="#4CC3FA" />
      <circle cx={15.5} cy={8} r={1} fill="#4CC3FA" />
      <path
        d="M3 7V4.5C3 4.22386 3.22386 4 3.5 4H6"
        stroke="#F8CE27"
        stroke-width={1.5}
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M19 9V11.5C19 11.7761 18.7761 12 18.5 12H16"
        stroke="#F8CE27"
        stroke-width={1.5}
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPincode',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'pincode'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
