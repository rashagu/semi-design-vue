import {defineComponent, ref, h} from 'vue'
import Button from './Index';
import ButtonGroup from './ButtonGroup';
import IconButton from "../iconButton";
import {IconCamera, IconClose, IconDelete, IconEdit, IconTreeTriangleDown} from "../../../../../semi-icons-vue/src/packages/icons/icons";
import SplitButtonGroup from "./SplitButtonGroup";
import Dropdown from "../dropdown";



const Demo = () => {

    return (
        <div style={{width:'50%'}}>
          <div style={{padding:'1rem'}}>
            <Button
              type={'primary'}
              theme={'light'}
            >
              I am a Button
            </Button>
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
              <Dropdown menu={[
                { node: 'item', name: '编辑项目', onClick: () => console.log('编辑项目点击') },
                { node: 'item', name: '重置项目' },
                { node: 'divider' },
                { node: 'item', name: '复制项目' },
                { node: 'item', name: '从项目创建模版' },
                { node: 'divider' },
                { node: 'item', name: '删除项目', type: 'danger' },
              ]} trigger="click" position="bottomRight">
                <Button style={{background:'var(--semi-color-primary-hover)',padding:'8px 4px'}} theme="solid" type="primary" icon={<IconTreeTriangleDown />} />
              </Dropdown>
            </SplitButtonGroup>
          </div>
        </div>
      );
};

export default Demo;
