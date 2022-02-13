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
                d="M12 23C11.1716 23 10.5 22.3284 10.5 21.5L10.5 6.12132L4.06066 12.5607C3.47487 13.1464 2.52513 13.1464 1.93934 12.5607C1.35355 11.9749 1.35355 11.0251 1.93934 10.4393L10.9393 1.43934C11.5251 0.853554 12.4749 0.853554 13.0607 1.43934L22.0607 10.4393C22.6464 11.0251 22.6464 11.9749 22.0607 12.5607C21.4749 13.1464 20.5251 13.1464 19.9393 12.5607L13.5 6.12132L13.5 21.5C13.5 22.3284 12.8284 23 12 23Z"
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
