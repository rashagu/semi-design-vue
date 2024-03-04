import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import AvatarDemo from './components/avatar/__test__/AvatarDemo'
import Button from "./components/button/__test__/Demo";
import './docDemo.scss'
import IconTest from "./components/__test__/IconTest";
import TooltipDemo from "./components/tooltip/__test__/TooltipDemo";
import DropdownDemo1 from "./components/dropdown/__test__/DropdownDemo1";
import GridTest from "./components/grid/__test__/GridTest";
import LayoutTest from "./components/layout/__test__/LayoutTest";
import SpaceTest from "./components/space/__test__/SpaceTest";
import PopoverTest from "./components/popover/__test__/PopoverTest";
import TypeDemo from './components/typography/__test__/TypoDemo'
import InputDemo from "./components/input/__test__/InputDemo";
import RadioDemo from "./components/radio/__test__/RadioDemo";
import TagDemo from "./components/tag/__test__/TagDemo";
import SelectDemo from "./components/select/__test__/SelectDemo";
import AutoCompleteDemo from "./components/autoComplete/__test__/AutoCompleteItemsDemo";
import TagInputDemo from "./components/tagInput/__test__/TagInputDemo";
import CheckboxDemo from "./components/checkbox/__test__/CheckboxDemo";
import CascaderDemo from "./components/cascader/__test__/CascaderDemo";
import ScrollListDemo from "./components/scrollList/__test__/ScrollListDemo";
import TimePickerDemo from "./components/timePicker/__test__/TimePickerDemo";
import DatePickerDemo from "./components/datePicker/__test__/DatePickerDemo";
import ConfigProvider from "./components/configProvider";
// import {UseVirtualList} from "@vueuse/components";
import zh_CN from './components/locale/source/zh_CN';
import NavigationDemo from "./components/navigation/__test__/NavigationDemo";
import BreadcrumbDemo from "./components/breadcrumb/__test__/BreadcrumbDemo";
import SwitchDemo from "./components/switch/__test__/SwitchDemo";
import ProgressDemo from "./components/progress/__test__/ProgressDemo";
import UploadDemo from "./components/upload/__test__/UploadDemo";
import ModalDemo from "./components/modal/__test__/ModalDemo";
import ModalDemoConfirm from "./components/modal/__test__/ModalDemoConfirm";
import ModalDemoHook from "./components/modal/__test__/ModalDemoHook";
import InputNumberDemo from "./components/inputNumber/__test__/InputNumberDemo";
import SliderDemo from "./components/slider/__test__/SliderDemo";
import DividerDemo from "./components/divider/__test__/DividerDemo";
import RatingDemo from "./components/rating/__test__/RatingDemo";
import TreeDemo from "./components/tree/__test__/TreeAllDemo";
import TreeCheckDemo from "./components/tree/__test__/TreeCheckDemo";
import TreeSelectDemo from "./components/treeSelect/__test__/TreeSelectDemo";
import FormDemo from "./components/form/__test__/FormDemo";
import SkeletonDemo from "./components/skeleton/__test__/SkeletonDemo";
import ImageDemo from "./components/image/__test__/ImageDemo";
import WithFormApiDemo from "./components/form/__test__/WithFormApiDemo";
import WithFormStateDemo from "./components/form/__test__/WithFormStateDemo";
import WithFieldDemo from "./components/form/__test__/WithFieldDemo";
import WithFieldDemo2 from "./components/form/__test__/WithFieldDemo2";
import ToastDemo from "./components/toast/__test__/ToastDemo";
import BannerDemo from "./components/banner/__test__/BannerDemo";
import NotificationDemo from "./components/notification/__test__/NotificationDemo";
import PopconfirmDemo from "./components/popconfirm/__test__/PopconfirmDemo";
import PaginationDemo from "./components/pagination/__test__/PaginationDemo";
import TableDemo1 from "./components/table/__test__/TableDemo1";
import TableDemo2 from "./components/table/__test__/TableDemo2";
import TableDemo3 from "./components/table/__test__/TableDemo3";
import TableDemo4 from "./components/table/__test__/TableDemo4";
import TableDemo5 from "./components/table/__test__/TableDemo5";
import TableDemo6 from "./components/table/__test__/TableDemo6";
import TableDemo7 from "./components/table/__test__/TableDemo7";
import TableDemo8 from "./components/table/__test__/TableDemo8";
import TableDemo9 from "./components/table/__test__/TableDemo9";
// import TableDemo10 from "./components/table/__test__/TableDemo10";
// import TableDemo11 from "./components/table/__test__/TableDemo11";
import TableDemo12 from "./components/table/__test__/TableDemo12";
import TableDemo13Virtualized from "./components/table/__test__/TableDemo13Virtualized";
import OverflowListDemo1 from "./components/overflowList/__test__/OverflowListDemo";
import OverflowListDemoScroll from "./components/overflowList/__test__/OverflowListDemoScroll";
import BadgeDemo from "./components/badge/__test__/BadgeDemo";
import CardDemo from "./components/card/__test__/CardDemo";
import TabsDemo from "./components/tabs/__test__/TabsDemo";
import AnchorDemo from "./components/anchor/__test__/AnchorDemo";
import BacktopDemo from "./components/backtop/__test__/BacktopDemo";
import StepsDemo from "./components/steps/__test__/StepsDemo";
import CarouselDemo from "./components/carousel/__test__/CarouselDemo";
import CollapseDemo from "./components/collapse/__test__/CollapseDemo";
import CollapsibleDemo from "./components/collapsible/__test__/CollapsibleDemo";
import DescriptionsDemo from "./components/descriptions/__test__/DescriptionsDemo";
import ListDemo from "./components/list/__test__/ListDemo";
import SideSheetDemo from "./components/sideSheet/__test__/SideSheetDemo";
import TimelineDemo from "./components/timeline/__test__/TimelineDemo";
import HighlightDemo from "./components/highlight/__test__/HighlightDemo";
import TransferDemo from "./components/transfer/__test__/TransferDemo";
import CalenderDemo from "./components/calendar/__test__/CalenderDemo";
import TransferTreeDemo from "./components/transfer/__test__/TransferTreeDemo";
import TableDemo10 from "./components/table/__test__/TableDemo10";
import TableDemo11 from "./components/table/__test__/TableDemo11";
import VirtualizeTreeDemo from "./components/tree/__test__/VirtualizeTreeDemo";
import FormAllDemo from "./components/form/__test__/FormAllDemo";
import ModalForm from "./components/form/__test__/ModalForm";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}




