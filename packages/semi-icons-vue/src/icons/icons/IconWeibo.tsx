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
        d="m22.99 8.52.01-.09-.02-.23-.02-.25a6.3 6.3 0 0 0-1.14-3.13A6.48 6.48 0 0 0 16.28 2c-.43.02-.66.32-.68.7-.01.42.19.68.64.77.17.04.35.06.53.08l.4.05a5 5 0 0 1 4.25 4.55c.02.26.06.53.15.78.12.31.41.47.74.43a.7.7 0 0 0 .64-.56l.04-.28Zm-11.3.34-.19.07.04-.26a6.17 6.17 0 0 0 .07-.79c.03-.33.06-.67.05-1a1.4 1.4 0 0 0-1.42-1.35 4.3 4.3 0 0 0-1.75.3A13.22 13.22 0 0 0 1.7 12.2c-.46.92-.72 1.89-.7 2.93.02.94.31 1.78.89 2.53.42.55.95 1 1.53 1.39a11.55 11.55 0 0 0 5.71 1.93c1.4.09 2.76-.07 4.11-.4a9.75 9.75 0 0 0 5.02-2.82 5.78 5.78 0 0 0 1.4-2.27 2.9 2.9 0 0 0-1.02-3.18c-.4-.3-.83-.5-1.26-.7l-.18-.08c-.29-.14-.36-.27-.31-.57l.09-.5.07-.4c.16-.9-.26-1.64-1.1-1.87-.3-.08-.63-.11-.94-.09a11.46 11.46 0 0 0-3.32.76ZM9.8 10.79l.36-.03c.87.04 1.73.13 2.56.38.99.3 1.87.8 2.56 1.58a2.94 2.94 0 0 1 .31 3.68 5.66 5.66 0 0 1-2.66 2.19c-.99.42-2.02.72-3.1.8a8 8 0 0 1-4.92-1.1 3.7 3.7 0 0 1-1.54-1.67 2.96 2.96 0 0 1 .28-2.9 5.67 5.67 0 0 1 2.06-1.84 8.87 8.87 0 0 1 4.09-1.1Zm5.76-4.98c0-.52.46-.89.97-.76a4.38 4.38 0 0 1 3.34 3.27c.16.57-.1 1-.63 1.07-.37.05-.65-.15-.8-.53l-.1-.26c-.12-.28-.22-.55-.37-.81a2.6 2.6 0 0 0-1.45-1.13l-.21-.07a3.67 3.67 0 0 1-.23-.07c-.34-.12-.52-.36-.52-.7ZM6.6 16.82c.5.5 1.14.7 1.85.71.85-.01 1.6-.3 2.22-.92.75-.77.81-1.96.1-2.73a2.64 2.64 0 0 0-2.14-.8c-.79.03-1.47.37-2.02.94-.8.82-.8 2.03-.01 2.8Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconWeibo',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'weibo'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
