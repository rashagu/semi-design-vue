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
                d="M23 8.5C23 12.6421 19.6421 16 15.5 16C14.0696 16 12.7327 15.5996 11.5953 14.9047L11 15.5V19H7V23H2V19L8.91221 12.0878C8.33057 11.0221 8 9.79964 8 8.5C8 4.35786 11.3579 1 15.5 1C19.6421 1 23 4.35786 23 8.5ZM19 7.5C19 6.11929 17.8807 5 16.5 5C15.1193 5 14 6.11929 14 7.5C14 8.88071 15.1193 10 16.5 10C17.8807 10 19 8.88071 19 7.5Z"
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
