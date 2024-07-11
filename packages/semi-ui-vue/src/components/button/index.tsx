import { defineComponent, h } from 'vue';
import BaseButton, { ButtonProps as BaseButtonProps, vuePropsType } from './Button';
import IconButton, { IconButtonProps } from '../iconButton';

// eslint-disable-next-line
export interface ButtonProps extends IconButtonProps, BaseButtonProps {} // TODO check

const Button = defineComponent({
  props: { ...vuePropsType },
  name: 'Button',
  setup(props, { slots }) {
    return () => {
      const hasIcon = Boolean(props.icon);
      const isLoading = Boolean(props.loading);
      const isDisabled = Boolean(props.disabled);
      return hasIcon || (isLoading && !isDisabled) ? (
        <IconButton {...props}>
          {{
            default: slots.default,
          }}
        </IconButton>
      ) : (
        <BaseButton {...props}>
          {{
            default: slots.default,
          }}
        </BaseButton>
      );
    };
  },
});

export default Button;
