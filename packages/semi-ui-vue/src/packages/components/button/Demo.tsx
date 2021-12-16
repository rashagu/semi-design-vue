import {defineComponent, ref, h} from 'vue'
import Button from './Index';
import ButtonGroup from './ButtonGroup';
import IconButton from "../iconButton";

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
            <Button loading={true} icon={'delete'} size='large' theme={'solid'}>
              large
            </Button>
          </div>
          <div style={{padding:'1rem'}}>
            <Button block icon={'tick'} theme={'solid'}>
              circle
            </Button>
          </div>
          <div style={{padding:'1rem'}}>
            <ButtonGroup type={'danger'} theme={'solid'}>
              <Button icon={'edit'}>
                编辑
              </Button>
              <Button icon={'delete'}>
                删除
              </Button>
              <Button icon={'close'}>
                关闭
              </Button>
            </ButtonGroup>
          </div>

          <div style={{padding:'1rem'}}>
            <Button icon={'close'}>
              关闭
            </Button>
          </div>
        </div>
      );
};

export default Demo;
