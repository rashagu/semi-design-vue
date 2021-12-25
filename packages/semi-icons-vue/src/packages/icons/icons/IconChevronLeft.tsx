
    import {defineComponent, ref, h, onActivated} from 'vue'
    import { ConvertIcon, IconProps, vuePropsType as iconVuePropsType} from '../components/Icon';

    interface ExampleProps {
      name?: string
    }
    export const vuePropsType = {
      name: String
    }
    const SvgComponent = defineComponent<ExampleProps>((props, {slots}) => {
      return ()=>(
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
                d="M16.2782 4.23933C16.864 4.82511 16.864 5.77486 16.2782 6.36065L10.6213 12.0175L16.2782 17.6744C16.864 18.2601 16.864 19.2099 16.2782 19.7957C15.6924 20.3815 14.7426 20.3815 14.1569 19.7957L7.43934 13.0782C6.85355 12.4924 6.85355 11.5426 7.43934 10.9568L14.1569 4.23933C14.7426 3.65354 15.6924 3.65354 16.2782 4.23933Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-chevron_left',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'chevron_left'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    