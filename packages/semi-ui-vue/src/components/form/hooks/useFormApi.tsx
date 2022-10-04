import {useBaseFormApiContext} from "../context/BaseFormApi/Consumer";
 
export default function useFormApi<T extends Record<string, any> = any>() {
    return useBaseFormApiContext();
}