
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
                d="M18 3C18.5523 3 19 3.44772 19 4V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19V20C19 20.5523 18.5523 21 18 21H14C13.4477 21 13 20.5523 13 20V13H11V17C11 17.5523 10.5523 18 10 18H6C5.44771 18 5 17.5523 5 17L5 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H5V7C5 6.44772 5.44772 6 6 6L10 6C10.5523 6 11 6.44772 11 7V11H13V4C13 3.44772 13.4477 3 14 3H18ZM17 5L15 5V19H17L17 5ZM7 8H9L9 16H7V8Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'align_v_center_stroked'} {...props} >
      <SvgComponent/>
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    