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
        d="M14 10a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4.5a.5.5 0 0 0 .5-.5V14a1 1 0 0 1 1-1h4.5a.5.5 0 0 0 .5-.5V10Z"
        fill="#AAB2BF"
      />
      <rect x={16} y={5} width={2} height={4} fill="#AAB2BF" />
      <path d="m23 5-7-3v6l7-3Z" fill="#F82C2C" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconSteps',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'steps'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
