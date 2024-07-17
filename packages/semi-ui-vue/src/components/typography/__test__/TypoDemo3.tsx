import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { CombineProps } from '../../interface';
import Numeral from '../numeral';

interface TypoDemo3Props {
  name?: string;
}

export const vuePropsType: CombineProps<TypoDemo3Props> = {
  name: String,
};
const TypoDemo3 = defineComponent(
  (props, {}) => {
    const slots = useSlots();

    return () => (
      <div>
        <Numeral precision={1}>
          <p>点赞量：1.6111e1 K</p>
        </Numeral>
      </div>
    );
  },
  {
    props: { ...vuePropsType },
    name: 'TypoDemo3',
  }
);

export default TypoDemo3;
