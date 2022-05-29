import {CSSProperties, defineComponent, h, nextTick, onMounted, ref, watch, withMemo} from 'vue'
import styles from "./AreaSelect.module.scss";
import {
  getPcCode,
  PcCodeObjectData,
  PcCodeObjectDataChildren
} from "./request/zy";
import {pinyin} from "pinyin-pro";
import {debounce, groupBy} from 'lodash'
import Button from "../button";
import Input from "../input";
import Popover from "../popover";
import {Radio, Group as RadioGroup} from "../radio";

interface ExampleProps {
  name?: string,
  defaultValue: any,
  style?: CSSProperties,
  placeholder?: string,
  onChange:(v:any)=>void,
  disabled?:boolean
}

export const vuePropsType = {
  name: String,
  defaultValue: [Number, String],
  style: [Object, String],
  placeholder: {
    type: String,
    default: '请选择地区'
  },
  onChange: Function,
  disabled: Boolean
}
const abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const AreaSelect = defineComponent<ExampleProps>((props, {slots}) => {
  /***
   * 苏: 默认选中的地区码
   */
  let defaultValue = props.defaultValue


  const searchInputValue = ref(undefined)


  /***
   * su: 按省份 选中的字母
   */
  const provincesKey = ref('')
  /***
   * su: 按城市 选中的字母
   */
  const cityKey = ref('')


  const pinyinArrProvinces = ref<string[]>([])
  const pinyinArrCity = ref<string[]>([])
  // 省
  const provinces = ref<any>({})
  // 市/区
  const cities = ref<any>({})

  // 按省份
  let o_data:any = []
  function getData(key?: string) {
    getPcCode().then(d => {
      o_data = d
      getDataFunc(d,key)
    }).then(()=>{
      getDataCity()
    })
  }

  /***
   *
   * @param d 苏: 接口返回的地区数据
   * @param key 苏: 搜索字符串
   */
  function getDataFunc(d: PcCodeObjectData[], key?: string){
    let pKey = '';
    let arr = d.map(item => {
      let children = item.children.length > 0 ? item.children : [{code: item.code, name: item.name}];
      if (key) {
        children = children.filter((item) => {
          return item.name.indexOf(key) > -1
        })
      }
      children = children.map(itemChildren=>{
        const obj = {
          code: itemChildren.code,
          name: itemChildren.name,
          provinceCode: item.code,
          provinceName: item.name,
        }
        if (defaultValue && +itemChildren.code === +defaultValue){
          citySelected.value = obj
          pKey = pinyin(item.name[0], {pattern: 'first', toneType: 'none'}).toUpperCase()
          defaultValue = ''
        }
        return obj
      })
      return {
        code: item.code,
        name: item.name,
        pinyin: pinyin(item.name[0], {pattern: 'first', toneType: 'none'}).toUpperCase(),
        children: children
      }
    })
    arr = arr.filter((item) => {
      return item.children.length > 0
    })
    let per_ = groupBy<PcCodeObjectDataChildren[]>(arr, 'pinyin')
    let pinyinArr0: string[] = Object.keys(per_)
    pinyinArr0.sort()
    pinyinArrProvinces.value = pinyinArr0;
    console.log(pKey)
    if (!provincesKey.value && pKey && !key){
      provincesKey.value = pinyin(pKey, {pattern: 'first', toneType: 'none'}).toUpperCase()
    }

    if (!provincesKey.value && !pKey && !key){
      provincesKey.value = pinyinArr0[0]
    }

    if (key){
      provincesKey.value = pinyinArr0[0]
    }

    provinces.value = per_
  }

  // 按地区
  let o_data_city:any = []
  function getDataCity(key?: string) {
    getDataCityFunc(o_data, key)
  }

  /***
   *
   * @param d 苏: 接口返回的地区数据
   * @param key 苏: 搜索字符串
   */
  function getDataCityFunc(d: PcCodeObjectData[], key?: string){
    let newArr:any = []
    d.forEach(item=>{
      item.children.forEach(itemChildren=>{
        const obj = {
          code: itemChildren.code,
          name: itemChildren.name,
          pinyin: pinyin(itemChildren.name[0], {pattern: 'first', toneType: 'none'}).toUpperCase(),
          provinceCode: item.code,
          provinceName: item.name,
        }
        if (defaultValue && +itemChildren.code === +defaultValue){
          citySelected.value = obj
          defaultValue = ''
        }
        if (key && itemChildren.name.indexOf(key) > -1){
          newArr.push(obj)
        }else if (!key){
          newArr.push(obj)
        }
      })
    })
    let per_ = groupBy<PcCodeObjectDataChildren[]>(newArr, 'pinyin')
    let pinyinArr0: string[] = Object.keys(per_)
    pinyinArr0.sort()
    console.debug(pinyinArr0)
    pinyinArrCity.value = pinyinArr0;
    if (!cityKey.value && citySelected.value.name && !key){
      cityKey.value = pinyin(citySelected.value.name[0], {pattern: 'first', toneType: 'none'}).toUpperCase()
    }

    if (!cityKey.value && !citySelected.value.name && !key){
      cityKey.value = pinyinArr0[0]
    }

    if (key){
      cityKey.value = pinyinArr0[0]
    }
    cities.value = per_
  }



  const RadioGroupValue = ref('a')
  const provincesSelected = ref('')
  const citySelected = ref<PcCodeObjectDataChildren>({code: "", name: ""})

  onMounted(() => {
    getData();
  })

  const searchInputChange = debounce(searchInputChangeFunc, 300)

  function searchInputChangeFunc(value: any) {
    if (o_data && o_data_city){
      if (value){
        getDataFunc(o_data,value);
        getDataCityFunc(o_data_city,value);
      }else{
        getData();
      }
    }
  }

  watch(citySelected, (n)=>{
    console.log(n)
    props.onChange(n.code)
  })
  return () => (
    <Popover autoAdjustOverflow={true} trigger={'click'} position={"bottomLeft"} className={styles.areaPopover}
             content={<div style={{width:'28rem'}} class={''}>
               <div class={'flex justify-between items-center pb-3'}>
                 <div>
                   <RadioGroup type={'button'} onChange={(v) => {
                     console.log(v.target.value)
                     RadioGroupValue.value = v.target.value
                   }} value={RadioGroupValue.value} buttonSize={'small'}>
                     <Radio value="a" key={'a'}>按省份</Radio>
                     <Radio value="b" key={'b'}>按城市</Radio>
                   </RadioGroup>
                 </div>
                 <div style={{paddingLeft: '.4rem', textAlign:'left'}}>
                   <Input v-model={[searchInputValue.value, 'value']}
                          onInput={(v: any) => {
                            console.debug(v.target.value)
                            searchInputChange(v.target.value)}
                          } size="small" placeholder={'搜索'}/>
                 </div>
               </div>
               <div class={'flex flex-wrap  pb-2'} style={{height: '6rem'}}>
                 {abc.map((item, index) => {
                   return <div key={index} style={{padding: '.1rem'}}>
                     {RadioGroupValue.value === 'a' ?
                       <Button disabled={pinyinArrProvinces.value.indexOf(item) < 0} size={'small'}
                               onClick={() => provincesKey.value = item}
                               type={provincesKey.value === item ? 'primary' : undefined}><div style={{width:'16px'}}>{item}</div></Button> :
                       <Button disabled={pinyinArrCity.value.indexOf(item) < 0} size={'small'}
                               onClick={() => cityKey.value = item}
                               type={cityKey.value === item ? 'primary' : undefined}><div style={{width:'16px'}}>{item}</div></Button>}

                   </div>
                 })}
               </div>
               <div style={{height: '20rem', overflow: 'auto'}}>
                 {RadioGroupValue.value === 'a' ? provinces.value[provincesKey.value]?.map((item: PcCodeObjectData, index: number) => {
                   return <div key={index} class={'flex pb-2'}>
                     <div style={{
                       width: '5rem',
                       fontWeight: citySelected.value.provinceCode === item.code ? 'bolder' : 'bold',
                     }}>{item.name}</div>
                     <div class={'flex flex-wrap flex-1'}>
                       {item.children.map((item2, index2) => {
                         return (withMemo([citySelected.value.code === item2.code], () => (
                             <div key={index2} class={styles.cityItems + ' px-2'}
                                  onClick={() => citySelected.value = item2}
                                  style={{color: citySelected.value.code === item2.code ? "#1890FF" : ""}}
                             >
                               {item2.name}
                             </div>), [], 0)
                         )
                       })}
                     </div>
                   </div>
                 }) : <div class={'flex pb-2  flex-wrap'}>
                   {cities.value[cityKey.value]?.map((item: PcCodeObjectData, index: number) => {
                     return <div key={index} class={'flex pb-2'}>
                       <div class={styles.cityItems + ' px-2'}
                            onClick={() => citySelected.value = item}
                            style={{color: citySelected.value.code === item.code ? "#1890FF" : ""}}
                       >
                         {item.name}
                       </div>
                     </div>
                   })}</div>}
               </div>
             </div>}>
      <div class={styles.areaInput} style={props.style}>
        {citySelected.value.name ? (citySelected.value.provinceName + '/' + citySelected.value.name) : '' ||
            <span style={{color: 'var(--semi-color-text-2)'}} class={'semi-select-selection-placeholder'}>{props.placeholder}</span>}
      </div>
    </Popover>
  )
})

AreaSelect.props = vuePropsType

export default AreaSelect

