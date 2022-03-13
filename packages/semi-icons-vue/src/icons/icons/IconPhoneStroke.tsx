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
                d="M8.5 0.5C6.01472 0.5 4 2.51472 4 5V19C4 21.4853 6.01472 23.5 8.5 23.5H15.5C17.9853 23.5 20 21.4853 20 19V5C20 2.51472 17.9853 0.5 15.5 0.5H8.5ZM7 5C7 4.17157 7.67157 3.5 8.5 3.5H15.5C16.3284 3.5 17 4.17157 17 5V19C17 19.8284 16.3284 20.5 15.5 20.5H8.5C7.67157 20.5 7 19.8284 7 19V5ZM12 16C11.1716 16 10.5 16.6716 10.5 17.5C10.5 18.3284 11.1716 19 12 19C12.8284 19 13.5 18.3284 13.5 17.5C13.5 16.6716 12.8284 16 12 16Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconPhoneStroke',

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
