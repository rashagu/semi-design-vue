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
        d="M2 4c0-1.1.9-2 2-2h10.96a2 2 0 0 1 1.41.59l5.04 5.04a2 2 0 0 1 .59 1.4V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm9 0H8v3h3V4ZM6 4v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4h1.96L20 9.04V20h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V4h2Zm10 12v4H8v-4h8Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSaveStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'save_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
