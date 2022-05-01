import {defineComponent, ref, h} from 'vue'
import Button from './index';
import ButtonGroup from './ButtonGroup';
import IconButton from "../iconButton";
import {IconCamera, IconClose, IconDelete, IconEdit, IconTreeTriangleDown} from "@kousum/semi-icons-vue";
import SplitButtonGroup from "./SplitButtonGroup";
import Dropdown, {DropDownMenuItem} from "../dropdown";



const Demo = defineComponent(() => {
  const menu:DropDownMenuItem[] = [
    { node: 'item', name: '编辑项目', onClick: () => console.log('编辑项目点击') },
    { node: 'item', name: '重置项目' },
    { node: 'divider' },
    { node: 'item', name: '复制项目' },
    { node: 'item', name: '从项目创建模版' },
    { node: 'divider' },
    { node: 'item', name: '删除项目', type: 'danger' },
  ]
  const disabled= ref(false)
  return () => {
    return (
      <div style={{width:'50%'}}>
        <Button
          disabled={disabled.value}
        >
          disabled
        </Button>
        <div
          onClick={()=>disabled.value=true}>123</div>
        <Button
          onClick={()=>disabled.value=false}
          type={'primary'}
          theme={'light'}
        >
          I am a Button
        </Button>
        <div style={{padding:'1rem'}}>
          <Button loading={true} icon={<IconCamera />} size='large' theme={'solid'}>
            large
          </Button>
        </div>
        <div style={{padding:'1rem'}}>
          <Button block icon={<IconCamera />} theme={'solid'}>
            circle
          </Button>
        </div>
        <div style={{padding:'1rem'}}>
          <ButtonGroup type={'danger'} theme={'solid'}>
            <Button icon={<IconEdit />}>
              编辑
            </Button>
            <Button icon={<IconDelete/>}>
              删除
            </Button>
            <Button icon={<IconClose/>}>
              关闭
            </Button>
          </ButtonGroup>
        </div>

        <div style={{padding:'1rem'}}>
          <SplitButtonGroup style={{marginRight:10}}>
            <Button theme="solid" type="primary">分裂按钮</Button>
            <Dropdown menu={menu} trigger="click" position="bottomRight">
              <Button style={{padding:'8px 4px'}} theme="solid" type="primary" icon={<IconTreeTriangleDown />} />
            </Dropdown>
          </SplitButtonGroup>
        </div>
      </div>
    );
  };
})

export default Demo;
