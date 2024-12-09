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
      <path d="M1 8a3 3 0 0 1 3-3h8v14H4a3 3 0 0 1-3-3V8Z" fill="#6A6F7F" />
      <path d="m8 9-3 3 3 3" stroke="white" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-8V5Z" fill="#DDE3E8" />
      <path d="m16 9 3 3-3 3" stroke="#AAB2BF" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconPagination',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'pagination'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
