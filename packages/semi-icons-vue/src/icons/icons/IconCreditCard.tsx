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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 4C2.34315 4 1 5.34315 1 7V9H23V7C23 5.34315 21.6569 4 20 4H4ZM23 11H1V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V11ZM4 15C4 14.4477 4.44772 14 5 14H7C7.55228 14 8 14.4477 8 15V16C8 16.5523 7.55228 17 7 17H5C4.44772 17 4 16.5523 4 16V15Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent<IconProps>({
    name: 'IconCreditCard',

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
