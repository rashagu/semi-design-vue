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
      <g clip-path="url(#clip_triangle_arrow)">
        <path d="M24 9v1c-4 0-5.5 1-7.5 3S14 16 12 16s-2.5-1-4.5-3S4 10 0 10V9h24Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip_triangle_arrow">
          <rect width={24} height={24} fill="currentColor" transform="translate(24) rotate(90)" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTriangleArrow',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'triangle_arrow'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
