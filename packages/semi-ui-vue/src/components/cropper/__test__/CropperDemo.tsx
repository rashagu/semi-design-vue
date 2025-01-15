import { defineComponent, ref, h, Fragment, useSlots, onMounted } from 'vue';
import { CombineProps } from '../../interface';
import { Group as RadioGroup, Radio } from '../../radio';
import Cropper from '../index';
import Button from '../../button';

interface CropperDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<CropperDemoProps> = {
  name: String,
};
const CropperDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'CropperDemo',
  setup(props, { attrs }) {
    const slots = useSlots();
    const containerStyle = {
      width: '550px',
      height: '300px',
      margin: '20px',
    }

    const dom = ref(null);
    const shape = ref('rect');

    const onButtonClick = () => {
      const value = dom.value.getCropperCanvas();
      const previewContainer = document.getElementById('previewContainer');
      previewContainer.innerHTML = '';
      previewContainer.appendChild(value);
    };

    const onShapeChange = (e) => {
      shape.value = e.target.value;
    };

    function testRef(v){
      console.log(v);
    }

    const a = ref(0)
    onMounted(()=>{
      console.log();
      // setInterval(()=>{
      //   a.value++
      // }, 1000)

      setTimeout(()=>{

        // onButtonClick()
      }, 500)
    })

    return () => (
      <div ref={testRef}>
        {a.value}
        <RadioGroup onChange={onShapeChange} value={shape.value}>
          <Radio value={'rect'}>rect</Radio>
          <Radio value={'round'}>round</Radio>
          <Radio value={'roundRect'}>roundRect</Radio>
        </RadioGroup>
        <Cropper
          ref={dom}
          src={'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/image.png'}
          style={containerStyle}
          shape={shape.value}
        />
        <Button onClick={onButtonClick}>裁切</Button>
        <div id='previewContainer' data-testId={'previewContainer'}/>
      </div>
    );
  },
});


export default CropperDemo;

