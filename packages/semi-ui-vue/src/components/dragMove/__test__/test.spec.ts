import { beforeAll, expect, test, vi } from 'vitest';
import Demo from './DragMoveDemo';
import { fireEvent, render, screen } from '@testing-library/vue';


test('DragMoveDemo qwe', async () => {
  const {getByText} = render(Demo);
  const draggableElement = getByText('Drag me');

  // 创建一个模拟的 dataTransfer 对象
  const dataTransfer = {
    setData: vi.fn((v,c)=>'拖拽数据'),
    getData: vi.fn(() => '拖拽数据'),
  };

  // 模拟 dragstart 事件
  await fireEvent.dragStart(draggableElement, { dataTransfer });


  // 模拟 drop 事件
  await fireEvent.drop(draggableElement, { dataTransfer });


});

