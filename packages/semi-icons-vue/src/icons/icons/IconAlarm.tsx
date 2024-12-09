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
        d="m3.48 6 2.5-2.5A1.77 1.77 0 1 0 3.48 1L.98 3.5A1.77 1.77 0 0 0 3.48 6Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 23a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm1.5-15v4.07L17 14a1.5 1.5 0 1 1-1.34 2.68l-4.33-2.34A1.5 1.5 0 0 1 10.5 13V8a1.5 1.5 0 0 1 3 0Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 3.5 20.5 6A1.77 1.77 0 0 0 23 3.5L20.5 1A1.77 1.77 0 1 0 18 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconAlarm',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'alarm'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
