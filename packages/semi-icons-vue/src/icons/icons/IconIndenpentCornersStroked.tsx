import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 25 24"
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
        d="M15.5 2a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1h-6Zm-6 20a1 1 0 1 0 0-2h-5v-5a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1h6Zm-6-12a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-5v5a1 1 0 0 1-1 1Zm19 5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h6a1 1 0 0 0 1-1v-6Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconIndenpentCornersStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'indenpent_corners_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
