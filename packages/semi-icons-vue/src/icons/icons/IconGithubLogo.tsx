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
        d="M12.01 1a11 11 0 0 0-3.48 21.45c.55.11.75-.23.75-.52l-.02-2.05c-3.06.66-3.7-1.3-3.7-1.3-.5-1.28-1.22-1.61-1.22-1.61-1-.68.07-.68.07-.68 1.11.08 1.7 1.13 1.7 1.13.98 1.68 2.56 1.2 3.2.92.1-.72.39-1.2.7-1.48-2.45-.26-5.02-1.2-5.02-5.43 0-1.2.44-2.2 1.13-2.96-.1-.27-.49-1.4.11-2.91 0 0 .93-.3 3.03 1.13a10.66 10.66 0 0 1 5.5 0c2.1-1.42 3.03-1.13 3.03-1.13.6 1.51.22 2.64.1 2.91a4.21 4.21 0 0 1 1.14 2.96c0 4.23-2.57 5.16-5.03 5.43.4.35.74 1 .74 2.04l-.01 3.03c0 .29.2.63.74.52A11 11 0 0 0 12.01 1Z"
        fill="currentColor"
      />
      <path
        d="M5.17 16.8c-.01.06-.1.08-.18.04-.07-.04-.13-.1-.09-.16.02-.06.11-.08.18-.04.08.04.11.11.1.16Zm.44.5c-.05.05-.16.01-.22-.06-.07-.07-.09-.18-.03-.24.05-.05.14-.01.22.06.07.1.09.2.03.24Zm.44.63c-.07.06-.18 0-.24-.09-.07-.09-.07-.22 0-.25.08-.06.18 0 .24.09.07.09.07.2 0 .25Zm.6.62c-.05.08-.18.06-.3-.03-.08-.1-.12-.22-.05-.28.06-.07.19-.05.3.04.09.07.1.2.05.27Zm.82.35c-.02.1-.14.13-.27.1-.13-.04-.2-.15-.18-.23.01-.09.14-.12.27-.09.13.04.2.13.18.22Zm.9.07c0 .1-.12.17-.24.17-.13 0-.24-.08-.24-.17 0-.09.11-.16.24-.16.12 0 .23.07.23.16Zm.83-.14c.02.09-.07.18-.2.2-.13.02-.23-.04-.25-.13-.02-.1.07-.18.2-.2.13-.02.23.04.25.13Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconGithubLogo',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'github_logo'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
