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
                d="M1 12C1 11.1716 1.64237 10.5 2.43478 10.5H21.5652C22.3576 10.5 23 11.1716 23 12C23 12.8284 22.3576 13.5 21.5652 13.5H2.43478C1.64237 13.5 1 12.8284 1 12Z"
                fill="currentColor"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 3.5C14 2.67157 14.6716 2 15.5 2L18.5 2C20.433 2 22 3.567 22 5.5V7.5C22 8.32843 21.3284 9 20.5 9C19.6716 9 19 8.32843 19 7.5V5.5C19 5.22386 18.7761 5 18.5 5L15.5 5C14.6716 5 14 4.32843 14 3.5ZM2 5.5C2 3.567 3.567 2 5.5 2H8.5C9.32843 2 10 2.67157 10 3.5C10 4.32843 9.32843 5 8.5 5H5.5C5.22386 5 5 5.22386 5 5.5V7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5V5.5ZM3.5 15C4.32843 15 5 15.6716 5 16.5V18.5C5 18.7761 5.22386 19 5.5 19H8.5C9.32843 19 10 19.6716 10 20.5C10 21.3284 9.32843 22 8.5 22H5.5C3.567 22 2 20.433 2 18.5V16.5C2 15.6716 2.67157 15 3.5 15ZM20.5 15C21.3284 15 22 15.6716 22 16.5V18.5C22 20.433 20.433 22 18.5 22H15.5C14.6716 22 14 21.3284 14 20.5C14 19.6716 14.6716 19 15.5 19H18.5C18.7761 19 19 18.7761 19 18.5V16.5C19 15.6716 19.6716 15 20.5 15Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconScan',

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
