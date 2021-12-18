
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
                d="M3 4.5C3 3.67157 3.67157 3 4.5 3H19.5C20.3284 3 21 3.67157 21 4.5V7.5C21 8.32843 20.3284 9 19.5 9C18.6716 9 18 8.32843 18 7.5V6H13.5V19H15.5C16.3284 19 17 19.6716 17 20.5C17 21.3284 16.3284 22 15.5 22H8.5C7.67157 22 7 21.3284 7 20.5C7 19.6716 7.67157 19 8.5 19H10.5V6H6V7.5C6 8.32843 5.32843 9 4.5 9C3.67157 9 3 8.32843 3 7.5V4.5Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'text'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    