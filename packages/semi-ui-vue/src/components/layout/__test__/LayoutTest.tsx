import { defineComponent, ref, h, Fragment } from 'vue';
import Layout, { LayoutHeader, LayoutContent, LayoutFooter, LayoutSider } from '../index';

interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const LayoutTest = defineComponent<ExampleProps>((props, { slots }) => {
  return () => (
    <div style={{ width: '100%', height: '100vh' }}>
      <Layout className="components-layout-demo">
        <LayoutHeader>Header</LayoutHeader>
        <Layout>
          <LayoutSider>Sider</LayoutSider>
          <LayoutContent>Content</LayoutContent>
        </Layout>
        <LayoutFooter>Footer</LayoutFooter>
      </Layout>
    </div>
  );
});

export default LayoutTest;
