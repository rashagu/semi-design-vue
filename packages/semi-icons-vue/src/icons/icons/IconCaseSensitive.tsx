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
        d="M8.92 4.01a1.5 1.5 0 0 0-2.84 0l-5 14.5a1.5 1.5 0 0 0 2.84.98l1.03-2.99h5.1l1.03 2.99a1.5 1.5 0 1 0 2.84-.98l-5-14.5Zm.1 9.49H5.98L7.5 9.1l1.52 4.4Zm6.98 1c0-2.03 1.22-3 2-3s2 .97 2 3c0 2.03-1.22 3-2 3s-2-.97-2-3Zm2-6c.85 0 1.62.23 2.28.63A1.5 1.5 0 0 1 23 10v9a1.5 1.5 0 0 1-2.72.87c-.66.4-1.43.63-2.28.63-3.1 0-5-3.06-5-6s1.9-6 5-6Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCaseSensitive',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'case_sensitive'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
