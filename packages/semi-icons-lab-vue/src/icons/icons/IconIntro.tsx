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
        d="M3.13 8.1A3 3 0 0 0 2 10.44V19a3 3 0 0 0 3 3h4v-6a3 3 0 1 1 6 0v6h4a3 3 0 0 0 3-3v-8.56a3 3 0 0 0-1.13-2.34L13.25 2a2 2 0 0 0-2.5 0L3.13 8.1Z"
        fill="#DDE3E8"
      />
      <path d="M9 15v7h6v-7a3 3 0 1 0-6 0Z" fill="#6A6F7F" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconIntro',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'intro'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
