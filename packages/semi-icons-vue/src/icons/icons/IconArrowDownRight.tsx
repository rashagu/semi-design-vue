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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5 5C20.3284 5 21 5.67157 21 6.5V19.5C21 20.3284 20.3284 21 19.5 21H6.5C5.67157 21 5 20.3284 5 19.5C5 18.6716 5.67157 18 6.5 18H15.8787L2.43936 4.56066C1.85357 3.97487 1.85357 3.02513 2.43936 2.43934C3.02514 1.85355 3.97489 1.85355 4.56068 2.43934L18 15.8787V6.5C18 5.67157 18.6716 5 19.5 5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconArrowDownRight',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'arrow_down_right'} {...props}>
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
