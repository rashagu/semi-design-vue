
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
                d="M8.06066 1.93934C7.47487 1.35355 6.52513 1.35355 5.93934 1.93934C5.35355 2.52513 5.35355 3.47487 5.93934 4.06066L7.87868 6H5C3.34315 6 2 7.34315 2 9V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V9C22 7.34315 20.6569 6 19 6H16.1213L18.0607 4.06066C18.6464 3.47487 18.6464 2.52513 18.0607 1.93934C17.4749 1.35355 16.5251 1.35355 15.9393 1.93934L12 5.87868L8.06066 1.93934ZM10 10.9343V17.0657C10 17.4651 10.4451 17.7033 10.7774 17.4818L15.376 14.416C15.6728 14.2181 15.6728 13.7819 15.376 13.584L10.7773 10.5182C10.4451 10.2967 10 10.5349 10 10.9343Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'live'} {...props} >
      <SvgComponent/>
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    