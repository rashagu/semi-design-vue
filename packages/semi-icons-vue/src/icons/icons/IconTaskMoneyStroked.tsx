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
        d="M2 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v6a1 1 0 1 1-2 0V4H4v16h8a1 1 0 1 1 0 2H4a2 2 0 0 1-2-2V4Zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H7Zm7.97 1.02c.3-.3.77-.3 1.06 0L18 14.99l1.97-1.97a.75.75 0 1 1 1.06 1.06l-1.93 1.93H21a.75.75 0 0 1 0 1.5h-2.25v1H21a.75.75 0 0 1 0 1.5h-2.25v1.24a.75.75 0 0 1-1.5 0v-1.24H15a.75.75 0 1 1 0-1.5h2.25v-1H15a.75.75 0 0 1 0-1.5h1.9l-1.93-1.93a.75.75 0 0 1 0-1.06Z"
        fill="currentColor"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconTaskMoneyStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'task_money_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
