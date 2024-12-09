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
      <path d="M2.97 14.13 12 6l9.03 8.13a.5.5 0 0 1-.33.87H16v7H8v-7H3.3a.5.5 0 0 1-.33-.87Z" fill="#4CC3FA" />
      <rect x={3} y={2} width={18} height={4} rx={1} fill="#AAB2BF" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBackTop',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'back-top'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
