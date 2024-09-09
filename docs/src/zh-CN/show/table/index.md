---
localeCode: zh-CN
order: 69
category: 展示类
title: Table 表格
icon: doc-table
brief: 表格用于呈现结构化的数据内容，通常会伴随提供对数据进行操作（排序、搜索、分页……）的能力。
---

## 如何使用

往 Table 传入表头 `columns` 和数据 `dataSource` 进行渲染。

<Notice title='注意事项'>
 请为 `dataSource` 中的每个数据项提供一个与其他数据项值不同的 `key`，或者使用 `rowKey` 参数指定一个作为主键的属性名，表格的行选择、展开等绝大多数行操作功能都会使用到。
</Notice>

```jsx import

import { Table } from '@kousum/semi-ui-vue';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            status: 'success',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            status: 'pending',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            status: 'wait',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default App
```

## 代码演示

### 基本表格

对于表格，最基本的两个参数为 `dataSource` 和 `columns`，前者为数据项，后者为每列的配置，二者皆为数组类型。

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Tag } from '@kousum/semi-ui-vue';
import { IconMore, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar
                            size="small"
                            shape="square"
                            src={record.nameIconSrc}
                            style={{ marginRight: '12px' }}
                        ></Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '交付状态',
            dataIndex: 'status',
            render: (text) => {
                const tagConfig = {
                    success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
                    pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
                    wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
                };
                const tagProps = tagConfig[text];
                return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
            }
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
        },
        {
            title: '',
            dataIndex: 'operate',
            render: () => {
                return <IconMore />;
            },
        },
    ];
    const data = [
         {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            status: 'success',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            status: 'pending',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            status: 'wait',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default App
```

### JSX 写法

你也可以使用 JSX 语法定义 `columns`，注意 Table 仅支持 `columns` 的 JSX 语法定义。你不能够使用任何组件包裹 `Table.Column` 组件。

<Notice type="primary" title="注意事项">
    <div>1. JSX 写法的表格暂时不支持 resizable 功能；</div>
    <div>2. 使用 JSX 写法时，请不要与配置写法同时使用；如果同时使用，仅配置写法生效，不会进行聚合操作。</div>
</Notice>

```jsx live=true noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import { defineComponent } from 'vue';

const { Column } = Table;


const App = defineComponent(()=>{

  const data = [
    {
      key: '1',
      name: 'Semi Design 设计稿.fig',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
      size: '2M',
      owner: '姜鹏志',
      status: 'success',
      updateTime: '2020-02-02 05:13',
      avatarBg: 'grey',
    },
    {
      key: '2',
      name: 'Semi Design 分享演示文稿',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '2M',
      owner: '郝宣',
      status: 'pending',
      updateTime: '2020-01-17 05:31',
      avatarBg: 'red',
    },
    {
      key: '3',
      name: '设计文档',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '34KB',
      status: 'wait',
      owner: 'Zoey Edwards',
      updateTime: '2020-01-26 11:01',
      avatarBg: 'light-blue',
    },
  ];

  const renderName = (text, record, index) => {
    return (
      <div>
        <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
        {text}
      </div>
    );
  };

  const renderOwner = (text, record, index) => {
    return (
      <div>
        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
          {typeof text === 'string' && text.slice(0, 1)}
        </Avatar>
        {text}
      </div>
    );
  };

  return ()=>(
    <Table dataSource={data} pagination={false}>
      <Column title="标题" dataIndex="name" key="name" render={renderName} />
      <Column title="大小" dataIndex="size" key="size" />
      <Column title="所有者" dataIndex="owner" key="owner" render={renderOwner} />
      <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
      <Column title="" dataIndex="operate" key="operate" render={() => <IconMore />} />
    </Table>
  );
})


export default App
```

### 行选择操作

往 Table 传入 [rowSelection](#rowSelection) 即可打开此功能。

-   点击表头的选择框，会选择 `dataSource` 里所有不是 `disabled` 状态的行。选择所有行回调函数为 `onSelectAll`；
-   点击行的选择框会选中当前行。它的回调函数为 `onSelect`；

<Notice title='注意事项'>
    <div>1. 请务必为 `dataSource` 中每行数据提供一个与其他行值不同的 `key`，或者使用 `rowKey` 参数指定一个作为主键的属性名。</div>
    <div>2. 如你遇见在第二页点击行选择后，回到第一页问题，请检查组件渲染是否触发了 `dataSource` 更新（浅对比）。`dataSource` 更新后，非受控的翻页器会回到第一页。请将 `dataSource` 放在 state 内。</div>
</Notice>

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Tag } from '@kousum/semi-ui-vue';
import { IconMore, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';
import { defineComponent, ref } from 'vue';

const Demo = defineComponent(() => {

  const selectedKeys = ref([]);

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar
              size="small"
              shape="square"
              src={record.nameIconSrc}
              style={{ marginRight: '12px' }}
            ></Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
    {
      title: '交付状态',
      dataIndex: 'status',
      render: (text) => {
        const tagConfig = {
          success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
          pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
          wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
        };
        const tagProps = tagConfig[text];
        return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
      }
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
    },
    {
      title: '',
      dataIndex: 'operate',
      render: () => {
        return <IconMore />;
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Semi Design 设计稿.fig',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
      size: '2M',
      owner: '姜鹏志',
      status: 'success',
      updateTime: '2020-02-02 05:13',
      avatarBg: 'grey',
    },
    {
      key: '2',
      name: 'Semi Design 分享演示文稿',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '2M',
      owner: '郝宣',
      status: 'pending',
      updateTime: '2020-01-17 05:31',
      avatarBg: 'red',
    },
    {
      key: '3',
      name: '设计文档',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '34KB',
      status: 'wait',
      owner: 'Zoey Edwards',
      updateTime: '2020-01-26 11:01',
      avatarBg: 'light-blue',
    },
    {
      key: '4',
      name: 'Semi D2C 设计稿.fig',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
      size: '2M',
      owner: '姜鹏志',
      status: 'wait',
      updateTime: '2020-02-02 05:13',
      avatarBg: 'grey',
    },
    {
      key: '5',
      name: 'Semi D2C 分享演示文稿',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '2M',
      owner: '郝宣',
      status: 'pending',
      updateTime: '2020-01-17 05:31',
      avatarBg: 'red',
    },
    {
      key: '6',
      name: 'Semi D2C 设计文档',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
      size: '34KB',
      status: 'success',
      owner: 'Zoey Edwards',
      updateTime: '2020-01-26 11:01',
      avatarBg: 'light-blue',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === '设计文档', // Column configuration not to be checked
      name: record.name,
    }),
    onSelect: (record, selected) => {
      console.log(`select row: ${selected}`, record);
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      selectedKeys.value = (selectedRowKeys);
    },
  };

  const pagination = {
    pageSize: 3,
  }

  return () => <Table columns={columns} dataSource={data} rowSelection={rowSelection} pagination={pagination} />;
})

export default Demo
```

### 自定义渲染

用户可以使用 `Column.render` 来自定义某一列单元格的渲染，该功能适用于需要渲染较为复杂的单元格内容时。

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Button, Empty, Typography, Tag } from '@kousum/semi-ui-vue';
import { IconDelete, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';
import { IllustrationNoResult, IllustrationNoResultDark } from '@kousum/semi-illustrations-vue';
import { defineComponent, ref } from 'vue';

const { Text } = Typography;

const raw = [
  {
    key: '1',
    name: 'Semi Design 设计稿标题可能有点长这时候应该显示 Tooltip.fig',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
    size: '2M',
    owner: '姜鹏志',
    status: 'success',
    updateTime: '2020-02-02 05:13',
    avatarBg: 'grey',
  },
  {
    key: '2',
    name: 'Semi Design 分享演示文稿',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '2M',
    owner: '郝宣',
    status: 'pending',
    updateTime: '2020-01-17 05:31',
    avatarBg: 'red',
  },
  {
    key: '3',
    name: '设计文档',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    status: 'wait',
    owner: 'Zoey Edwards',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'light-blue',
  },
  {
    key: '4',
    name: 'Semi D2C 设计文档可能也有点长所以也会显示Tooltip',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    status: 'success',
    owner: '姜琪',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'green',
  },
];

const App = defineComponent(() => {

  const dataSource = ref(raw);

  const removeRecord = key => {
    let newDataSource = [...dataSource.value];
    if (key != null) {
      let idx = newDataSource.findIndex(data => data.key === key);

      if (idx > -1) {
        newDataSource.splice(idx, 1);
        dataSource.value = (newDataSource);
      }
    }
  };
  const resetData = () => {
    const newDataSource = [...raw];
    dataSource.value = (newDataSource);
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          size="small"
                          shape="square"
                          src={record.nameIconSrc}
                          style={{ marginRight: '12px' }}
                        ></Avatar>
            {/* 宽度计算方式为单元格设置宽度 - 非文本内容宽度 */}
            <Text ellipsis={{ showTooltip: true }} style={{ width: 'calc(400px - 76px)' }}>
                            {text}
                        </Text>
                    </span>
        );
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 150,
    },
    {
      title: '交付状态',
      dataIndex: 'status',
      render: (text) => {
        const tagConfig = {
          success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
          pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
          wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
        };
        const tagProps = tagConfig[text];
        return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
      }
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      width: 300,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      width: 200,
    },
    {
      title: '',
      dataIndex: 'operate',
      render: (text, record) => (
        <Button icon={<IconDelete />} theme="borderless" onClick={() => removeRecord(record.key)} />
      ),
    },
  ];

  const empty = (
    <Empty
      image={<IllustrationNoResult />}
      darkModeImage={<IllustrationNoResultDark />}
      description={'搜索无结果'}
    />
  );

  return () => (
    <>
      <Button onClick={resetData} style={{ marginBottom: '10px' }}>
        重置
      </Button>
      <Table
        style={{ minHeight: '350px' }}
        columns={columns}
        dataSource={dataSource.value}
        pagination={false}
        empty={empty}
      />
    </>
  );
})

export default App
```

### 带分页组件的表格

表格分页目前支持两种模式：受控和非受控模式。

-   受控模式下，分页的状态完全由外部传入，依据为是否往 Table 传入了 `pagination.currentPage` 这个字段。一般情况下，受控模式适用于远程拉取数据并渲染。
-   非受控模式下，Table 默认会将传入的 `dataSource` 长度作为 `total` 传给 Pagination 组件，当然你也可以传入一个 `total` 字段来覆盖 Table 组件的取值，不过我们并不推荐用户在非受控分页模式下传入这个字段。

```jsx live=true noInline=true dir="column" height="1000"
import { Table, Avatar, Tag } from '@kousum/semi-ui-vue';
import { IconDelete, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '交付状态',
    dataIndex: 'status',
    render: (text) => {
      const tagConfig = {
        success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
        pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
        wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
      };
      const tagProps = tagConfig[text] || {};
      return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
    }
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const DAY = 24 * 60 * 60 * 1000;


const Demo = defineComponent(() => {

  const dataSource = ref([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Michael James', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const scroll = { y: 300 };

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        status: isSemiDesign ? 'success' : 'wait',
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} rowSelection={rowSelection} scroll={scroll} />;
})
export default Demo
```

### 拉取远程数据

正常情况下，数据往往不是一次性获取的，我们会在点击页码、过滤器或者排序按钮时从接口重新获取数据，这种情况下请使用**受控模式**来处理分页。用户需往 Table 传入 `pagination.currentPage` 这个字段，此时分页组件的渲染完全依赖于传入的 `pagination` 对象。

<Notice type="primary" title="注意事项">
    <div>1. 非受控时，pagination 如果是对象类型则不推荐使用字面量写法，原因是字面量写法会导致表格渲染至初始状态（看起来像是分页器没有生效）。请尽量将引用型参数定义在 render 方法之外，如果使用了 hooks 请利用 useMemo 或 useState 进行存储；</div>
    <div>2. 受控模式下，Table 不会对 dataSource 分页，请给 dataSource 传入当前页数据</div>
</Notice>

```jsx live=true noInline=true dir="column"
import { Table, Avatar, Tag } from '@kousum/semi-ui-vue';
import { IconDelete, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const pageSize = 5;

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '交付状态',
    dataIndex: 'status',
    render: (text) => {
      const tagConfig = {
        success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
        pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
        wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
      };
      const tagProps = tagConfig[text] || {};
      return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
    }
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const getData = () => {
  const data = [];
  for (let i = 0; i < 46; i++) {
    const isSemiDesign = i % 2 === 0;
    const randomNumber = (i * 1000) % 199;
    data.push({
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      status: isSemiDesign ? 'success' : 'wait',
      updateTime: new Date().valueOf() + randomNumber * DAY,
      avatarBg: isSemiDesign ? 'grey' : 'red',
    });
  }
  return data;
};

const data = getData();


const App = defineComponent(() => {

  const dataSource = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);

  const fetchData = (currentPage_ = 1) => {
    loading.value = (true);
    currentPage.value= (currentPage_);
    return new Promise((res, rej) => {
      setTimeout(() => {
        const data = getData();
        let dataSource_ = data.slice((currentPage_ - 1) * pageSize, currentPage_ * pageSize);
        res(dataSource_);
      }, 300);
    }).then(dataSource_ => {
      loading.value = (false);
      dataSource.value = (dataSource_);
    });
  };

  const handlePageChange = page => {
    fetchData(page);
  };

  onMounted(() => {
    fetchData();
  });

  return () => (
    <Table
      columns={columns}
      dataSource={dataSource.value}
      pagination={{
        currentPage: currentPage.value,
        pageSize: 5,
        total: data.length,
        onPageChange: handlePageChange,
      }}
      loading={loading.value}
    />
  );
})
export default App
```

### 固定列或表头

可以通过设置 column 的 `fixed` 属性以及 `scroll.x` 来进行列固定，通过设置 `scroll.y` 来进行表头固定。

如果是固定值，设置为 >=所有固定列宽之和+所有表格列宽之和 的数值。

> -   建议指定 `scroll.x` 为大于表格宽度的**固定值**或百分比。 如果是固定值，设置为 `>=所有固定列宽之和+所有表格列宽之和` 的数值。
> -   若列头与内容不对齐或出现列重复或者固定列失效的情况，请指定固定列的宽度 `width`，若指定宽度后仍不生效，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
> -   请确保表格内部的所有元素在渲染后不会对单元格的高度造成影响（例如含有未加载完成的图片等），这种情况下请给定子元素一个确定的高度，以此确保左右固定列单元格不会错乱。

```jsx live=true noInline=true dir="column" height="1000"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import { IconDelete, IconComment, IconClear, IconTickCircle } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    fixed: true,
    width: 250,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: 200,
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    width: 200,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    width: 200,
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
  {
    title: '',
    dataIndex: 'operate',
    fixed: 'right',
    align: 'center',
    width: 100,
    render: () => {
      return <IconMore />;
    },
  },
];


const App = defineComponent(() => {

  const dataSource = ref([]);

  const scroll = { y: 300, x: 1200 };
  const rowSelection = ({
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Michael James', // Column configuration not to be checked
      name: record.name,
    }),
    fixed: true,
  });

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} rowSelection={rowSelection} scroll={scroll} />;
})

