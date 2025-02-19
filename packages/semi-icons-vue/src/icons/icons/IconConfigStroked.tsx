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
      <g clip-path="url(#clip0_1478_52)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.95 4.24c0-.63.5-1.13 1.13-1.13h3.31a1.13 1.13 0 0 1 0 2.25h-3.31c-.62 0-1.13-.5-1.13-1.12Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.66.9c.62 0 1.12.5 1.12 1.13v4.42a1.13 1.13 0 0 1-2.25 0V2.03c0-.63.5-1.13 1.13-1.13Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M.38 4.24c0-.63.5-1.13 1.12-1.13h12.16a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.12Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M.38 11.97c0-.62.5-1.12 1.12-1.12h4.42a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.13Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.34 8.64c.62 0 1.13.5 1.13 1.12v4.42a1.13 1.13 0 0 1-2.25 0V9.76c0-.62.5-1.12 1.12-1.12Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.22 11.97c0-.62.5-1.12 1.12-1.12H22.5a1.13 1.13 0 0 1 0 2.25H10.34c-.62 0-1.12-.5-1.12-1.13Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.95 19.71c0-.62.5-1.13 1.13-1.13h3.31a1.13 1.13 0 0 1 0 2.25h-3.31c-.62 0-1.13-.5-1.13-1.12Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.66 16.37c.62 0 1.12.5 1.12 1.13v4.42a1.13 1.13 0 0 1-2.25 0V17.5c0-.62.5-1.13 1.13-1.13Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M.38 19.71c0-.62.5-1.13 1.12-1.13h12.16a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.12Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1478_52">
          <rect width={24} height={24} fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconConfigStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'config_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
