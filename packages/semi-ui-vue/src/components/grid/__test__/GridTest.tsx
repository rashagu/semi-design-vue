import {defineComponent, ref, h, Fragment} from 'vue'
import Row from '../row'
import Col from '../col'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const GridTest = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div class="grid grid-gutter">
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
        <Col span={6}>
          <div class="col-content">col-6</div>
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="center">
        <Col span={4}><div class="col-content">col-4</div></Col>
        <Col span={4}><div class="col-content">col-4</div></Col>
        <Col span={4}><div class="col-content">col-4</div></Col>
        <Col span={4}><div class="col-content">col-4</div></Col>
      </Row>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}><div class="col-content">Col</div></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}><div class="col-content">Col</div></Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}><div class="col-content">Col</div></Col>
      </Row>
    </div>
  )
})

// @ts-ignore
GridTest.props = vuePropsType

export default GridTest