export default App
```

通过 `sticky` 属性可以将表头固定在页面顶部。v2.21 版本支持。传入 `top` 时可以控制距离滚动容器的距离。

<StickyHeaderTable />

```jsx live=false noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        fixed: true,
        width: 250,
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                    {text}
                </div>
            );
        },
        filters: [
            {
                text: 'Semi Design 设计稿',
                value: 'Semi Design 设计稿',
            },
            {
                text: 'Semi D2C 设计稿',
                value: 'Semi D2C 设计稿',
            },
        ],
        onFilter: (value, record) => record.name.includes(value),
    },
    {
        title: '大小',
        dataIndex: 'size',
        width: 200,
        sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
        render: text => `${text} KB`,
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        width: 200,
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                        {typeof text === 'string' && text.slice(0, 1)}
                    </Avatar>
                    {text}
                </div>
            );
        },
    },
    {
        title: '更新日期',
        dataIndex: 'updateTime',
        width: 200,
        sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        render: value => {
            return dateFns.format(new Date(value), 'yyyy-MM-dd');
        },
    },
    {
        title: '',
        dataIndex: 'operate',
        fixed: 'right',
        align: 'center',
        width: 100,
        render: () => {
            return <IconMore />;
        },
    },
];

function App() {
    const [dataSource, setData] = useState([]);

    const scroll = useMemo(() => ({ y: 300, x: 1200 }), []);
    const rowSelection = useMemo(
        () => ({
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Michael James', // Column configuration not to be checked
                name: record.name,
            }),
            fixed: true,
        }),
        []
    );

    const getData = () => {
        const data = [];
        for (let i = 0; i < 46; i++) {
            const isSemiDesign = i % 2 === 0;
            const randomNumber = (i * 1000) % 199;
            data.push({
                key: '' + i,
                name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
                owner: isSemiDesign ? '姜鹏志' : '郝宣',
                size: randomNumber,
                updateTime: new Date().valueOf() + randomNumber * DAY,
                avatarBg: isSemiDesign ? 'grey' : 'red',
            });
        }
        return data;
    };

    useEffect(() => {
        const data = getData();
        setData(data);
    }, []);

    return (
        <Table
            sticky={{ top: 60 }}
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            scroll={scroll}
        />
    );
}

render(App);
```

### 带排序和过滤功能的表头

表格内部集成了过滤器和排序控件，用户可以通过在 Column 中传入 `filters` 以及 `onFilter` 开启表头的过滤器控件展示，传入 `sorter` 开启表头的排序控件的展示。

<Notice title='注意事项'>
    <div>1. 请为 `dataSource` 中的每个数据项提供一个与其他数据项值不同的 `key`，或者使用 `rowKey` 参数指定一个作为主键的属性名，表格的行选择、展开等绝大多数行操作功能都会使用到。</div>
    <div>2. 排序和筛选列必须设置独立的 `dataIndex`</div>
</Notice>

```jsx live=true noInline=true dir="column" height="1000"
import { Table, Avatar, Tag } from '@kousum/semi-ui-vue';
import {
  IconTickCircle,
  IconClear,
  IconComment,
} from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
    sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '交付状态',
    dataIndex: 'status',
    render: (text) => {
      const tagConfig = {
        success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
        pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
        wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
      };
      const tagProps = tagConfig[text];
      return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
    }
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];


const Demo = defineComponent(() => {

  const dataSource = ref([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Michael James', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const scroll = { y: 300 };

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        status: isSemiDesign ? 'success' : 'wait',
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} rowSelection={rowSelection} scroll={scroll} />;
})

export default Demo
```

sorter 为函数类型时，可以通过函数的第三个参数获取 sortOrder 状态。函数类型为 `(a?: RecordType, b?: RecordType, sortOrder?: 'ascend' | 'descend') => number`。v2.47 版本支持。

可通过 `showSortTip` 属性控制是否展示排序提示，自 v2.65 版本支持，默认为 `false`。当开启提示后，当仅有排序功能时候，鼠标移动至表头时，会展示排序提示；其他情况下，仅鼠标移动至排序图标时，会展示排序提示。

**注**：在使用 `sortOrder` 属性受控排序时，由于无法预测下一个排序顺序，因此 `showSortTip` 不生效，不会展示提示。

```jsx live=true noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            width: 400,
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                        {text}
                    </div>
                );
            }
        },
        {
            title: '大小',
            dataIndex: 'size',
            sorter: (r1, r2, order) => {
                const a = r1.size;
                const b = r2.size;
                if (typeof a === "number" && typeof b === "number") {
                    return a - b; // 数字正常比较大小
                } else if (typeof a === "undefined") {
                    return order === "ascend" ? 1 : -1; // undefined 在后面
                } else if (typeof b === "undefined") {
                    return order === "ascend" ? -1 : 1; // undefined 在后面
                } else {
                    return 0; // 保持原来的顺序
                }
            },
            showSortTip: true,
            render: text => text ? `${text} KB` : '未知',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            render: value => {
                return dateFns.format(new Date(value), 'yyyy-MM-dd');
            },
        },
    ];

    const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
    const docIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png';

    const dataSource = [
        {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: figmaIconUrl,
            size: 3,
            owner: '姜鹏志',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: docIconUrl,
            size: undefined,
            owner: '郝宣',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档3',
            nameIconSrc: docIconUrl,
            size: 1,
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
        {
            key: '4',
            name: '设计文档4',
            nameIconSrc: docIconUrl,
            size: 5,
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
        {
            key: '5',
            name: '设计文档5',
            nameIconSrc: docIconUrl,
            size: undefined,
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
        {
            key: '6',
            name: '设计文档6',
            nameIconSrc: docIconUrl,
            size: 2,
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    return <Table columns={columns} dataSource={dataSource} />;
}

export default App
```

### 自定义表头筛选

如果你需要将筛选器输入框展示在表头，可在 `title` 传入 ReactNode，配合 `filteredValue` 使用。

```jsx live=true noInline=true dir="column"
import { Table, Avatar, Input, Space, Tag } from '@kousum/semi-ui-vue';
import {
  IconTickCircle,
  IconClear,
  IconComment,
} from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';


const App = defineComponent(() => {

  const dataSource = ref([]);
  const filteredValue = ref([]);
  const compositionRef = ref({ isComposition: false });

  const DAY = 24 * 60 * 60 * 1000;
  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';


  const handleChange = (value) => {
    if (compositionRef.value.isComposition) {
      return;
    }
    const newFilteredValue = value ? [value] : [];
    filteredValue.value = (newFilteredValue);
  };
  const handleCompositionStart = () => {
    compositionRef.value.isComposition = true;
  };

  const handleCompositionEnd = (event) => {
    compositionRef.value.isComposition = false;
    const value = event.target.value;
    const newFilteredValue = value ? [value] : [];
    filteredValue.value = (newFilteredValue);
  };


  const columns = [
    {
      title: (
        <Space>
          <span>标题</span>
          <Input
            placeholder="请输入筛选值"
            style={{ width: '200px' }}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onChange={handleChange}
            showClear
          />
        </Space>
      ),
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
            {text}
          </div>
        );
      },
      onFilter: (value, record) => record.name.includes(value),
      filteredValue,
    },
    {
      title: '大小',
      dataIndex: 'size',
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      render: text => `${text} KB`,
    },
    {
      title: '交付状态',
      dataIndex: 'status',
      render: (text) => {
        const tagConfig = {
          success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
          pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
          wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
        };
        const tagProps = tagConfig[text];
        return <Tag shape='circle' {...tagProps} style={{ userSelect: 'text' }}>{tagProps.text}</Tag>
      }
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: '4px' }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: value => {
        return dateFns.format(new Date(value), 'yyyy-MM-dd');
      },
    },
  ];

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 首页${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        status: isSemiDesign ? 'success' : 'wait',
        updateTime: new Date('2024-01-25').valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} />;
})
export default App
```

### 自定义筛选器

使用 `renderFilterDropdown` 自定义渲染筛选器面板。v2.52 支持。

你可以在用户输入筛选值的时候调用 `setTempFilteredValue` 存储筛选值，在筛选值输入完毕后调用 `confirm` 触发真正的筛选。也可以通过 `confirm({ filteredValue })` 直接筛选。

设置 `tempFilteredValue` 的原因是在需要存储临时筛选值的场景，不需要自己声明一个 state 保存这个临时筛选值。

```typescript
type RenderFilterDropdown = (props?: RenderFilterDropdownProps) => React.ReactNode;
interface RenderFilterDropdownProps {
    /** 临时筛选值，初始值为 `filteredValue` 或 `defaultFilteredValue`  */
    tempFilteredValue: any[];
    /** 设置临时筛选值  */
    setTempFilteredValue: (tempFilteredValue: any[]) => void;
    /** `confirm` 默认会将 `tempFilteredValue` 赋值给 `filteredValue` 并触发 `onChange` 事件。你也可以通过传入 `filteredValue` 直接设置筛选值  */
    confirm: (props?: { closeDropdown?: boolean; filteredValue?: any[] }) => void;
    /** 清除筛选值、临时筛选值  */
    clear: (props?: { closeDropdown?: boolean }) => void;
    /** 关闭 dropdown  */
    close: () => void;
    /** 筛选器配置项，如不需要可以不传  */
    filters?: RenderDropdownProps['filters']
}
```

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Input, Button, Space, Tag } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';


const App = defineComponent(() => {

  const dataSource = ref([]);
  const inputRef = ref();

  const DAY = 24 * 60 * 60 * 1000;
  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
            {text}
          </div>
        );
      },
      onFilter: (value, record) => record.name.includes(value),
      renderFilterDropdown: (props) => {
        console.log('renderFilterDropdown', props);
        const { tempFilteredValue, setTempFilteredValue, confirm, clear, close } = props;

        const handleChange = value => {
          const filteredValue = value ? [value] : [];
          setTempFilteredValue(filteredValue);
          // 你也可以在 input value 变化时直接筛选
          // confirm({ filteredValue });
        };

        return (
          <Space vertical align='start' style={{ padding: '8px' }}>
            <Input ref={inputRef} value={tempFilteredValue[0]} onChange={handleChange} />
            <Space>
              <Button onClick={() => confirm({ closeDropdown: true })}>筛选+关闭</Button>
              <Button onClick={() => clear({ closeDropdown: true })}>清除+关闭</Button>
              <Button onClick={() => close()}>直接关闭</Button>
            </Space>
          </Space>
        );
      },
      onFilterDropdownVisibleChange: (visible) => {
        console.log('inputRef', visible, inputRef);
        if (inputRef.value && inputRef.value.focus) {
          inputRef.value.focus();
        }
      }
    },
    {
      title: '大小',
      dataIndex: 'size',
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      render: text => `${text} KB`,
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: '4px' }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
      onFilter: (value, record) => record.owner.includes(value),
      defaultFilteredValue: ['姜鹏志'],
      renderFilterDropdown: (props) => {
        console.log('renderFilterDropdown', props);
        const { tempFilteredValue, setTempFilteredValue, confirm, clear, close } = props;

        const handleChange = (value) => {
          if (value) {
            setTempFilteredValue([value]);
          } else {
            setTempFilteredValue([]);
          }
        };

        return (
          <Space vertical align='start' style={{ padding: '8px' }}>
            <Input value={tempFilteredValue[0]} onChange={handleChange} />
            <Space>
              <Button onClick={() => confirm({ closeDropdown: false })}>筛选后不关闭</Button>
              <Button onClick={() => clear({ closeDropdown: false })}>清除后不关闭</Button>
              <Button onClick={() => close()}>直接关闭</Button>
            </Space>
          </Space>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: value => {
        return dateFns.format(new Date(value), 'yyyy-MM-dd');
      },
    },
  ];

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} />;
})
export default App
```



### 自定义筛选项渲染

自 **1.1.0** 版本后，支持往 column 中传入 `renderFilterDropdownItem` 自定义每个筛选项的渲染方式。

-   `text: ReactNode` 当前筛选项的文案；
-   `value: any` 当前筛选项的值；
-   `checked: boolean` 当前筛选项是否已经选中；
-   `filteredValue: any[]` 当前所有的筛选值；
-   `level: number` 当前筛选项所处层级，如果是嵌套的筛选项，该值会 >= 1；
-   `filterMultiple: boolean` 当前筛选项是否为多选。

```jsx live=true noInline=true dir="column" height="1000"

import { Table, Avatar, Dropdown } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
    renderFilterDropdownItem: ({ text, checked, onChange }) => (
      <Dropdown.Item onClick={onChange} active={checked}>
        {text}
      </Dropdown.Item>
    ),
    filterDropdownProps: {
      showTick: true,
    },
    sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];


const App = defineComponent(() => {

  const dataSource = ref([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Michael James', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const scroll = { y: 300 };

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData();
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} rowSelection={rowSelection} scroll={scroll} />;
})
export default App
```

### 可以展开的表格

<Notice type="primary" title="注意事项">
    <div>1. 自 0.27.0版本后，展开按钮会默认与第一列文案渲染在同一个单元格内，你可以通过往 Table 传入 hideExpandedColumn=false 将展开按钮单独作为一列渲染；</div>
    <div>2. 请务必为每行数据提供一个与其他行值不同的 key，或者使用 rowKey 参数指定一个作为主键的属性名。</div>
</Notice>

#### 一般可展开行

如果需要渲染可以展开的表格，除了需要在 Table 传 `expandedRowRender` 这个方法外，还必须要指定 `rowKey`（默认为 `key`），Table 会根据 `rowKey` 取得行唯一标识符。

-   如果 `rowKey` 为 `Function`，则会把 `rowKey(record)` 的结果作为行唯一 ID
-   如果 `rowKey` 为 `string` 类型，则会把 `record[rowKey]` 作为行唯一 ID

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Descriptions, Tag } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import { defineComponent } from 'vue';

