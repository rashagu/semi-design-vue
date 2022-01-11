import {defineComponent, ref, h} from 'vue';

interface ExampleProps {
    name?: string
}

const MainCate = defineComponent<ExampleProps>(props => {

    return () => (
      <div>123</div>
    );
});

MainCate.props = {
    name: String
};

export default MainCate;
