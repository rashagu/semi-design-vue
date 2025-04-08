import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import AvatarDemo from './components/avatar/__test__/AvatarDemo'
import Button from "./components/button/__test__/Demo";
import './docDemo.scss'

import IconTest from "./components/__test__/IconTest";
import TooltipDemo from "./components/tooltip/__test__/TooltipDemo";
import DropdownDemo1 from "./components/dropdown/__test__/DropdownDemo1";
import DropdownDemoSFC from "./components/dropdown/__test__/DropdownDemoSFC.vue";
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
import DatePickerDemo2 from "./components/datePicker/__test__/DatePickerDemo2";
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
import TabsDemo3 from "./components/tabs/__test__/TabsDemo3";
import TabsDemoVueSFC from "./components/tabs/__test__/TabsDemoVueSFC.vue";
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
import DescriptionsHorizontalDemo from './components/descriptions/__test__/DescriptionsHorizontalDemo';
import Input from './components/input';
import WithVModelDemo from './components/withVModel/__test__/WithVModelDemo';
import SelectDemo2 from './components/select/__test__/SelectDemo2';
import SelectDemo3 from './components/select/__test__/SelectDemo3.vue';
import SelectDemo4 from './components/select/__test__/SelectDemo4.vue';
import SelectDemo5 from './components/select/__test__/SelectDemo5';
import ModalDemo2 from './components/modal/__test__/ModalDemo2';
import NotificationDemo2 from './components/notification/__test__/NotificationDemo2';
import TreeDemo2 from './components/tree/__test__/TreeDemo2';
import NotificationDemo3 from './components/notification/__test__/NotificationDemo3';
import TypoDemo2 from './components/typography/__test__/TypoDemo2';
import CascaderDemo3 from './components/cascader/__test__/CascaderDemo3';
import TabsDemo4 from './components/tabs/__test__/TabsDemo4';
import DemoButtonSFC from './components/button/__test__/DemoButtonSFC.vue';
import SkeletonDemoSFC from './components/skeleton/__test__/SkeletonDemoSFC.vue';
import BreadcrumbDemo2 from './components/breadcrumb/__test__/BreadcrumbDemo2';
import TypoDemo3 from './components/typography/__test__/TypoDemo3';