const columns = [
  {
    title: '标题',
    width: 500,
    dataIndex: 'name',
    render: (text, record, index) => {
      return (
        <span>
                    <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
          {text}
                </span>
      );
    },
  },
  {
    title: '大小',
    dataIndex: 'size',
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
  },
  {
    title: '',
    dataIndex: 'operate',
    render: () => {
      return <IconMore />;
    },
  },
];

const data = [
  {
    key: '1',
    name: 'Semi Design 设计稿.fig',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
    size: '2M',
    owner: '姜鹏志',
    updateTime: '2020-02-02 05:13',
    avatarBg: 'grey',
  },
  {
    key: '2',
    name: 'Semi Design 分享演示文稿',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '2M',
    owner: '郝宣',
    updateTime: '2020-01-17 05:31',
    avatarBg: 'red',
  },
  {
    key: '3',
    name: '设计文档',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    owner: 'Zoey Edwards',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'light-blue',
  },
];

const expandData = {
  '0': [
    { key: '实际用户数量', value: '1,480,000' },
    { key: '7天留存', value: '98%' },
    { key: '安全等级', value: '3级' },
    { key: '垂类标签', value: <Tag style={{ margin: 0 }}>设计</Tag> },
    { key: '认证状态', value: '未认证' },
  ],
  '1': [
    { key: '实际用户数量', value: '2,480,000' },
    { key: '7天留存', value: '90%' },
    { key: '安全等级', value: '1级' },
    { key: '垂类标签', value: <Tag style={{ margin: 0 }}>模板</Tag> },
    { key: '认证状态', value: '已认证' },
  ],
  '2': [
    { key: '实际用户数量', value: '2,920,000' },
    { key: '7天留存', value: '98%' },
    { key: '安全等级', value: '2级' },
    { key: '垂类标签', value: <Tag style={{ margin: 0 }}>文档</Tag> },
    { key: '认证状态', value: '已认证' },
  ],
};


const App = defineComponent(()=>{

  const expandRowRender = (record, index) => {
    return <Descriptions align="justify" data={expandData[index]} />;
  };

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === '设计文档', // Column configuration not to be checked
      name: record.name,
    }),
    onSelect: (record, selected) => {
      console.log(`select row: ${selected}`, record);
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return ()=>(
    <Table
      rowKey="name"
      columns={columns}
      dataSource={data}
      expandedRowRender={expandRowRender}
      rowSelection={rowSelection}
      pagination={false}
    />
  );
})
export default App
```

#### 展开按钮渲染为单独列

**版本：>=0.27.0**

默认情况，展开按钮会与第一列文案渲染在同一个单元格内，你可以通过传入 `hideExpandedColumn={false}` 来渲染为单独一列：

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Descriptions, Tag } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';

const columns = [
    {
        title: '标题',
        width: 500,
        dataIndex: 'name',
        render: (text, record, index) => {
            return (
                <span>
                    <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
                    {text}
                </span>
            );
        },
    },
    {
        title: '大小',
        dataIndex: 'size',
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                        {typeof text === 'string' && text.slice(0, 1)}
                    </Avatar>
                    {text}
                </div>
            );
        },
    },
    {
        title: '更新日期',
        dataIndex: 'updateTime',
    },
    {
        title: '',
        dataIndex: 'operate',
        render: () => {
            return <IconMore />;
        },
    },
];

const data = [
    {
        key: '1',
        name: 'Semi Design 设计稿.fig',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
        size: '2M',
        owner: '姜鹏志',
        updateTime: '2020-02-02 05:13',
        avatarBg: 'grey',
    },
    {
        key: '2',
        name: 'Semi Design 分享演示文稿',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '2M',
        owner: '郝宣',
        updateTime: '2020-01-17 05:31',
        avatarBg: 'red',
    },
    {
        key: '3',
        name: '设计文档',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '34KB',
        owner: 'Zoey Edwards',
        updateTime: '2020-01-26 11:01',
        avatarBg: 'light-blue',
    },
];

const expandData = {
    '0': [
        { key: '实际用户数量', value: '1,480,000' },
        { key: '7天留存', value: '98%' },
        { key: '安全等级', value: '3级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>设计</Tag> },
        { key: '认证状态', value: '未认证' },
    ],
    '1': [
        { key: '实际用户数量', value: '2,480,000' },
        { key: '7天留存', value: '90%' },
        { key: '安全等级', value: '1级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>模板</Tag> },
        { key: '认证状态', value: '已认证' },
    ],
    '2': [
        { key: '实际用户数量', value: '2,920,000' },
        { key: '7天留存', value: '98%' },
        { key: '安全等级', value: '2级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>文档</Tag> },
        { key: '认证状态', value: '已认证' },
    ],
};

function App() {
    const expandRowRender = (record, index) => {
        return <Descriptions align="justify" data={expandData[index]} />;
    };

    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === '设计文档', // Column configuration not to be checked
            name: record.name,
        }),
        onSelect: (record, selected) => {
            console.log(`select row: ${selected}`, record);
        },
        onSelectAll: (selected, selectedRows) => {
            console.log(`select all rows: ${selected}`, selectedRows);
        },
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    return (
        <Table
            rowKey="name"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandRowRender}
            hideExpandedColumn={false}
            rowSelection={rowSelection}
            pagination={false}
        />
    );
}

export default App
```

#### 关闭某一行的可展开按钮渲染

**版本：>=0.27.0**

可传入 `rowExpandable` 方法，入参为 `record`，判断返回值是否为 `false` 来关闭某一行的可展开按钮的渲染。

```jsx live=true noInline=true dir="column"

import { Table, Avatar, Descriptions, Tag } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';

const columns = [
    {
        title: '标题',
        width: 500,
        dataIndex: 'name',
        render: (text, record, index) => {
            return (
                <span>
                    <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
                    {text}
                </span>
            );
        },
    },
    {
        title: '大小',
        dataIndex: 'size',
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                        {typeof text === 'string' && text.slice(0, 1)}
                    </Avatar>
                    {text}
                </div>
            );
        },
    },
    {
        title: '更新日期',
        dataIndex: 'updateTime',
    },
    {
        title: '',
        dataIndex: 'operate',
        render: () => {
            return <IconMore />;
        },
    },
];

const data = [
    {
        key: '1',
        name: 'Semi Design 设计稿.fig',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
        size: '2M',
        owner: '姜鹏志',
        updateTime: '2020-02-02 05:13',
        avatarBg: 'grey',
    },
    {
        key: '2',
        name: 'Semi Design 分享演示文稿',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '2M',
        owner: '郝宣',
        updateTime: '2020-01-17 05:31',
        avatarBg: 'red',
    },
    {
        key: '3',
        name: '设计文档',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '34KB',
        owner: 'Zoey Edwards',
        updateTime: '2020-01-26 11:01',
        avatarBg: 'light-blue',
    },
];

const expandData = {
    '0': [
        { key: '实际用户数量', value: '1,480,000' },
        { key: '7天留存', value: '98%' },
        { key: '安全等级', value: '3级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>设计</Tag> },
        { key: '认证状态', value: '未认证' },
    ],
    '1': [
        { key: '实际用户数量', value: '2,480,000' },
        { key: '7天留存', value: '90%' },
        { key: '安全等级', value: '1级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>模板</Tag> },
        { key: '认证状态', value: '已认证' },
    ],
    '2': [
        { key: '实际用户数量', value: '2,920,000' },
        { key: '7天留存', value: '98%' },
        { key: '安全等级', value: '2级' },
        { key: '垂类标签', value: <Tag style={{ margin: 0 }}>文档</Tag> },
        { key: '认证状态', value: '已认证' },
    ],
};

function App() {
    const expandRowRender = (record, index) => {
        return <Descriptions align="justify" data={expandData[index]} />;
    };

    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === '设计文档', // Column configuration not to be checked
            name: record.name,
        }),
        onSelect: (record, selected) => {
            console.log(`select row: ${selected}`, record);
        },
        onSelectAll: (selected, selectedRows) => {
            console.log(`select all rows: ${selected}`, selectedRows);
        },
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    return (
        <Table
            rowKey="name"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandRowRender}
            rowExpandable={record => record.name !== '设计文档'}
            hideExpandedColumn={false}
            rowSelection={rowSelection}
            pagination={false}
        />
    );
}

export default App
```

### 树形数据展示

**版本：>=0.27.0**

表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格，如果不需要或使用其他字段可以用 `childrenRecordName` 进行配置。另外可以通过设置 `indentSize` 以控制每一层的缩进宽度。

> **注意：**请务必为每行数据提供一个与其他行值不同的 `key`，或者使用 `rowKey` 参数指定一个作为主键的属性名。

#### 树形数据简单示例

```jsx live=true noInline=true dir="column"

import { Table } from '@kousum/semi-ui-vue';

function App() {
    const columns = [
        {
            title: 'Key',
            dataIndex: 'dataKey',
            key: 'dataKey',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '数据类型',
            dataIndex: 'type',
            key: 'type',
            width: 400,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '默认值',
            dataIndex: 'default',
            key: 'default',
            width: 100,
        },
    ];

    const data = [
        {
            key: 1,
            dataKey: 'videos_info',
            name: '视频信息',
            type: 'Object 对象',
            description: '视频的元信息',
            default: '无',
            children: [
                {
                    key: 11,
                    dataKey: 'status',
                    name: '视频状态',
                    type: 'Enum <Integer> 枚举',
                    description: '视频的可见、推荐状态',
                    default: '1',
                },
                {
                    key: 12,
                    dataKey: 'vid',
                    name: '视频 ID',
                    type: 'String 字符串',
                    description: '标识视频的唯一 ID',
                    default: '无',
                    children: [
                        {
                            dataKey: 'video_url',
                            name: '视频地址',
                            type: 'String 字符串',
                            description: '视频的唯一链接',
                            default: '无',
                        },
                    ],
                },
            ],
        },
        {
            key: 2,
            dataKey: 'text_info',
            name: '文本信息',
            type: 'Object 对象',
            description: '视频的元信息',
            default: '无',
            children: [
                {
                    key: 21,
                    dataKey: 'title',
                    name: '视频标题',
                    type: 'String 字符串',
                    description: '视频的标题',
                    default: '无',
                },
                {
                    key: 22,
                    dataKey: 'video_description',
                    name: '视频描述',
                    type: 'String 字符串',
                    description: '视频的描述',
                    default: '无',
                },
            ],
        },
    ];

    return <Table columns={columns} defaultExpandAllRows dataSource={data} />;
}

export default App
```

#### 行可交换的树形数据

**版本：>=0.27.0**

你可以通过改变 `dataSource` 元素的顺序来实现行交换操作。

```jsx live=true noInline=true dir="column"
import { Table, Button } from '@kousum/semi-ui-vue';
import { IconArrowUp, IconArrowDown } from '@kousum/semi-icons-vue';
import { defineComponent, ref } from 'vue';

const raw = [
  {
    key: 1,
    dataKey: 'videos_info',
    name: '视频信息',
    type: 'Object 对象',
    description: '视频的元信息',
    default: '无',
    children: [
      {
        key: 11,
        dataKey: 'status',
        name: '视频状态',
        type: 'Enum <Integer> 枚举',
        description: '视频的可见、推荐状态',
        default: '1',
      },
      {
        key: 12,
        dataKey: 'vid',
        name: '视频 ID',
        type: 'String 字符串',
        description: '标识视频的唯一 ID',
        default: '无',
        children: [
          {
            dataKey: 'video_url',
            name: '视频地址',
            type: 'String 字符串',
            description: '视频的唯一链接',
            default: '无',
          },
        ],
      },
    ],
  },
  {
    key: 2,
    dataKey: 'text_info',
    name: '文本信息',
    type: 'Object 对象',
    description: '视频的元信息',
    default: '无',
    children: [
      {
        key: 21,
        dataKey: 'title',
        name: '视频标题',
        type: 'String 字符串',
        description: '视频的标题',
        default: '无',
      },
      {
        key: 22,
        dataKey: 'video_description',
        name: '视频描述',
        type: 'String 字符串',
        description: '视频的描述',
        default: '无',
      },
    ],
  },
];

const rowKey = 'key';
const childrenRecordName = 'children';


const App = defineComponent(() => {

  const expandedRowKeys = ref([1, 2]);
  const data = ref(raw);

  const switchRecord = (key1, key2) => {
    const newData = [...data.value];

    if (key1 != null && key2 != null) {
      const item1 = findRecordByKey(key1, newData);
      const item2 = findRecordByKey(key2, newData);

      // you have to copy item1 and item2 first
      const copiedItem1 = { ...item1 };
      const copiedItem2 = { ...item2 };

      coverRecord(item1, copiedItem2);
      coverRecord(item2, copiedItem1);

      data.value = (newData);
    }
  };

  const findRecordByKey = (key, data_) => {
    if (Array.isArray(data_) && data_.length && key != null) {
      for (let item of data_) {
        if (item[rowKey] === key) {
          return item;
        }

        const children = item[childrenRecordName];
        if (Array.isArray(children) && children.length) {
          const item = findRecordByKey(key, children);

          if (item != null) {
            return item;
          }
        }
      }
    }
  };

  const coverRecord = (obj, srcObj) => {
    if (obj && typeof obj === 'object' && srcObj && typeof srcObj === 'object') {
      const srcKeys = Object.keys(srcObj);
      const copied = { ...srcObj };

      Object.assign(obj, copied);

      Object.keys(obj).forEach(key => {
        if (!srcKeys.includes(key)) {
          delete obj[key];
        }
      });
    }

    return obj;
  };

  const getSameLevelRecords = (key, data_ = []) => {
    if (key != null && Array.isArray(data_) && data_.length) {
      if (data_.find(item => item[rowKey] === key)) {
        return data_;
      }
      for (let item of data_) {
        const records = getSameLevelRecords(key, item[childrenRecordName]);

        if (records.length) {
          return records;
        }
      }
    }
    return [];
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'dataKey',
      key: 'dataKey',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
      width: 100,
    },
    {
      key: 'operation',
      render: record => {
        const records = getSameLevelRecords(record[rowKey], data.value);
        const index = records.findIndex(item => item[rowKey] === record[rowKey]);
        const upProps = {};
        const downProps = {};

        if (index > 0) {
          const upRow = records[index - 1];
          upProps.onClick = () => switchRecord(record[rowKey], upRow[rowKey]);
        } else {
          upProps.disabled = true;
        }

        if (index < records.length - 1) {
          const downRow = records[index + 1];
          downProps.onClick = () => switchRecord(record[rowKey], downRow[rowKey]);
        } else {
          downProps.disabled = true;
        }

        return (
          <>
            <Button icon={<IconArrowUp />} {...upProps} />
            <Button icon={<IconArrowDown />} {...downProps} />
          </>
        );
      },
    },
  ];

  return () => (
    <Table
      columns={columns}
      dataSource={data.value}
      rowKey={rowKey}
      childrenRecordName={childrenRecordName}
      expandedRowKeys={expandedRowKeys.value}
      onExpandedRowsChange={rows => expandedRowKeys.value = (rows.map(item => item[rowKey]))}
    />
  );
})
export default App
```

