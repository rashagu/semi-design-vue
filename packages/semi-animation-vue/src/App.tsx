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
        state={visible.value ? "enter" : "leave"}
        from={{ opacity: 0, scale: 0}}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0 }}
        didLeave={didLeave}
        didEnter={didEnter}
      >
        {({scale,opacity }:any) => (
          <h2 style={{transform: `scale(${scale})`, opacity}}>
            Toggle to see some animation happen!
          </h2>
        )}
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




