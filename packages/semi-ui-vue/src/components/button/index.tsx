import {defineComponent, ref, h} from 'vue'
import BaseButton, { ButtonProps as BaseButtonProps, vuePropsType} from './Button';
import {noop} from "@douyinfe/semi-foundation/utils/function";
import {cssClasses} from "@douyinfe/semi-foundation/button/constants";
import IconButton, { IconButtonProps } from '../iconButton';



// eslint-disable-next-line
export interface ButtonProps extends IconButtonProps,BaseButtonProps {} // TODO check


const Button = defineComponent<ButtonProps>((props, {slots}) => {

    const hasIcon = Boolean(props.icon);
    const isLoading = Boolean(props.loading);
    const isDisabled = Boolean(props.disabled);


    if (hasIcon || (isLoading && !isDisabled)) {
        return ()=>(
          <IconButton {...props}>
              {{
                  default: slots.default
              }}
          </IconButton>
        );
    } else {
        return ()=>(
          <BaseButton {...props}>
              {{
                  default: slots.default
              }}
          </BaseButton>
        );
    }
})


Button.props = vuePropsType
export default Button;
