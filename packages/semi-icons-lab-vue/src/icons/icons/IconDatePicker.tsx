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
      <g clip-path="url(#clip0_1_3038)">
        <rect x={1} y={4} width={22} height={16} rx={3} fill="#DDE3E8" />
        <path
          d="M6.5 11H9v2.5H6.5V11Zm6 4.5h-7V10h7v5.5Zm0-8H12v-1h-1v1H7v-1H6v1h-.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Z"
          fill="#4CC3FA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.5 12.8a1 1 0 0 1 1.7-.71l8.71 8.7a1 1 0 0 1-.7 1.71h-3.96a2 2 0 0 0-1.5.67l-2.5 2.8a1 1 0 0 1-1.75-.66V12.79Zm4.18 8.2H22l-7-7v10l2.68-3Z"
          fill="white"
        />
        <path d="M15 24V14l7 7h-4.32L15 24Z" fill="#324350" />
      </g>
      <defs>
        <clipPath id="clip0_1_3038">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconDatePicker',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'date-picker'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
