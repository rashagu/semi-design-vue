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
        d="M5 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM2 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7-10a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM9 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm7-14a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconNineGridStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'nine_grid_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