#### 树形选择

**版本：>=0.27.0**

默认情况下，表格的行选中是各自独立的，你可以通过定义 `selectedRowKeys` 来模拟一个树形选中。

```jsx live=true noInline=true dir="column"

import lodash from 'lodash';
import { Table } from '@kousum/semi-ui-vue';
import { defineComponent, ref } from 'vue';

const { get, union, pullAll } = lodash
const childrenRecordName = 'children';
const rowKey = 'key';
const getKey = record => get(record, rowKey, 'key');

const ChildrenDataSelectedDemo = defineComponent(() => {
  const selectedRowKeys = ref([]);

  const columns = [
    {
      title: 'Key',
      dataIndex: 'dataKey',
      key: 'dataKey',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      width: 400,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      dataKey: 'videos_info',
      name: '视频信息',
      type: 'Object 对象',
      description: '视频的元信息',
      default: '无',
      children: [
        {
          key: 11,
          dataKey: 'status',
          name: '视频状态',
          type: 'Enum <Integer> 枚举',
          description: '视频的可见、推荐状态',
          default: '1',
        },
        {
          key: 12,
          dataKey: 'vid',
          name: '视频 ID',
          type: 'String 字符串',
          description: '标识视频的唯一 ID',
          default: '无',
          children: [
            {
              key: 121,
              dataKey: 'video_url',
              name: '视频地址',
              type: 'String 字符串',
              description: '视频的唯一链接',
              default: '无',
            },
          ],
        },
      ],
    },
    {
      key: 2,
      dataKey: 'text_info',
      name: '文本信息',
      type: 'Object 对象',
      description: '视频的元信息',
      default: '无',
      children: [
        {
          key: 21,
          dataKey: 'title',
          name: '视频标题',
          type: 'String 字符串',
          description: '视频的标题',
          default: '无',
        },
        {
          key: 22,
          dataKey: 'video_description',
          name: '视频描述',
          type: 'String 字符串',
          description: '视频的描述',
          default: '无',
        },
      ],
    },
  ];

  // 自定义禁用逻辑
  const isRecordDisabled = record => {
    return false;
  };

  const traverse = (data, res) => {
    for (let record of data) {
      const children = get(record, 'children');
      const disabled = isRecordDisabled(record);
      if (!disabled) {
        const key = getKey(record);
        res.push(key);
      }
      if (Array.isArray(children)) {
        traverse(children, res);
      }
    }
  };

  const getAllRowKeys = data => {
    const allRowKeys = [];
    traverse(data, allRowKeys);
    console.log('allRowKeys', allRowKeys);
    return allRowKeys;
  };

  const findShouldSelectRowKeys = (record, selected) => {
    let shouldSelectRowKeys;
    const children = get(record, 'children');
    let childrenRowKeys = [];
    if (Array.isArray(children)) {
      traverse(children, childrenRowKeys);
    }

    const key = getKey(record);
    if (!selected) {
      shouldSelectRowKeys = [...selectedRowKeys.value];
      pullAll(shouldSelectRowKeys, [key, ...childrenRowKeys]);
    } else {
      shouldSelectRowKeys = union(selectedRowKeys.value, [key, ...childrenRowKeys]);
    }
    return shouldSelectRowKeys;
  };

  // 选中一行时需要选中自己可选行
  const doSelect = (record, selected) => {
    const rowKeys = findShouldSelectRowKeys(record, selected);
    selectedRowKeys.value = (rowKeys);
    console.log('select', record, rowKeys);
  };

  // 找出所有可选的行
  const doSelectAll = (selected, selectedRows) => {
    console.log(selected);
    let rowKeys = [];
    if (selected) {
      rowKeys = getAllRowKeys(data);
    }
    selectedRowKeys.value = (rowKeys);
  };

  const rowSelection = computed(()=>{
    return {
      selectedRowKeys: selectedRowKeys.value,
      onSelect: doSelect,
      onSelectAll: doSelectAll,
    }
  });

  return ()=> (
    <Table
      columns={columns}
      rowKey={rowKey}
      childrenRecordName={childrenRecordName}
      rowSelection={rowSelection.value}
      dataSource={data}
      pagination={false}
    />
  );
});

export default ChildrenDataSelectedDemo
```

### 自定义行或单元格事件以及属性

-   传入 `onRow`/`onHeaderRow` 可以定义表格或表头行的原生事件或属性。
-   传入 `column.onCell`/`column.onHeaderCell` 可以定义表格或表头单元格原生事件或属性。

原则上 tr/td/th 上支持的属性或事件都能够被定义。例如下面这个例子：

-   表头的 tr 定义了 `onMouseEnter`/`onMouseLeave`
-   表格的 tr 定义了 `className`
-   表格的第三行定义了 `onClick`

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

function EventTable(props = {}) {
    const columns = [
      {
        title: '标题',
        dataIndex: 'name',
        width: 400,
        render: (text, record, index) => {
          return (
            <div>
              <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
              {text}
            </div>
          );
        },
        filters: [
          {
            text: 'Semi Design 设计稿',
            value: 'Semi Design 设计稿',
          },
          {
            text: 'Semi D2C 设计稿',
            value: 'Semi D2C 设计稿',
          },
        ],
        onFilter: (value, record) => record.name.includes(value),
      },
      {
        title: '大小',
        dataIndex: 'size',
        sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
        render: text => `${text} KB`,
      },
      {
        title: '所有者',
        dataIndex: 'owner',
        render: (text, record, index) => {
          return (
            <div>
              <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                {typeof text === 'string' && text.slice(0, 1)}
              </Avatar>
              {text}
            </div>
          );
        },
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        render: value => {
          return dateFns.format(new Date(value), 'yyyy-MM-dd');
        },
      },
    ];

    const data = () => {
      const _data = [];
      for (let i = 0; i < 46; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        _data.push({
          key: '' + i,
          name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
          owner: isSemiDesign ? '姜鹏志' : '郝宣',
          size: randomNumber,
          updateTime: new Date().valueOf() + randomNumber * DAY,
          avatarBg: isSemiDesign ? 'grey' : 'red',
        });
      }
      return _data;
    };

    const onRow = (record, index) => {
      const props = {
        className: 'my-tr-class',
      };

      if (index === 2) {
        return {
          ...props,
          onClick: e => console.log('mouse click: ', record, index),
        };
      } else {
        return {
          ...props,
        };
      }
    };
    const onHeaderRow = (columns, index) => {
      return {
        onMouseEnter: e => console.log('mouse enter: ', columns, index),
        onMouseLeave: e => console.log('mouse leave: ', columns, index),
      };
    };

    return <Table columns={columns} dataSource={data()} onRow={onRow} onHeaderRow={onHeaderRow} />;
}

export default EventTable
```

### 实现斑马纹样式

使用 `onRow` 给每行设置一个背景色，实现有斑马纹效果的表格。如果设置了固定列，可以通过 `onCell` 给每列设置一个背景色实现相同效果。

```jsx live=true noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            width: 400,
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar
                            size="small"
                            shape="square"
                            src={record.nameIconSrc}
                            style={{ marginRight: '12px' }}
                        ></Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
        },
        {
            title: '',
            dataIndex: 'operate',
            render: () => {
                return <IconMore />;
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
        {
            key: '4',
            name: 'Semi D2C 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '5',
            name: 'Semi D2C 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '6',
            name: 'Semi D2C 设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    const handleRow = (record, index) => {
        // 给偶数行设置斑马纹
        if (index % 2 === 0) {
            return {
                style: {
                    background: 'var(--semi-color-fill-0)',
                },
            };
        } else {
            return {};
        }
    };

    return <Table columns={columns} dataSource={data} onRow={handleRow} pagination={false} />;
}

export default App
```

### 单元格缩略

使用 `ellipsis` 可以让单元格自动实现缩略效果。v2.34.0 支持。

```jsx live=true noInline=true dir="column"

import { Table } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            fixed: true,
            width: 250,
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
            ellipsis: true,
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            width: 200,
            ellipsis: true,
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
        },
        {
            title: '大小',
            dataIndex: 'size',
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
            ellipsis: true,
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            width: 200,
            ellipsis: true,
        },
        {
            title: '',
            dataIndex: 'operate',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: () => {
                return <IconMore />;
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi is designed based on FA architecture, and the main logic is extracted as Foundation package, which is easy to migrate to other frameworks',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: 'Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: '由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'red',
        },
        {
            key: '3',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            name: 'Semi is designed based on FA architecture, and the main logic is extracted as Foundation package, which is easy to migrate to other frameworks',
            size: '34KB',
            owner: 'Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'light-blue',
        },
        {
            key: '4',
            name: '由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            owner: '郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'light-blue',
        },
    ];

    return <Table scroll={{ x: 1200 }} columns={columns} dataSource={data} pagination={false} />;
}

export default App
```

设置 `ellipsis.showTitle` 为 false 可以隐藏默认原生的 HTML title。 配合 `column.render` 可以自定义内容提示。

```jsx live=true noInline=true dir="column"

import { Table, Typography } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';

function App() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            fixed: true,
            width: 250,
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
            ellipsis: { showTitle: false },
            render: (text) => <Typography.Text ellipsis={{ showTooltip: true }}>{text}</Typography.Text>,
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            width: 200,
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
            ellipsis: { showTitle: false },
            render: (text) => <Typography.Text ellipsis={{ showTooltip: true }}>{text}</Typography.Text>,
        },
        {
            title: '大小',
            dataIndex: 'size',
            sorter: (a, b) => (a.name.length - b.name.length > 0 ? 1 : -1),
            ellipsis: true,
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            width: 200,
            ellipsis: true,
        },
        {
            title: '',
            dataIndex: 'operate',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: () => {
                return <IconMore />;
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi is designed based on FA architecture, and the main logic is extracted as Foundation package, which is easy to migrate to other frameworks',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: 'Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang Pengzhi Jiang',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: '由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣郝宣',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'red',
        },
        {
            key: '3',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            name: 'Semi is designed based on FA architecture, and the main logic is extracted as Foundation package, which is easy to migrate to other frameworks',
            size: '34KB',
            owner: 'Pengzhi Jiang',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'light-blue',
        },
        {
            key: '4',
            name: '由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            owner: '郝宣',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'light-blue',
        },
    ];

    return <Table scroll={{ x: 1200 }} columns={columns} dataSource={data} pagination={false} />;
}

export default App
```

### 可伸缩列

版本 >= 0.15.0

#### 基本伸缩列

对于一些内容比较多的列，可以选择打开伸缩列功能，在表头进行拉拽实现列宽的实时变化。

不过你需要注意一些参数：

- `resizable` 设定为 `true` 或者一个 `object`
- `columns` 里需要伸缩功能的列都要指定 `width` 这个字段（如果不传，该列不具备伸缩功能，且其列宽度会被浏览器自动调整）
- `column.resize` 可以在 resizable 开启后生效，设置为 false 后，列不再支持伸缩。v2.42 支持

> 与固定列同时使用时，需指定某一列不设置宽度

> 不推荐与 `scroll.x` 同时使用，scroll.x 指定表格是有宽度范围的，而伸缩列会拓展列宽，这可能会导致表格对不齐

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

function ResizableDemo() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            width: 300,
            resize: false,
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                        {text}
                    </div>
                );
            },
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
        },
        {
            title: '大小',
            dataIndex: 'size',
            width: 200,
            sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
            render: text => `${text} KB`,
        },
        {
            title: '所有者',
            width: 200,
            dataIndex: 'owner',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
            render: value => {
                return dateFns.format(new Date(value), 'yyyy-MM-dd');
            },
        },
        {
            title: '操作列',
            dataIndex: 'operate',
            fixed: 'right',
            width: 100,
            resize: false,
            render: () => {
                return <IconMore />;
            },
        },
    ];

    const data = () => {
      const _data = [];
      for (let i = 0; i < 46; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        _data.push({
          key: '' + i,
          name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
          owner: isSemiDesign ? '姜鹏志' : '郝宣',
          size: randomNumber,
          updateTime: new Date().valueOf() + randomNumber * DAY,
          avatarBg: isSemiDesign ? 'grey' : 'red',
        });
      }
      return _data;
    };

    return <Table columns={columns} dataSource={data()} resizable bordered />;
}

export default ResizableDemo
```

#### 进阶的伸缩列

`resizable` 还能为一个 `Object`，包括三个事件方法：

-   `onResize`
-   `onResizeStart`
-   `onResizeStop`

分别触发于`列宽改变中`、`开始改变`和`结束改变`三个时机。开发者可以选择在这个时机修改 column，例如在拉拽时增加一个拖动时的竖线效果等，如下例。

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const pagination = { pageSize: 5 };

function ResizableDemo() {
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            width: 400,
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                        {text}
                    </div>
                );
            },
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi D2C 设计稿',
                    value: 'Semi D2C 设计稿',
                },
            ],
            onFilter: (value, record) => record.name.includes(value),
        },
        {
            title: '大小',
            dataIndex: 'size',
            width: 200,
            sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
            render: text => `${text} KB`,
        },
        {
            title: '所有者',
            width: 200,
            dataIndex: 'owner',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
            render: value => {
                return dateFns.format(new Date(value), 'yyyy-MM-dd');
            },
        },
    ];

    const data = () => {
      const _data = [];
      for (let i = 0; i < 46; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        _data.push({
          key: '' + i,
          name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
          owner: isSemiDesign ? '姜鹏志' : '郝宣',
          size: randomNumber,
          updateTime: new Date().valueOf() + randomNumber * DAY,
          avatarBg: isSemiDesign ? 'grey' : 'red',
        });
      }
      return _data;
    };

    const resizable = {
        onResizeStart: curColumn => {
            const className = addClass(curColumn.className, 'my-resizing');

            return { className };
        },
        onResizeStop: curColumn => {
            const className = removeClass(curColumn.className, 'my-resizing');

            return { className };
        },
    };

    return (
        <div id="components-table-demo-resizable-column">
            <Table columns={columns} dataSource={data()} resizable={resizable} pagination={pagination} bordered />
        </div>
    );
}

