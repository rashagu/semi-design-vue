import {defineComponent, ref, h} from 'vue'


interface ExampleProps {
  name?: string
}

const Index = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div id={'a'}>
      Index
    </div>
  )
})

export const VuePropsType = {
  name: String
}

Index.props = VuePropsType

export default Index
