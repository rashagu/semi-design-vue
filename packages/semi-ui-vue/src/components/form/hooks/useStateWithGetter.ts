import {Ref, ref as vueRef} from 'vue';
// https://github.com/facebook/react/issues/14543
export default function useStateWithGetter(initial?: any):[Ref,(value?: any)=>void,()=>any] {
    const ref = vueRef();
    const state:Ref = vueRef(initial);
    function setState(val){
        state.value = val
    }
    ref.value = state.value;
    const set = (value: any = null) => {
        console.log(value)
        ref.value = value;
        setState(value);
    };
    const get = () => ref.value;
    return [state, set, get];
}
