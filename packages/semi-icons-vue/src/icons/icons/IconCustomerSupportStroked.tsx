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
        d="M7 8a5 5 0 0 1 10 0v8a5 5 0 0 1-2.17 4.12.5.5 0 0 0-.33-.12h-4a.5.5 0 0 0-.5.5v2c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-.17A7 7 0 0 0 18.93 17H21a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-2V8A7 7 0 1 0 5 8v1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8Zm-3 7v-4h1v4H4Zm15-4v4h1v-4h-1Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconCustomerSupportStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'customer_support_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
