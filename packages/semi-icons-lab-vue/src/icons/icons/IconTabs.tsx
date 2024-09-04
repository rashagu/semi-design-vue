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
        d="M12 5.99997C12 4.8954 12.8954 3.99997 14 3.99997H19C20.1046 3.99997 21 4.8954 21 5.99997V11C21 12.1045 20.1046 13 19 13H14C12.8954 13 12 12.1045 12 11V5.99997Z"
        fill="#818A9B"
      />
      <path
        d="M3.99999 1.99997C2.89542 1.99997 1.99999 2.8954 1.99999 3.99997L1.99999 20C1.99999 21.1045 2.89542 22 3.99999 22H20C21.1046 22 22 21.1045 22 20V9.99997C22 8.8954 21.1046 7.99997 20 7.99997H14C12.8954 7.99997 12 7.10454 12 5.99997V3.99997C12 2.8954 11.1046 1.99997 9.99999 1.99997L3.99999 1.99997Z"
        fill="#DDE3E8"
      />
      <rect x={6} y={12} width={12} height={2} fill="#AAB2BF" />
      <rect x={6} y={16} width={9} height={2} fill="#AAB2BF" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTabs',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'tabs'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
