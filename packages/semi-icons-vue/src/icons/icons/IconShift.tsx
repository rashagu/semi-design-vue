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
        d="M12 1c.45 0 .87.2 1.15.54l10 12A1.5 1.5 0 0 1 22 16h-4v5.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 6 21.5V16H2a1.5 1.5 0 0 1-1.15-2.46l10-12c.28-.34.7-.54 1.15-.54ZM5.2 13H9v7h6v-7h3.8L12 4.84 5.2 13Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconShift',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'shift'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
