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
      <path d="M2 3.55a1 1 0 0 1 1.41-.91L9 5.16V22l-5.82-2.63A2 2 0 0 1 2 17.55v-14Z" fill="#4CC3FA" />
      <path d="m15 2 5.82 2.63A2 2 0 0 1 22 6.45v14a1 1 0 0 1-1.41.91L15 18.84V2Z" fill="#FBCD2C" />
      <path d="M9 5.16 15 2v16.84L9 22V5.16Z" fill="#324350" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCascader',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'cascader'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
