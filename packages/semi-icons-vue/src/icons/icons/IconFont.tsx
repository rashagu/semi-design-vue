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
                d="M13.3723 2.89454C13.1324 2.35083 12.5942 2 11.9999 2C11.4056 2 10.8674 2.35083 10.6275 2.89454L3.12751 19.8945C2.79313 20.6525 3.13649 21.538 3.89443 21.8724C4.65237 22.2068 5.53788 21.8634 5.87226 21.1055L7.6835 17H16.3163L18.1275 21.1055C18.4619 21.8634 19.3474 22.2068 20.1053 21.8724C20.8633 21.538 21.2066 20.6525 20.8723 19.8945L13.3723 2.89454ZM14.9928 14L11.9999 7.21618L9.00703 14H14.9928Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent<IconProps>({
    name: 'IconFont',

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