export default ResizableDemo
```

本例中使用的 CSS 样式定义：

```css
#components-table-demo-resizable-column .my-resizing {
    border-right: 2px solid red;
}

#components-table-demo-resizable-column .react-resizable-handle:hover {
    background-color: red;
}

#components-table-demo-resizable-column .my-resizing:hover .react-resizable-handle {
    background-color: inherit;
}
```

### 拖拽排序

使用 [dnd-kit](https://github.com/clauderic/dnd-kit/tree/master) 搭配 [`components`](https://github.com/DouyinFE/semi-design/blob/340c93e4e1612a879be869c43ad7a9a85ab5a302/packages/semi-ui/table/interface.ts#L200) API 可轻松实现拖拽排序。v2.58 版本支持。

```jsx live=true dir="column" noInline=true hideInDSM
import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core'; // based on @dnd-kit/core v6
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { defineComponent } from 'vue';


const App = defineComponent(()=>{

  const pageSize = 10;
  const [dataSource, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const columns = useMemo(
    () => [
      {
        title: '标题',
        dataIndex: 'name',
        width: 400,
        render: (text, record, index) => {
          return (
            <div>
              <Avatar
                size="small"
                shape="square"
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png"
                style={{ marginRight: '12px' }}
              ></Avatar>
              {text}
            </div>
          );
        },
        filters: [
          {
            text: 'Semi Design 设计稿',
            value: 'Semi Design 设计稿',
          },
          {
            text: 'Semi D2C 设计稿',
            value: 'Semi D2C 设计稿',
          },
        ],
        onFilter: (value, record) => record.name.includes(value),
      },
      {
        title: '大小',
        dataIndex: 'size',
        sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
        render: text => `${text} KB`,
      },
      {
        title: '所有者',
        dataIndex: 'owner',
        render: (text, record, index) => {
          return (
            <div>
              <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                {typeof text === 'string' && text.slice(0, 1)}
              </Avatar>
              {text}
            </div>
          );
        },
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        render: value => {
          return dateFns.format(new Date(value), 'yyyy-MM-dd');
        },
      },
    ],
    []
  );

  useEffect(() => {
    const getData = () => {
      const data = [];
      for (let i = 0; i < 46; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        data.push({
          key: '' + i,
          name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
          owner: isSemiDesign ? '姜鹏志' : '郝宣',
          size: randomNumber,
          updateTime: new Date().valueOf() + randomNumber,
          avatarBg: isSemiDesign ? 'grey' : 'red',
        });
      }
      return data;
    };
    const data = getData();
    setData(data);
  }, []);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const currentPageData = dataSource.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    setPageData(currentPageData);
  }, [dataSource, pageNum]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    })
  );

  const handleDragEnd = event => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setPageData(prev => {
        const activeIndex = prev.findIndex(data => data.key === active.id);
        const overIndex = prev.findIndex(data => data.key === over.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const handleChange = ({ pagination }) => {
    const { currentPage } = pagination;
    setPageNum(currentPage);
  };

  const SortableRow = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: cssDndKit.Transform.toString(transform),
      transition,
      cursor: 'grabbing',
      ...(isDragging ? { zIndex: 999, position: 'relative' } : {}),
    };
    const rowCls = classNames(props.className,
      {
        ['isDragging']: isDragging,
        ['isOver']: isOver,
      }
    );
    const onPointerDown = (event) => {
      event.persist();
      console.log('props', event);
      listeners.onPointerDown(event);
    };

    return <tr {...props} className={rowCls} ref={setNodeRef} style={style} {...attributes} {...listeners} onPointerDown={onPointerDown}></tr>;
  };

  return ()=>(
    <DndContext
      // https://docs.dndkit.com/api-documentation/context-provider#autoscroll
      autoScroll={true}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={pageData.map(data => data.key)} strategy={verticalListSortingStrategy}>
        <Table
          components={{
            body: {
              row: SortableRow,
            },
          }}
          rowKey="key"
          columns={columns}
          dataSource={pageData}
          pagination={{ currentPage: pageNum, pageSize: pageSize, total: dataSource.length }}
          onChange={handleChange}
        />
      </SortableContext>
    </DndContext>
  );
})
export default App
```


### 表格分组

**版本：>=0.29.0**

对于一些数据需要分组展示的表格，可以传入 `groupBy` 定义分组规则，使用 `renderGroupSection` 来定义分组表头的渲染。

> **注意：**请务必为每行数据提供一个与其他行值不同的 `key`，或者使用 `rowKey` 参数指定一个作为主键的属性名。

```jsx live=true noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        width: 400,
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                    {text}
                </div>
            );
        },
        filters: [
            {
                text: 'Semi Design 设计稿',
                value: 'Semi Design 设计稿',
            },
            {
                text: 'Semi D2C 设计稿',
                value: 'Semi D2C 设计稿',
            },
        ],
        onFilter: (value, record) => record.name.includes(value),
    },
    {
        title: '大小',
        dataIndex: 'size',
        sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
        render: text => `${text} KB`,
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                        {typeof text === 'string' && text.slice(0, 1)}
                    </Avatar>
                    {text}
                </div>
            );
        },
    },
    {
        title: '更新日期',
        dataIndex: 'updateTime',
        sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        render: value => {
            return dateFns.format(new Date(value), 'yyyy-MM-dd');
        },
    },
];

const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = ((i * 1000) % 19) + 100;
        data.push({
            key: '' + i,
            name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
            owner: isSemiDesign ? '姜鹏志' : '郝宣',
            size: randomNumber,
            updateTime: new Date().valueOf() + randomNumber * DAY,
            avatarBg: isSemiDesign ? 'grey' : 'red',
        });
    }
    return data;
};

const data = getData();

function Demo() {
    const rowKey = record =>
        `${record.owner && record.owner.toLowerCase()}-${record.name && record.name.toLowerCase()}`;

    return (
        <div style={{ padding: '20px 0px' }}>
            <Table
                dataSource={data}
                rowKey={rowKey}
                groupBy={'size'}
                columns={columns}
                renderGroupSection={groupKey => <strong>根据文件大小分组 {groupKey} KB</strong>}
                onGroupedRow={(group, index) => {
                    return {
                        // onMouseEnter: () => {
                        //     console.log(`Grouped row mouse enter: `, group, index);
                        // },
                        // onMouseLeave: () => {
                        //     console.log(`Grouped row mouse leave: `, group, index);
                        // },
                        onClick: e => {
                            console.log(`Grouped row clicked: `, group, index);
                        },
                    };
                }}
                clickGroupedRowToExpand // if you want to click the entire row to expand
                scroll={{ y: 480 }}
            />
        </div>
    );
}

export default Demo
```

### 虚拟化表格

虚拟化可用于需要渲染大规模数据的场景，通过配置 `virtualized` 参数来开启这个功能。需要注意的是：

-   必须传递 `scroll.y`（number） 与 `style.width`（number）；
-   需要传递每行的高度 `virtualized.itemSize`（不传时普通行高默认为 `56`，组头行高默认为 `56`），可以为如下类型：
    -   `number`
    -   `(index, { sectionRow?: boolean, expandedRow?: boolean }) => number`
-   表格分组虚拟化需要版本 >= `0.37.0`
-   Semi Table 底层借助了 `react-window` 的能力来实现虚拟化，因此 `react-window` `VariableSizeList` 所支持的其他参数也可以通过 `virtualized`(object)传入，例如 `overscanCount`
-   如果需要使用 `VariableSizeList` 的 API，可以传入`getVirtualizedListRef` 获取对应 ref，需要版本 >= `1.20`

以下为渲染 1000 条数据的示例。

```jsx live=true noInline=true dir="column"
import { Table, Avatar, Button } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 200,
    fixed: true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: 150,
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    fixed: 'right',
    width: 150,
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const getData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const isSemiDesign = i % 2 === 0;
    const randomNumber = (i * 1000) % 199;
    data.push({
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      updateTime: new Date().valueOf() + randomNumber * DAY,
      avatarBg: isSemiDesign ? 'grey' : 'red',
    });
  }
  return data;
};

const data = getData();


const VirtualizedFixedDemo = defineComponent(() => {

  let virtualizedListRef = ref();
  const scroll = { y: 400, x: 900 };
  const style = { width: '750px', margin: '0 auto' };

  return () => (
    <>
      <Button onClick={() => virtualizedListRef.value.scrollToItem(100)}>Scroll to 100</Button>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={scroll}
        style={style}
        virtualized
        getVirtualizedListRef={ref => (virtualizedListRef.value = ref)}
      />
    </>
  );
})

export default VirtualizedFixedDemo
```

### 无限滚动

基于虚拟化特性，通过传入 `virtualized.onScroll` 我们可以实现无限滚动加载数据。

```jsx live=true noInline=true dir="column" hideInDSM
import { Table, Avatar, Button } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const DAY = 24 * 60 * 60 * 1000;

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 200,
    fixed: true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: 150,
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    fixed: 'right',
    width: 150,
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const InfiniteScrollDemo = defineComponent(() => {

  const data = ref([]);

  const scroll = { y: 600, x: 1000 };
  const style = { width: 750, margin: '0 auto' };

  const loadMore = () => {
    const pageSize = 20; // load 20 records every time
    const newData = [...data.value];
    const currentLength = data.value.length;
    for (let i = currentLength; i < currentLength + pageSize; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      newData.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    data.value = (newData);
  };

  const itemSize = 56;
  const virtualized = {
    itemSize,
    onScroll: ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
      if (
        scrollDirection === 'forward' &&
        scrollOffset >= (data.value.length - Math.ceil(scroll.y / itemSize) * 1.5) * itemSize &&
        !scrollUpdateWasRequested
      ) {
        loadMore();
      }
    },
  };

  onMounted(() => {
    loadMore();
  });

  return () => (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data.value}
      scroll={scroll}
      style={style}
      virtualized={virtualized}
    />
  );
})

export default InfiniteScrollDemo
```

### 受控的动态表格

```jsx live=true noInline=true dir="column" hideInDSM

import { Table, Switch, ButtonGroup, Button, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, reactive } from 'vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';


