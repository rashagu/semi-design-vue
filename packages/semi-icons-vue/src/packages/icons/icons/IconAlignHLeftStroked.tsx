
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
                d="M2 3C2 2.44772 2.44772 2 3 2C3.55228 2 4 2.44772 4 3V21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21V3ZM6 6C6 5.44772 6.44772 5 7 5H20C20.5523 5 21 5.44772 21 6V10C21 10.5523 20.5523 11 20 11H7C6.44772 11 6 10.5523 6 10V6ZM8 7V9H19V7H8ZM7 13C6.44772 13 6 13.4477 6 14V18C6 18.5523 6.44772 19 7 19H15C15.5523 19 16 18.5523 16 18V14C16 13.4477 15.5523 13 15 13H7ZM8 17V15H14V17H8Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-align_h_left_stroked',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'align_h_left_stroked'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    