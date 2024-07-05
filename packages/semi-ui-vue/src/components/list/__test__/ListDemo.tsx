import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import List from "../index";
import ListItem from "../item";
import Descriptions from "../../descriptions";
import Rating from "../../rating";
import {Button, ButtonGroup} from "../../index";

interface ListDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ListDemo = defineComponent((props, {}) => {
  const slots = useSlots()
  const data = [
    '从明天起，做一个幸福的人',
    '喂马，劈柴，周游世界',
    '从明天起，关心粮食和蔬菜',
    '我有一所房子，面朝大海，春暖花开',
  ];

  const data1 = [
    {
      title: '审核管理平台',
      rating: 4.5,
      feedbacks: 124,
    },
    {
      title: '扁鹊',
      rating: 4,
      feedbacks: 108,
    },
    {
      title: '直播审核平台',
      rating: 3.5,
      feedbacks: 244,
    },
    {
      title: '抖音安全测试',
      feedbacks: 189,
    },
    {
      title: '内容平台',
      rating: 3,
      feedbacks: 128,
    },
    {
      title: '策略平台',
      rating: 4,
      feedbacks: 156,
    },
  ];

  const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    margin: '8px 2px',
  };


  const data2 = [
    '围城',
    '平凡的世界（全三册）',
    '三体（全集）',
    '雪中悍刀行（全集）',
    '撒哈拉的故事',
    '明朝那些事',
    '一禅小和尚',
    '沙丘',
    '被讨厌的勇气',
    '罪与罚',
    '月亮与六便士',
    '沉默的大多数',
    '第一人称单数',
  ];

  const list = ref(data2.slice(0, 10));
  const hoverIndex = ref(-1);
  const i = ref(-1);

  let changeIndex = (offset) => {
    let currentIndex = i.value;
    let index = currentIndex + offset;
    if (index < 0) {
      index = list.value.length - 1;
    }
    if (index >= list.value.length) {
      index = 0;
    }
    i.value = index;
    hoverIndex.value = index
  };

  onMounted(()=>{
    let keydownHandler = (event) => {
      let key = event.keyCode;
      switch (key) {
        case 38: // KeyCode.UP
          event.preventDefault();
          changeIndex(-1);
          break;
        case 40: // KeyCode.DOWN
          event.preventDefault();
          changeIndex(1);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  })


  return () => (
    <div>
      <div>
        <div style={{ marginRight: 16 }}>
          <h3 style={{ marginBottom: 16 }}>Default Size</h3>
          <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <ListItem>{item}</ListItem>}
          />
        </div>
        <div style={{ marginRight: 16 }}>
          <h3 style={{ margin: '16px 0' }}>Small Size</h3>
          <List
            size="small"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <ListItem>{item}</ListItem>}
          />
        </div>
        <div style={{ marginRight: 16 }}>
          <h3 style={{ margin: '16px 0' }}>Large Size</h3>
          <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <ListItem>{item}</ListItem>}
          />
        </div>
      </div>

      <div>
        <List
          grid={{
            gutter: 12,
            xs: 0,
            sm: 0,
            md: 12,
            lg: 8,
            xl: 8,
            xxl: 6,
          }}
          dataSource={data1}
          renderItem={item => (
            <ListItem style={style}>
              <div>
                <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</h3>
                <Descriptions
                  align="center"
                  size="small"
                  row
                  data={[
                    { key: '满意度', value: <Rating allowHalf size="small" value={item.rating} /> },
                    { key: '反馈数', value: item.feedbacks },
                  ]}
                />
                <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                  <ButtonGroup theme="borderless" style={{ marginTop: 8 }}>
                    <Button>编辑</Button>
                    <Button>更多</Button>
                  </ButtonGroup>
                </div>
              </div>
            </ListItem>
          )}
        />
      </div>


      <div>
        <div style={{ marginRight: 16, width: 280, display: 'flex', flexWrap: 'wrap', border: '1px solid var(--semi-color-border)' }}>
          <List
            className='component-list-demo-booklist'
            dataSource={list.value}
            split={false}
            size='small'
            style={{ flexBasis: '100%', flexShrink: 0, borderBottom: '1px solid var(--semi-color-border)' }}
            renderItem={(item, index) =>
              <ListItem className={index === hoverIndex.value ? 'component-list-demo-booklist-active-item' : ''}>{item}</ListItem>
            }
          />
        </div>
      </div>
    </div>
  )
},{
  name:'ListDemo'
})



export default ListDemo