const App = defineComponent(() => {
  const dataTotalSize = 46;
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <span>
                            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
            {text}
                        </span>
        );
      },
      filters: [
        {
          text: 'Semi Design 设计稿',
          value: 'Semi Design 设计稿',
        },
        {
          text: 'Semi D2C 设计稿',
          value: 'Semi D2C 设计稿',
        },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: '大小',
      dataIndex: 'size',
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      render: text => `${text} KB`,
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: value => {
        return dateFns.format(new Date(value), 'yyyy-MM-dd');
      },
    },
  ];

  const getData = () => {
    const data_ = [];
    for (let i = 0; i < dataTotalSize; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data_.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data_;
  };

  const data = getData();

  const mergeColumns = (column, columns, keys = ['dataIndex']) => {
    columns = [...columns];
    columns.forEach((curColumn, index) => {
      let isTarget = !!(keys && keys.length);

      for (let key of keys) {
        if (column[key] !== curColumn[key]) {
          isTarget = false;
          break;
        }
      }

      if (isTarget) {
        columns[index] = { ...curColumn, ...column };
      }
    });

    return columns;
  };

  const filterData = (filters, dataSource) => {
    dataSource = [...dataSource];
    filters.forEach(filter => {
      let filteredValue = filter.filteredValue;
      let dataIndex = filter.dataIndex;
      if (Array.isArray(filteredValue) && filteredValue.length && dataIndex) {
        dataSource = dataSource.filter(
          data => filteredValue.filter(value => String(data[dataIndex]).indexOf(value) > -1).length
        );
      }
    });

    return dataSource;
  };

  const getSelfSorterColumn = columns => {
    columns = columns || state.columns;
    return columns.filter(column => !!column.sorter)[0];
  };

  const getSelfFilterColumns = columns => {
    columns = columns || state.columns;
    return columns.filter(column => Array.isArray(column.filteredValue) && column.filteredValue.length);
  };

  const sortData = (sortObj, dataSource) => {
    let { sorter, sortOrder, dataIndex } = sortObj;

    if (sorter && sortOrder && typeof sorter !== 'function') {
      sorter = (a, b) => (a[dataIndex] > b[dataIndex] ? 1 : -1);
    }

    if (typeof sorter === 'function') {
      dataSource = [...dataSource].sort(sorter);

      if (sortOrder === 'descend') {
        dataSource = dataSource.reverse();
      }
    }

    return dataSource;
  };

  const fetchData = (currentPage = 1, sorter = {}, filters = []) => {
    // console.log(`FetchData currentPage: `, currentPage);
    let pagination = { ...state.pagination, currentPage };
    return new Promise((res, rej) => {
      setTimeout(() => {
        let data_ = [...data];
        data_ = sortData(sorter, data_);
        data_ = filterData(filters, data_);
        let dataSource = data_.slice(
          (currentPage - 1) * pagination.pageSize,
          currentPage * pagination.pageSize
        );
        pagination.total = data_.length;
        res({
          dataSource,
          pagination,
          sorter,
          filters,
        });
      }, 1500);
    });
  };

  const setPage = (currentPage, sorter, filters) => {
    if (state.loading) {
      return;
    }
    if (typeof currentPage !== 'number') {
      currentPage = (state.pagination && state.pagination.currentPage) || 1;
    }

    sorter = sorter || getSelfSorterColumn();
    filters = filters || getSelfFilterColumns();

    state.loading = true
    fetchData(currentPage, sorter, filters)
      .then(({ dataSource, pagination, sorter, filters }) => {
        let columns = [...state.columns];
        columns = mergeColumns(sorter, columns);
        for (let filterObj of filters) {
          columns = mergeColumns(filterObj, columns);
        }
        state.loading = false
        state.pagination = pagination
        state.dataSource = dataSource
        state.columns = columns
      })
      .catch(err => {
        console.error(err);
        state.loading = false
      });
  };

  const toggleFixHeader = checked => {
    let scroll = { ...state.scroll };

    if (checked) {
      scroll.y = 300;
    } else {
      scroll.y = null;
    }

    state.scroll = scroll
  };

  const toggleFixColumns = checked => {
    let columns = [...state.columns];
    let scroll = { ...state.scroll };
    let expandCellFixed = state.expandCellFixed;
    let rowSelection = state.rowSelection;

    if (checked) {
      columns[0].fixed = true;

      if (rowSelection) {
        rowSelection = { ...rowSelection, fixed: true };
      }
      if (columns.length > 1) {
        columns[columns.length - 1].fixed = 'right';
      }
      scroll.x = '150%';
      expandCellFixed = true;
    } else {
      columns.forEach(column => {
        column.fixed = false;
      });
      scroll.x = null;
      expandCellFixed = false;

      if (rowSelection) {
        rowSelection = { ...rowSelection, fixed: false };
      }
    }

    state.rowSelection = rowSelection
    state.expandCellFixed = expandCellFixed
    state.columns = columns
    state.scroll = scroll
  };

  const toggleRowSelection = checked => {
    let rowSelection = state.rowSelection;
    // const anyColumnFixed = state.columns.some(column => !!column.fixed);

    if (checked) {
      rowSelection = {
        width: 48,
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) =>
          console.log(
            'Selection changed, selectedRowKeys: ',
            selectedRowKeys,
            'selectedRows: ',
            selectedRows
          ),
      };
    } else {
      rowSelection = null;
    }

    state.rowSelection = rowSelection
  };

  const toggleLoading = checked => {
    let loading = state.loading;

    if (checked) {
      loading = true;
    } else {
      loading = false;
    }

    state.loading = loading
  };

  const toggleExpandedRowRender = checked => {
    let expandedRowRender = state.expandedRowRender;

    if (checked) {
      expandedRowRender = record => {
        return {
          children: <p>{record.description}</p>,
          fixed: 'left',
        };
      };
    } else {
      expandedRowRender = null;
    }

    state.expandedRowRender = expandedRowRender
  };

  const toggleShowSorter = checked => {
    let columns = [...state.columns];

    if (checked) {
      columns.forEach(column => column.dataIndex === 'age' && (column.sorter = true));
    } else {
      columns.forEach(column => (column.sorter = null));
    }
    state.columns = columns
  };

  const toggleShowFilter = checked => {
    let columns = [...state.columns];

    if (checked) {
      columns.forEach(column => {
        if (column.dataIndex === 'name') {
          column.filters = [
            {
              text: '姓名中包含 1',
              value: '1',
            },
            {
              text: '姓名中包含 2',
              value: '2',
            },
            {
              text: '姓名中包含 3',
              value: '3',
            },
          ];
          column.filteredValue = [];
        }
      });
    } else {
      columns.forEach(column => {
        column.filters = null;
        column.filteredValue = null;
      });
    }

    state.columns = columns

    if (!checked) {
      setPage(null, null, []);
    }
  };

  const onChange = (data = {}) => {
    console.log('Table changed: ', data);
    let { pagination, sorter, filters } = data;
    setPage(pagination.currentPage, sorter, filters);
  };

  const onExpandedRowsChange = rows => {
    console.log('Expanded rows changed to: ', rows);

    const expandedRowKeys = (Array.isArray(rows) && rows.map(row => row.key)) || [];

    state.expandedRowKeys = expandedRowKeys
  };

  const toggleExpandedRowKeys = checked => {
    let expandedRowKeys = [];

    if (checked) {
      let dataSource = [...state.dataSource];
      expandedRowKeys.push(
        ...dataSource.reduce((arr, data) => {
          if (data.key) {
            arr.push(data.key);
          }
          return arr;
        }, [])
      );
      toggleExpandedRowRender(true);
    }
    state.expandedRowKeys = expandedRowKeys
  };

  const toggleBordered = checked => {
    let bordered = false;

    if (checked) {
      bordered = true;
    }

    state.bordered = bordered
  };

  const toggleResizable = checked => {
    let resizable = !!checked || false;

    state.resizable = resizable
    state.bordered = resizable
  };

  const toggleHideHeader = checked => {
    let showHeader = true;

    if (checked) {
      showHeader = false;
    }

    state.showHeader = showHeader
  };

  const toggleFooter = checked => {
    const footer = checked ? dataSource => <p style={{ margin: 0 }}>This is footer.</p> : null;

    state.footer = footer
  };

  const toggleTitle = checked => {
    const title = checked ? 'This is title.' : null;

    state.title = title
  };

  const toggleHidePagination = checked => {
    let pagination = checked
      ? false
      : {
        currentPage: 1,
        pageSize: 8,
        total: data.length,
        onPageChange: page => setPage(page),
      };

    state.pagination = pagination
  };

  const toggleDataSource = checked => {
    if (checked) {
      state.dataSource = []
    } else {
      setPage();
    }
  };

  const switchPagination = position => {
    let pagination = state.pagination;

    const defaultPagination = {
      currentPage: 1,
      pageSize: 8,
      total: data.length,
      onPageChange: page => setPage(page),
    };

    const positions = ['bottom', 'top', 'both'];

    if (position === true || position === false) {
      pagination = position ? { ...defaultPagination, ...pagination } : false;
    } else if (positions.includes(position)) {
      pagination = { ...defaultPagination, ...pagination, position };
    }

    state.pagination = pagination
  };

  const state = reactive({
    loading: false,
    columns,
    scroll: {
      x: 0,
      y: 0
    },
    rowSelection: null,
    expandedRowRender: null,
    expandCellFixed: false,
    defaultExpandedRowKeys: [],
    title: null,
    footer: null,
    expandedRowKeys: [],
    showHeader: true,
    resizable: false,
    pagination: {
      currentPage: 1,
      pageSize: 8,
      total: data.length,
      onPageChange: page => setPage(page),
    },
    dataSource: [],
  });

  const TableSwitch = defineComponent(({
                                         text,
                                         checked,
                                         onChange,
                                         style = { display: 'inline-flex', alignItems: 'center', margin: 5 },
                                       }, {slots}) =>{
    return ()=>{
      const switchProps = { onChange };

      if (checked != null) {
        // switchProps.checked = !!checked;
      }
      const children = slots.default?.()
      return (
        <span style={style}>
                    <span>{text}</span>
          {children != null ? children : <Switch size="small" {...switchProps} />}
                </span>
      )
    };
  }, {
    props: {
      text: String,
      checked: [Boolean, Object, Number],
      onChange: Function,
      style: Object,
    }
  });
  onMounted(() => {
    setPage(1);
  })
  return () => {

    let {
      columns,
      dataSource,
      pagination,
      loading,
      scroll,
      rowSelection,
      expandedRowRender,
      expandCellFixed,
      expandedRowKeys,
      bordered,
      resizable,
      title,
      footer,
      showHeader,
      defaultExpandedRowKeys,
    } = state;

    const wrapStyle = { marginBottom: 15, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' };


    return (
      <div>
        <div style={wrapStyle}>
          <TableSwitch text="固定表头：" checked={scroll && scroll.y} onChange={toggleFixHeader} />
          <TableSwitch text="隐藏表头：" onChange={toggleHideHeader} />
          <TableSwitch text="显示标题：" onChange={toggleTitle} />
          <TableSwitch text="显示底部：" onChange={toggleFooter} />
          <TableSwitch text="固定列：" onChange={toggleFixColumns} />
          <TableSwitch text="显示选择列：" onChange={toggleRowSelection} />
          <TableSwitch text="显示加载状态：" onChange={toggleLoading} checked={loading} />
          <TableSwitch
            text="无数据："
            onChange={toggleDataSource}
            checked={!dataSource || !dataSource.length}
          />
          <TableSwitch text="开启排序功能：" onChange={toggleShowSorter} />
          <TableSwitch text="开启过滤功能：" onChange={toggleShowFilter} />
          <TableSwitch
            text="开启行展开功能："
            onChange={toggleExpandedRowRender}
            checked={typeof expandedRowRender === 'function'}
          />
          <TableSwitch text="展开当前所有行：" onChange={toggleExpandedRowKeys} />
          <TableSwitch text="显示边框：" onChange={toggleBordered} checked={bordered} />
          <TableSwitch text="开启列伸缩功能：" onChange={toggleResizable} />
          <TableSwitch text="分页控件：">
            <ButtonGroup>
              <Button onClick={() => switchPagination('bottom')}>Bottom</Button>
              <Button onClick={() => switchPagination('top')}>Top</Button>
              <Button onClick={() => switchPagination('both')}>Both</Button>
              <Button onClick={() => switchPagination(false)}>None</Button>
            </ButtonGroup>
          </TableSwitch>
        </div>
        <Table
          defaultExpandedRowKeys={defaultExpandedRowKeys}
          onExpandedRowsChange={onExpandedRowsChange}
          title={title}
          footer={footer}
          showHeader={showHeader}
          bordered={bordered}
          onChange={onChange}
          expandCellFixed={expandCellFixed}
          expandedRowRender={expandedRowRender}
          expandedRowKeys={expandedRowKeys}
          rowSelection={rowSelection}
          scroll={scroll}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination || undefined}
          loading={loading}
          resizable={resizable}
        />
      </div>
    );
  }
})
export default App
```

### 完全自定义渲染

**版本：**>=0.34.0

一般情况下，使用 `Column.render` 即可，但是你也可以通过传递 `Column.useFullRender=true` 来开启完全自定义渲染模式，此时复选框按钮、展开按钮、缩进等组件将会透传至 `Column.title` 与 `Column.render` 方法中，你可以进一步来定义表头和单元格的内容渲染方式。

其中 `Column.title` 接受的入参为：

```text
{
    filter: ReactNode, // 筛选按钮
    sorter: ReactNode, // 排序按钮
    selection: ReactNode, // 选择按钮
}
```

`Column.render` 第四个入参为一个 object，结构如下：

```text
{
    expandIcon: ReactNode, // 展开按钮
    selection: ReactNode, // 选择按钮
    indentTex: ReactNode, // 缩进
}
```

> 下方的例子则是将复选框与内容渲染至同一单元格和表头中。

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';

import { defineComponent, onMounted, ref } from 'vue';
import { IconMore } from '@kousum/semi-icons-vue';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: ({ sorter, filter, selection }) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                {selection}
        <span style={{ marginLeft: '8px' }}>Name</span>
        {sorter}
        {filter}
            </span>
    ),
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi D2C 设计稿',
        value: 'Semi D2C 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
    useFullRender: true,
    // 此处从render的第四个形参中解构出 展开按钮、选择按钮、文本等内容
    render: (text, record, index, { expandIcon, selection, indentText }) => {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {indentText}
          {expandIcon}
          {selection}
          <span style={{ marginLeft: 8 }}>
                        <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
            {text}
                    </span>
                </span>
      );
    },
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const getData = total => {
  const data = [];
  for (let i = 0; i < total; i++) {
    const isSemiDesign = i % 2 === 0;
    const randomNumber = (i * 1000) % 199;
    data.push({
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      updateTime: new Date().valueOf() + randomNumber * DAY,
      avatarBg: isSemiDesign ? 'grey' : 'red',
    });
  }
  return data;
};


const Demo = defineComponent(() => {

  const dataSource = ref([]);
  const total = 46;
  const pagination = {
    pageSize: 12,
  };

  const rowSelection = {
    hidden: true,
    fixed: 'left',
  };
  ;

  onMounted(() => {
    const data = getData(total);
    dataSource.value = (data);
  });

  return () => (
    <Table
      pagination={pagination}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource.value}
      onChange={(...args) => console.log(...args)}
      expandedRowRender={record => <article>{record.name}</article>}
    />
  );
})
export default Demo
```

### 表头合并

**版本：>=1.1.0**

用户可以通过表头合并功能进行表头的分组，表头合并支持与固定列、虚拟化、数据分组、列伸缩等功能复合使用，也同时支持 JSX 或者配置式写法。

#### 合并表头配置式写法

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
    {
        title: '基本信息',
        fixed: 'left',
        children: [
            {
                title: '标题',
                dataIndex: 'name',
                width: 300,
                fixed: true,
                render: (text, record, index) => {
                    return (
                        <span>
                            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                            {text}
                        </span>
                    );
                },
                filters: [
                    {
                        text: 'Semi Design 设计稿',
                        value: 'Semi Design 设计稿',
                    },
                    {
                        text: 'Semi D2C 设计稿',
                        value: 'Semi D2C 设计稿',
                    },
                ],
                onFilter: (value, record) => record.name.includes(value),
            },
            {
                title: '大小',
                dataIndex: 'size',
                width: 100,
                fixed: true,
                sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
                render: text => `${text} KB`,
            },
        ],
    },
    {
        title: '其他信息',
        children: [
            {
                title: '所有者',
                dataIndex: 'owner',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                                {typeof text === 'string' && text.slice(0, 1)}
                            </Avatar>
                            {text}
                        </div>
                    );
                },
            },
            {
                title: '更新日期',
                dataIndex: 'updateTime',
                sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
                render: value => {
                    return dateFns.format(new Date(value), 'yyyy-MM-dd');
                },
            },
        ],
    },
    {
        title: '更多',
        fixed: 'right',
        width: 100,
        align: 'center',
        dataIndex: 'operate',
        render: () => {
            return <IconMore />;
        },
    },
];

const getData = total => {
    const data = [];
    for (let i = 0; i < total; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        data.push({
            key: '' + i,
            name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
            owner: isSemiDesign ? '姜鹏志' : '郝宣',
            size: randomNumber,
            updateTime: new Date().valueOf() + randomNumber * DAY,
            avatarBg: isSemiDesign ? 'grey' : 'red',
        });
    }
    return data;
};

function Demo() {
    const data = getData(46);

    return (
        <Table
            rowSelection={{ fixed: true }}
            expandedRowRender={record => <article>{record.name}</article>}
            dataSource={data}
            scroll={{ y: 400 }}
            onChange={(...args) => console.log(...args)}
            columns={columns}
        />
    );
}

export default Demo
```

#### 合并表头 JSX 写法

```jsx live=true noInline=true dir="column"
import { Table, Avatar } from '@kousum/semi-ui-vue';
import { IconMore } from '@kousum/semi-icons-vue';
import * as dateFns from 'date-fns';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const Column = Table.Column;

