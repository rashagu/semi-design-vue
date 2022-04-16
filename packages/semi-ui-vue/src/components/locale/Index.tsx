import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Index = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      Index
    </div>
  )
})

Index.props = vuePropsType

export default Index

