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
        d="M20.5 13.99 12.01 5.5l.75-.74a6 6 0 1 1 8.48 8.48l-.74.75Z"
        fill="#F82C2C"
      />
      <path
        d="M11.24 4.76a6 6 0 1 0-8.48 8.48L12 22.5 20.5 14c1.3-1.25 1.84-2 2.16-3-2.66 3-4.16 1-10.65-5.5-.5-.5-.77-.74-.77-.74Z"
        fill="#FF7D95"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconHeart',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'heart'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
