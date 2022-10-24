import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import AvatarDemo from './components/avatar/__test__/AvatarDemo'
import Button from "./components/button/__test__/Demo";
import './docDemo.scss'
import IconTest from "./components/__test__/IconTest";
import TootipDemo from "./components/tooltip/__test__/TootipDemo";
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
import TreeDemo from "./components/tree/__test__/TreeDemo";
import TreeCheckDemo from "./components/tree/__test__/TreeCheckDemo";
import TreeSelectDemo from "./components/treeSelect/__test__/TreeSelectDemo";
import FormDemo from "./components/form/__test__/FormDemo";
import SkeletonDemo from "./components/skeleton/__test__/SkeletonDemo";
import ImageDemo from "./components/image/__test__/ImageDemo";
import WithFormApiDemo from "./components/form/__test__/WithFormApiDemo";
import WithFormStateDemo from "./components/form/__test__/WithFormStateDemo";
import WithFieldDemo from "./components/form/__test__/WithFieldDemo";
import WithFieldDemo2 from "./components/form/__test__/WithFieldDemo2";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      <ConfigProvider locale={zh_CN}>
        {/*<ImageDemo/>*/}
        {/*<SkeletonDemo/>*/}
        {/*<FormDemo />*/}
        {/*<WithFormApiDemo />*/}
        {/*<WithFormStateDemo/>*/}
        <WithFieldDemo/>
        <WithFieldDemo2/>
        {/*<TreeSelectDemo/>*/}
        {/*<TreeCheckDemo />*/}
        {/*<TreeDemo />*/}
        {/*<RatingDemo />*/}
        {/*<DividerDemo/>*/}
        {/*<SliderDemo />*/}
        {/*<InputNumberDemo />*/}
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
        {/*<TootipDemo />*/}
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
})


App.props = VuePropsType

export default App
