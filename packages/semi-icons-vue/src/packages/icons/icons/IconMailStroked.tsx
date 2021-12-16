
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
                d="M3 4C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H3ZM3 7.23353V18H21V7.23353L12.5855 13.3107C12.236 13.5631 11.764 13.5631 11.4145 13.3107L3 7.23353ZM19.292 6H4.70797L12 11.2665L19.292 6Z"
                fill="currentColor"
            />
        </svg>

      );
    })
    SvgComponent.props = vuePropsType

    const IconComponent = defineComponent<IconProps>((props, {slots}) => {
      return ()=>
        <ConvertIcon iconType={'mail_stroked'} {...props} >
      <SvgComponent/>
    </ConvertIcon>;
})
IconComponent.props = iconVuePropsType
export default IconComponent
    