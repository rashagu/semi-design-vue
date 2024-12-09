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
        d="M7 2c-.83 0-1.5.67-1.5 1.5V11a6.5 6.5 0 1 0 13 0V3.5a1.5 1.5 0 0 0-3 0V11a3.5 3.5 0 1 1-7 0V3.5C8.5 2.67 7.83 2 7 2Z"
        fill="currentColor"
      />
      <path d="M5.5 19a1.5 1.5 0 0 0 0 3h13a1.5 1.5 0 0 0 0-3h-13Z" fill="currentColor" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconUnderline',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'underline'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
