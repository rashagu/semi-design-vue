import { ArrayFieldContext } from '../context';
import {useArrayFieldContext} from "../context/ArrayField/Consumer";

function useArrayFieldState() {
    const {context} = useArrayFieldContext();
    return context;
}

export default useArrayFieldState;
