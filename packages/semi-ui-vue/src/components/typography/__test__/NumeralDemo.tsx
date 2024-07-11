import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { Numeral } from '../index';

interface NumeralDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<NumeralDemoProps> = {
  name: String,
};
const NumeralDemo = defineComponent(
  (props, {}) => {
    const slots = useSlots();

    function parserTCH(oldVal) {
      return oldVal
        .split(' ')
        .map((item) => (Number(item) ? `${item.replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')}+` : item))
        .join(' ');
    }

    function Infos() {
      const data = [
        { type: 'Stars', min: '7100' },
        { type: 'Fork', min: '560' },
        { type: 'Downloads', min: '5000000' },
        { type: 'Contributors', min: '100' },
      ];
      return data.map((item) => (
        <p key={item.min}>
          {item.type}：<b style={{ color: 'rgba(var(--semi-violet-5),1)' }}>{item.min}</b>
        </p>
      ));
    }

    return () => {
      return (
        <div>
          <Numeral parser={parserTCH} component_="div">
            Semi Design 重视我们的用户，加入并助力我们不断完善
            {Infos()}
          </Numeral>
          <br />
          <Numeral link={{ href: 'https://semi.design', target: '_blank' }} parser={parserTCH}>
            现已服务 {1e5} 用户，前往官网 &gt;&gt;
          </Numeral>
        </div>
      );
    };
  },
  {
    props: { ...vuePropsType },
    name: 'NumeralDemo',
  }
);

export default NumeralDemo;
