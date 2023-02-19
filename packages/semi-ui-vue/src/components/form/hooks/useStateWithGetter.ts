import {Ref, ref as vueRef, shallowRef} from 'vue';
// https://github.com/facebook/react/issues/14543
export default function useStateWithGetter(initial?: any):[Ref,(value?: any)=>void,()=>any] {
    const ref = shallowRef();
    const state:Ref = vueRef(initial);
    function setState(val){
        state.value = val
    }
    ref.value = state.value;
    const set = (value: any = null) => {
        ref.value = value;
        setState(value);
    };
    const get = () => ref.value;
    return [state, set, get];
}
