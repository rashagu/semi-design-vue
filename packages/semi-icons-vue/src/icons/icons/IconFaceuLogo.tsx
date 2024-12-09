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
        d="M12 22.12c6.3 0 11-3.43 11-8.51a10 10 0 0 0-7.05-9.39l.04-.17c.05-.22.13-.55.15-.9v-.19c0-.35-.08-.57-.33-.67-.64-.5-2.13-.29-3.7.11-3.93 1-6.03 2.54-6.78 3.17A9.9 9.9 0 0 0 1 13.6c0 5.08 4.7 8.5 11 8.5Zm-.42-7.54h1.13c.4 0 .43.44.23.87l-.16.38c-.09.2-.11.27-.27.5-.3.46-.71.15-.8-.02a8.95 8.95 0 0 1-.43-.87s-.45-.86.3-.86ZM5.81 9.16c2.22.04 3.32 1.87 3.32 4.17 0 2.31-1.11 4.15-3.33 4.15-2.26 0-3.29-1.87-3.29-4.18 0-2.3 1.22-4.18 3.3-4.14Zm12.42 0c2.22.04 3.32 1.87 3.32 4.17 0 2.31-1.12 4.15-3.33 4.15-2.26 0-3.29-1.87-3.29-4.18 0-2.3 1.22-4.18 3.3-4.14Zm.04 7.75c1.82 0 2.71-1.7 2.71-3.58 0-1.88-.76-3.67-2.7-3.67-.97 0-1.64.39-2.08 1 .35-.29.78-.45 1.3-.45 1.54 0 2.32 1.41 2.32 3.15 0 1.73-.76 3.14-2.31 3.14-.35 0-.66-.07-.92-.2.42.38.98.61 1.68.61ZM6.61 16.5c-1.53 0-2.3-1.4-2.3-3.14 0-1.74.75-3.15 2.3-3.15.45 0 .84.13 1.16.34a2.33 2.33 0 0 0-1.91-.89c-2.05 0-2.78 1.76-2.78 3.64 0 1.9.86 3.61 2.78 3.61.64 0 1.16-.21 1.57-.57-.24.1-.51.16-.82.16Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconFaceuLogo',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'faceu_logo'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
