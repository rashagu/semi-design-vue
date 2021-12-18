
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
                d="M2 5C2 3.34315 3.34315 2 5 2H8.29844C8.75258 2 9.1932 2.15456 9.54783 2.43826L10.6783 3.34261C11.2102 3.76816 11.8711 4 12.5523 4H18C20 4 21 6 21 8H7.53361C6.62889 8 5.83683 8.60735 5.6021 9.48109L2.57151 20.7617C2.21202 20.2671 2 19.6583 2 19V5ZM22.1667 10H9.5C8.61111 10 7.82889 10.5867 7.58 11.44L4.87333 20.72C4.68667 21.36 5.16667 22 5.83333 22H18.5C19.3889 22 20.1711 21.4133 20.42 20.56L23.1267 11.28C23.3133 10.64 22.8333 10 22.1667 10Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'folder_open'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    