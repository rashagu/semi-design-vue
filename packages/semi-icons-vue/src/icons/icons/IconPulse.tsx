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
        d="M9.5 1a1.5 1.5 0 0 1 1.4 1.1l3.77 14.27 1.4-4.84a1.5 1.5 0 0 1 1.43-1.03H22a1.5 1.5 0 0 1 0 3h-3.42l-2.62 8.47a1.5 1.5 0 0 1-2.87-.07L9.33 7.63l-1.4 4.84A1.5 1.5 0 0 1 6.5 13.5H2a1.5 1.5 0 0 1 0-3h3.42l2.62-8.47C8.24 1.4 8.84.98 9.5 1Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPulse',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'pulse'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
