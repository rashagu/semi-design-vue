import useFormState from './useFormState';
import * as ObjectUtil from '@douyinfe/semi-foundation/utils/object';
import { FormState } from '../interface';
import { computed, Ref } from 'vue';

const buildFieldState = (formState: Ref<FormState>, field: string) => ({
    value: ObjectUtil.get(formState.value.values, field),
    error: ObjectUtil.get(formState.value.errors, field),
    touched: ObjectUtil.get(formState.value.touched, field),
});

function useFieldState(field: string) {
    const formState = useFormState();
    const fieldState = computed(()=>buildFieldState(formState, field));
    return fieldState;
}

export default useFieldState;
