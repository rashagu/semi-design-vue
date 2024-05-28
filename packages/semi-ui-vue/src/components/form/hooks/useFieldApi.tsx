import useFormApi from './useFormApi';
import { FormApi } from '../interface';
import { ReactFieldError as FieldError } from '../errorMessage';
import {Ref} from "vue";

const buildFieldApi = (formApi: Ref<FormApi>, field: string) => ({
    getError: () => formApi.value.getError(field),
    setError: (error: FieldError) => formApi.value.setError(field, error),
    getTouched: () => formApi.value.getTouched(field),
    setTouched: (isTouched: boolean) => formApi.value.setTouched(field, isTouched),
    getValue: () => formApi.value.getValue(field),
    //@ts-ignore
    setValue: (value: any) => formApi.value.setValue(field, value),
});

function useFieldApi(field: string) {
    const {context:formApi} = useFormApi();
    const fieldApi = buildFieldApi(formApi, field);
    return fieldApi;
}

export default useFieldApi;
