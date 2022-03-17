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
                d="M4.08401 8.14944C4.55377 7.64355 5.34468 7.61426 5.85057 8.08401L12 13.7942L18.1494 8.08401C18.6553 7.61426 19.4462 7.64355 19.916 8.14944C20.3857 8.65533 20.3565 9.44624 19.8506 9.916L12.8506 16.416C12.371 16.8613 11.629 16.8613 11.1494 16.416L4.14944 9.916C3.64355 9.44624 3.61426 8.65533 4.08401 8.14944Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent<IconProps>({
    name: 'IconChevronDownStroked',

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
