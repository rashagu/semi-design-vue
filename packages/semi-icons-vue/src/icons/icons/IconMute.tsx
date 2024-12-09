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
        d="M12 3a1 1 0 0 0-1.62-.78L4.65 7H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.65l5.73 4.78A1 1 0 0 0 12 21V3Zm2.06 4.94a1.5 1.5 0 0 1 2.12 0L18 9.76l1.82-1.82a1.5 1.5 0 1 1 2.12 2.12l-1.82 1.82 1.94 1.94a1.5 1.5 0 0 1-2.12 2.12L18 14l-1.94 1.94a1.5 1.5 0 0 1-2.12-2.12l1.94-1.94-1.82-1.82a1.5 1.5 0 0 1 0-2.12Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconMute',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'mute'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
