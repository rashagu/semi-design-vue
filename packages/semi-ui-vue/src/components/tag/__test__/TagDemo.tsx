import {defineComponent, ref, h, Fragment, VNode} from 'vue'
import Space from '../../space/Index'
import Tag, {TagProps} from '../Index'
import TagGroup from '../Group'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TagDemo = defineComponent<ExampleProps>((props, {slots}) => {

  const tagList:(TagProps | VNode)[] = [
    { color: 'white', children:'抖音'},
    { color: 'white', children:'火山小视频'},
    { color: 'white', children:'剪映'},
    { color: 'white', children:'皮皮虾'},
  ];
  const src = 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg';
  const tagList2:(TagProps | VNode)[] = [
    { color: 'white', children:'Douyin', avatarSrc:src},
    { color: 'white', children:'Hotsoon', avatarSrc:src},
    { color: 'white', children:'Capcut', avatarSrc:src},
    { color: 'white', children:'Pipixia', avatarSrc:src},
  ];
  const divStyle = {
    backgroundColor: 'var(--semi-color-fill-0)',
    height: '35px',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 30,
  };
  const tagGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    width: 350,
  };
  return () => (
    <div>
      <div>
        <Space>
          <Tag> default tag </Tag>
          <Tag closable> Closable Tag </Tag>
          <Tag closable onClose={(value, e) => e.preventDefault()}>
            Closable Tag, Prevent Default
          </Tag>
        </Space>
      </div>
      <Space>
        <Tag size='small'> small tag </Tag>
        <Tag size='large'> large tag </Tag>
      </Space>
      <div>
        <Space wrap>
          <Tag color='grey'> grey tag </Tag>
          <Tag color='blue'> blue tag </Tag>
          <Tag color='red'> red tag </Tag>
          <Tag color='green'> green tag </Tag>
          <Tag color='orange'> orange tag </Tag>
          <Tag color='teal'> teal tag </Tag>
          <Tag color='violet'> violet tag </Tag>
          <Tag color='white'> white tag </Tag>
        </Space>
      </div>
      <div>
        <Space>
          <Tag color='blue' type='light'> light tag </Tag>
          <Tag color='blue' type='ghost'> ghost tag </Tag>
          <Tag color='blue' type='solid'> solid tag </Tag>
        </Space>
      </div>
      <div>
        <Space vertical align='start'>
          <Tag avatarSrc={src}>焦锐志</Tag>
          <Tag avatarSrc={src} size='large'>焦锐志</Tag>
          <Tag avatarSrc={src} size='large' closable={true}>焦锐志</Tag>
          <Tag avatarSrc={src} avatarShape='circle'>焦锐志</Tag>
          <Tag avatarSrc={src} avatarShape='circle' size='large'>焦锐志</Tag>
          <Tag avatarSrc={src} avatarShape='circle' size='large' closable={true}>焦锐志</Tag>
        </Space>
      </div>
      <div>
        <div style={divStyle}>
          <TagGroup
            maxTagCount={3}
            style={tagGroupStyle}
            tagList={tagList}
            size='large'
          />
        </div>
        <div style={divStyle}>
          <TagGroup
            maxTagCount={2}
            style={tagGroupStyle}
            tagList={tagList2}
            size='large'
            avatarShape='circle'
            showPopover
          />
        </div>
      </div>
    </div>
  )
})

TagDemo.props = vuePropsType

export default TagDemo

