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
        d="M6.16667 12H3.66667C3.66667 16.6024 7.39763 20.3333 12 20.3333C16.6024 20.3333 20.3333 16.6024 20.3333 12H17.8333"
        stroke="#AAB2BF"
        stroke-width={2}
        stroke-linejoin="round"
      />
      <path d="M12 20.3333V7.83333" stroke="#818A9B" stroke-width={2} stroke-linejoin="round" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0016 9.83667C13.7054 9.83667 15.0866 8.45545 15.0866 6.75167C15.0866 5.04787 13.7054 3.66667 12.0016 3.66667C10.2978 3.66667 8.91663 5.04787 8.91663 6.75167C8.91663 8.45545 10.2978 9.83667 12.0016 9.83667Z"
        fill="#324350"
        stroke="#324350"
        stroke-width={1.25}
        stroke-linejoin="round"
      />
    </svg>
  );
});
const IconComponent = defineComponent<IconProps>({
  name: 'IconAnchor',
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'anchor'} {...props}>
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
