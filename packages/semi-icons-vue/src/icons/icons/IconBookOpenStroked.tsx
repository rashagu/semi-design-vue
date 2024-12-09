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
        d="M2 2.5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h7a2 2 0 0 1 2 2 1 1 0 1 0 2 0c0-1.1.9-2 2-2h7a1 1 0 0 0 1-1v-15a1 1 0 0 0-1-1h-6a5 5 0 0 0-4 2 5 5 0 0 0-4-2H2Zm9 5a3 3 0 0 0-3-3H3v13h6c.73 0 1.41.2 2 .54V7.5Zm2 10.54a3.98 3.98 0 0 1 2-.54h6v-13h-5a3 3 0 0 0-3 3v10.54Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBookOpenStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'book_open_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
