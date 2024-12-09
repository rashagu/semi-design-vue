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
        d="M13.24 3.34a4 4 0 0 0-2.83 1.17L1.7 13.24a2 2 0 0 0 0 2.83l5.65 5.66a2 2 0 0 0 2.83 0L18.9 13a4 4 0 0 0 1.17-2.83V5.34a2 2 0 0 0-2-2h-4.83ZM13 7.6a2 2 0 1 0 2.83 2.82A2 2 0 0 0 13 7.6Z"
        fill="#F82C2C"
      />
      <path
        d="M14.85 8.4c1.2-1.5 4.85-3.7 6.65-1.9 2.25 2.25-1.5 6-1.5 9.5 0 2.47 2.15 3 2.85 3"
        stroke="#AAB2BF"
        stroke-width={1.5}
        stroke-linecap="round"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTag',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'tag'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
