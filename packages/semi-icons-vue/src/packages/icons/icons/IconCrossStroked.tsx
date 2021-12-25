
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
                d="M3.61612 19.1161C3.12796 19.6043 3.12796 20.3957 3.61612 20.8839C4.10427 21.372 4.89573 21.372 5.38388 20.8839L12.5 13.7678L19.6161 20.8839C20.1043 21.372 20.8957 21.372 21.3839 20.8839C21.872 20.3957 21.872 19.6043 21.3839 19.1161L14.2678 12L21.3839 4.88389C21.872 4.39573 21.872 3.60427 21.3839 3.11612C20.8957 2.62796 20.1043 2.62796 19.6161 3.11612L12.5 10.2322L5.38388 3.11612C4.89573 2.62796 4.10427 2.62796 3.61612 3.11612C3.12796 3.60427 3.12796 4.39573 3.61612 4.88388L10.7322 12L3.61612 19.1161Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-cross_stroked',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'cross_stroked'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    