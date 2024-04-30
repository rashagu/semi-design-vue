import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Progress from "../index";

interface ProgressDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ProgressDemo = defineComponent<ProgressDemoProps>((props, {}) => {
  const slots = useSlots();

  return () => (
    <div style={{ width: 200 }}>
      <Progress percent={10} stroke="var(--semi-color-warning)" aria-label="disk usage" />
      <br />
      <Progress percent={25} stroke="var(--semi-color-danger)" aria-label="disk usage" />
      <br />
      <Progress percent={50} aria-label="disk usage" />
      <br />
      <Progress percent={80} aria-label="download progress" />
      <br />
      <Progress percent={80} size="large" aria-label="disk usage" />
      <br />
      <Progress percent={80} style={{ height: '8px' }} aria-label="disk usage" />
      <br />
      <Progress
        percent={50}
        width={140}
        type="circle"
        stroke={'red'}
        strokeWidth={6}
        style={{ margin: 10 }}
        aria-label="disk usage"
        showInfo={true}
        format={(p) => {
          return <div>{p + '%'}</div>;
        }}
      />
      <br />
    </div>
  );
});

export default ProgressDemo;

