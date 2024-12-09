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
        d="M7 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM2.5 4.5a4.5 4.5 0 1 1 6 4.24v4.23a19.2 19.2 0 0 1 3.87-.51l.28-.02a13.8 13.8 0 0 0 3.6-.54 4.5 4.5 0 1 1 3.54.41c-.14.42-.35.8-.63 1.14a4.49 4.49 0 0 1-1.94 1.3c-1.32.48-3 .6-4.37.68l-.11.01c-1.3.09-2.37.16-3.19.35a4.5 4.5 0 1 1-4.05-.53V8.74a4.5 4.5 0 0 1-3-4.24Zm16 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSourceControl',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'source_control'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