const getData = total => {
    const data = [];
    for (let i = 0; i < total; i++) {
        const isSemiDesign = i % 2 === 0;
        const randomNumber = (i * 1000) % 199;
        data.push({
            key: '' + i,
            name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
            owner: isSemiDesign ? '姜鹏志' : '郝宣',
            size: randomNumber,
            updateTime: new Date().valueOf() + randomNumber * DAY,
            avatarBg: isSemiDesign ? 'grey' : 'red',
        });
    }
    return data;
};

function Demo() {
    const data = getData(46);

    const nameFilters = [
        {
            text: 'Semi Design 设计稿',
            value: 'Semi Design 设计稿',
        },
        {
            text: 'Semi D2C 设计稿',
            value: 'Semi D2C 设计稿',
        },
    ];

    const renderName = (text, record, index) => {
        return (
            <span>
                <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
                {text}
            </span>
        );
    };

    const renderOwner = (text, record, index) => {
        return (
            <div>
                <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                    {typeof text === 'string' && text.slice(0, 1)}
                </Avatar>
                {text}
            </div>
        );
    };

    return (
        <Table
            rowSelection={{ fixed: true }}
            expandedRowRender={record => <article>{record.name}</article>}
            dataSource={data}
            scroll={{ y: 400 }}
            onChange={(...args) => console.log(...args)}
        >
            <Column title="基本信息" fixed="left">
                <Column
                    title="标题"
                    dataIndex="name"
                    width={300}
                    fixed
                    render={renderName}
                    filters={nameFilters}
                    onFilter={(value, record) => record.name.includes(value)}
                />
                <Column
                    title="大小"
                    dataIndex="size"
                    width={100}
                    fixed
                    render={text => `${text} KB`}
                    sorter={(a, b) => (a.size - b.size > 0 ? 1 : -1)}
                ></Column>
            </Column>
            <Column title="其他信息">
                <Column title="所有者" dataIndex="owner" render={renderOwner} />
                <Column
                    title="更新日期"
                    dataIndex="updateTime"
                    sorter={(a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1)}
                    render={value => dateFns.format(new Date(value), 'yyyy-MM-dd')}
                ></Column>
            </Column>
            <Column
                title="更多"
                dataIndex="operate"
                fixed="right"
                width={100}
                align="center"
                render={() => <IconMore />}
            />
        </Table>
    );
}

export default Demo
```

### 行列合并

-   表头除了通过 `children` 写法进行合并外，可通过设置 `column.colSpan` 进行表头的列合并。
-   表格支持行/列合并，使用 `render` 里的单元格属性 `colSpan` 或者 `rowSpan` 设值为 0 时，设置的表格不会渲染。

```text
type Render = (text: string, record: Object, index: number, options?: RenderOptions) => {
    children: React.ReactNode;
    props: {
        colSpan?: number,
        rowSpan?: number,
    },
    [x: string]: any;
}

interface RenderOptions {
    expandIcon?: React.ReactNode;
}
```

```jsx live=true noInline=true dir="column"

import { Table, Avatar } from '@kousum/semi-ui-vue';
import * as dateFns from 'date-fns';
import { defineComponent, onMounted, ref } from 'vue';

const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      const renderObject = {};
      const children = (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
      renderObject.children = children;
      if (index === 0) {
        renderObject.props = {
          colSpan: 4,
        };
      }
      if (index === 1) {
        renderObject.props = {
          rowSpan: 2,
        };
      }
      if (index === 2) {
        renderObject.props = {
          rowSpan: 0,
        };
      }
      return renderObject;
    },
  },
  {
    title: '大小',
    dataIndex: 'size',
    render: (text, record, index) => {
      if (index === 0) {
        return {
          children: `${text} KB`,
          props: {
            colSpan: 0,
          },
        };
      }
      if (index === 1) {
        return {
          children: `${text} KB`,
          props: {
            rowSpan: 2,
          },
        };
      }
      if (index === 2) {
        return {
          children: `${text} KB`,
          props: {
            rowSpan: 0,
          },
        };
      }
      return `${text} KB`;
    },
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      const children = (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
      if (index === 0) {
        return {
          children,
          props: {
            colSpan: 0,
          },
        };
      }
      return children;
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: (value, record, index) => {
      const children = dateFns.format(new Date(value), 'yyyy-MM-dd');
      if (index === 0) {
        return {
          children,
          props: {
            colSpan: 0,
          },
        };
      }
      if (index === 1) {
        return {
          children,
          props: {
            rowSpan: 2,
          },
        };
      }
      if (index === 2) {
        return {
          children,
          props: {
            rowSpan: 0,
          },
        };
      }
      return children;
    },
  },
];

const DAY = 24 * 60 * 60 * 1000;


const App = defineComponent(() => {

  const dataSource = ref([]);

  const getData = total => {
    const data = [];
    for (let i = 0; i < total; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi D2C 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  onMounted(() => {
    const data = getData(5);
    dataSource.value = (data);
  });

  return () => <Table columns={columns} dataSource={dataSource.value} pagination={false} />;
})
export default App
```

## API 参考

## Table

| 属性 | 说明                                                                  | 类型 | 默认值 | 版本 |
| --- |---------------------------------------------------------------------| --- | --- | --- |
| bordered | 是否展示外边框和列边框                                                         | boolean | false |
| childrenRecordName | 树形表格 dataSource 中每行元素中表示子级数据的字段，默认为 children                        | string | 'children' |
| className | 最外层样式名                                                              | string |  |
| clickGroupedRowToExpand | 点击分组表头行时分组内容展开或收起                                                   | boolean |  | **0.29.0** |
| columns | 表格列的配置描述，详见[Column](#Column)                                        | Column[] | [] |
| components | 覆盖 Table 的组成元素，如 table, body，row，td，th 等                            | <a target="_blank" href="https://github.com/DouyinFE/semi-design/blob/340c93e4e1612a879be869c43ad7a9a85ab5a302/packages/semi-ui/table/interface.ts#L200">TableComponents</a> |  |
| dataSource | 数据。**请为每一条数据分配一个独立的 key，或使用 rowKey 指定一个作为主键的属性名**                                    | RecordType[] | [] |
| defaultExpandAllRows | 默认是否展开所有行，动态加载数据时不生效                                                | boolean | false |
| defaultExpandAllGroupRows | 默认是否展开分组行，动态加载数据时不生效                                                | boolean | false | **1.30.0** |
| defaultExpandedRowKeys | 默认展开的行 key 数组，，动态加载数据时不生效                                           | Array<\*> | [] |
| direction | RTL、LTR 方向，默认值等于 ConfigProvider direction，可在此单独配置 Table 的 direction | 'ltr' \| 'rtl' |  | **2.31.0** |
| empty | 无数据时展示的内容                                                           | ReactNode | '暂无数据' |
| expandCellFixed | 展开图标所在列是否固定，与 Column 中的 fixed 取值相同                                  | boolean\|string | false |
| expandIcon | 自定义展开按钮，传 `false` 关闭默认的渲染                                           | boolean \| ReactNode<br/> \| (expanded: boolean) => ReactNode |  |
| expandedRowKeys | 展开的行，传入此参数时行展开功能将受控                                                 | (string \| number)[] |  |
| expandedRowRender | 额外的展开行。**请为每一条数据分配一个独立的 key，或使用 rowKey 指定一个作为主键的属性名**                                                               | (record: object, index: number, expanded: boolean) => ReactNode |  |
| expandAllRows | 是否展开所有行                                                             | boolean | false | **1.30.0** |
| expandAllGroupRows | 是否展开分组行                                                             | boolean | false | **1.30.0** |
| expandRowByClick | 点击行时是否展开可展开行                                                        | boolean | false | **1.31.0** |
| footer | 表格尾部                                                                | ReactNode<br/>\|(pageData: object) => ReactNode |  |
| getVirtualizedListRef | 返回虚拟化表格所用 VariableSizeList 的 ref，仅在配置 virtualized 时有效               | (ref: React.RefObject) => void |  | **1.20.0** |
| groupBy | 分组依据，一般为 dataSource 元素中某个键名或者返回值为字符串、数字的一个方法                        | string\|number<br/>\|(record: RecordType) => string\|number |  | **0.29.0** |
| hideExpandedColumn | 当表格可展开时，展开按钮默认会与第一列文案渲染在同一个单元格内，设为 false 时默认将展开按钮单独作为一列渲染           | boolean | true |
| indentSize | 树形结构 TableCell 的缩进大小                                                | number | 20 |
| keepDOM | 折叠行时是否不销毁被折叠的 DOM                                                   | boolean | false |
| loading | 页面是否加载中                                                             | boolean | false |
| pagination | 分页组件配置                                                              | boolean\|TablePaginationProps | true |
| prefixCls | 样式名前缀                                                               | string |  |
| renderGroupSection | 表头渲染方法                                                              | (groupKey?: string \| number, group?: string[] \| number[]) => ReactNode |  | **0.29.0** |
| renderPagination | 自定义分页器渲染方法                                                          | (paginationProps?: TablePaginationProps) => ReactNode |  | **1.13.0** |
| resizable | 是否开启伸缩列功能，需要进行伸缩的列必须要提供 width 的值                                    | boolean\|[Resizable](#Resizable) | false |
| rowExpandable | 传入该参数时，Table 作行渲染时会调用该函数，返回值用于判断该行是否可展开，返回值为 false 时关闭可展开按钮的渲染      | (record: object) => boolean |  | **0.27.0** |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数                                             | string<br/>\|(record: RecordType) => string | 'key' |
| rowSelection | 表格行是否可选择，详见 [rowSelection](#rowSelection)                           | object | - |
| scroll | 表格是否可滚动，配置滚动区域的宽或高，详见 [scroll](#scroll)                             | object | - |
| showHeader | 是否显示表头                                                              | boolean | true |
| size | 表格尺寸，影响表格行 `padding`                                                | "default"\|"middle"\|"small" | "default" | **1.0.0** |
| sticky | 固定表头                                                                | boolean \| { top: number } | false | **2.21.0** |
| title | 表格标题                                                                | ReactNode<br/>\|(pageData: RecordType[]) => ReactNode |  |
| virtualized | 虚拟化配置                                                               | Virtualized | false | **0.33.0** |
| virtualized.itemSize | 每行的高度                                                               | number\|(index: number) => number | 56 | **0.33.0** |
| virtualized.onScroll | 虚拟化滚动回调方法                                                           | ( scrollDirection?: 'forward' \| 'backward', scrollOffset?: number, scrollUpdateWasRequested?: boolean ) => void |  | **0.33.0** |
| onChange | 分页、排序、筛选变化时触发                                                       | ({ pagination: TablePaginationProps, <br/>filters: Array<\*>, sorter: object, extra: any }) => void |  |
| onExpand | 点击行展开图标时进行触发                                                        | (expanded: boolean, record: RecordType, DOMEvent: MouseEvent) => void |  | 第三个参数 DOMEvent 需版本 **>=0.28.0** |
| onExpandedRowsChange | 展开的行变化时触发                                                           | (rows: RecordType[]) => void |  |
| onGroupedRow | 类似于 onRow，不过这个参数单独用于定义分组表头的行属性                                      | (record: RecordType, index: number) => object |  | **0.29.0** |
| onHeaderRow | 设置头部行属性，返回的对象会被合并传给表头行                                              | (columns: Column[], index: number) => object |  |
| onRow | 设置行属性，返回的对象会被合并传给表格行                                                | (record: RecordType, index: number) => object |  |

一些上面用到的类型定义：

```typescript
// PaginationProps 为 Pagination 组件支持的 props
interface TablePaginationProps extends PaginationProps {
    position?: PaginationPosition;
    formatPageText?: FormatPageText;
}

type VirtualizedItemSizeFn = (index?: number) => number;
type VirtualizedOnScrollArgs = {
    scrollDirection?: 'forward' | 'backward';
    scrollOffset?: number;
    scrollUpdateWasRequested?: boolean;
};
type VirtualizedOnScroll = (object: VirtualizedOnScrollArgs) => void;

type Virtualized =
    | boolean
    | {
          itemSize?: number | VirtualizedItemSizeFn;
          onScroll?: VirtualizedOnScroll;
      };
```

RecordType 为 Table 和 Column 的泛型参数，默认为 object 类型。你可以这样使用 RecordType：

```typescript
import { ColumnProps } from 'table/interface';

interface Record {
    title?: string;
    dataIndex?: string;
    width?: number;
    render?: Function;
    key?: string;
    name?: string;
    age?: number;
    address?: string;
}

function App() {
    const columns: ColumnProps<Record>[] = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: 200,
            },
            // ...
    ];

    const data: Record[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
        },
        // ...
    ];

    return (
        <Table<Record>
            columns={columns}
            dataSource={data}
            // ...
        >
    );
}
```

## onHeaderRow / onRow 用法

`onHeaderRow` 中可以返回 th 支持的属性或者事件 `onRow` 中可以返回 tr 支持的属性或者事件

```jsx

import { Table } from '@kousum/semi-ui-vue';

