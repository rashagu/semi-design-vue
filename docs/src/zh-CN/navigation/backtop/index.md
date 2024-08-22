---
localeCode: zh-CN
order: 44
category: 导航类
title: BackTop 回到顶部
icon: doc-backtop
---

## 代码演示

### 如何引入

```jsx import
import { BackTop } from '@kousum/semi-ui-vue';
```

### 基本用法

BackTop 预设了基本的返回按钮，可以直接调用。

```jsx live=true

import { BackTop } from '@kousum/semi-ui-vue';

export default ()=>(
  <div style={{height: '1900px'}}>
    <span>Scroll down to see the bottom-right gray button.</span>
    <BackTop />
  </div>
)
```

### 自定义样式

BackTop 预设了默认样式，包括：距离底部 50px，距离右侧 100px，`box-sizing` 为 `border-box`，内容水平居中。样式可以覆盖。

```jsx live=true

import { BackTop } from '@kousum/semi-ui-vue';
import { IconArrowUp } from '@kousum/semi-icons-vue';

export default ()=>{

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    backgroundColor: '#0077fa',
    color: '#fff',
    bottom: '100px',
  };

  return (
    <div style={{height: '1900px'}}>
                <span>
                    Scroll down to see the bottom-right <span style={{ color: '#0077fa' }}>blue circular</span> button.
                </span>
      <BackTop style={style}>
        <IconArrowUp />
      </BackTop>
    </div>
  );
}
```

## API 参考

| 属性             | 说明                                                | 类型     | 默认值       |
| ---------------- | --------------------------------------------------- | -------- | ------------ |
| className        | 类名                                                | string   | -            |
| duration         | 滚动到顶部的时间                                    | number   | 450          |
| style            | 样式名                                              | CSSProperties   | -            |
| target           | 返回值为需要监听其滚动事件的元素对应 DOM 元素的函数 | () => any | () => window |
| visibilityHeight | 出现 BackTop 需要达到的滚动高度                     | number   | 400          |
| onClick          | 点击事件的回调函数                                  | (e: MouseEvent) => void | -            |

## 设计变量
<DesignToken/>
