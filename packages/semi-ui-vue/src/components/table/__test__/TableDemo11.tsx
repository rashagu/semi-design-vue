import { computed, defineComponent, h, ref, Teleport, VNode, watch } from 'vue';
import {TableMaker, TableComponents } from '../index';
import Avatar from '../../avatar';
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit-vue/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit-vue/sortable';
import * as dateFns from 'date-fns';
import SortableItem from './demo11/SortableItem';
import { isNull } from 'lodash';

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
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // activationConstraint: {
      //   // distance: 5,
      //   // delay: 100,
      //   // tolerance: 100
      // }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    console.log(event)
    const { active, over } = event;

    if (active && over && active.id !== over?.id) {
      const oldIndex = pageData.value.findIndex(item => item.id === active.id);
      const newIndex = pageData.value.findIndex(item => item.id === over.id);
      pageData.value = arrayMove(pageData.value, oldIndex, newIndex);
      const newData = Array.from(data.value);
      newData.splice((currentPage.value - 1) * PAGE_SIZE, PAGE_SIZE, ...pageData.value);
      data.value = newData;
    }
  }

  const dragIngIndex = ref();

  const dragOverlayRef = ref();
  const tableDragOverlayRef = ref();
  function onDragStart(event: DragEndEvent) {
    const { active, over } = event;
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

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const SortableData = computed(() => {
    return data.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE);
  });
  return () => {
    console.log(1);

    return (
      <div id="components-table-demo-drag-sorting">
        <DndContext
          sensors={sensors.value}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={onDragStart}
        >
          <SortableContext items={pageData.value} strategy={verticalListSortingStrategy}>
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
          </SortableContext>
          <Teleport to={document.body}>
            <DragOverlay adjustScale={false} dropAnimation={dropAnimationConfig}>
              <SortableItem index={dragIngIndex.value} style={{}} moveRow={() => {}} id={''} componentsTag={'div'}>
                <table
                  ref={tableDragOverlayRef}
                  role="grid"
                  aria-rowcount="5"
                  aria-colcount="4"
                  class="semi-table semi-table-demo11_DragOverlay"
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    boxShadow: '0 0 0 2px rgba(63, 63, 68, 0.05), 0 1px 2px 0 rgba(34, 33, 81, 0.15)'
                  }}
                >
                  <tbody class="semi-table-tbody" ref={dragOverlayRef} id={'asd_DragOverlay'}></tbody>
                </table>
              </SortableItem>
            </DragOverlay>
          </Teleport>
        </DndContext>
      </div>
    );
  };
});




export default TableDemo1;
