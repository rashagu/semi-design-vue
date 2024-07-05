import { defineComponent, ref, h, onActivated, Fragment, CSSProperties } from 'vue';

interface ExampleProps {
  name?: string;
  className?: string;
  style?: string | CSSProperties;
}

export const vuePropsType = {
  name: String,
  className: String,
  style: [String, Object],
};
const TriangleArrowVertical = defineComponent({
  props: vuePropsType,
  name: 'TriangleArrowVertical',
  setup(props, { slots }) {
    return () => {
      const { className, style, ...restProps } = props;
      return (
        <svg
          class={className}
          style={style}
          {...restProps}
          width="7"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z" />
        </svg>
      );
    };
  },
});

export default TriangleArrowVertical;
