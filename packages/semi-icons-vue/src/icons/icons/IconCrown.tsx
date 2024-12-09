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
        d="M.83 7.66c-.24-.77.68-1.37 1.29-.85l1.85 1.6a3 3 0 0 0 4.68-1.04L11.1 2a1 1 0 0 1 1.82 0l2.44 5.37a3 3 0 0 0 4.68 1.03l1.85-1.59c.61-.52 1.53.08 1.29.85L19.44 20.6a2 2 0 0 1-1.91 1.4H6.47a2 2 0 0 1-1.9-1.4L.82 7.66Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCrown',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'crown'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
