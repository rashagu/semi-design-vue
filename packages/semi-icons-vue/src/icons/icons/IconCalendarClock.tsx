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
        d="M2 5v14a3 3 0 0 0 3 3h7.1a7.02 7.02 0 0 1-1.43-2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2.67c.75.36 1.43.85 2 1.43V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3Z"
        fill="currentColor"
      />
      <path d="M16 10h1c-.54 0-1.06.06-1.57.18A1 1 0 0 1 16 10Z" fill="currentColor" />
      <path
        d="M13.5 10.94a1 1 0 0 0-1-.94h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 .77.97 7.03 7.03 0 0 1 2.23-2.03Z"
        fill="currentColor"
      />
      <path d="M7 10a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H7Z" fill="currentColor" />
      <path d="M6 16a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1Z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 17a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-4-2a1 1 0 1 0-2 0v2c0 .27.1.52.3.7l1.5 1.5a1 1 0 0 0 1.4-1.4L18 16.58V15Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCalendarClock',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'calendar_clock'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
