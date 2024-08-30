---
localeCode: zh-CN
order: 80
category: 反馈类
title: Toast 提示
icon: doc-toast
width: 65%
brief: Toast 提示是对用户的操作做出及时反馈，由用户的操作触发，反馈信息可以是操作的结果状态，如成功、失败、出错、警告等。
---

## 代码演示

### 如何引入

```jsx import
import { Toast } from '@kousum/semi-ui-vue';
```

### 普通提示

通过调用 Toast的相关 method 可以实现弹出提示。
推荐设置 stack 属性应用堆叠样式到同屏多个 Toast，Hover 展开，可有效防止一次性弹出多个并列 Toast 对用户造成干扰 (该 API在 v2.42.0 后支持)

```jsx live=true noInline=true

import lodash from 'lodash';
import { Toast, Button } from '@kousum/semi-ui-vue';

const { throttle } = lodash
function Demo() {
    const opts = {
        content: 'Hi, Bytedance dance dance',
        duration: 3,
        stack: true,
    };

    const handleClose = () => {
        throttled.cancel();
    };
    const throttleOpts = {
        content: 'Hi, Bytedance dance dance',
        duration: 10,
        onClose: handleClose,
        stack: true,
    };
    const throttled = throttle(() => Toast.info(throttleOpts), 10000, { trailing: false });

    return (
        <div>
            <Button onClick={() => Toast.info(opts)}>Display Toast</Button>
            <br />
            <br />
            <Button onClick={throttled}>Throttled Toast</Button>
        </div>
    );
}

export default Demo
```


### 其他提示类型

包括成功、失败、警告

```jsx live=true noInline=true

import { Toast, Button } from '@kousum/semi-ui-vue';

function Demo() {
    let opts = {
        content: 'Hi, Bytedance dance dance',
        duration: 3,
    };

    return (
        <>
            <Button style={{ color: `var(--semi-color-success)` }} onClick={() => Toast.success('Hi,Bytedance dance dance')}>Success</Button>
            <br />
            <br />
            <Button type="warning" onClick={() => Toast.warning(opts)}>
                Warning
            </Button>
            <br />
            <br />
            <Button type="danger" onClick={() => Toast.error(opts)}>
                Error
            </Button>
        </>
    );
}
export default Demo
```

### 多色样式

可以使用 `theme` 设置浅色填充样式提高与界面的对比，默认为 'normal' 的白色模式。

```jsx live=true noInline=true

import { Toast, Button } from '@kousum/semi-ui-vue';

function Demo() {
    let opts = {
        content: 'Hi, Bytedance dance dance',
        duration: 3,
        theme: 'light',
    };

    return (
        <>
            <Button onClick={() => Toast.info(opts)}>Info</Button>
            <br />
            <br />
            <Button style={{ color: `var(--semi-color-success)` }} onClick={() => Toast.success(opts)}>Success</Button>
            <br />
            <br />
            <Button type="warning" onClick={() => Toast.warning(opts)}>
                Warning
            </Button>
            <br />
            <br />
            <Button type="danger" onClick={() => Toast.error(opts)}>
                Error
            </Button>
        </>
    );
}
export default Demo
```



### 链接文本

配合 Typography 可以自定义链接文本，用来配合更复杂的场景的使用。

```jsx live=true noInline=true

import { Toast, Typography, Button } from '@kousum/semi-ui-vue';

function Demo() {
    const { Text } = Typography;

    let opts = {
        content: (
            <span>
                <Text>Hi, Bytedance dance dance</Text>
                <Text link style={{ marginLeft: 12 }}>
                    更多
                </Text>
            </span>
        ),
        duration: 3,
    };

    let multiLineOpts = {
        content: (
            <>
                <div>Hi, Bytedance dance dance</div>
                <div style={{ marginTop: 8 }}>
                    <Text link>查看详情</Text>
                    <Text link style={{ marginLeft: 20 }}>
                        一会再看
                    </Text>
                </div>
            </>
        ),
        duration: 3,
    };

    return (
        <>
            <Button onClick={() => Toast.info(opts)}>Display Toast</Button>
            <br />
            <br />
            <Button onClick={() => Toast.info(multiLineOpts)}>Display Multi-line Toast</Button>
        </>
    );
}
export default Demo
```

