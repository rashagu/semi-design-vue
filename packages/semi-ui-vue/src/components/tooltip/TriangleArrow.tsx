import {defineComponent, ref, h, onActivated, Fragment, StyleValue, CSSProperties} from 'vue'

interface ExampleProps {
  name?: string,
  className?: string,
  style?: string | CSSProperties,
}

export const vuePropsType = {
  name: String,
  className: String,
  style: [ String, Object],
}
const TriangleArrow = defineComponent<ExampleProps>((props, {slots}) => {
  const { className, style, ...restProps } = props;
  return ()=>(
    <svg class={className} style={style} {...restProps} width="24" height="7" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z" />
    </svg>
  );
}, {
  props:vuePropsType,
  name: 'TriangleArrow'
})

export default TriangleArrow

