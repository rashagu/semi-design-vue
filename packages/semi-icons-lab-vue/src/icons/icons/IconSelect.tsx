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
      <g clip-path="url(#clip0_1_3050)">
        <rect x={2} y={2} width={16} height={5} rx={0.5} fill="#DDE3E8" />
        <rect x={2} y={17} width={16} height={5} rx={0.5} fill="#DDE3E8" />
        <rect x={6} y={9} width={16} height={6} rx={0.5} fill="#FBCD2C" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5 10.8a1 1 0 0 1 1.7-.71l8.71 8.7a1 1 0 0 1-.7 1.71h-3.96a2 2 0 0 0-1.5.67l-2.5 2.8a1 1 0 0 1-1.75-.66V10.79Zm4.18 8.2H21l-7-7v10l2.68-3Z"
          fill="white"
        />
        <path d="M14 22V12l7 7h-4.32L14 22Z" fill="#324350" />
      </g>
      <defs>
        <clipPath id="clip0_1_3050">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSelect',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'select'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
