
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
                d="M12 4H16H19H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H12C6.47715 2 2 6.47715 2 12V21C2 21.5523 2.44772 22 3 22C3.55228 22 4 21.5523 4 21V19V18V12C4 7.58172 7.58172 4 12 4Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-corner_radius_stroked',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'corner_radius_stroked'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    