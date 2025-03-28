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
      <rect x={2.75} y={2.75} width={18.5} height={18.5} rx={3} fill="white" stroke="#AAB2BF" stroke-width={1.5} />
      <path
        d="M9.4 16.58c0 .91 1.14 1.75 2.63 1.75 1.66 0 2.83-.92 2.83-2.24a1.8 1.8 0 0 0-1.6-1.82v-.1c.76-.1 1.37-.86 1.37-1.67 0-1.18-1.07-2-2.6-2-1.43 0-2.5.81-2.5 1.7 0 .35.24.6.6.6.26 0 .45-.12.62-.4.29-.49.71-.74 1.26-.74.7 0 1.18.41 1.18 1.02 0 .6-.5 1.05-1.17 1.05h-.51a.56.56 0 0 0-.58.57c0 .35.25.6.58.6h.54c.8 0 1.35.46 1.35 1.14 0 .69-.53 1.13-1.36 1.13a1.6 1.6 0 0 1-1.43-.78c-.2-.3-.38-.4-.63-.4a.58.58 0 0 0-.58.6Z"
        fill="#324350"
      />
      <path d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4H2V5Z" fill="#F82C2C" />
      <path
        d="M9.97 7.5c.28 0 .44-.18.44-.5V4.12c0-.4-.2-.62-.56-.62-.3 0-.47.14-.64.5l-.79 1.77H8.4L7.61 4c-.18-.37-.35-.5-.64-.5-.35 0-.57.23-.57.61V7c0 .32.14.5.42.5.27 0 .43-.18.43-.5V5.02h.05l.66 1.49c.14.28.25.38.45.38s.3-.09.44-.38l.66-1.49h.05V7c0 .32.14.5.41.5Z"
        fill="white"
      />
      <path
        d="M11.35 7.5c.25 0 .39-.13.49-.46l.15-.47h1.32l.15.47c.1.32.24.46.5.46.27 0 .45-.16.45-.41 0-.1-.03-.22-.08-.38l-.87-2.55c-.16-.47-.37-.65-.79-.65-.41 0-.64.18-.8.65l-.86 2.55c-.07.2-.1.3-.1.4 0 .23.18.39.44.39Zm.83-1.62.45-1.5h.05l.44 1.5h-.94Z"
        fill="white"
      />
      <path
        d="M15.94 7.5c.29 0 .48-.2.47-.48l-.01-1.03 1-1.66c.11-.18.16-.3.16-.42a.41.41 0 0 0-.43-.41c-.2 0-.34.12-.46.35l-.71 1.31h-.04l-.69-1.31c-.12-.25-.26-.35-.46-.35-.26 0-.44.17-.44.43 0 .11.04.22.14.39l1.01 1.67-.02 1.03c0 .28.19.48.48.48Z"
        fill="white"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCalendar',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'calendar'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
