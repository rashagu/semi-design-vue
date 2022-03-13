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
                d="M7.89944 20.166C7.39355 19.6962 7.36426 18.9053 7.83401 18.3994L13.5442 12.25L7.83401 6.10056C7.36426 5.59467 7.39355 4.80376 7.89944 4.334C8.40533 3.86425 9.19624 3.89354 9.666 4.39943L16.166 11.3994C16.6113 11.879 16.6113 12.621 16.166 13.1006L9.666 20.1006C9.19624 20.6064 8.40533 20.6357 7.89944 20.166Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconChevronRightStroked',

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
