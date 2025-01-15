---
localeCode: zh-CN
order: 69
category: Plus
title:  Cropper 图片裁切
icon: doc-cropper
dir: column
brief: 通过设定裁切框的宽高比例，自由裁切图片
showNew: true
---

## 使用场景

Cropper 用于裁切图片，支持自定义裁切框样式，可通过拖动调整裁切框位置，被裁切图片位置；可缩放，旋转被裁切图片。


## 代码演示

### 如何引入

Cropper 从 v2.73.0 开始支持

```jsx
import { Cropper } from '@kousum/semi-ui-vue';
```

### 基本用法

通过 `sr` 设置被裁切的图片; 可通过 `shape` 设置裁切框形状，默认为方形。

```jsx live=true dir=column noInline=true height="1400"
import { Cropper, Button, RadioGroup, Radio } from '@kousum/semi-ui-vue';
import { defineComponent, ref,  } from 'vue';



const containerStyle = {
  width: '550px',
  height: '300px',
  margin: '20px',
}

const Demo = defineComponent(()=>{

  const ref_ = ref(null);
  const shape = ref('rect');
  function setShape(v){
    shape.value = v
  }

  const onButtonClick = () => {
    const value = ref_.value.getCropperCanvas();
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(value);
  };

  const onShapeChange = (e) => {
    setShape(e.target.value);
  }

  return ()=><>
    <RadioGroup onChange={onShapeChange} value={shape.value}>
      <Radio value={'rect'}>rect</Radio>
      <Radio value={'round'}>round</Radio>
      <Radio value={'roundRect'}>roundRect</Radio>
    </RadioGroup>
    <Cropper
      ref={ref_}
      src={'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/image.png'}
      style={containerStyle}
      shape={shape.value}
    />
    <Button onClick={onButtonClick}>裁切</Button>
    <div id='previewContainer' />
  </>;
})

export default Demo
```

### 自定义裁切框比例

可通过 `defaultAspectRatio` 初始的裁切框比例（默认为 1）。可通过 `aspectRatio` 设置固定的裁切框比例。

设置 `defaultAspectRatio`仅对初始的裁切框比例生效， 拖动时，裁切框比例会随着拖动而变化。

设置 `aspectRatio` 时，裁切框比例固定，拖动时将裁切框将以此比例变化。

```jsx live=true dir=column noInline=true height="1400"
import { Cropper, Button, RadioGroup, Radio } from '@kousum/semi-ui-vue';
import { defineComponent, ref } from 'vue';

const containerStyle = {
  width: '550px',
  height: '300px',
  margin: '20px',
}

const Demo = defineComponent(()=>{

  const ref_ = ref(null);
  const shape = ref('rect');
  function setShape(v){
    shape.value = v
  }

  const onButtonClick = () => {
    const value = ref_.value.getCropperCanvas();
    const previewContainer = document.getElementById('previewContainer-aspect');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(value);
  };

  return ()=> <>
    <Cropper
      aspectRatio={3/4}
      ref={ref_}
      src={'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/image.png'}
      style={containerStyle}
    />
    <Button onClick={onButtonClick}>裁切</Button>
    <div id='previewContainer-aspect' />
  </>;
})

export default Demo
```

### 受控旋转/缩放图片

通过 `rotate` 和 `zoom` 控制图片旋转和缩放, 可通过 `onZoomChange` 拿到最新的 `zoom` 值。

