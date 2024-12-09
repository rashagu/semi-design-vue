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
        d="M1 5.96a1 1 0 0 1 1.59-.8l8.3 6.03a1 1 0 0 1 0 1.62l-8.3 6.03a1 1 0 0 1-1.59-.8V5.96Z"
        fill="currentColor"
      />
      <path
        d="M12 5.96a1 1 0 0 1 1.59-.8l8.3 6.03a1 1 0 0 1 0 1.62l-8.3 6.03a1 1 0 0 1-1.59-.8V5.96Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconFastFoward',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'fast_foward'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
