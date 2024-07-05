import {defineComponent, ref, h, Fragment, FunctionalComponent, onMounted} from 'vue'
import {IconUser, IconStar, IconSetting} from '@kousum/semi-icons-vue'
import Nav from '../index'


interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Test = defineComponent((props, {slots}) => {

  const openKeys = ref([])
  const isCollapsed = ref(false)
  const items = ref([])
  onMounted(()=>{
    items.value = [
      {itemKey: 'user', text: '用户管理', icon: <IconUser/>},
      {itemKey: 'union', text: '公会中心', icon: <IconStar/>},
      {
        text: '任务平台',
        icon: <IconSetting/>,
        itemKey: 'job',
        items: ['任务管理', '用户任务查询'],
      },
    ]
  })

  const a = ref(0)

  // onMounted(()=>{
  //   setInterval(()=>{
  //     a.value ++
  //     console.log(a.value)
  //   }, 1000)
  // })
  return ()=>(
    <div
      id="container"
      style={{
        height: '400px',
        position: "relative"
      }}
    >
      <div>
        <button onClick={()=>openKeys.value = ['job']}>
          {JSON.stringify(openKeys.value)}
        </button>
        <button onClick={()=>{
          openKeys.value = []
        }}>
          rm
        </button>
        <button onClick={()=>isCollapsed.value = !isCollapsed.value}>
          isCollapsed {JSON.stringify(isCollapsed.value)}
        </button>
      </div>
      <Nav
        limitIndent={false}
        footer={{
          collapseButton: true,
        }}
        isCollapsed={isCollapsed.value}
        bodyStyle={{height: 320}}
        items={items.value}
        onOpenChange={data => {
          // console.log(data)
          openKeys.value = data.openKeys
        }}
        onCollapseChange={(val)=>{
          // console.log(val)
          isCollapsed.value = val
        }}
        openKeys={openKeys.value}
        onSelect={data => console.log('trigger onSelect: ', data)}
        onClick={data => console.log('trigger onClick: ', data)}
      ></Nav>
    </div>
  );
})




export default Test

