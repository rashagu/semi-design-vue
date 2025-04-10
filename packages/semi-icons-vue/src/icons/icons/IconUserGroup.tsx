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
        d="M15.95 3.09s-.55-.84-1.11-.84c-.5 0-.98.04-1.84.84-1.11 1.02-1.5 2.41-1.5 4.73 0 1.53.3 3.18 1.67 3.9l.38.14c.78 1.64 2.03 2.7 3.42 2.7 1.53 0 2.9-1.3 3.64-3.24l.06-.03c.63.15 1.51.2 2.12.2.27.01.4-.31.24-.51a6.4 6.4 0 0 1-.96-1.5c-.05-.13-.11-.52-.2-1.05-.2-1.38-.57-3.72-1.37-4.93-.72-1.08-3-1.5-3.83-1.25-.61.19-.72.84-.72.84ZM2.21 4.42c.21-.47.8-.57 1.23-.29L4 4.5 4.01 3c0-.2.13-.4.32-.45a6.2 6.2 0 0 1 1.78-.23c2.95 0 4.36 1.4 4.43 5 .75.3.8 1.22.53 2.26-.21.8-.67 1.4-1.16 1.6-.78 2.03-2.2 3.38-3.8 3.38-1.6 0-3.02-1.35-3.8-3.38-.48-.2-.95-.8-1.16-1.6-.27-1.04-.22-1.97.53-2.25.03-1.21.2-2.17.53-2.91ZM8 22c.55 0 1-.45 1.03-1 .1-1.3.45-2.15 1.27-3 .5-.53.43-1.4-.26-1.61A8.47 8.47 0 0 0 7.5 16c-3.06 0-5.69 1.6-6.87 3.89C.1 20.94 2.03 22 3.22 22H8Zm13.8 0c1.18 0 2.12-1.05 1.61-2.1A7.06 7.06 0 0 0 17 16a7.06 7.06 0 0 0-6.41 3.9c-.51 1.05.43 2.1 1.61 2.1h9.6Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconUserGroup',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'user_group'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
