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
      <rect x={1.009} y={3.1} width={20} height={20} rx={3} transform="rotate(-6 1.00949 3.10007)" fill="#6A6F7F" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.65261 9.58962C6.17396 8.94581 7.11851 8.84653 7.76231 9.36788L12.0918 12.8739L15.5978 8.54433C16.1192 7.90052 17.0637 7.80125 17.7075 8.32259C18.3513 8.84394 18.4506 9.78849 17.9293 10.4323L13.4793 15.9275C12.958 16.5714 12.0134 16.6706 11.3696 16.1493L5.87435 11.6993C5.23054 11.178 5.13127 10.2334 5.65261 9.58962Z"
        fill="white"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconDropdown',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'dropdown'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