() => (
    <Table
        onRow={(record, index) => {
            return {
                onClick: event => {}, // 点击行
                onMouseEnter: event => {}, // 鼠标移入行
                onMouseLeave: event => {}, // 鼠标移出行
                className: '',
                // ...
                // 其他可以作用于 tr 的属性或事件
            };
        }}
        onHeaderRow={(columns, index) => {
            return {
                onClick: event => {}, // 点击表头行
                onMouseEnter: event => {}, // 鼠标移入表头行
                onMouseLeave: event => {}, // 鼠标移出表头行
                className: '',
                // ...
                // 其他可以作用于 th 的属性或事件
            };
        }}
    />
);
```

## Column

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 设置列的对齐方式，在 RTL 时会自动切换 | 'left' \| 'right' \| 'center' | 'left' |
| className | 列样式名 | string |  |
| children | 表头合并时用于子列的设置 | Column[] |  |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number |  |
| dataIndex | 列数据在数据项中对应的 key，使用排序或筛选时必传，且需要保持不重复 | string |  |
| defaultFilteredValue | 筛选的默认值，值为已筛选的 value 数组 | any[] |  | **2.5.0** |
| defaultSortOrder | 排序的默认值，可设置为 'ascend'\|'descend'\|false | boolean\| string | false | **1.31.0** |
| ellipsis | 文本缩略，开启后 table-layout 会自动切换为 fixed | boolean\| { showTitle: boolean } | false | **2.34.0** |
| filterChildrenRecord | 是否需要对子级数据进行本地过滤，开启该功能后如果子级符合过滤标准，父级即使不符合仍然会保留 | boolean |  | **0.29.0** |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 | ReactNode |  |
| filterDropdownProps | 透传给 Dropdown 的属性，详情点击[Dropdown API](/zh-CN/show/dropdown#Dropdown) | object |  |
| filterDropdownVisible | 控制 Dropdown 的 visible，详情点击[Dropdown API](/zh-CN/show/dropdown#Dropdown) | boolean |  |
| filterIcon | 自定义 filter 图标 | boolean\|ReactNode\|(filtered: boolean) => ReactNode |  |
| filterMultiple | 是否多选 | boolean | true |
| filteredValue | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 | any[] |  |
| filters | 表头的筛选菜单项。 | Filter[] |  |
| fixed | 列是否固定，可选 true(等效于 left) 'left' 'right'，在 RTL 时会自动切换 | boolean\|string | false |
| key | React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 | string |  |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并 | (text: any, record: RecordType, index: number, { expandIcon?: ReactNode, selection?: ReactNode, indentText?: ReactNode }) => object\|ReactNode |  |
| renderFilterDropdown | 自定义筛选器 dropdown 面板，用法详见[自定义筛选器](#自定义筛选器) | (props?: RenderFilterDropdownProps) => React.ReactNode; | - | **2.52.0** |
| renderFilterDropdownItem | 自定义每个筛选项渲染方式，用法详见[自定义筛选项渲染](#自定义筛选项渲染) | ({ value: any, text: any, onChange: Function, level: number, ...otherProps }) => ReactNode | - | **1.1.0** |
| resize | 是否开启 resize 模式，只有 Table resizable 开启后此属性才会生效 | boolean |  | **2.42.0** |
| showSortTip | 是否展示排序提示, 如果设置了 sortOrder，排序受控，则该参数不会生效 | boolean | false | **2.65.0** |
| sortChildrenRecord | 是否对子级数据进行本地排序 | boolean |  | **0.29.0** |
| sortOrder | 排序的受控属性，外界可用此控制列的排序，可设置为 'ascend'\|'descend'\|false | boolean\| string | false |
| sorter | 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true。**必须给排序列设置一个独立的 dataIndex，必须为 dataSource 里面的每条数据项设置独立的 key** | boolean\|(r1: RecordType, r2: RecordType, sortOrder: 'ascend' \| 'descend') => number | true |
| sortIcon | 自定义 sort 图标，返回的节点控制了整个排序按钮，包含升序和降序。需根据 sortOrder 控制高亮行为 | (props: { sortOrder }) => ReactNode | | **2.50.0** |
| title | 列头显示文字。传入 function 时，title 将使用函数的返回值；传入其他类型，将会和 sorter、filter 进行聚合。需要搭配 useFullRender 获取函数类型中的 filter 等参数 | ReactNode\|({ filter: ReactNode, sorter: ReactNode, selection: ReactNode }) => ReactNode |  | Function 类型需要**0.34.0** |
| useFullRender | 是否完全自定义渲染，用法详见[完全自定义渲染](#完全自定义渲染)， 开启此功能会造成一定的性能损耗 | boolean | false | **0.34.0** |
| width | 列宽度 | string \| number |  |
| onCell | 设置单元格属性 | (record: RecordType, rowIndex: number) => object |  |
| onFilter | 本地模式下，确定筛选的运行函数。**必须给筛选列设置一个独立的 dataIndex，必须为 dataSource 里面的每条数据项设置独立的 key** | (filteredValue: any, record: RecordType) => boolean |  |
| onFilterDropdownVisibleChange | 自定义筛选菜单可见变化时回调 | (visible: boolean) => void |  |
| onHeaderCell | 设置头部单元格属性 | (column: RecordType, columnIndex: number) => object |  |

一些上面用到的类型定义：

```typescript
type Filter = {
    value: any;
    text: React.ReactNode;
    children?: Filter[];
};
```

## Column.onCell / onHeaderCell 用法

与 `onRow`、`onHeaderRow类似`，在 `column.onCell` `column.onHeaderCell` 中也能返回 td/th 支持的属性或事件

## rowSelection

| 属性             | 说明                                                                                                         | 类型                                                                                                 | 默认值 | 版本       |
|------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|--------|------------|
| className        | 所处列样式名                                                                                                 | string                                                                                               |        |            |
| disabled         | 表头的 `Checkbox` 是否禁用                                                                                   | boolean                                                                                              | false  | **0.32.0** |
| fixed            | 把选择框列固定在左边                                                                                         | boolean                                                                                              | false  |            |
| getCheckboxProps | 选择框的默认属性配置                                                                                         | (record: RecordType) => object                                                                       |        |            |
| hidden           | 是否隐藏选择列                                                                                               | boolean                                                                                              | false  | **0.34.0** |
| renderCell         | 自定义渲染勾选框                                                                                 | ({ selected: boolean, record: RecordType, originNode: JSX.Element, inHeader: boolean, disabled: boolean, indeterminate: boolean, index?: number, selectRow?: (selected: boolean, e: Event) => void, selectAll?: (selected: boolean, e: Event) => void }) => ReactNode |        |      **2.52.0**     |
| selectedRowKeys  | 指定选中项的 key 数组，需要和 onChange 进行配合                                                               | string[]                                                                                             |        |            |
| width            | 自定义列表选择框宽度                                                                                         | string\|number                                                                                       |        |            |
| onChange         | 选中项发生变化时的回调。第一个参数会保存上次选中的 row keys，即使你做了分页受控或更新了 dataSource [FAQ](#faq) | (selectedRowKeys: number[]\|string[], selectedRows: RecordType[]) => void                            |        |            |
| onSelect         | 用户手动点击某行选择框的回调                                                                                 | (record: RecordType, selected: boolean, selectedRows: RecordType[], nativeEvent: MouseEvent) => void |        |            |
| onSelectAll      | 用户手动点击表头选择框的回调，会选中/取消选中 dataSource 里的所有可选行                                       | (selected: boolean, selectedRows: RecordType[], changedRows: RecordType[]) => void                   |        |            |

## scroll

| 属性                     | 说明                                                     | 类型           | 默认值 | 版本      |
|--------------------------|--------------------------------------------------------|----------------|--------|-----------|
| scrollToFirstRowOnChange | 当分页、排序、筛选变化后是否自动滚动到表格顶部             | boolean        | false  | **1.1.0** |
| x                        | 设置横向滚动区域的宽，可以为像素值、百分比或 'max-content' | string\|number |        |           |
| y                        | 设置纵向滚动区域的高，可以为像素值                        | number         |        |           |

## pagination

翻页组件配置。`pagination` 建议不要使用字面量写法。

注意：pagination.onChange 设置后，Table onChange 不再响应分页器变化。

| 属性               | 说明                                                                                                                                    | 类型                                                                                          | 默认值   | 版本         |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------|--------------|
| currentPage        | 当前页码                                                                                                                                | number                                                                                        | -        |              |
| defaultCurrentPage | 默认的当前页码                                                                                                                          | number                                                                                        | 1        | **>=1.1.0**  |
| formatPageText     | 翻页区域文案自定义格式化，传 false 关闭文案显示；该项影响表格翻页区域左侧文案显示，不同于 `Pagination` 组件的 `showTotal` 参数，请注意甄别。 | boolean \| ({ currentStart: number, currentEnd: number, total: number }) => string\|ReactNode | true     | **>=0.27.0** |
| pageSize           | 每页条数                                                                                                                                | number                                                                                        | 10       |              |
| position           | 位置                                                                                                                                    | 'bottom'\|'top'\|'both'                                                                       | 'bottom' |              |
| total              | 数据总数                                                                                                                                | number                                                                                        | 0        | **>=0.25.0** |


其他配置详见[Pagination](/zh-CN/navigation/pagination#API参考)

## Resizable

`resizable` 对象型的参数，主要包括一些表格列伸缩时的事件方法。这些事件方法都可以返回一个对象，该对象会和最终的 column 合并。

| 属性          | 说明                     | 类型                                             | 默认值 |
|---------------|------------------------|--------------------------------------------------|--------|
| onResize      | 表格列改变宽度时触发     | (column: [Column](#Column)) => [Column](#Column) |        |
| onResizeStart | 表格列开始改变宽度时触发 | (column: [Column](#Column)) => [Column](#Column) |        |
| onResizeStop  | 表格列停止改变宽度时触发 | (column: [Column](#Column)) => [Column](#Column) |        |

## 方法

通过 ref 可以访问到 Table 提供的一些内部方法：

```jsx

import { Table } from '@kousum/semi-ui-vue';

function Demo() {
    const ref = useRef();

    useEffect(() => {
        ref.getCurrentPageData(); // => { dataSource: [/*...*/], groups: /*...*/ }
    }, []);

    return (
        <Table
            columns={
                [
                    /*...*/
                ]
            }
            dataSource={
                [
                    /*...*/
                ]
            }
            ref={ref}
        />
    );
}
```

| 名称                 | 描述                                                                                                         | 版本   |
|----------------------|------------------------------------------------------------------------------------------------------------|--------|
| getCurrentPageData() | 返回当前页的数据对象：{ dataSource: RecordType[], groups: Map<{groupKey: string, recordKeys: Set<string\>}> } | 0.37.0 |

## Accessibility

### ARIA

-   表格的 role 为 grid，树形表格的 role 为 treegrid
-   行的 role 为 row，单元格的 role 为 gridcell
-   表格新增了 aria-rowcount 和 aria-colcount 属性表示行和列的数量
-   行新增了 aria-rowindex 表示当前属于第几行，第一行为 1
-   树形表格的行具有 aria-level 表示当前行的树形层级，第一层为 1
-   可展开表格行具有 aria-expanded 属性，表示当前行是否展开
-   单元格的新增了 aria-colindex 表示当前格子属于第几列，第一列为 1
-   列的筛选和排序按钮添加了 aria-label，行的选择按钮添加了 aria-label 属性

## RTL/LTR

- Table 的 RTL 默认值为 [ConfigProvider](/zh-CN/other/configprovider) direction，可以通过 Table direction 覆盖
- Table 列的 align 与 fixed 属性会在 RTL 时会自动切换，left <-> right，固定列的 RTL 功能于 v2.31 版本支持
- Table 的树形数据暂不支持 RTL（[Chrome、Safari 浏览器表现与 Firefox 表现不同](https://codesandbox.io/s/table-rtl-treedata-uy7gzl?file=/src/App.jsx)）

## 文案规范

-   表格标题
    -   表格标题应清晰的让用户感知到表格的目的；
    -   为复杂表格添加描述，为用户提供更多关于表格的上下文信息；
    -   使用句子大小写；
-   列标题
    -   保持列标题简洁，建议使用 1-2 个词作为列标题；
    -   当列标题较长时，建议 2 行显示，剩余文字缩略并在 Tooltip 中显示完全；
    -   采用 Sentence case 的大小写规则；
    -   列标题使用句子大小写；
-   表格操作
    -   可以遵循 [Button 的文案规范](/zh-CN/input/button#%E6%96%87%E6%A1%88%E8%A7%84%E8%8C%83)
## 设计变量

<DesignToken/>

## FAQ

- **点击第二页的行选择按钮，会跳转到第一页？**

    Table 的 dataSource 更新后，会将页码重置到初始态。请检查数据源是否在组件渲染时发生了变化。

    ```typescript
    function App() {
        const [dataSource, setDataSource] = useState([]);

        useEffect(() => {
            // ✅ 正确
            const getData = () => {
                // fetch data
                const newData = fetch(/**/);
                // set data
                setDataSource(dataSource);
            };

            getData();
        }, []);

        // ❌ 错误
        const data = [];

        return <Table dataSource={data} columns={[/*...*/]} />;
    }
    ```

-   **筛选后的数据条数不对？**

    请检查你的筛选列和数据源是否配置正确。

    筛选列需设置独立的 dataIndex，同时 dataSource 需要设置独立的 key，请参考 dataSource API。否则筛选功能无法正常工作。

-   **表格数据为何没有更新？**  

     Table 组件目前所有参数都为浅层对比，也就是说如果该参数值类型为一个 Array 或者 Object，你需要手动改变其引用才能触发更新。同理，如果你不想触发额外更新，尽量不要直接在传参的时候使用字面量或是在 render 过程中定义引用型参数值：

    ```text
    // ...render() {
        <Table dataSource={[/*...*/]} columns={[/*...*/]} />}
    ```

    上述的写法在每次 render 时都会触发表格内部对数据的更新（会清空当前的选中行以及展开行 key 数组等）。为了性能及避免一些异常，**请尽量将一些引用型参数定义在 render 方法之外（如果使用了 hooks 请利用 useMemo 或者 useState 进行存储）。**

-   **为何我的表格行不能选中以及展开？**

    请指定 rowKey 或者给 dataSource 的每项设置一个各不相同的 "key" 属性。**表格内所有行相关的操作都需要使用到。**

-   **如何实现点击排序按钮时自定义排序或传参给服务端排序？**

    onChange 方法的入参包括 pagination、filters、sorter，用户可以根据 sorter 对 dataSource 进行自定义排序。

-   **如何给某一行添加 className？**

    使用 onRow 或 onHeaderRow。

-   **如何给 table cell 设置样式？**

    涉及到单个 cell 需要控制样式的，可以通过 column.onHeaderCell、column.onCell 控制。

-   **为何 rowSelection onChange 的第一个参数缓存了之前选中的 keys ？**

    这么做为了在分页受控时，在第一页选中数据后，去第二页选择数据，回到第一页后选择的 row keys 丢失的场景。如果不想用缓存的 keys，可以从当前 dataSource 过滤一遍，或者使用 rowSelection onChange 的第二个参数。

-   **支持单行选择吗**

    Table 暂不支持单行选则功能，用户可以通过自定义方式实现单选。实现方式移步 Table FAQ 文档。

-   **Table 是如何实现的，我想了解更多细节？**

    查看 <a href="https://bytedance.feishu.cn/docs/doccnqLgNefWGMZHFz7j70GKqpY" target="_blank">Semi Table 组件设计方案</a>了解更多。

查看更多 Table FAQ 和用例，点击 <a href="https://bytedance.feishu.cn/docs/doccnsYk1qUmsIDP1ihJ9zjG0Ch" target="_blank">Table FAQ</a>

<!-- ## 相关物料
```material
196,110,104,113,226
``` -->
