import { defineComponent, ref, h, Fragment, CSSProperties, VNode, ComponentObjectPropsOptions, PropType } from 'vue';
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/tag/constants';
import Tag from './index';
import Popover, { PopoverProps } from '../popover';
import { AvatarShape, TagProps } from './interface';
import { CombineProps, VueJsxNode, VueJsxNodeSingle } from '../interface';
import { omit } from 'lodash';

const prefixCls = cssClasses.PREFIX;
const tagSize = strings.TAG_SIZE;
const avatarShapeSet = strings.AVATAR_SHAPE;

export interface TagGroupProps {
  style?: CSSProperties;
  className?: string;
  maxTagCount?: number;
  restCount?: number;
  tagList?: any[];
  size?: 'small' | 'large';
  showPopover?: boolean;
  popoverProps?: PopoverProps;
  avatarShape?: AvatarShape;
  mode?: string; // TODO: This API is not in the check file
  onTagClose?: (tagChildren: VueJsxNode, event: MouseEvent, tagKey: string | number) => void;
  onPlusNMouseEnter?: () => void;
}

export const vuePropsType: CombineProps<TagGroupProps> = {
  maxTagCount: Number,
  restCount: Number,
  tagList: Array,
  showPopover: Boolean,
  popoverProps: Object,
  mode: String, // TODO: This API is not in the check file
  style: {
    type: [Object, String] as PropType<TagGroupProps['style']>,
    default: {},
  },
  className: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<TagGroupProps['size']>,
    default: tagSize[0] as any,
  },
  avatarShape: {
    type: String as PropType<TagGroupProps['avatarShape']>,
    default: 'square',
  },
  onTagClose: Function as PropType<TagGroupProps['onTagClose']>,
  onPlusNMouseEnter: Function as PropType<TagGroupProps['onPlusNMouseEnter']>,
};
const Group = defineComponent({
  props: { ...vuePropsType },
  name: 'TagGroup',
  setup(props, { slots }) {
    function renderNTag(n: number, restTags: (TagProps | VNode)[]) {
      const { size, showPopover, popoverProps, onPlusNMouseEnter } = props;
      let nTag = (
        <Tag closable={false} size={size} color="grey" style={{ backgroundColor: 'transparent' }} key="_+n"
             onMouseenter={onPlusNMouseEnter}>
          +{n}
        </Tag>
      );

      if (showPopover) {
        nTag = (
          <Popover
            showArrow
            content={restTags as VueJsxNode}
            trigger="hover"
            position="top"
            autoAdjustOverflow
            className={`${prefixCls}-rest-group-popover`}
            {...popoverProps}
            key="_+n_Popover"
          >
            {nTag}
          </Popover>
        );
      }
      return nTag;
    }

    function renderMergeTags(tags: (TagProps | VNode)[]) {
      const { maxTagCount, tagList, restCount } = props;
      const n = restCount ? restCount : tagList.length - maxTagCount;
      let renderTags: (TagProps | VNode)[] = tags;

      const normalTags: (TagProps | VNode)[] = tags.slice(0, maxTagCount);
      const restTags = tags.slice(maxTagCount);
      let nTag = null;
      if (n > 0) {
        nTag = renderNTag(n, restTags);
        normalTags.push(nTag);
        renderTags = normalTags;
      }
      return renderTags;
    }

    function renderAllTags() {
      const { tagList, size, mode, avatarShape, onTagClose } = props;
      const renderTags: (TagProps | VNode)[] = tagList.map((tag, index): TagProps | VNode => {
        if (mode === 'custom') {
          return tag;
        }
        const newTag = { ...(tag as TagProps) };
        if (!(tag as TagProps).size) {
          (tag as TagProps).size = size;
        }
        if (!(tag as TagProps).avatarShape) {
          (tag as TagProps).avatarShape = avatarShape;
        }

        if (!(newTag as TagProps).tagKey) {
          //@ts-ignore TODO
          if (typeof (newTag as TagProps).children === 'string' || typeof (newTag as TagProps).children === 'number') {
            //@ts-ignore TODO
            (newTag as TagProps).tagKey = (newTag as TagProps).children as string | number;
          } else {
            (newTag as TagProps).tagKey = Math.random();
          }
        }
        return <Tag {...(omit(newTag, 'children') as TagProps)} key={(newTag as TagProps).tagKey} onClose={(tagChildren, e, tagKey) => {
          if ((newTag as TagProps).onClose) {
            (newTag as TagProps).onClose(tagChildren, e, tagKey);
          }
          onTagClose && onTagClose(tagChildren, e, tagKey);
        }} >
          {{
            default: () => tag.children,
          }}
        </Tag>;
      });
      return renderTags;
    }

    return () => {
      const { style, className, maxTagCount, size } = props;

      const groupCls = classNames(
        {
          [`${prefixCls}-group`]: true,
          [`${prefixCls}-group-max`]: maxTagCount,
          [`${prefixCls}-group-small`]: size === 'small',
          [`${prefixCls}-group-large`]: size === 'large',
        },
        className
      );

      const tags = renderAllTags();
      const tagContents = typeof maxTagCount === 'undefined' ? tags : renderMergeTags(tags);

      return (
        <div style={style} class={groupCls}>
          {tagContents}
        </div>
      );
    };
  },
});

export default Group;
