
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
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM13.5 6.5V11.3787L17.0607 14.9393C17.6464 15.5251 17.6464 16.4749 17.0607 17.0607C16.4749 17.6464 15.5251 17.6464 14.9393 17.0607L10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12V6.5C10.5 5.67157 11.1716 5 12 5C12.8284 5 13.5 5.67157 13.5 6.5Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-clock',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'clock'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    