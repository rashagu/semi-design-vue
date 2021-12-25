
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
                d="M20.8889 2H3.11111C2.49667 2 2 2.49778 2 3.11111V20.8889C2 21.5022 2.49667 22 3.11111 22H12.6833V14.2667H10.0856V11.2389H12.6833V9.01667C12.6833 6.43333 14.2611 5.02556 16.5722 5.02556C17.3489 5.02333 18.1267 5.06333 18.9 5.14444V7.83333H17.3056C16.0522 7.83333 15.8078 8.43111 15.8078 9.30556V11.2333H18.8044L18.4156 14.2611H15.8067V22H20.8889C21.5033 22 22 21.5022 22 20.8889V3.11111C22 2.49778 21.5033 2 20.8889 2Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>({
    name:'semi_icon-facebook',
    setup(props, {slots}){
      return ()=>
        <ConvertIcon iconType={'facebook'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
IconComponent.props = iconVuePropsType
export default IconComponent
    