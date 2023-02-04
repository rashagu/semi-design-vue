import { expect, test, describe } from 'vitest';
import Comp, {ItemDdemo} from './CascaderDemo';
import { mount } from '@vue/test-utils';

test('CascaderDemo qwe', async () => {
  expect(Comp).toBeTruthy();
  const wrapper0 = mount(Comp, {});
  const profileLink0 = wrapper0.findAll('.semi-cascader-option');
  expect(profileLink0[1].text()).toEqual('浙江省');

  const wrapper = mount(ItemDdemo, {});
  const profileLink = wrapper.findAll('.semi-cascader-option');
  expect(profileLink[1].text()).toEqual('浙江省');
});

