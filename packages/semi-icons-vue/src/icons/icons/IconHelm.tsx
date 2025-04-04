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
        d="M23 11.84v-.01c0-.48-.45-.9-1.03-.9h-1.1A8.7 8.7 0 0 0 19 6.43l.76-.75c.2-.18.3-.42.34-.66a.83.83 0 0 0-.12-.54.45.45 0 0 0-.1-.15l-.22-.21a.44.44 0 0 0-.12-.09.8.8 0 0 0-.57-.14c-.25.03-.49.17-.66.34l-.76.76a9.06 9.06 0 0 0-4.52-1.86v-1.1c0-.58-.4-1.02-.87-1.03H11.84c-.47.01-.87.45-.87 1.03V3.2c-1.7.2-3.25.89-4.52 1.9l-.76-.76A1.1 1.1 0 0 0 4.93 4a.7.7 0 0 0-.1 0 .52.52 0 0 0-.5.13l-.2.21a.48.48 0 0 0-.14.28.83.83 0 0 0-.1.41c0 .28.14.55.35.76l.76.75a9 9 0 0 0-1.86 4.5h-1.1c-.43 0-.78.22-.94.52a.48.48 0 0 0-.1.3V12.2c0 .48.45.89 1.03.89h1.1A8.7 8.7 0 0 0 5 17.6l-.76.76c-.2.2-.34.48-.34.76 0 .1.02.2.06.3.01.1.06.18.13.25l.21.21c.07.08.17.12.28.13.12.07.26.1.42.1.28 0 .55-.13.76-.34l.76-.76a9.06 9.06 0 0 0 4.51 1.86v1.1c0 .39.19.72.46.9.09.08.2.13.33.13h.39c.48 0 .9-.45.9-1.03v-1.1A8.76 8.76 0 0 0 17.61 19l.69.72c.17.21.41.31.66.35.14.02.3-.01.45-.08a.46.46 0 0 0 .2-.12l.22-.21a.43.43 0 0 0 .06-.07c.14-.14.2-.33.2-.55 0-.28-.13-.55-.34-.76l-.76-.76a9 9 0 0 0 1.86-4.5h1.1c.6 0 1.04-.41 1.04-.9v-.29Zm-9.9 6.28v-3.54c0-.04 0-.04.04-.04l2.52 2.51c-.76.55-1.63.93-2.56 1.07Zm-2.1 0a6.21 6.21 0 0 1-2.55-1.07l2.52-2.47H11v3.54Zm6.1-2.51L14.6 13.1c0-.03.03-.03.03-.03h3.55c-.17.89-.51 1.78-1.07 2.54ZM7 15.57a5.75 5.75 0 0 1-1.07-2.54h3.55c.04 0 .04.04.04.04L7 15.57Zm11.17-4.6h-3.55s-.03 0-.03-.04l2.51-2.5c.56.75.93 1.61 1.07 2.54Zm-8.69 0H5.93c.17-.9.52-1.79 1.07-2.54l2.52 2.5c-.04 0-.04.04-.04.04Zm1.49-1.48L8.45 7c.8-.56 1.65-.94 2.55-1.07v3.54c0 .03-.03.03-.03.03Zm2.17 0c0-.03-.04-.03-.04-.03V5.92c.9.17 1.8.51 2.56 1.06L13.14 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconHelm',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'helm'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
