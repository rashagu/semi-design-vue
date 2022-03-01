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
                d="M16.9412 13.7858L13.2276 20.7488C13.1007 20.9867 12.8086 21.0785 12.5879 20.9235C12.0055 20.5143 11.1667 19.7234 11.1667 18.8005C11.1667 18.3014 11.2989 17.4036 11.4374 16.4629C11.5899 15.4277 11.75 14.3406 11.75 13.6755L4.1667 13.6755C3.7222 13.6755 3 13.2238 3 12.1755C3 11.2715 3.9916 7.08833 4.6921 4.13323C4.8039 3.66173 4.9083 3.22143 5 2.83063C5 2.61233 5.2667 2.17553 6.3333 2.17553L16.502 2.17553C16.7782 2.17553 17 2.39934 17 2.67553L17 13.5505C17 13.6326 16.9798 13.7134 16.9412 13.7858ZM21.5 13.6755C21.7761 13.6755 22 13.4516 22 13.1755L22 2.67554C22 2.39934 21.7761 2.17554 21.5 2.17554L19.5 2.17553C19.2239 2.17553 19 2.39934 19 2.67553L19 13.1755C19 13.4516 19.2239 13.6755 19.5 13.6755L21.5 13.6755Z"
                fill="currentColor"
            />
        </svg>
    );
});
const IconComponent = defineComponent({
    name: 'IconDislikeThumb',

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
