import {useFormStateContext} from "../context/FormState/Consumer";

function useFormState() {
    const {context} = useFormStateContext();
    return context;
}

export default useFormState;