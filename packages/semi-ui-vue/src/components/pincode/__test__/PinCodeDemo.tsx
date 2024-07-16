import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import PinCode from '../index';

const PinCodeDemo = defineComponent({
  props: {
    name: String,
  },
  name: 'PinCodeDemo',
  setup(props, { attrs }) {
    const slots = useSlots();


    return () => (
      <div>
        <PinCode
          size={'default'}
          defaultValue={'123456'}
          onComplete={value => console.log('pincode: ', value)}
          onChange={value => {
            console.log(value);
          }}
        />
      </div>
    );
  },
});


export default PinCodeDemo;

