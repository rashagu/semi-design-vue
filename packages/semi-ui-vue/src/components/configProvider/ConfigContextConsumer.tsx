import {defineComponent, ref, h, Fragment, useSlots, inject} from 'vue'
import {ContextValue} from "./ConfigContextProvider";

interface ExampleProps {
}

export const vuePropsType = {
}
const ConfigContextConsumer = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const config = inject('ConfigContext', ref<ContextValue>({}))
  return ()=>slots.default?slots.default(config):null
})

ConfigContextConsumer.props = vuePropsType

export default ConfigContextConsumer

