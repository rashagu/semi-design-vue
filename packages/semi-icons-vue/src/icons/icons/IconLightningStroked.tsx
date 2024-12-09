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
        d="M10.1 10.58c.06 0 .1.05.1.12l-1.1 6.36 7.02-7.11h-3.07a.1.1 0 0 1-.1-.15l3.5-6.8H9.71l-3.5 7.58h3.88ZM8.3 1.29A.5.5 0 0 1 8.76 1H18.9c.37 0 .61.4.44.73l-3.18 6.22h3.55a.5.5 0 0 1 .36.85L7.18 21.87a.5.5 0 0 1-.85-.44l1.51-8.85H3.88a.5.5 0 0 1-.46-.71L8.3 1.29Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconLightningStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'lightning_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
