import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
import type { IconProps } from '../components/Icon';
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
        <path
          d="M24 9L24 10C20 10 18.5 11 16.5 13C14.5 15 14 16 12 16C10 16 9.5 15 7.5 13C5.5 11 4 10 -4.37115e-08 10L0 9L24 9Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip_triangle_arrow">
          <rect width={24} height={24} fill="currentColor" transform="translate(24) rotate(90)" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconTriangleArrow',
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
IconComponent.props = iconVuePropsType;
export default IconComponent;
export { SvgComponent };
