import { defineComponent, ref } from 'vue';
import { Form, FormSelect, FormSelectOption } from '../../form';
import { Button } from '../../index';

interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const SelectDemo5 = defineComponent<ExampleProps>((props, { slots }) => {

    const ops = ref(['www']);

  return()=>{
    return (
      <div>
        <div>
          {JSON.stringify(ops.value)}
          <Form>
            <FormSelect field="sss" style={{ width: '300px' }} placeholder="带搜索功能的多选">
              {ops.value.map((item) => {
                return (
                  <FormSelectOption value={item} key={item}>
                    {item}
                  </FormSelectOption>
                );
              })}
            </FormSelect>
          </Form>
          <Button
            onClick={() => {
              ops.value.push('' + new Date().valueOf());
              ops.value = [...ops.value];
              console.log(ops.value);
            }}
          >
            add
          </Button>
        </div>
      </div>
    );
  };
});

export default SelectDemo5;
