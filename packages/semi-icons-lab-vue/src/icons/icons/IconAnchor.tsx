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
      <path d="M6.17 12h-2.5a8.33 8.33 0 1 0 16.66 0h-2.5" stroke="#AAB2BF" stroke-width={2} stroke-linejoin="round" />
      <path d="M12 20.33V7.83" stroke="#818A9B" stroke-width={2} stroke-linejoin="round" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 9.84a3.09 3.09 0 1 0 0-6.17 3.09 3.09 0 0 0 0 6.17Z"
        fill="#324350"
        stroke="#324350"
        stroke-width={1.25}
        stroke-linejoin="round"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconAnchor',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'anchor'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
