import TagGroup from '../group';
import { defineComponent, ref } from 'vue';

const Demo = defineComponent(() => {
  const defaultList = [
    { tagKey: '1', color: 'light-blue', children: '抖音', closable: true },
    { tagKey: '3', color: 'cyan', children: '剪映', closable: true },
    { tagKey: '2', color: 'violet', children: '醒图', closable: true },
    { tagKey: '4', color: 'teal', children: '轻颜相机', closable: true },
    { tagKey: '5', color: 'white', children: '飞书', closable: true },
  ];

  const tagList = ref(defaultList);

  const tagListClick = (value, e, tagKey) => {
    console.log(value)
    const newTagList = [...tagList.value];
    const closeTagIndex = newTagList.findIndex((t) => t.tagKey === tagKey);
    newTagList.splice(closeTagIndex, 1);
    tagList.value = (newTagList);
  };

  return ()=>(
    <div
      style={{
        backgroundColor: 'var(--semi-color-fill-0)',
        height: '35px',
        width: '300px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        marginBottom: '30px',
      }}
    >

      <TagGroup
        maxTagCount={3}
        showPopover
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '350px',
        }}
        tagList={tagList.value}
        size="large"
        onTagClose={tagListClick}
      />
    </div>
  );
})
export default Demo;
