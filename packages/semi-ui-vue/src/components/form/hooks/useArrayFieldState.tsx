import { ArrayFieldContext } from '../context';
import {useArrayFieldContext} from "../context/ArrayField/Consumer";

function useArrayFieldState() {
    return useArrayFieldContext();
}

export default useArrayFieldState;
