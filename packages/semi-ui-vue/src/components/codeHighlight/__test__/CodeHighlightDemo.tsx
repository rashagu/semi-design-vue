import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import CodeHighlight from '../index';


const CodeHighlightDemo = defineComponent({
  name: 'CodeHighlightDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => {
      return (
        <CodeHighlight
          language={'javascript'}
          code={`
import * as React from 'react"
const Test = ()=>{
    const handleClick = ()=>{
        alert("Click")
    }
    return <div onClick={handleClick}>test</div>
}`}
        />
      );
    };
  },
});

export default CodeHighlightDemo;
