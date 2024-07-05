import {defineComponent, ref, h, Fragment, useSlots} from "vue";
import TableDemo1 from "./TableDemo1";
import TableDemo2 from "./TableDemo2";
import TableDemo3 from "./TableDemo3";
import TableDemo4 from "./TableDemo4";
import TableDemo5 from "./TableDemo5";
import TableDemo6 from "./TableDemo6";
import TableDemo7 from "./TableDemo7";
import TableDemo8 from "./TableDemo8";
import TableDemo9 from "./TableDemo9";
import TableDemo10 from "./TableDemo10";
import TableDemo11 from "./TableDemo11";
import TableDemo12 from "./TableDemo12";
import TableDemo13Virtualized from "./TableDemo13Virtualized";

interface AllDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const AllDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  return () => <div>
    <TableDemo1 />
    <TableDemo2 />
    <TableDemo3 />
    <TableDemo4 />
    <TableDemo5 />
    <TableDemo6 />
    <TableDemo7 />
    <TableDemo8 />
    <TableDemo9 />
    <TableDemo10 />
    <TableDemo11 />
    <TableDemo12 />
    <TableDemo13Virtualized />
  </div>;
},{
  props: vuePropsType,
  name: "AllDemo"
});



export default AllDemo;
