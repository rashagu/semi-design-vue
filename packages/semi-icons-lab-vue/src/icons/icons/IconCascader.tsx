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
        d="M2 3.54818C2 2.82211 2.74939 2.33807 3.41122 2.63664L9 5.15789V22L3.17756 19.3733C2.46078 19.05 2 18.3366 2 17.5503V3.54818Z"
        fill="#4CC3FA"
      />
      <path
        d="M15 2L20.8224 4.62666C21.5392 4.95002 22 5.6634 22 6.44974V20.4518C22 21.1779 21.2506 21.6619 20.5888 21.3634L15 18.8421V2Z"
        fill="#FBCD2C"
      />
      <path d="M9 5.15789L15 2V18.8421L9 22V5.15789Z" fill="#324350" />
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
