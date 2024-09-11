import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';
import { afterEach, beforeEach, expect, test } from 'vitest';
import Comp from './HotKeysDemo';
import { render } from '@testing-library/vue';

beforeEach(() => {
  document.body.innerHTML = '';
  // Avoid `attachTo: document.body` Warning
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
});
afterEach(() => {
    const div = document.getElementById('container');
    if (div) {
        document.body.removeChild(div);
    }
});
test('HotKeys HotKeys-custom className & style', async () => {
    render(<Comp {...{
        className: 'test',
        style: {
            color: 'red',
        },
        hotKeys: ['r']
    }}/>)

    expect(Boolean(document.querySelector(`.${BASE_CLASS_PREFIX}-hotKeys.test`))).toEqual(true);
    expect((document.querySelector(`.${BASE_CLASS_PREFIX}-hotKeys`)! as HTMLElement).style['color']==="red").toEqual(true);

})
