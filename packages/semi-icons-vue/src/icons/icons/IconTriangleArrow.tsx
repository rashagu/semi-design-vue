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
            <g clip-path="url(#clip0)">
                <path
                    d="M24 9L24 10C20 10 18.5 11 16.5 13C14.5 15 14 16 12 16C10 16 9.5 15 7.5 13C5.5 11 4 10 -4.37115e-08 10L0 9L24 9Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clip-path id="clip0">
                    <rect width={24} height={24} fill="currentColor" transform="translate(24) rotate(90)" />
                </clip-path>
            </defs>
        </svg>
    );
});
const IconComponent = defineComponent<IconProps>({
    name: 'IconTriangleArrow',

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
