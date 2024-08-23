
import { Tree } from '@kousum/semi-ui-vue';
import {
  IconFixedStroked,
  IconSectionStroked,
  IconAbsoluteStroked,
  IconInnerSectionStroked,
  IconComponentStroked
} from '@kousum/semi-icons-vue';
import { defineComponent, ref } from 'vue';


const Demo = defineComponent(()=>{
  const selected = ref(new Set());
  const selectedThroughParent = ref(new Set());
  const defaultTreeData = [
    {
      label: '黑色固定按钮',
      icon: <IconFixedStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
      key: 'fix-btn-0',
    },
    {
      label: '模块',
      key: 'module-0',
      icon: <IconSectionStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
      children: [
        {
          label: '可自由摆放的组件',
          icon: <IconAbsoluteStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
          key: 'free-compo-0',
        },
        {
          label: '分栏容器',
          icon: <IconSectionStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
          key: 'split-col-0',
          children: [
            {
              label: '按钮组件',
              icon: <IconComponentStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
              key: 'btn-0',
            },
            {
              label: '按钮组件',
              icon: <IconComponentStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
              key: 'btn-1',
            },
          ],
        },
      ],
    },
    {
      label: '模块',
      icon: <IconSectionStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
      key: 'module-1',
      children: [
        {
          label: '自定义组件',
          icon: <IconComponentStroked style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }} />,
          key: 'cus-0',
        },
      ],
    },
  ];
  const treeData = ref(defaultTreeData);

  const onDrop = (info) => {
    const { dropToGap, node, dragNode } = info;
    const dropKey = node.key;
    const dragKey = dragNode.key;
    const dropPos = node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const data = [...treeData.value];
    const loop = (data, key, callback) => {
      data.forEach((item, ind, arr) => {
        if (item.key === key) return callback(item, ind, arr);
        if (item.children) return loop(item.children, key, callback);
      });
    };

    let dragObj;
    loop(data, dragKey, (item, ind, arr) => {
      arr.splice(ind, 1);
      dragObj = item;
    });

    if (!dropToGap) {
      loop(data, dropKey, (item, ind, arr) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (dropPosition === 1 && node.children && node.expanded) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let dropNodeInd;
      let dropNodePosArr;
      loop(data, dropKey, (item, ind, arr) => {
        dropNodePosArr = arr;
        dropNodeInd = ind;
      });
      if (dropPosition === -1) {
        dropNodePosArr.splice(dropNodeInd, 0, dragObj);
      } else {
        dropNodePosArr.splice(dropNodeInd + 1, 0, dragObj);
      }
    }
    treeData.value = data;
  };

  const findDescendantKeys = (node) => {
    const res = [node.key];
    const findChild = item => {
      if (!item) return;
      const { children } = item;

      if (children && children.length) {
        children.forEach(child => {
          res.push(child.key);
          findChild(child);
        });
      }
    };
    findChild(node);
    return res;
  };

  const handleSelect = (key, bool, node) => {
    selected.value = new Set([key]);
    const descendantKeys = findDescendantKeys(node);
    selectedThroughParent.value = new Set(descendantKeys);
  };

  const renderLabel = ({
                         className,
                         data,
                         onClick,
                         expandIcon,
                       }) => {
    const { label, icon, key } = data;
    const isLeaf = !(data.children && data.children.length);
    const style = {
      backgroundColor: selected.value.has(key)
        ? 'rgba(var(--semi-blue-0), 1)'
        : selectedThroughParent.value.has(key)
          ? 'rgba(var(--semi-blue-0), .5)' : 'transparent',
    };
    return (
      <li
        className={className}
        role="treeitem"
        onClick={onClick}
        style={style}
      >
        {isLeaf ? <span style={{ width: 24 }}></span> : expandIcon}
        {icon}
        <span>{label}</span>
      </li>
    );
  };

  const treeStyle = {
    width: '260px',
    height: '420px',
    border: '1px solid var(--semi-color-border)',
  };


  return ()=><Tree
    treeData={treeData.value}
    draggable
    onDrop={onDrop}
    renderFullLabel={renderLabel}
    onSelect={handleSelect}
    style={treeStyle}
    defaultExpandAll
  />;
});
export default Demo;
