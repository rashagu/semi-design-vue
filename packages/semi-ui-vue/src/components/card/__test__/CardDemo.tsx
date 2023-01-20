import {defineComponent, ref, h, Fragment, useSlots, watch, computed} from 'vue'
import CardGroup from "../cardGroup";
import Slider from "../../slider";
import Card from "../index";
import {TypographyText} from "../../index";

interface CardDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CardDemo = defineComponent<CardDemoProps>((props, {}) => {
  const slots = useSlots()

  const spacing = ref(12);

  const childrenRef = ref()
  watch(childrenRef, (value, oldValue, onCleanup)=>{
    console.log(value, oldValue)
  }, {immediate: true})
  return () => {

    childrenRef.value = slots.default?.()
    return (
      <>
        <TypographyText>滑动调节 Card 间距</TypographyText>
        <Slider
          defaultValue={12}
          max={40}
          min={10}
          style={{ width: '360px' }}
          onChange={v=> spacing.value = v as any}
        />
        <br />
        <CardGroup spacing={spacing.value}>
          {
            new Array(8).fill(null).map((v, idx)=>(
              <Card
                key={idx}
                shadows='hover'
                title='Card title'
                headerLine={false}
                style={{ width: '260px' }}
                headerExtraContent={
                  <TypographyText link>
                    More
                  </TypographyText>
                }
              >
                <TypographyText>Card content</TypographyText>
              </Card>
            ))
          }
        </CardGroup>
      </>
    );
  }
})

CardDemo.props = vuePropsType
CardDemo.name = 'CardDemo'

export default CardDemo

