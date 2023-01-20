import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Highlight from "../index";

interface HighlightDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const HighlightDemo = defineComponent<HighlightDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => {
    const sourceString = '从 Semi Design 到 Any Design  快速定义你的设计系统，并应用在设计稿和代码中';
    const searchWords = ['设计系统', 'Semi Design'];

    return (<div>
      <h2>
        <Highlight sourceString={sourceString} searchWords={searchWords} />
      </h2>        <>
      <h2>
        <Highlight
          sourceString={sourceString}
          searchWords={searchWords}
          highlightStyle={{
            borderRadius: 6,
            marginLeft: 4,
            marginRight: 4,
            paddingLeft: 4,
            paddingRight: 4,
            backgroundColor: 'rgba(var(--semi-teal-5), 1)',
            color: 'rgba(var(--semi-white), 1)'
          }}
        />
      </h2>
      <h2>
        <Highlight
          sourceString={sourceString}
          searchWords={searchWords}
          highlightStyle={{
            borderRadius: 6,
            marginLeft: 4,
            marginRight: 4,
            paddingLeft: 4,
            paddingRight: 4,
            backgroundColor: 'var(--semi-color-primary)',
            color: 'rgba(var(--semi-white), 1)'
          }}
        />
      </h2>
    </>
      <h2>
        <Highlight
          sourceString={sourceString}
          searchWords={searchWords}
          component='strong'
        />
      </h2>
    </div>);
  }
})

HighlightDemo.props = vuePropsType
HighlightDemo.name = 'HighlightDemo'

export default HighlightDemo

