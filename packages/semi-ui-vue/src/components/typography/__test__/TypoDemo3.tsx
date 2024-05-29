import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { TypographyNumeral } from '../../index';

interface TypoDemo3Props {
  name?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<TypoDemo3Props> = {
  name: String,
};
const TypoDemo3 = defineComponent<TypoDemo3Props>(
  (props, {}) => {
    const slots = useSlots();

    return () => (
      <div>
        <TypographyNumeral precision={1}>
          <p>点赞量：1.6111e1 K</p>
        </TypographyNumeral>
      </div>
    );
  },
  {
    props: vuePropsType,
    name: 'TypoDemo3',
  }
);

export default TypoDemo3;
