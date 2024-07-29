import { type ShallowRef, shallowRef, watch } from 'vue'

export function useMemo<T>(getValue: (...arg:any[])=>T, sources: any[]):ShallowRef<T> {
  const value = shallowRef(getValue())
  watch(sources, ()=>{
    value.value = getValue()
  }, {immediate: true})
  return value
}