### 修改延时

自定义时长 10s，默认时长为 3s

```jsx live=true noInline=true

import { Toast, Button } from '@kousum/semi-ui-vue';

function Demo() {
    let opts = {
        content: 'Hi, Bytedance dance dance',
        duration: 10,
    };

    return <Button onClick={() => Toast.info(opts)}>Close After 10s</Button>;
}
export default Demo
```

### 手动关闭

当 `duration` 设置为 0 时，toast 不会自动关闭，此时必须通过手动关闭。

```jsx live=true noInline=true hideInDSM

import { Toast, Button } from '@kousum/semi-ui-vue';
import { defineComponent, ref } from 'vue';


const Demo = defineComponent(() => {
  const toastId = ref();

  function show() {
    if (toastId.value) {
      return;
    }
    let id = Toast.info(opts);
    toastId.value = (id);
  }

  function hide() {
    Toast.close(toastId.value);
    destroy();
  }

  function destroy() {
    toastId.value = (null);
  }

  let opts = {
    content: 'Not auto close',
    duration: 0,
    onClose: destroy,
  };
  return () => (
    <>
      <Button type="primary" onClick={show}>
        Show Toast
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={hide}>
        Hide Toast
      </Button>
    </>
  );
})

export default Demo
```

### 更新消息内容

可以通过唯一的 `id` 来更新内容。

```jsx live=true noInline=true hideInDSM

import { Toast, Button } from '@kousum/semi-ui-vue';

function Demo() {
    function show() {
        const id = 'toastid';
        Toast.info({ content: 'Update Content By Id', id });
        setTimeout(() => {
            Toast.success({ content: 'Id By Content Update', id });
        }, 1000);
    }

    return (
        <Button type="primary" onClick={show}>
            Update Content By Id
        </Button>
    );
}

export default Demo
```

### 销毁所有

全局销毁 ( >= 0.25.0 )：

-   `Toast.destroyAll()`

### 消费 Context

通过 Toast.useToast 创建支持读取 context 的 contextHolder。此时的 toast 会渲染在 contextHolder 所在的节点处。

```jsx live=true noInline=true hideInDSM

import { Toast, Button } from '@kousum/semi-ui-vue';
import { defineComponent, inject, provide, shallowRef } from 'vue';

const Consumer = defineComponent(() => {
  const value = inject('value', shallowRef(''))
  return () => <div>{`ReachableContext: ${value.value}`}</div>
});


const Demo = defineComponent(() => {

  const [toast, contextHolder] = Toast.useToast();
  const config = {
    duration: 0,
    title: 'This is a success message',
    content: <Consumer></Consumer>,
  };

  const value = shallowRef('Light')
  provide('value', value)
  return () => (
    <>
      <div>
        <Button
          onClick={() => {
            toast.success(config);
          }}
        >
          Hook Toast
        </Button>
      </div>
      {contextHolder.value}
    </>
  );
})

export default Demo
```


### 创建不同配置 Toast

<Notice>
常用于覆盖全局配置
</Notice>

-   `ToastFactory.create(config) => Toast`  
    如果您的应用中需要使用不同 config 的 Toast，可以使用 ToastFactory.create(config)创建新的 Toast (>= 1.23):

