
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
                d="M7 3C7 1.89543 7.89543 1 9 1H15C16.1046 1 17 1.89543 17 3V6H20H21C22.1046 6 23 6.89543 23 8V9V11H1V9V8C1 6.89543 1.89543 6 3 6H4H7V3ZM9 6H15V3.5C15 3.22386 14.7761 3 14.5 3H9.5C9.22386 3 9 3.22386 9 3.5V6ZM15 13.5C15 13.2239 15.2239 13 15.5 13H23V19V20C23 21.1046 22.1046 22 21 22H20H4H3C1.89543 22 1 21.1046 1 20V19V13H8.5C8.77614 13 9 13.2239 9 13.5V15C9 15.5523 9.44772 16 10 16H14C14.5523 16 15 15.5523 15 15V13.5Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-briefcase',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'briefcase'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    