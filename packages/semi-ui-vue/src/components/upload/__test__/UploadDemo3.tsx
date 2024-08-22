
import Upload from '../index';
import { IconPlus } from '@kousum/semi-icons-vue';
import { defineComponent } from 'vue';

const Demo = defineComponent(() => {
  const action = 'https://api.semi.design/upload';
  const getPrompt = (pos, isListType) => {
    let basicStyle = { display: 'flex', alignItems: 'center', color: 'grey', height: isListType ? '100%' : '32px' };
    let marginStyle = {
      left: { marginRight: '10px' },
      right: { marginLeft: '10px' },
    };
    let style = { ...basicStyle, ...marginStyle[pos] };

    return <div style={style}>请上传认证材料</div>;
  };
  const defaultFileList = [
    {
      uid: '1',
      name: 'dy.jpeg',
      status: 'success',
      size: '130kb',
      url:
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png',
    },
    {
      uid: '5',
      name: 'resso.jpeg',
      percent: 50,
      size: '222kb',
      url:
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Resso.png',
    },
  ];
  const positions = ['right', 'bottom'];
  return ()=>(
    <>
      {positions.map((pos, index) => (
        <>
          {index ? (
            <div
              style={{ marginBottom: '12px', marginTop: '12px', borderBottom: '1px solid var(--semi-color-border)' }}
            ></div>
          ) : null}
          <Upload
            action={action}
            prompt={getPrompt(pos, true)}
            promptPosition={pos}
            listType="picture"
            defaultFileList={defaultFileList}
          >
            <IconPlus size="extra-large" />
          </Upload>
        </>
      ))}
    </>
  );
})
export default Demo;