```jsx live=true noInline=true

import { Button, ToastFactory, Toast } from '@kousum/semi-ui-vue';

function Demo() {
    const ToastInCustomContainer = ToastFactory.create({
        getPopupContainer: () => document.getElementById('custom-toast-container'),
    });
    return (
        <div>
            <Button onClick={() => Toast.info('Toast')}>Default Toast</Button>
            <br />
            <br />
            <Button onClick={() => ToastInCustomContainer.info('Toast in some container')}>
                Toast in custom container
            </Button>
            <div id="custom-toast-container">custom container</div>
        </div>
    );
}
export default Demo
```

全局销毁 ( >= 0.25.0 )：

-   `Toast.destroyAll()`

消费 Context ( >= 1.2.0 )：

-   `Toast.useToast()`  
    当你需要使用 Context 时，可以通过 Toast.useToast 创建一个 contextHolder 插入相应的节点中。此时通过 hooks 创建的 Toast 将会得到 contextHolder 所在位置的所有上下文。创建的 toast 对象拥有与以下方法：`info`, `success`, `warning`, `error`, `close`。


## API 参考

组件提供的静态方法，使用方式和参数如下：展示：可以直接传入 `options` 对象或 `string`：

**全局配置, 在调用前提前配置，全局一次生效 ( >= 0.25.0 )**
-   `Toast.config(config)` 

**直接展示 Toast**
-   `Toast.info(options || string)`
-   `Toast.error(options || string)`
-   `Toast.warning(options || string)`
-   `Toast.success(options || string)`

**`info` `error` `warning` `success` 返回值为`toastId`, 可用于手动关闭 **

`const toastId = Toast.info({ /*...options*/ })`
-   `Toast.close(toastId)` 手动关闭 






## Options

**Toast Options 支持以下 API 及 Config 中的 API**

| 属性           | 说明            | 类型       | 默认值 | 版本     |
|--------------|---------------|----------| --- |--------|
| content      | 提示内容          | ReactNode | '' |        |
| icon         | 自定义图标         | ReactNode |  | 0.25.0 |
| showClose    | 是否展示关闭按钮      | boolean  | true | 0.25.0 |
| textMaxWidth | 内容的最大宽度       | number \| string | 450 | 0.25.0 |
| onClose      | toast 关闭的回调函数 | () => void |  |        |
| stack        | 是否堆叠 Toast    | boolean  | false | 2.42.0 |
| id           | 自定义 ToastId   | number   |  |  |

## Config

**以下 API 支持全局配置，用于更改当前 Toast 的默认配置**

| 属性 | 说明                                                                                                                    | 类型 | 默认值 | 版本     |
| --- |-----------------------------------------------------------------------------------------------------------------------| --- | --- |--------|
| bottom | 弹出位置 bottom                                                                                                           | number \| string | - | 0.25.0 |
| left | 弹出位置 left                                                                                                             | number \| string | - | 0.25.0 |
| right | 弹出位置 right                                                                                                            | number \| string | - | 0.25.0 |
| top | 弹出位置 top                                                                                                              | number \| string | - | 0.25.0 |
| zIndex | 弹层 z-index 值                                                                                                          | number | 1010 |        |
| theme | 填充样式，支持 `light`, `normal`                                                                                             | string | `normal` | 2.54.0 |
| duration | 自动关闭的延时，单位 s，设为 0 时不自动关闭                                                                                              | number | 3 |        |
| getPopupContainer | 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 container 和 内部的 .semi-toast-wrapper `position: relative`, 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。 | () => HTMLElement \| null | () => document.body | 0.34.0 |

## Accessibility

### ARIA

- Toast 的 role 为 alert

## 文案规范




- 保持简洁
- 句尾不使用句号
- 使用 名词 + 动词 的格式进行说明

| ✅ 推荐用法 | ❌ 不推荐用法 |   
| --- | --- | 
| Language added | New language has been added successfully |
| Ticket transfer failed | Can't transfer ticket |

- 提供动作的提示消息
  - 只提供一个动作
  - 不使用类似于「已读」类的动作，例如 OK, Got it, Dismiss, Cancel


## 设计变量

<DesignToken/>
