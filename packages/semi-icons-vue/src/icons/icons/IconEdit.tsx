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
      <path d="m14.5 4.5 5 5 2.09-2.09a2 2 0 0 0 0-2.82L19.4 2.4a2 2 0 0 0-2.82 0L14.5 4.5Z" fill="currentColor" />
      <path
        d="m2.25 21.13 1.68-5.88a1 1 0 0 1 .25-.43L13 6l5 5-8.82 8.82a1 1 0 0 1-.43.25l-5.88 1.68a.5.5 0 0 1-.62-.62Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconEdit',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'edit'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
