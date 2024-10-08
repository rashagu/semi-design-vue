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
      <rect x={1} y={4} width={22} height={16} rx={3} fill="#DDE3E8" />
      <path
        d="M3.0918 16.3105C3.54883 16.3105 3.80273 16.0757 3.98047 15.479L4.46289 14.0063H7.50342L7.99219 15.479C8.16357 16.0693 8.43018 16.3105 8.89355 16.3105C9.38232 16.3105 9.70605 16.0186 9.70605 15.5615C9.70605 15.3838 9.66162 15.1743 9.57275 14.9014L7.38916 8.64258C7.11621 7.83008 6.73535 7.5 6.01807 7.5C5.29443 7.5 4.90723 7.83643 4.63428 8.64258L2.45068 14.9014C2.34277 15.2251 2.29834 15.4219 2.29834 15.5933C2.29834 16.0249 2.62207 16.3105 3.0918 16.3105ZM4.84375 12.7305L5.94824 9.22656H6.03076L7.12891 12.7305H4.84375Z"
        fill="#4CC3FA"
      />
      <path
        d="M10.9312 15.1362C10.9312 15.8726 11.3057 16.2344 12.0737 16.2344H14.5366C16.3711 16.2344 17.5518 15.2759 17.5518 13.7905C17.5518 12.6099 16.79 11.7847 15.6221 11.6768V11.6006C16.5488 11.3848 17.1074 10.6802 17.1074 9.70264C17.1074 8.39502 16.1172 7.56982 14.543 7.56982H12.0737C11.3057 7.56982 10.9312 7.93799 10.9312 8.66797V15.1362ZM12.6323 11.1753V8.8584H14.1494C14.9492 8.8584 15.4189 9.29004 15.4189 9.99463C15.4189 10.75 14.9111 11.1753 13.7622 11.1753H12.6323ZM12.6323 14.9458V12.3687H14.2573C15.2603 12.3687 15.8062 12.8701 15.8062 13.689C15.8062 14.5142 15.2539 14.9458 13.9019 14.9458H12.6323Z"
        fill="#AAB2BF"
      />
      <rect x={19} y={6} width={2} height={12} rx={1} fill="#324350" />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconAutocomplete',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'autocomplete'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
