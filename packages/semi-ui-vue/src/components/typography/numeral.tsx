import type { ComponentObjectPropsOptions } from 'vue';
import { CSSProperties, defineComponent, h, PropType, Text, useSlots, VNode } from 'vue';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import Base from './base';
import {
  OmitTypographyProps,
  TypographyBaseRule,
  TypographyBaseSize,
  TypographyBaseTruncate,
  TypographyBaseType,
} from './interface';
import { CopyableConfig, LinkType } from './title';
import FormatNumeral from '@douyinfe/semi-foundation/typography/formatNumeral';
import { getFragmentChildren } from '../_utils';
import { omit } from 'lodash';
import { CombineProps } from '../interface';

type OmitNumeralProps = OmitTypographyProps;

export interface NumeralProps {
  rule?: TypographyBaseRule;
  precision?: number;
  truncate?: TypographyBaseTruncate;
  parser?: (value: string) => string;
  // children?: VNode;
  className?: string;
  code?: boolean;
  component_?: VNode | string;
  copyable?: CopyableConfig | boolean;
  delete?: boolean;
  disabled?: boolean;
  icon?: VNode | string;
  link?: LinkType;
  mark?: boolean;
  size?: TypographyBaseSize;
  strong?: boolean;
  style?: CSSProperties;
  type?: TypographyBaseType;
  underline?: boolean;
}

const propTypes: CombineProps<NumeralProps> = {
  rule: PropTypes.string as PropType<NumeralProps['rule']>,
  precision: PropTypes.number,
  truncate: PropTypes.string as PropType<NumeralProps['truncate']>,
  parser: PropTypes.func as PropType<NumeralProps['parser']>,
  copyable: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  delete: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  mark: PropTypes.bool,
  underline: PropTypes.bool,
  link: [PropTypes.object, PropTypes.bool, PropTypes.string],
  strong: PropTypes.bool,
  type: PropTypes.string as PropType<NumeralProps['type']>,
  size: PropTypes.string as PropType<NumeralProps['size']>,
  style: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.bool,
  component_: [PropTypes.string, PropTypes.node] as PropType<NumeralProps['component_']>,
};

const defaultProps = {
  rule: 'text',
  precision: 0,
  truncate: 'round',
  parser: undefined,
  copyable: false,
  delete: false,
  icon: '',
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  style: {},
  size: 'normal',
  className: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Numeral = defineComponent({
  props: { ...vuePropsType },
  name: 'Numeral',
  setup(props, {}) {
    const slots = useSlots();

    // Traverse the entire virtual DOM using a depth-first traversal algorithm, then format each piece. (in react)
    function formatNodeDFS(node) {
      if (!Array.isArray(node)) {
        node = [node];
      }
      // Because the property is read-only, an object is returned for overwriting rather than directly modifying the object's contents.
      node = node.map((item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          // Formatting the digital content of nodes.
          return new FormatNumeral(String(item), props.rule, props.precision, props.truncate, props.parser).format();
        }
        if (typeof item === 'function') {
          return formatNodeDFS(item());
        }
        if (typeof item === 'object' && 'children' in item) {
          let children = formatNodeDFS(item['children']);
          function checkChildren() {
            if (Array.isArray(children)) {
              return children;
            }
            if (typeof children === 'object') {
              return [children];
            }


            // return children;
            // (当ctx有值时是jsx组件，或者ctx有值type.render没值是jsx组件)，否则是template组件？？
            // type: Symbol(v-txt) 组件的children只能是文本不能是VNode
            if(!item.ctx || item.ctx.type?.render){
              return children;
            }
            if (item.type !== Text) {
              return [h(Text, children)];
            } else {
              return children;
            }
          }

          return {
            ...item,
            props: { ...item['props'] },
            children: checkChildren(),
          };
        }
        return item;
      });
      return node.length === 1 ? node[0] : node;
    }

    return () => {
      // Deep copy and remove props that are not needed by the Base component.
      const baseProps = Object.assign({}, props) as Record<string, unknown>;
      delete baseProps.rule;
      delete baseProps.parser;
      // Each piece of content in the virtual DOM is formatted by the `formatNumeral` function.
      baseProps.children = formatNodeDFS(getFragmentChildren(slots));
      return <Base {...{...omit(baseProps, 'precision', 'truncate', 'component_'), component_: baseProps.component_ || 'span'}}></Base>;
    };
  },
});

export default Numeral;
