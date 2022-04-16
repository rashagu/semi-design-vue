import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, IconProps, vuePropsType as iconVuePropsType } from '../components/Icon';
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
                d="M20.9999 2H13.4142C13.1489 2 12.8946 2.10536 12.707 2.29289L1.41416 13.5858C0.633108 14.3668 0.633106 15.6332 1.41416 16.4142L7.58573 22.5858C8.36678 23.3668 9.63311 23.3668 10.4142 22.5858L21.707 11.2929C21.8946 11.1054 21.9999 10.851 21.9999 10.5858V3C21.9999 2.44772 21.5522 2 20.9999 2ZM15.4999 11C16.8807 11 17.9999 9.88071 17.9999 8.5C17.9999 7.11929 16.8807 6 15.4999 6C14.1192 6 12.9999 7.11929 12.9999 8.5C12.9999 9.88071 14.1192 11 15.4999 11Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent<IconProps>({
    name: 'IconPriceTag',

    setup(props, { slots }) {
        return () => (
            <ConvertIcon iconType={'activity'} {...props}>
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
