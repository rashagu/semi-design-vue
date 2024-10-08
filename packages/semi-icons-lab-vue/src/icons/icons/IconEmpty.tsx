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
      <path
        d="M5.44134 9.08345C5.78441 8.41807 6.47035 8 7.21896 8H16.7804C17.5293 8 18.2155 8.4184 18.5584 9.08417L21.9336 15.6367L2.12891 15.5078L5.44134 9.08345Z"
        fill="#AAB2BF"
      />
      <path
        d="M6.72999 11.3166C6.89478 10.9658 7.2475 10.7417 7.63513 10.7417H16.3649C16.7525 10.7417 17.1052 10.9657 17.27 11.3166L19 14.9999H5L6.72999 11.3166Z"
        fill="#6A6F7F"
      />
      <path
        d="M2 16C2 15.4477 2.44772 15 3 15H21C21.5523 15 22 15.4477 22 16V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V16Z"
        fill="#DDE3E8"
      />
      <rect x={11} y={1} width={2} height={5} rx={1} fill="#AAB2BF" />
      <rect
        x={3.879}
        y={4.293}
        width={2}
        height={4.3448}
        rx={1}
        transform="rotate(-45 3.87866 4.29285)"
        fill="#AAB2BF"
      />
      <rect
        x={18.573}
        y={2.879}
        width={2}
        height={4.2175}
        rx={1}
        transform="rotate(45 18.5731 2.87866)"
        fill="#AAB2BF"
      />
      <circle cx={12} cy={18.5} r={1.5} fill="#AAB2BF" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconEmpty',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'empty'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
