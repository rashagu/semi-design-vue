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
        d="M5 6C5.55228 6 6 6.44772 6 7V18H7C7.55228 18 8 18.4477 8 19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V7C4 6.44772 4.44772 6 5 6Z"
        fill="#AAB2BF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 12C5 11.4477 5.44772 11 6 11H7C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
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
