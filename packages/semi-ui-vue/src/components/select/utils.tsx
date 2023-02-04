import { defineComponent, ref, h, Fragment, VNode } from 'vue';
import warning from '@douyinfe/semi-foundation/utils/warning';
import type { OptionProps } from './option';
import type { OptionGroupProps } from './optionGroup';

const generateOption = (child: VNode, parent: any, index: number): OptionProps => {
  const childProps = child.props;
  if (!child || !childProps) {
    return null;
  }

  const option = {
    value: childProps.value,
    // Drop-down menu rendering priority label value, children, value in turn downgrade
    label:
      childProps.label ||
      // @ts-ignore
      (typeof child.children === 'object' && child.children.default ? child.children.default()[0].children : null) ||
      childProps.value,
    _show: true,
    _selected: false,
    _scrollIndex: index,
    ...childProps,
    _parentGroup: parent,
  };
  return option;
};

const getOptionsFromGroup = (selectChildren: VNode[]) => {
  let optionGroups: OptionGroupProps[] = [];
  let options: OptionProps[] = [];

  const emptyGroup = { label: '', children: [], _show: false };

  // TODO 不同点
  // if (!Array.isArray(selectChildren)){
  //   selectChildren = selectChildren[0].children as VNode[]
  // }

  // avoid null
  // eslint-disable-next-line max-len
  // let childNodes = React.Children.toArray(selectChildren) as React.ReactElement[];
  let childNodes = selectChildren.filter((childNode) => {
    return childNode && childNode.props;
  });

  let type = '';
  let optionIndex = -1;

  childNodes.forEach((child: VNode) => {
    // @ts-ignore
    if (child.type?.name === 'isSelectOption') {
      type = 'option';
      optionIndex++;
      const option = generateOption(child, undefined, optionIndex);
      emptyGroup.children.push(option);
      options.push(option);
      // @ts-ignore
    } else if (child.type?.name === 'isSelectOptionGroup') {
      type = 'group';
      // Avoid saving children (reactNode) by... removing other props from the group except children, causing performance problems
      // eslint-disable-next-line prefer-const
      let { ...restGroupProps } = child.props;
      // @ts-ignore
      let children = child.children.default ? child.children.default() : [];
      // children = React.Children.toArray(children);
      if (Array.isArray(children[0])) {
        children = children[0];
      }

      const childrenOption = children.map((option: VNode) => {
        optionIndex++;
        return generateOption(option, restGroupProps, optionIndex);
      });
      const group = {
        ...child.props,
        children: childrenOption,
        key: child.key,
      };
      optionGroups.push(group);
      options = options.concat(childrenOption);
    } else {
      warning(true, '[Semi Select] The children of `Select` should be `Select.Option` or `Select.OptionGroup`');
    }
  });
  if (type === 'option') {
    optionGroups = [emptyGroup];
  }
  return { optionGroups, options };
};

export { generateOption, getOptionsFromGroup };
