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
        d="M3.60005 14.2L15.1026 0.650275C15.4063 0.245303 16.0505 0.496326 16.0001 1.00003L14.0001 9H20.0001C20.4121 9 20.6473 9.47038 20.4001 9.8L8.89764 23.3498C8.59391 23.7547 7.94975 23.5037 8.00012 23L10.0001 15H4.00005C3.58803 15 3.35284 14.5296 3.60005 14.2Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconBolt',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'bolt'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