const App = defineComponent<ExampleProps>((props, {slots}) => {

  // const a= ref(0)
  // onMounted(()=>{
  //   setInterval(()=>{
  //     a.value ++
  //   }, 1000)
  // })
  return () => (
    <div>
      <ConfigProvider locale={zh_CN}>
        {/*<CalenderDemo />*/}
        {/*<TransferDemo/>*/}
        {/*<TransferTreeDemo />*/}
        {/*<HighlightDemo />*/}
        {/*<TimelineDemo/>*/}
        {/*<SideSheetDemo />*/}
        {/*<ListDemo />*/}
        {/*<DescriptionsDemo />*/}
        {/*<CollapseDemo />*/}
        {/*<CollapsibleDemo />*/}
        {/*<CarouselDemo/>*/}
        {/*<StepsDemo />*/}
        {/*<BacktopDemo />*/}
        {/*<AnchorDemo />*/}
        {/*<TabsDemo />*/}
        {/*<CardDemo >*/}
        {/*  {a.value}*/}
        {/*</CardDemo>*/}
        {/*<BadgeDemo />*/}
        {/*<OverflowListDemo1 />*/}
        {/*<OverflowListDemoScroll />*/}
        {/*<TableDemo1 />*/}
        {/*<TableDemo2 />*/}
        {/*<TableDemo3 />*/}
        {/*<TableDemo4 />*/}
        {/*<TableDemo5 />*/}
        {/*<TableDemo6 />*/}
        {/*<TableDemo7 />*/}
        {/*<TableDemo8 />*/}
        {/*<TableDemo9 />*/}
        {/*<TableDemo10 />*/}
        {/*<TableDemo11 />*/}
        {/*<TableDemo12 />*/}
        {/*<TableDemo13Virtualized />*/}
        {/*<PaginationDemo />*/}
        {/*<PopconfirmDemo/>*/}
        <NotificationDemo/>
        {/*<BannerDemo/>*/}
        {/*<ToastDemo/>*/}
        {/*<ImageDemo/>*/}
        {/*<SkeletonDemo/>*/}
        {/*<FormAllDemo />*/}
        {/*<FormDemo />*/}
        {/*<WithFormApiDemo />*/}
        {/*<WithFormStateDemo/>*/}
        {/*<WithFieldDemo/>*/}
        {/*<WithFieldDemo2/>*/}
        {/*<TreeSelectDemo/>*/}
        {/*<TreeCheckDemo />*/}
        {/*<TreeDemo />*/}
        <div style={{backgroundColor: 'red', width: 300, height: 300}}>

        </div>
        {/*<VirtualizeTreeDemo />*/}
        {/*<RatingDemo />*/}
        {/*<DividerDemo/>*/}
        {/*<SliderDemo />*/}
        {/*<InputNumberDemo />*/}
        {/*<ModalForm />*/}
        {/*<ModalDemoHook />*/}
        {/*<ModalDemoConfirm/>*/}
        {/*<ModalDemo/>*/}
        {/*<UploadDemo/>*/}
        {/*<ProgressDemo/>*/}
        {/*<SwitchDemo/>*/}
        {/*<BreadcrumbDemo/>*/}
        {/*<DatePickerDemo />*/}
        {/*<TimePickerDemo />*/}
        {/*<ScrollListDemo />*/}
        {/*<CascaderDemo/>*/}
        {/*<CheckboxDemo />*/}
        {/*<TagInputDemo />*/}

        {/*<AutoCompleteDemo/>*/}
        {/*<SelectDemo/>*/}
        {/*<TagDemo/>*/}
        {/*<AvatarDemo/>*/}
        {/*<RadioDemo />*/}

        {/*<InputDemo />*/}
        {/*<TypeDemo />*/}

        {/*<div style={{color:'#E91E63',width: 100, display:'flex', flexWrap:'wrap'}}>*/}
        {/*  <Button />*/}
        {/*</div>*/}

        {/*<IconTest />*/}
        {/*<br/>*/}
        {/*<TooltipDemo />*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<DropdownDemo1/>*/}
        {/*<br/>*/}
        {/*<GridTest />*/}
        {/*<LayoutTest/>*/}
        {/*<SpaceTest/>*/}
        {/*<PopoverTest />*/}
        {/*<NavigationDemo />*/}
        <div class={'aa'}>123</div>
      </ConfigProvider>
    </div>
  )
}, {
  props: VuePropsType,
  name: 'App'
})


export default App