import ModalDemoVueSFC from './components/modal/__test__/ModalDemoVueSFC.vue';
import AutoCompleteSFC from './components/autoComplete/__test__/AutoCompleteSFC.vue';
import DiyItemAutoComplete from './components/autoComplete/__test__/diyItemAutoComplete.vue';
import RemoteAutoComplete from './components/autoComplete/__test__/remoteAutoComplete.vue';
import TypoDemoSFC from './components/typography/__test__/TypoDemoSFC.vue';
import NumeralDemo from './components/typography/__test__/NumeralDemo';
import TextDemo from './components/typography/__test__/textDemo.vue';
import LinkDemo from './components/typography/__test__/linkDemo.vue';
import TypoCopyDemo from './components/typography/__test__/TypoCopyDemo';
import UpdateDemo2 from './components/upload/__test__/UpdateDemo2';
import TableDemoColumnChildren from './components/table/__test__/TableDemoColumnChildren';
import TableDemoSFC from './components/table/__test__/TableDemoSFC.vue';
import PinCodeDemo from './components/pincode/__test__/PinCodeDemo';
import LottieDemo from './components/lottie/__test__/LottieDemo';
import CodeHighlightDemo from './components/codeHighlight/__test__/CodeHighlightDemo';
import MarkDownRenderDemo from './components/markdownRender/__test__/markDownRenderDemo';
import DatePickerTriggerRenderDemo from './components/datePicker/__test__/DatePickerTriggerRenderDemo.vue';
import FormRenderDemo from './components/form/__test__/FormRenderDemo';
import ChatDemo from './components/chat/__test__/ChatDemo';
import ToastUseDemo from './components/toast/__test__/ToastUseDemo';
import SelectDemoToRawTest from './components/select/__test__/SelectDemoToRawTest';
import ColorPickerDemo from './components/colorPicker/__test__/ColorPickerDemo';
import FormLayoutDemo from './components/form/__test__/FormLayoutDemo.vue';
import FormSlotDemo from './components/form/__test__/FormSlotDemo';
import FormWinthFieldDemo4 from './components/form/__test__/FormWinthFieldDemo4';
import SelectRenderOptionItem from './components/select/__test__/SelectRenderOptionItem';
import UploadDemo3 from './components/upload/__test__/UploadDemo3';
import UploadDemo4 from './components/upload/__test__/UploadDemo4';
import NavDemo2 from './components/navigation/__test__/NavDemo2';
import TabsDemo5 from './components/tabs/__test__/TabsDemo5';
import TreeDemo3 from './components/tree/__test__/TreeDemo3';
import TreeDemo4 from './components/tree/__test__/TreeDemo4';
import TreeDemo5 from './components/tree/__test__/TreeDemo5';
import ImageDemo2 from './components/image/__test__/ImageDemo2';
import SideSheetDemo2 from './components/sideSheet/__test__/SideSheetDemo2';
import TableColumnsFromChildren from './components/table/__test__/TableColumnsFromChildren';
import TableDocsDemo from './components/table/__test__/TableDocsDemo';
import TagDocsDemo from './components/tag/__test__/TagDocsDemo';
import PopComfirmDocsDemo from './components/popconfirm/__test__/PopComfirmDocsDemo';
import AvatarGroupDemo from './components/avatar/__test__/AvatarGroupDemo';
import TabsDocsDemo from './components/tabs/__test__/TabsDocsDemo';
import { Numeral } from './components/typography';
import TabsDemoReact from './components/tabs/__test__/TabsDemoReact';
import ModalDocsDemo from './components/modal/__test__/ModalDocsDemo';
import SelectDocsDemo from './components/select/__test__/SelectDocsDemo';
import HotKeysDemo2 from './components/hotKeys/__test__/HotKeysDemo2';
import HotKeysDocsDemo from './components/hotKeys/__test__/HotKeysDocsDemo';
import OptionDemo from './components/autoComplete/__test__/OptionDemo';
import TransferDemoDocs from './components/transfer/__test__/TransferDemoDocs';
import TabsDemoPaneChildren from './components/tabs/__test__/TabsDemoPaneChildren';
import ResizableDemo from './components/resizable/__test__/ResizableDemo';
import TreeCheckSimpleJsonDemo from './components/tree/__test__/TreeCheckSimpleJsonDemo';
import DragMoveDemo from './components/dragMove/__test__/DragMoveDemo';
import JsonViewerDemo from './components/jsonViewer/__test__/JsonViewerDemo';
import SelectTest from './components/select/__test__/SelectTest';
import { InputVModel } from './components';
import CropperDemo from './components/cropper/__test__/CropperDemo';
import AudioPlayerDemo from './components/audioPlayer/__test__/AudioPlayerDemo';
import UserGuideDemo from './components/userGuide/__test__/UserGuideDemo';

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
  // console.log(ConfigProvider);
  const a = ref('sdsd')
  const testRef = ref()
  watch(testRef, (v)=>{
    console.log(v, v?.getRef());
  })
  return () => (
    <div>
      <ConfigProvider locale={zh_CN}>
        {a.value}
        <UserGuideDemo/>
        {/*<AudioPlayerDemo/>*/}
        {/*<CropperDemo/>*/}
        {/*<InputVModel ref={testRef} v-model={a.value}/>*/}
        {/*<WithVModelDemo/>*/}
        {/*<CalenderDemo />*/}
        {/*<TransferDemo/>*/}
        {/*<TransferTreeDemo />*/}
        {/*<HighlightDemo />*/}
        {/*<TimelineDemo/>*/}
        {/*<SideSheetDemo />*/}
        {/*<SideSheetDemo2/>*/}
        {/*<TableDocsDemo/>*/}
        {/*<TableColumnsFromChildren/>*/}
        {/*<ListDemo />*/}
        {/*<DescriptionsDemo />*/}
        {/*<DescriptionsHorizontalDemo/>*/}
        {/*<CollapseDemo />*/}

        {/*<ResizableDemo/>*/}


        {/*<CollapsibleDemo />*/}
        {/*<CarouselDemo/>*/}
        {/*<StepsDemo />*/}
        {/*<BacktopDemo />*/}
        {/*<AnchorDemo />*/}
        {/*<TabsDocsDemo/>*/}
        {/*<TabsDemo5/>*/}
        {/*<TabsDemo />*/}
        {/*<TabsDemo3/>*/}
        {/*<TabsDemo4/>*/}
        {/*<TabsDemoVueSFC/>*/}
        {/*<TabsDemoReact/>*/}
        {/*<CardDemo >*/}
        {/*  {a.value}*/}
        {/*</CardDemo>*/}
        {/*<BadgeDemo />*/}
        {/*<OverflowListDemo1 />*/}
        {/*<OverflowListDemoScroll />*/}
        {/*<PinCodeDemo/>*/}
        {/*<TableDemoColumnChildren/>*/}
        {/*<TableDemoSFC/>*/}
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
        {/*<PopComfirmDocsDemo/>*/}
        {/*<PopconfirmDemo/>*/}
        {/*<NotificationDemo/>*/}
        {/*<NotificationDemo2/>*/}
        {/*<NotificationDemo3/>*/}
        {/*<BannerDemo/>*/}
        {/*<ToastDemo/>*/}
        {/*<ToastUseDemo/>*/}
        {/*<ImageDemo2/>*/}
        {/*<ImageDemo/>*/}
        {/*<SkeletonDemo/>*/}
        {/*<FormWinthFieldDemo4/>*/}
        {/*<FormSlotDemo/>*/}
        {/*<FormLayoutDemo/>*/}
        {/*<FormAllDemo />*/}
        {/*<FormDemo />*/}
        {/*<FormRenderDemo/>*/}
        {/*<WithFormApiDemo />*/}
        {/*<WithFormStateDemo/>*/}
        {/*<WithFieldDemo/>*/}
        {/*<WithFieldDemo2/>*/}
        {/*<TreeSelectDemo/>*/}
        {/*<TreeCheckDemo />*/}
        {/*<TreeCheckSimpleJsonDemo/>*/}
        {/*<DragMoveDemo/>*/}
        {/*<JsonViewerDemo/>*/}

        {/*<TreeDemo />*/}
        {/*<TreeDemo2 />*/}
        {/*<TreeDemo3/>*/}
        {/*<TreeDemo4/>*/}
        {/*<TreeDemo5/>*/}
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
        {/*<ModalDemoVueSFC/>*/}
        {/*<ModalDemo2/>*/}
        {/*<ModalDocsDemo/>*/}
        {/*<LottieDemo/>*/}
        {/*<MarkDownRenderDemo/>*/}
        {/*<CodeHighlightDemo/>*/}
        {/*<UploadDemo4/>*/}
        {/*<UploadDemo3/>*/}
        {/*<UploadDemo/>*/}
        {/*<UpdateDemo2/>*/}
        {/*<ProgressDemo/>*/}
        {/*<SwitchDemo/>*/}
        {/*<BreadcrumbDemo/>*/}
        {/*<BreadcrumbDemo2/>*/}
        {/*<DatePickerDemo />*/}
        {/*<DatePickerDemo2/>*/}
        {/*<DatePickerTriggerRenderDemo/>*/}
        {/*<TimePickerDemo />*/}
        {/*<ScrollListDemo />*/}
        {/*<CascaderDemo/>*/}
        {/*<CascaderDemo3/>*/}
        {/*<CheckboxDemo />*/}
        {/*<TagInputDemo />*/}
        {/*<TransferDemoDocs/>*/}
        {/*<TabsDemoPaneChildren/>*/}

        {/*<AutoCompleteDemo/>*/}
        {/*<OptionDemo/>*/}
        {/*<DiyItemAutoComplete/>*/}
        {/*<RemoteAutoComplete/>*/}
        {/*<AutoCompleteSFC/>*/}
        {/*<ColorPickerDemo/>*/}

        {/*<HotKeysDemo2/>*/}
        {/*<HotKeysDocsDemo/>*/}
        {/*<SelectDocsDemo/>*/}
        {/*<SelectRenderOptionItem/>*/}
        {/*<SelectDemoToRawTest/>*/}
        {/*<SelectDemo/>*/}
        {/*<SelectTest/>*/}
        {/*<SelectDemo2/>*/}
        {/*<SelectDemo3/>*/}
        {/*<SelectDemo4/>*/}
        {/*<SelectDemo5/>*/}
        {/*<TagDemo/>*/}
        {/*<TagDocsDemo/>*/}
        {/*<AvatarDemo/>*/}
        {/*<AvatarGroupDemo/>*/}
        {/*<RadioDemo />*/}

        {/*<InputDemo />*/}
        {/*<TypeDemo />*/}
        {/*<TypoDemo3/>*/}
        {/**/}
        {/*<TypoDemo2/>*/}
        {/*<TypoDemoSFC/>*/}
        {/*<Numeral precision={1}>*/}
        {/*  <p>点赞量：1.6111e1 K</p>*/}
        {/*</Numeral>*/}
        {/*<NumeralDemo/>*/}

        {/*<TextDemo/>*/}
        {/*<LinkDemo/>*/}
        {/*<TypoCopyDemo/>*/}
        {/*<div style={{color:'#E91E63',width: 100, display:'flex', flexWrap:'wrap'}}>*/}
        {/*  <Button />*/}
        {/*<DemoButtonSFC/>*/}
        {/*</div>*/}
        {/*<SkeletonDemo/>*/}
        {/*<SkeletonDemoSFC/>*/}

        {/*<IconTest />*/}
        {/*<br/>*/}
        {/*<TooltipDemo />*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<DropdownDemo1/>*/}
        {/*<DropdownDemoSFC/>*/}
        {/*<br/>*/}
        {/*<GridTest />*/}
        {/*<LayoutTest/>*/}
        {/*<SpaceTest/>*/}
        {/*<PopoverTest />*/}
        {/*<NavigationDemo />*/}
        {/*<NavDemo2/>*/}

        {/*<ChatDemo/>*/}
        <div class={'aa'}>123</div>
      </ConfigProvider>
    </div>
  )
}, {
  props: VuePropsType,
  name: 'App'
})


export default App
