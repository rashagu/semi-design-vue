import { defineComponent, ref, h, Fragment, useSlots, ComponentObjectPropsOptions } from 'vue';
import classnames from 'classnames';
import Button from '../button';
import { get } from 'lodash';
import { Locale } from '../locale/interface';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';

interface FooterProps {
  prefixCls?: string;
  locale: Locale['DatePicker'];
  localeCode: string;
  onCancelClick?: any;
  onConfirmClick?: any;
}
const propsType: CombineProps<FooterProps> = {
  prefixCls: String,
  locale: {
    type: Object,
    required: true
  },
  localeCode: {
    type: String,
    required: true
  },
  onCancelClick: Function,
  onConfirmClick: Function,
}
export const vuePropsType = vuePropsMake(
  propsType,
  {}
);
const Footer = defineComponent({
  props: { ...vuePropsType },
  name: 'Footer',
  setup(props, {}) {
    const slots = useSlots();
    const { prefixCls, locale, onCancelClick, onConfirmClick } = props;
    const wrapCls = classnames(`${prefixCls}-footer`);

    return () => (
      <div class={wrapCls}>
        <Button theme="borderless" onClick={onCancelClick}>
          {get(locale, 'footer.cancel', '')}
        </Button>
        <Button theme="solid" onClick={onConfirmClick}>
          {get(locale, 'footer.confirm', '')}
        </Button>
      </div>
    );
  },
});

export default Footer;
