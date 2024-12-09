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
        d="M5 1a2 2 0 0 0-2 2v18c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.41A2 2 0 0 0 20.41 7L15 1.59A2 2 0 0 0 13.59 1H5Zm8 2H5v18h14V9h-5a1 1 0 0 1-1-1V3Zm4.59 4L15 4.41V7h2.59Zm-6.09 5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5Zm-4.5.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm4.5 3.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5Zm-4.5.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBriefStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'brief_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
