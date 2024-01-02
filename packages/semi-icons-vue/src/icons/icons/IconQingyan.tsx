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
        d="M21.4288 4.14284C22.2967 4.14284 23.0003 3.43929 23.0003 2.57142C23.0003 1.70355 22.2967 1 21.4288 1C20.561 1 19.8574 1.70355 19.8574 2.57142C19.8574 3.43929 20.561 4.14284 21.4288 4.14284ZM11.2142 22.9997C16.8554 22.9997 21.4284 18.4267 21.4284 12.7855C21.4284 7.14435 16.8554 2.57129 11.2142 2.57129C5.57306 2.57129 1 7.14435 1 12.7855C1 18.4267 5.57306 22.9997 11.2142 22.9997Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconQingyan',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'qingyan'} {...props}>
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
