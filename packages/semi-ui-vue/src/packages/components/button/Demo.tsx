import {defineComponent, ref, h} from 'vue'
import Button from './Index';
import ButtonGroup from './ButtonGroup';
import IconButton from "../iconButton";
import {IconCamera, IconClose, IconDelete, IconEdit} from "@kousum/semi-icons-vue";
import SplitButtonGroup from "./SplitButtonGroup";

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
              {/*<Dropdown onVisibleChange={(v)=>handleVisibleChange(1,v)} menu={menu} trigger="click" position="bottomRight">*/}
              {/*  <Button style={btnVisible[1]?{background:'var(--semi-color-primary-hover)',padding:'8px 4px'}:{padding:'8px 4px'}} theme="solid" type="primary" icon={<IconTreeTriangleDown />}></Button>*/}
              {/*</Dropdown>*/}
            </SplitButtonGroup>
          </div>
        </div>
      );
};

export default Demo;
