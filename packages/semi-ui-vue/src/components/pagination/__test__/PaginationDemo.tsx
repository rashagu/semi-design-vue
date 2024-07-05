import {defineComponent, ref, h, Fragment, useSlots} from "vue";
import Pagination from '../index'

interface PaginationDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const PaginationDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  return () => {

    return <div>
      <Pagination
        total={300}
        showSizeChanger
        style={{marginBottom: 12}}
        pageSizeOpts={[50, 80, 90, 200]}>
      </Pagination>
      <Pagination
        total={300}
        showSizeChanger
        pageSizeOpts={[10, 20, 50, 200]}>
      </Pagination>
    </div>
  };
});




export default PaginationDemo;
