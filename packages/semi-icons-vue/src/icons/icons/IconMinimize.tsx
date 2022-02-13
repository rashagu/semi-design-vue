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
                d="M8.5 2C9.32843 2 10 2.67157 10 3.5V6.5C10 8.433 8.433 10 6.5 10H3.5C2.67157 10 2 9.32843 2 8.5C2 7.67157 2.67157 7 3.5 7H6.5C6.77614 7 7 6.77614 7 6.5V3.5C7 2.67157 7.67157 2 8.5 2ZM16 2C16.8284 2 17.5 2.67157 17.5 3.5V6.5C17.5 6.77614 17.7239 7 18 7H21C21.8284 7 22.5 7.67157 22.5 8.5C22.5 9.32843 21.8284 10 21 10H18C16.067 10 14.5 8.433 14.5 6.5V3.5C14.5 2.67157 15.1716 2 16 2ZM2 15.5C2 14.6716 2.67157 14 3.5 14H6.5C8.433 14 10 15.567 10 17.5V20.5C10 21.3284 9.32843 22 8.5 22C7.67157 22 7 21.3284 7 20.5V17.5C7 17.2239 6.77614 17 6.5 17H3.5C2.67157 17 2 16.3284 2 15.5ZM14 17.5C14 15.567 15.567 14 17.5 14H20.5C21.3284 14 22 14.6716 22 15.5C22 16.3284 21.3284 17 20.5 17H17.5C17.2239 17 17 17.2239 17 17.5V20.5C17 21.3284 16.3284 22 15.5 22C14.6716 22 14 21.3284 14 20.5V17.5Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'semi_icon-activity',

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
