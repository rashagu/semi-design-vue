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
        d="M17.03 2.86a.76.76 0 0 0-1.07.1l-1.18 1.41-.24.3a.74.74 0 0 0-.08.83c.07.14.2.25.34.32l2.16 1.01a.76.76 0 0 0 1-.36.75.75 0 0 0-.36-1l-1.28-.6.15-.17.66-.79a.74.74 0 0 0-.1-1.05Zm-4.1 3.05-.02-.06a3.51 3.51 0 0 1-.07-1.42 3.47 3.47 0 0 1 5.19-2.46c.81.46 1.39 1.2 1.63 2.1l.01.05a3.4 3.4 0 0 1-.35 2.62l-.06.1-.04.04a3.46 3.46 0 0 1-2.02 1.47 3.5 3.5 0 0 1-4.27-2.44ZM6.3 5.7a.76.76 0 0 1 .97-.44l.92.34.93.35.25.09a.75.75 0 0 1 .45.47c.07.22.04.46-.1.65L8.36 9.12a.76.76 0 0 1-1.05.19.74.74 0 0 1-.2-1.05l.82-1.15-.38-.14-.8-.3h-.02l-.01-.01a.74.74 0 0 1-.42-.95ZM4.6 7.95a1 1 0 0 1 0 .04l.02.06.01.05c.04.16.1.3.16.45a3.5 3.5 0 0 0 4.12 2 3.46 3.46 0 0 0 2.47-4.23l-.02-.06a3.6 3.6 0 0 0-.68-1.3 3.52 3.52 0 0 0-5.7.47 3.42 3.42 0 0 0-.38 2.52Zm11.63 5.87a2.72 2.72 0 0 1-2.37 1.36c-1.2 0-2.32-.8-2.65-2.01a.6.6 0 0 1 1.15-.3 1.55 1.55 0 0 0 2.84.37c.2-.36.26-.77.16-1.17a.6.6 0 0 1 1.15-.3c.19.7.09 1.43-.28 2.05Zm4.74-3.08A7 7 0 0 0 19.6 8.1a4.5 4.5 0 0 1-3.3 1.41 4.57 4.57 0 0 1-3.77-1.99 4.52 4.52 0 0 1-6.8 3.58 4.5 4.5 0 0 1-1.7-1.73 7.02 7.02 0 0 0-1.29 6.2l1.7 6.3c.08.28.36.45.64.38a95.91 95.91 0 0 0 3.89-1l6.94-1.85a7.08 7.08 0 0 0 5.06-8.66Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPipixiaLogo',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'pipixia_logo'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
