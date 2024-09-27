import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { TableMaker } from '../index';
import Avatar from '../../avatar';
import * as dateFns from 'date-fns';
import SortableItem from './demo11/SortableItem';
import { isNull } from 'lodash';
import { DragDropProvider, Events } from '@kousum/dnd-kit-vue';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { move } from '@dnd-kit/helpers';

interface TableDemo1Props {
  name?: string;
}

let draggingIndex = -1;
const PAGE_SIZE = 5;
const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi Pro 设计稿',
        value: 'Semi Pro 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: 200,
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    width: 200,
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: '4px' }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const initData = [];
for (let i = 0; i < 46; i++) {
  const isSemiDesign = i % 2 === 0;
  const randomNumber = (i * 1000) % 199;
  initData.push({
    id: ''+i,
    key: '' + i,
    name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
    owner: isSemiDesign ? '姜鹏志' : '郝宣',
    size: randomNumber,
    updateTime: new Date().valueOf() + randomNumber * DAY,
    avatarBg: isSemiDesign ? 'grey' : 'red',
  });
}

export const vuePropsType = {
  name: String,
};
const Table = TableMaker();
const TableDemo1 = defineComponent((props, {}) => {


  let newPageData = []
  let newData = []
  function handleDragEnd(event: Parameters<Events['dragend']>[0]) {

    const { active, over } = {active: event.operation.source, over: event.operation.target};
    if (active && over && active.id !== over?.id) {
      newPageData = move(Array.from(pageData.value), event);
      newData = Array.from(data.value);
      newData.splice((currentPage.value - 1) * PAGE_SIZE, PAGE_SIZE, ...newPageData);
    }
  }

  const dragIngIndex = ref();

  const dragOverlayRef = ref();
  const tableDragOverlayRef = ref();
  function onDragStart(event: Parameters<Events['dragstart']>[0]) {
    const { active, over } = {active: event.operation.source, over: event.operation.target};

    console.log(active);
    dragIngIndex.value = +active.id;
  }

  watch(
    [tableDragOverlayRef, dragOverlayRef, dragIngIndex],
    ([tableDragOverlayRefValue, dragOverlayRefValue, dragIngIndexValue]) => {
      if (tableDragOverlayRefValue && dragOverlayRefValue && !isNull(dragIngIndexValue)) {
        const colgroupDom = document.getElementById('table_asd').getElementsByClassName('semi-table-colgroup')[0];
        const dom = document.getElementById('asd_' + dragIngIndexValue);
        dom.setAttribute('style', 'background-color: #ffffff');
        tableDragOverlayRefValue.insertBefore(colgroupDom.cloneNode(true), dragOverlayRefValue);
        dragOverlayRefValue.append(dom.cloneNode(true));
      }
    }
  );

  const data = ref([...initData]);
  const currentPage = ref(1);
  const pageData = ref(data.value.slice(0, PAGE_SIZE));

  const DraggableBodyRow = SortableItem as unknown;
  const components = {
    body: {
      row: DraggableBodyRow as any,
    },
  };

  const moveRow = (dragIndex, hoverIndex) => {
    console.log(dragIndex);
    const totalDragIndex = (currentPage.value - 1) * PAGE_SIZE + dragIndex;
    const totalHoverIndex = (currentPage.value - 1) * PAGE_SIZE + hoverIndex;
    const dragRow = data[totalDragIndex];
    const newData = [...data.value];
    newData.splice(totalDragIndex, 1);
    newData.splice(totalHoverIndex, 0, dragRow);
    data.value = newData;
    pageData.value = newData.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE);
  };

  const handlePageChange = pageNum => {
    currentPage.value = pageNum;
    pageData.value = data.value.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
  };



  const SortableData = computed(() => {
    return data.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE);
  });
  return () => {
    console.log(1);

    return (
      <div id="components-table-demo-drag-sorting">
        <DragDropProvider
          modifiers={[RestrictToVerticalAxis]}
          onDragStart={(event)=>{

          }}
          onDragOver={(event)=>{
            console.log('over')
            // props.onSortOver(event)
            handleDragEnd(event)
          }}
          onDragEnd={(event)=>{
            console.log('end')
            // props.onSortOver(event)
            pageData.value = Array.from(newPageData)
            data.value = Array.from(newData);
          }}
        >
          <Table
            id={'table_asd'}
            columns={columns}
            dataSource={pageData.value}
            pagination={{
              pageSize: PAGE_SIZE,
              total: data.value.length,
              currentPage: currentPage.value,
              onPageChange: handlePageChange,
            }}
            components={components}
            onRow={(record, index) => ({
              index,
              moveRow,
              id: record.id,
            })}
          />
        </DragDropProvider>
      </div>
    );
  };
});




export default TableDemo1;
