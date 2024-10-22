import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import { Resizable, ResizeGroup, ResizeHandler, ResizeItem } from '../index';
import Toast from '../../toast';
import { IconTransfer } from '@kousum/semi-icons-lab-vue';

interface ResizableDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<ResizableDemoProps> = {
  name: String,
};
const ResizableDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'ResizableDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    const text = ref('Drag edge to resize');

    return () => {
      const opts_1 = {
        content: 'resize start',
        duration: 1,
        stack: true,
      };
      const opts_2 = {
        content: 'resize end',
        duration: 1,
        stack: true,
      };
      return (
        <div style={{ width: '500px' }}>
          <Resizable
            style={{ backgroundColor: 'rgba(var(--semi-grey-1), 1)' }}
            defaultSize={{
              width: '60%',
              height: 300,
            }}
            onChange={() => {
              text.value = 'resizing';
            }}
            onResizeStart={() => Toast.info(opts_1)}
            onResizeEnd={() => {
              Toast.info(opts_2);
              text.value = 'Drag edge to resize';
            }}
            lockAspectRatio
            handleNode={{
              right: <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
              }}><IconTransfer /></div>
            }}
          >
            <div style={{ marginLeft: '20%' }}>{text.value}</div>
          </Resizable>


          <div style={{ width: '1000px', height: '100px' }}>
            <ResizeGroup direction='horizontal'>
              <ResizeItem
                style={{ backgroundColor: 'rgba(var(--semi-grey-1), 1)', border: 'var(--semi-color-border) 1px solid' }}
                defaultSize={'400px'}
                min={'10%'}
                onChange={() => {
                  text.value = ('resizing')
                }}
                onResizeEnd={() => {
                  text.value = ('Drag to resize')
                }}
              >
                <div style={{ marginLeft: '20%' }}>
                  {text.value + " min:10%"}
                </div>
              </ResizeItem>
              <ResizeHandler></ResizeHandler>
              <ResizeItem
                style={{ backgroundColor: 'rgba(var(--semi-grey-1), 1)', border: 'var(--semi-color-border) 1px solid' }}
                defaultSize={'20%'}
                min={'10%'}
                max={'30%'}
                onChange={() => {
                  text.value = ('resizing')
                }}
                onResizeEnd={() => {
                  text.value = ('Drag to resize')
                }}
              >
                <div style={{ marginLeft: '20%' }}>
                  {text.value + " min:10% max:30%"}
                </div>
              </ResizeItem>
              <ResizeHandler></ResizeHandler>
              <ResizeItem
                style={{ backgroundColor: 'rgba(var(--semi-grey-1), 1)', border: 'var(--semi-color-border) 1px solid' }}
                defaultSize={'0.5'}
                onChange={() => {
                  text.value = ('resizing')
                }}
                onResizeEnd={() => {
                  text.value = ('Drag to resize')
                }}
              >
                <div style={{ marginLeft: '20%' }}>
                  {text.value}
                </div>
              </ResizeItem>
              <ResizeHandler></ResizeHandler>
              <ResizeItem
                style={{ backgroundColor: 'rgba(var(--semi-grey-1), 1)', border: 'var(--semi-color-border) 1px solid' }}
                defaultSize={1}
                onChange={() => {
                  text.value = ('resizing')
                }}
                onResizeEnd={() => {
                  text.value = ('Drag to resize')
                }}
              >
                <div style={{ marginLeft: '20%' }}>
                  {text.value}
                </div>
              </ResizeItem>
            </ResizeGroup>
          </div>


          <div style={{ width: '1000px', height: '600px' }}>
            <ResizeGroup direction='vertical'>
              <ResizeItem
                defaultSize={"80%"}
              >
                <ResizeGroup direction='horizontal'>
                  <ResizeItem
                    style={{
                      backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                      border: 'var(--semi-color-border) 1px solid'
                    }}
                    defaultSize={"25%"}
                    min={'10%'}
                    max={'30%'}
                  >
                    <div style={{ marginLeft: '20%' }}>
                      {text.value + ' min:10% max:30%'}
                    </div>
                  </ResizeItem>
                  <ResizeHandler></ResizeHandler>
                  <ResizeItem
                    style={{ border: 'var(--semi-color-border) 1px solid' }}
                    defaultSize={"50%"}
                  >
                    <div style={{ height: '100%' }}>
                      <ResizeGroup direction='vertical'>
                        <ResizeItem
                          style={{
                            backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                            border: 'var(--semi-color-border) 1px solid'
                          }}
                          defaultSize={'33%'}
                          min={'10%'}
                          onChange={() => {
                            text.value = ('resizing')
                          }}
                          onResizeEnd={() => {
                            text.value = ('Drag to resize')
                          }}
                        >
                          <div style={{ marginLeft: '20%' }}>
                            {text.value + " min:10%"}
                          </div>
                        </ResizeItem>
                        <ResizeHandler></ResizeHandler>
                        <ResizeItem
                          style={{
                            backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                            border: 'var(--semi-color-border) 1px solid'
                          }}
                          defaultSize={'33%'}
                          min={'10%'}
                          max={'40%'}
                        >
                          <div style={{ marginLeft: '20%' }}>
                            {text.value + " min:10% max:40%"}
                          </div>
                        </ResizeItem>
                        <ResizeHandler></ResizeHandler>
                        <ResizeItem
                          style={{
                            backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                            border: 'var(--semi-color-border) 1px solid'
                          }}
                        >
                          <div style={{ marginLeft: '20%' }}>
                            {text.value}
                          </div>
                        </ResizeItem>
                      </ResizeGroup>
                    </div>
                  </ResizeItem>
                  <ResizeHandler></ResizeHandler>
                  <ResizeItem
                    style={{
                      backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                      border: 'var(--semi-color-border) 1px solid'
                    }}
                    defaultSize={"1"}
                    max={'30%'}
                  >
                    <div style={{ marginLeft: '20%' }}>
                      {text.value + ' max:30%'}
                    </div>
                  </ResizeItem>

                </ResizeGroup>
              </ResizeItem>
              <ResizeHandler></ResizeHandler>
              <ResizeItem
                defaultSize={"20%"}
                onChange={() => {
                  text.value = ('resizing')
                }}
              >
                <ResizeGroup direction='horizontal'>
                  <ResizeItem
                    style={{
                      backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                      border: 'var(--semi-color-border) 1px solid'
                    }}
                    defaultSize={"50%"}
                  >
                    <div style={{ marginLeft: '20%' }}>
                      {'tab'}
                    </div>
                  </ResizeItem>
                  <ResizeHandler></ResizeHandler>
                  <ResizeItem
                    style={{
                      backgroundColor: 'rgba(var(--semi-grey-1), 1)',
                      border: 'var(--semi-color-border) 1px solid'
                    }}
                    defaultSize={"50%"}
                  >
                    <div style={{ marginLeft: '20%' }}>
                      {'content'}
                    </div>
                  </ResizeItem>
                </ResizeGroup>
              </ResizeItem>
            </ResizeGroup>
          </div>
        </div>
      );
    };
  },
});

export default ResizableDemo;
