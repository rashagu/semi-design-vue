import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const LocaleProvider = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      LocaleProvider
    </div>
  )
})

LocaleProvider.props = vuePropsType

export default LocaleProvider

