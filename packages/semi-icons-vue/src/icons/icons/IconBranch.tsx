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
        d="M11 4.5c0 1.4-.82 2.6-2 3.16v5.32c2.16-.05 4.03-.27 5.44-.9a4.05 4.05 0 0 0 1.98-1.77 3.5 3.5 0 1 1 3.03.56 7.04 7.04 0 0 1-3.76 3.93c-1.97.9-4.39 1.13-6.69 1.18v.36a3.5 3.5 0 1 1-3 0V7.66a3.5 3.5 0 1 1 5-3.16Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBranch',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'branch'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