```jsx live=true dir=column noInline=true height="1400"
import { Cropper, Button, Slider } from '@kousum/semi-ui-vue';
import { defineComponent, ref } from 'vue';

const containerStyle = {
  width: '550px',
  height: '300px',
  margin: '20px',
}

const actionStyle = {
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content'
}


const Demo = defineComponent(()=>{

  const rotate = ref(0);
  function setRotate(v){
    rotate.value = v
  }
  const zoom = ref(1);
  function setZoom(v){
    zoom.value = v
  }
  const ref_ = ref();

  const onZoomChange = (value) => {
    setZoom(value);
  }

  const onSliderChange = (value) => {
    setRotate(value);
  }

  const onButtonClick = () => {
    const value = ref_.value.getCropperCanvas();
    const previewContainer = document.getElementById('previewContainer-control');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(value);
  }

  return ()=>(
    <div id='cropper-container'>
      <Cropper
        ref={ref_}
        src={'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/image.png'}
        style={containerStyle}
        rotate={rotate.value}
        zoom={zoom.value}
        onZoomChange={onZoomChange}
      />
      <div style={actionStyle} >
        <span>Rotate</span>
        <Slider
          style={{ width: '500px'}}
          value={rotate.value}
          step={1}
          min={-360}
          max={360}
          onChange={onSliderChange}
        />
      </div>
      <div style={actionStyle} >
        <span>Zoom</span>
        <Slider
          style={{ width: '500px'}}
          value={zoom.value}
          step={0.1}
          min={0.1}
          max={3}
          onChange={onZoomChange}
        />
      </div>
      <br />
      <Button onClick={onButtonClick}>裁切</Button>
      <br />
      <div
        // style={{ background: 'pink' }} 
      >
        <div id='previewContainer-control'
        />
      </div>
    </div>
  );
})

export default Demo
```

### 裁切框设置

可通过 `cropperBoxStyle`, `cropperBoxClassName` 自定义裁切框样式。可通过 `showResizeBox` 设置是否展示裁切框边角的调整块。

```jsx live=true dir=column noInline=true height="1400"
import { Cropper, Button, Switch } from '@kousum/semi-ui-vue';
import { defineComponent, ref } from 'vue';

const containerStyle = {
  width: '550px',
  height: '300px',
  margin: '20px',
}

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content'
}


const Demo = defineComponent(()=>{
  const ref_ = ref(null);

  const onButtonClick = () => {
    const value = ref_.value.getCropperCanvas();
    const previewContainer = document.getElementById('previewContainer-cropperBox');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(value);
  }

  return ()=><>
    <strong>showResizeBox = false，并修改边框颜色</strong>
    <Cropper
      ref={ref_}
      src={'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/image.png'}
      style={containerStyle}
      cropperBoxStyle={{ outlineColor: 'var(--semi-color-bg-0)'}}
      showResizeBox={false}
    />
    <Button onClick={onButtonClick}>裁切</Button>
    <div id='previewContainer-cropperBox'/>
  </>;
})
export default Demo
```

### API

| 属性 | 说明 | 类型 | 默认值 |
|-----|------|-----|------|
| aspectRatio | 裁切框比例 | number | - |
| className | 类名 | string | - |
| cropperBoxClassName | 裁切框类名 | string | - |
| cropperBoxStyle | 裁切框样式 | CSSProperties | - |
| defaultAspectRatio | 初始裁切框比例 | number | 1 |
| imgProps | 透传给 img 标签的属性 | object | - |
| fill | 裁切结果中非图片部分的填充色 | string | 'rgba(0, 0, 0, 0)'  |
| maxZoom | 最大缩放倍数 | number | 3 |
| minZoom | 最小缩放倍数 | number | 0.1 |
| onZoomChange | 缩放回调 | (zoom: number) => void | - |
| rotate | 旋转角度 | number | - |
| shape | 裁切框形状 | 'rect' \| 'round' \| 'roundRect' | 'rect' |
| src | 图片地址 | string | - |
| showResizeBox | 是否展示调整块 | boolean | true |
| style | 样式  | CSSProperties | - |
| zoom | 缩放比例 | number | - |
| zoomStep | 缩放步长 | number | 0.1 |

### Methods

绑定在组件实例上的方法，可以通过 ref 调用实现某些特殊交互

| Name    | Description  |
|---------|--------------|
| getCropperCanvas  | 获取裁剪图片的 canvas |

## 设计变量

<DesignToken/>
