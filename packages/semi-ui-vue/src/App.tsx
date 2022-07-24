import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import AvatarDemo from './components/avatar/__test__/AvatarDemo'
import Button from "./components/button/Demo";
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
import AutoCompleteItemsDemo from "./components/autoCompleteItems/__test__/AutoCompleteItemsDemo";
import TagInputDemo from "./components/tagInput/__test__/TagInputDemo";
import CheckboxDemo from "./components/checkbox/__test__/CheckboxDemo";
import CascaderDemo from "./components/cascader/__test__/CascaderDemo";
import ScrollListDemo from "./components/scrollList/__test__/ScrollListDemo";
import TimePickerDemo from "./components/timePicker/__test__/TimePickerDemo";
import DatePickerDemo from "./components/datePicker/__test__/DatePickerDemo";
import ConfigProvider from "./components/configProvider";
// import {UseVirtualList} from "@vueuse/components";
import zh_CN from './components/locale/source/zh_CN';
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div>
      <ConfigProvider getPopupContainer={() => document.querySelector('.test')} locale={zh_CN}>
        {/*<DatePickerDemo />*/}
        {/*<TimePickerDemo />*/}
        {/*<ScrollListDemo />*/}
        {/*<CascaderDemo/>*/}
        {/*<CheckboxDemo />*/}
        {/*<TagInputDemo />*/}
        {/*<AutoCompleteItemsDemo/>*/}
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
        <PopoverTest />
        <div class={'aa'}>123</div>
      </ConfigProvider>
    </div>
  )
})


App.props = VuePropsType

export default App
