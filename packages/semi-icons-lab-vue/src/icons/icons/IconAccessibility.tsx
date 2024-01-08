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
      <circle cx={12} cy={4} r={3} fill="#4CC3FA" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 9.5C2 8.67157 2.67157 8 3.5 8H8H16H20.5C21.3284 8 22 8.67157 22 9.5C22 10.3284 21.3284 11 20.5 11H16V15.5V17V21.5C16 22.3284 15.3284 23 14.5 23C13.6716 23 13 22.3284 13 21.5V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V21.5C11 22.3284 10.3284 23 9.5 23C8.67157 23 8 22.3284 8 21.5V17V15.5V11H3.5C2.67157 11 2 10.3284 2 9.5Z"
        fill="#6A6F7F"
      />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconAccessibility',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'accessibility'} {...props}>
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
