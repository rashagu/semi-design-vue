import {
  Button,
  Form,
  FormCheckboxGroup,
  FormInput,
  Space,
  Toast,
} from "@kousum/semi-ui-vue/src/components/index";
import type { FormApi } from "@kousum/semi-ui-vue";
import { defineComponent, ref, h, Fragment, useSlots, reactive } from "vue";

interface ModalFormProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const ModalForm = defineComponent<ModalFormProps>((props) => {
  const slots = useSlots();
  const state = reactive<{ formApi: FormApi<any> }>({ formApi: null });

  function getFormApi(formApi: FormApi<any>) {
    state.formApi = formApi;
  }

  function validate(val: any, values: Record<string, any>) {
    if (!val) {
      return "can't be empty";
    } else if (val.length <= 5) {
      console.log(val.length)
      return <span>我是传入的reactNode</span>;
    }
    return;
  }

  function validatePartial(type?: string) {
    let scope = state.formApi.getValue("validateScope");
    !scope ? (scope = []) : null;
    type === "all" ? (scope = ["a", "b", "c", "d", "b.name"]) : null;
    state.formApi
      .validate(scope)
      .then((values) => {
        console.log(values);
        Toast.success("pass");
      })
      .catch((error) => {
        Toast.error("error");
        console.log(error);
      });
  }

  function resetPartial() {
    const scope = state.formApi.getValue("resetScope");
    // @ts-ignore
    state.formApi.reset(scope); // 官方缺少 ts 类型
  }
  return () => {
    const options = ["a", "b", "c", "d", "b.name"].map((item) => ({
      label: item,
      value: item,
    }));
    return (
      <Form
        getFormApi={getFormApi}
        autoScrollToError
        layout="horizontal"
        initValues={{}}
      >
        {({ formState, values, formApi }) => (
          <>
            <div>
              <FormInput field="a[1]" validate={validate} trigger="blur" />
              <FormInput field="a[0]" validate={validate} trigger="blur" />
              <FormInput field="b.name[0]" validate={validate} trigger="blur" />
              <FormInput field="b.name[1]" validate={validate} trigger="blur" />
              <FormInput field="b.type" validate={validate} trigger="blur" />
              <FormInput field="c" validate={validate} trigger="blur" />
              <FormInput field="d" validate={validate} trigger="blur" />
            </div>
            <div>
              <FormCheckboxGroup
                options={options}
                field="validateScope"
                label="当前希望校验的Field"
                initValue={["a", "b"]}
                direction="horizontal"
              />
              <FormCheckboxGroup
                options={options}
                field="resetScope"
                label="当前需要Reset的Field"
                direction="horizontal"
              />
              <Space>
                <Button htmlType="reset">reset</Button>
                <Button onClick={() => validatePartial("all")}>
                  all validate
                </Button>
                <Button onClick={() => validatePartial()}>
                  partial validate {JSON.stringify(values)}
                </Button>
                <Button onClick={resetPartial}>partial reset</Button>
              </Space>
            </div>
          </>
        )}
      </Form>
    );
  };
});

ModalForm.props = vuePropsType;
ModalForm.name = "ModalForm";

export default ModalForm;
