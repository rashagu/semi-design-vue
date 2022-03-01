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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0C12.6627 0 13.2 0.537258 13.2 1.2V6.4C13.2 7.06274 12.6627 7.6 12 7.6C11.3373 7.6 10.8 7.06274 10.8 6.4V1.2C10.8 0.537258 11.3373 0 12 0ZM19.0533 2.29193C19.5895 2.68144 19.7084 3.43188 19.3189 3.96807L16.2629 8.17487C15.8734 8.71107 15.1229 8.82997 14.5867 8.44046C14.0505 8.05095 13.9316 7.30051 14.3211 6.76431L17.3771 2.55751C17.7666 2.02132 18.5171 1.90241 19.0533 2.29193ZM4.94667 2.29197C5.48284 1.90242 6.23328 2.02128 6.62283 2.55745L9.67923 6.76425C10.0688 7.30042 9.94992 8.05087 9.41375 8.44042C8.87758 8.82996 8.12713 8.7111 7.73759 8.17493L4.68119 3.96813C4.29164 3.43196 4.4105 2.68152 4.94667 2.29197ZM0.587124 8.292C0.791908 7.66169 1.46889 7.31673 2.0992 7.52152L7.04479 9.12832C7.6751 9.3331 8.02006 10.0101 7.81528 10.6404C7.61049 11.2707 6.93351 11.6157 6.30321 11.4109L1.35761 9.80407C0.727296 9.59929 0.38234 8.92231 0.587124 8.292ZM23.4129 8.292C23.6177 8.92231 23.2727 9.59929 22.6424 9.80407L17.6968 11.4109C17.0665 11.6157 16.3895 11.2707 16.1847 10.6404C15.9799 10.0101 16.3249 9.3331 16.9552 9.12832L21.9008 7.52152C22.5311 7.31673 23.2081 7.66169 23.4129 8.292ZM7.81528 13.3596C8.02006 13.9899 7.6751 14.6669 7.04479 14.8717L2.09919 16.4785C1.46889 16.6833 0.791908 16.3383 0.587124 15.708C0.38234 15.0777 0.727296 14.4007 1.35761 14.1959L6.30321 12.5891C6.93351 12.3843 7.61049 12.7293 7.81528 13.3596ZM16.1847 13.3596C16.3895 12.7293 17.0665 12.3843 17.6968 12.5891L22.6424 14.1959C23.2727 14.4007 23.6177 15.0777 23.4129 15.708C23.2081 16.3383 22.5311 16.6833 21.9008 16.4785L16.9552 14.8717C16.3249 14.6669 15.9799 13.9899 16.1847 13.3596ZM9.41375 15.5596C9.94992 15.9491 10.0688 16.6996 9.67923 17.2357L6.62283 21.4425C6.23328 21.9787 5.48284 22.0976 4.94667 21.708C4.4105 21.3185 4.29164 20.568 4.68119 20.0319L7.73759 15.8251C8.12713 15.2889 8.87758 15.17 9.41375 15.5596ZM14.5867 15.5595C15.1229 15.17 15.8734 15.2889 16.2629 15.8251L19.3189 20.0319C19.7084 20.5681 19.5895 21.3185 19.0533 21.7081C18.5171 22.0976 17.7666 21.9787 17.3771 21.4425L14.3211 17.2357C13.9316 16.6995 14.0505 15.949 14.5867 15.5595ZM12 16.4C12.6627 16.4 13.2 16.9373 13.2 17.6V22.8C13.2 23.4627 12.6627 24 12 24C11.3373 24 10.8 23.4627 10.8 22.8V17.6C10.8 16.9373 11.3373 16.4 12 16.4Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clip-path id="clip0">
                    <rect width={24} height={24} fill="currentColor" />
                </clip-path>
            </defs>
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconLoading',

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
