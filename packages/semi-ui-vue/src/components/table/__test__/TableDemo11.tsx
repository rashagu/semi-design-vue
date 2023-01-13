import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  computed,
  onMounted,
  FunctionalComponent,
  Teleport,
  nextTick, watch, VNode
} from 'vue';
import Table_, {ColumnProps, RowSelection, TableColumn, TableComponents} from '../index';
import Avatar from '../../avatar';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, DragEndEvent, DragOverlay, defaultDropAnimationSideEffects, DropAnimation,
} from '@dnd-kit-vue/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit-vue/sortable';


import type {
  DragSource,
  DropTarget,
} from 'dnd-core'

import HTML5Backend from 'react-dnd-html5-backend';
import * as dateFns from 'date-fns';
import Tag from "../../tag";
import SortableItem from "./demo11/SortableItem";
import {isNull} from "lodash";

interface TableDemo1Props {
  name?: string;
}


let draggingIndex = -1;
const PAGE_SIZE = 5;
const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';


const rowSource = {
  beginDrag(props) {
    draggingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};


const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{marginRight: '12px'}}></Avatar>
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
          <Avatar size="small" color={record.avatarBg} style={{marginRight: '4px'}}>
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
    id: i,
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
const Table = Table_();
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // distance: 5,
        delay: 100,
        tolerance: 100
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    // console.log(event)
    const {active, over} = event;

    if (active && over && active.id !== over?.id) {
      const oldIndex = data.value.indexOf(+active.id);
      const newIndex = data.value.indexOf(+over!.id);
      data.value = arrayMove(data.value, oldIndex, newIndex)
    }
  }

  const dragIngIndex = ref()

  const dragOverlayRef = ref()
  function onDragStart(event: DragEndEvent) {
    const {active, over} = event;
    dragIngIndex.value = active.id

  }

  watch([dragOverlayRef, dragIngIndex], ([dragOverlayRefValue, dragIngIndexValue])=>{
    if (dragOverlayRefValue && !isNull(dragIngIndexValue)){
      const dom = document.getElementById('asd_' + dragIngIndexValue)
      dom.setAttribute('style', '')
      dragOverlayRefValue.append(dom.cloneNode(true))
    }
  })


  const data = ref([...initData]);
  const currentPage = ref(1);
  const pageData = ref(data.value.slice(0, PAGE_SIZE));

  const DraggableBodyRow = SortableItem as unknown;
  const components = computed<TableComponents>(
    () => ({
      body: {
        row: DraggableBodyRow as VNode,
      },
    })
  );

  const moveRow = (dragIndex, hoverIndex) => {
    console.log(dragIndex)
    const totalDragIndex = (currentPage.value - 1) * PAGE_SIZE + dragIndex;
    const totalHoverIndex = (currentPage.value - 1) * PAGE_SIZE + hoverIndex;
    const dragRow = data[totalDragIndex];
    const newData = [...data.value];
    newData.splice(totalDragIndex, 1);
    newData.splice(totalHoverIndex, 0, dragRow);
    data.value = newData
    pageData.value = newData.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE)
  };

  const handlePageChange = pageNum => {
    console.log(pageNum);
    currentPage.value = pageNum
    pageData.value = data.value.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE)
  };

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return () => {

    return (
      <div id="components-table-demo-drag-sorting">
        <DndContext
          sensors={sensors.value}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={onDragStart}
        >
          <SortableContext
            items={data.value.slice((currentPage.value - 1) * 5, ((currentPage.value - 1) * 5) + 5)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              columns={columns}
              dataSource={pageData.value}
              pagination={{
                pageSize: PAGE_SIZE,
                total: data.value.length,
                currentPage: currentPage.value,
                onPageChange: handlePageChange,
              }}
              components={components.value}
              onRow={(record, index) => ({
                index,
                moveRow,

              })}
            />
          </SortableContext>
          <Teleport to={document.body}>
            <DragOverlay
              adjustScale={false}
              dropAnimation={dropAnimationConfig}
            >
              <SortableItem index={dragIngIndex.value} style={{}} moveRow={() => {
              }} id={''}>
                <table role="grid" aria-rowcount="5" aria-colcount="4" class="semi-table" style={{backgroundColor: '#fff'}}>
                  <colgroup class="semi-table-colgroup">
                    <col class="semi-table-col" style="width: 400px; min-width: 400px;"/>
                    <col class="semi-table-col" style="width: 200px; min-width: 200px;"/>
                    <col class="semi-table-col" style="width: 200px; min-width: 200px;"/>
                    <col class="semi-table-col"/>
                  </colgroup>
                  <tbody class="semi-table-tbody" ref={dragOverlayRef} id={'asd_DragOverlay'}>
                  </tbody>
                </table>
              </SortableItem>
            </DragOverlay>
          </Teleport>
        </DndContext>
      </div>
    );
  };
});

TableDemo1.props = vuePropsType;
TableDemo1.name = 'TableDemo1';

export default TableDemo1;



