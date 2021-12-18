
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
                d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H20V21C20 21.5523 20.4477 22 21 22C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM3 10C2.44772 10 2 10.4477 2 11V21C2 21.5523 2.44772 22 3 22H13C13.5523 22 14 21.5523 14 21V11C14 10.4477 13.5523 10 13 10H3ZM4 20V12H12V20H4Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'top_right_stroked'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    