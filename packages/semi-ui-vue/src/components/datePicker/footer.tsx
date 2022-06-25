import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import classnames from 'classnames';
import Button from '../button';
import { get } from 'lodash';
import { Locale } from '../locale/interface';

interface FooterProps {
  prefixCls?: string;
  locale: Locale['DatePicker'];
  localeCode: string;
  onCancelClick?: any;
  onConfirmClick?: any;
}
export const vuePropsType = {
  name: String
}
const Footer = defineComponent<FooterProps>((props, {}) => {
  const slots = useSlots()
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
  )
})

Footer.props = vuePropsType

export default Footer

