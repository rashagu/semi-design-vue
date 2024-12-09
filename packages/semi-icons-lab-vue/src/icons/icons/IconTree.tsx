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
      <rect x={9} y={16} width={13} height={5} rx={0.5} fill="#6A6F7F" />
      <rect x={9} y={9} width={13} height={5} rx={0.5} fill="#6A6F7F" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 6a1 1 0 0 1 1 1v11h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
        fill="#AAB2BF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"
        fill="#AAB2BF"
      />
      <rect x={2} y={2} width={15} height={5} rx={0.5} fill="#4CC3FA" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTree',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'tree'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
