import {defineComponent, ref, h, onMounted,} from 'vue'
import { Transition } from "./animation/index";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {


  const visible = ref(false);
  return ()=>(
    <div class="App">
      <Transition
        state={visible.value ? "enter" : "leave"}
        from={{ opacity: 0, scale: 0}}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0 }}
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
    </div>
  );
})


App.props = VuePropsType

export default App




