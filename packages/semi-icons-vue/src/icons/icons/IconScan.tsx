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
        d="M1 12c0-.83.64-1.5 1.43-1.5h19.14c.79 0 1.43.67 1.43 1.5s-.64 1.5-1.43 1.5H2.43C1.64 13.5 1 12.83 1 12Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 3.5c0-.83.67-1.5 1.5-1.5h3A3.5 3.5 0 0 1 22 5.5v2a1.5 1.5 0 0 1-3 0v-2a.5.5 0 0 0-.5-.5h-3A1.5 1.5 0 0 1 14 3.5Zm-12 2A3.5 3.5 0 0 1 5.5 2h3a1.5 1.5 0 1 1 0 3h-3a.5.5 0 0 0-.5.5v2a1.5 1.5 0 1 1-3 0v-2ZM3.5 15c.83 0 1.5.67 1.5 1.5v2c0 .28.22.5.5.5h3a1.5 1.5 0 0 1 0 3h-3A3.5 3.5 0 0 1 2 18.5v-2c0-.83.67-1.5 1.5-1.5Zm17 0c.83 0 1.5.67 1.5 1.5v2a3.5 3.5 0 0 1-3.5 3.5h-3a1.5 1.5 0 0 1 0-3h3a.5.5 0 0 0 .5-.5v-2c0-.83.67-1.5 1.5-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconScan',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'scan'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
