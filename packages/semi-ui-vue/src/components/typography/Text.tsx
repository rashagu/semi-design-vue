import {defineComponent, ref, h, Fragment} from 'vue'
import PropTypes from 'prop-types';
import { strings } from '@douyinfe/semi-foundation/typography/constants';
import Base from './Base';
import { Ellipsis, TypographyBaseSize, TypographyBaseType, OmitTypographyProps } from './interface';
import { CopyableConfig, LinkType } from './Title';

type OmitTextProps = OmitTypographyProps;


interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Text = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      Text
    </div>
  )
})

Text.props = vuePropsType

export default Text

