import {defineComponent, ref, h} from 'vue'
import { Transition } from "./animation/index";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}
const App = defineComponent<ExampleProps>((props, {slots}) => {
  const visible = ref(false);

  function didLeave() {
    console.log('didLeave')
  }
  function  didEnter() {
    console.log('didEnter')
  }
  return ()=>(
    <div class="App">
      <Transition
        from={{ maxHeight: 0, opacity: 0 }}
        enter={{
          maxHeight: { val: 999, easing: 'easeInQuad', duration: 250 },
          opacity: { val: 1, duration: 200, easing: 'cubic-bezier(0.5, -0.1, 1, 0.4)' },
        }}
        leave={{
          maxHeight: { val: 0, duration: 250 },
          opacity: {
            val: 0,
            duration: 200, // Need to be fast and transparent when put away, otherwise there will be jumping
            easing: 'cubic-bezier(0.5, -0.1, 1, 0.4)',
          },
        }}
        immediate={false}
      >
        {({scale,opacity }:any) => {
          console.log(scale)
          return (
            <h2 style={{transform: `scale(${scale})`, opacity}}>
              Toggle to see some animation happen!
            </h2>
          )
        }}
      </Transition>

      <button onClick={() => {
        visible.value = !visible.value;
      }}>toggle</button>
      <div class={'aa'}>123</div>
    </div>
  );
})


App.props = VuePropsType

export default App




