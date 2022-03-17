import {defineComponent, ref, h, Fragment, VNode, cloneVNode} from 'vue'
import cls from 'classnames';
import { get as lodashGet, isFunction, isNumber } from 'lodash';
import Avatar, {AvatarGroupOverlapFrom, AvatarGroupShape, AvatarGroupSize} from './Index';
import { AvatarGroupProps } from './interface';
import { cssClasses, strings } from '@douyinfe/semi-foundation/avatar/constants';

const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const overlapFromSet = strings.OVERLAP_FROM;
const prefixCls = cssClasses.PREFIX;

export const vuePropsType = {
  style: [Object, String],
  className: String,
  shape: {type:String,default:'circle'},
  size: {type:String,default:'medium'},
  overlapFrom: {type:String,default:'start'},
  maxCount: Number,
  renderMore: Function
}
const AvatarGroup = defineComponent<AvatarGroupProps>((props, {slots}) => {



  function getMergeAvatars(avatars: VNode[]) {
    const { maxCount } = props;
    let renderAvatars = avatars;
    const restNumber = avatars.length - maxCount;

    const normalAvatars = avatars.slice(0, maxCount);
    const restAvatars = avatars.slice(maxCount);

    if (restNumber > 0) {
      const more = renderMoreAvatar(restNumber, restAvatars);
      normalAvatars.push(more);
      renderAvatars = normalAvatars;
    }
    return renderAvatars;
  }

  function renderMoreAvatar(restNumber: number, restAvatars: VNode[]) {
    const { renderMore } = props;
    const moreCls = cls(`${prefixCls}-item-more`);
    let moreAvatar = <Avatar className={moreCls} key="_+n">{`+${restNumber}`}</Avatar>;
    if (isFunction(renderMore)) {
      moreAvatar = <Fragment key="_+n">{renderMore(restNumber, restAvatars)}</Fragment>;
    }
    return moreAvatar;
  }

  return () => {
    const children = slots.default?slots.default():null;
    function getAllAvatars() {
      return Array.isArray(children) ? children : [children];
    }
    // eslint-disable-next-line no-unused-vars
    const { maxCount, overlapFrom, size, shape, renderMore, ...rest } = props;
    let inner;
    const groupCls = cls({
      [`${prefixCls}-group`]: true,
    });
    if (children) {
      const avatars = getAllAvatars();
      inner = (isNumber(maxCount) ? getMergeAvatars(avatars) : avatars).map((itm, index) => {
        const className = cls(lodashGet((itm as any).props, 'className'), {
          [`${prefixCls}-item-start-${index}`]: overlapFrom === 'start',
          [`${prefixCls}-item-end-${index}`]: overlapFrom === 'end',
        });
        return cloneVNode((itm as any), { ...rest, className, size, shape, key: index });
      });

    }

    return <div class={groupCls}>{inner}</div>;
  }
})

AvatarGroup.props = vuePropsType

export default AvatarGroup

