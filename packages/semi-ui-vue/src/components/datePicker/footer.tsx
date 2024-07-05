import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import classnames from 'classnames';
import Button from '../button';
import { get } from 'lodash';
import { Locale } from '../locale/interface';
import dateInput from './dateInput';
import { vuePropsMake } from '../PropTypes';

interface FooterProps {
  prefixCls?: string;
  locale: Locale['DatePicker'];
  localeCode: string;
  onCancelClick?: any;
  onConfirmClick?: any;
}
export const vuePropsType = vuePropsMake(
  {
    prefixCls: String,
    locale: Object,
    localeCode: String,
    onCancelClick: Function,
    onConfirmClick: Function,
  },
  {}
);
const Footer = defineComponent({
  props: vuePropsType,
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
