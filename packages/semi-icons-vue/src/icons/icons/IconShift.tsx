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
                d="M12 1C12.4452 1 12.8674 1.19773 13.1524 1.53972L23.1524 13.5397C23.525 13.9868 23.6053 14.6092 23.3584 15.1362C23.1115 15.6633 22.582 16 22 16H18V21.5C18 22.3284 17.3284 23 16.5 23H7.50002C6.67159 23 6.00002 22.3284 6.00002 21.5V16H2.00002C1.41799 16 0.888504 15.6633 0.641634 15.1362C0.394764 14.6092 0.475082 13.9868 0.847686 13.5397L10.8477 1.53972C11.1327 1.19773 11.5548 1 12 1ZM5.20258 13H9.00002V20H15V13H18.7975L12 4.84308L5.20258 13Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconShift',

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
