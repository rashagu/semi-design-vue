import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, IconProps, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
    return () => (
        <svg
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            // @ts-ignore
            focusable={false}
            aria-hidden={true}
            {...props}
        >
            <path d="M6 4L11 0L16 4L11 9.5L6 4Z" fill="currentColor" />
            <path d="M18 6L22 11L18 16L12.5 11L18 6Z" fill="currentColor" />
            <path d="M4 16L0 11L4 6L9.5 11L4 16Z" fill="currentColor" />
            <path d="M16 18L11 22L6 18L11 12.5L16 18Z" fill="currentColor" />
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
