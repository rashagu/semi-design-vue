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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 3.05A9 9 0 0 0 12 21v2a11 11 0 1 1 10.59-8h-2.1c.22-.64.38-1.3.46-2H14.4l2 2H13.6L11 12.41V3.05Zm2 0V11h7.95A9 9 0 0 0 13 3.05ZM13 22v-6h1.5v2.25H16V16h1.5v6H16v-2.25h-1.5V22H13Zm5.75-4.5v2.25h2.5v.75h-2.5V22h4v-3.75h-2.5v-.75h2.5V16h-4v1.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPiechartH5Stroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'piechart_h5_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
