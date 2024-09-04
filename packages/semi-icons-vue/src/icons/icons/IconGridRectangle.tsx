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
        d="M1 7C1 5.34315 2.34315 4 4 4H20C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H4C2.34315 20 1 18.6569 1 17V7ZM10.5 7L5 7C4.44772 7 4 7.44772 4 8V10.5H10.5V7ZM13.5 7V10.5H20V8C20 7.44772 19.5523 7 19 7H13.5ZM20 13.5H13.5V17H19C19.5523 17 20 16.5523 20 16V13.5ZM10.5 17V13.5H4V16C4 16.5523 4.44772 17 5 17H10.5Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconGridRectangle',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'grid-rectangle'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
