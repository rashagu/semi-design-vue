
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
                d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM5 7C5 6.44771 5.44772 6 6 6H10C10.5523 6 11 6.44772 11 7V17C11 17.5523 10.5523 18 10 18H6C5.44772 18 5 17.5523 5 17V7ZM13 7C13 6.44772 13.4477 6 14 6H18C18.5523 6 19 6.44772 19 7V14C19 14.5523 18.5523 15 18 15H14C13.4477 15 13 14.5523 13 14V7Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'kanban'} {...props} >
      <SvgComponent/>
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    