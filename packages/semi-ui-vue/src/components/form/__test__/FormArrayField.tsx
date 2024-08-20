import { ArrayField, TextArea, Form, Button, useFormState } from '@kousum/semi-ui-vue';
import { IconPlusCircle, IconMinusCircle } from '@kousum/semi-icons-vue';
import { defineComponent } from 'vue';

const ComponentUsingFormState = defineComponent(() => {
  const formState = useFormState();
  return () => <TextArea style={{ marginTop: 10 }} value={JSON.stringify(formState)} />;
});
export default () => {
  let data = [
    { name: 'Semi D2C', role: 'Engineer' },
    { name: 'Semi C2D', role: 'Designer' },
  ];
  return (
    <Form style={{ width: 800 }} labelPosition="left" labelWidth="100px" allowEmpty>
      <ArrayField field="rules" initValue={data}>
        {({ add, arrayFields, addWithInitValue }) => (
          <>
            <Button onClick={add} icon={<IconPlusCircle />} theme="light">
              Add new line
            </Button>
            <Button
              icon={<IconPlusCircle />}
              onClick={() => {
                addWithInitValue({ name: 'Semi DSM', type: 'Designer' });
              }}
              style={{ marginLeft: 8 }}
            >
              Add new line with init value
            </Button>
            {arrayFields.map(({ field, key, remove }, i) => (
              <div key={key} style={{ width: 1000, display: 'flex' }}>
                <Form.Input
                  field={`${field}[name]`}
                  label={`${field}.name`}
                  style={{ width: 200, marginRight: 16 }}
                ></Form.Input>
                <Form.Select
                  field={`${field}[role]`}
                  label={`${field}.role`}
                  style={{ width: 120 }}
                  optionList={[
                    { label: 'Engineer', value: 'Engineer' },
                    { label: 'Designer', value: 'Designer' },
                  ]}
                ></Form.Select>
                <Button
                  type="danger"
                  theme="borderless"
                  icon={<IconMinusCircle />}
                  onClick={remove}
                  style={{ margin: 12 }}
                />
              </div>
            ))}
          </>
        )}
      </ArrayField>
      <ComponentUsingFormState />
    </Form>
  );
};
