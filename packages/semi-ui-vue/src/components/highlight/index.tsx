import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/highlight/constants';
import HighlightFoundation from '@douyinfe/semi-foundation/highlight/foundation';
import type { SearchWords, Chunk } from '@douyinfe/semi-foundation/highlight/foundation';

import '@douyinfe/semi-foundation/highlight/highlight.scss';
import { ComponentObjectPropsOptions, createVNode, CSSProperties, defineComponent, h, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';

interface GetHighLightTextHTMLProps {
  sourceString?: string;
  searchWords?: SearchWords;
  option: HighLightTextHTMLOption;
}

interface HighLightTextHTMLOption {
  highlightTag?: string;
  highlightClassName?: string;
  highlightStyle?: CSSProperties;
  caseSensitive: boolean;
  autoEscape: boolean;
}

interface HighLightTextHTMLChunk extends Chunk {}

export interface HighlightProps {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  sourceString?: string;
  searchWords?: SearchWords;
  highlightStyle?: CSSProperties;
  highlightClassName?: string;
  component?: string;
}

const prefixCls = cssClasses.PREFIX;

const propTypes: CombineProps<HighlightProps> = {
  // style: PropTypes.object,
  // className: PropTypes.string,
  autoEscape: PropTypes.bool,
  caseSensitive: PropTypes.bool,
  sourceString: PropTypes.string,
  searchWords: PropTypes.array,
  highlightStyle: PropTypes.object,
  highlightClassName: PropTypes.string,
  component: PropTypes.string,
};

const defaultProps = {
  component: 'mark',
  autoEscape: true,
  caseSensitive: false,
  sourceString: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Highlight = defineComponent({
  props: { ...vuePropsType },
  name: 'Highlight',
  setup(props, {}) {
    const slots = useSlots();

    const getHighLightTextHTML = ({
      sourceString = '',
      searchWords = [],
      option = { autoEscape: true, caseSensitive: false },
    }: GetHighLightTextHTMLProps) => {
      const chunks: HighLightTextHTMLChunk[] = new HighlightFoundation().findAll({
        sourceString,
        searchWords,
        ...option,
      });
      const markEle = option.highlightTag || 'mark';
      const highlightClassName = option.highlightClassName || '';
      const highlightStyle = option.highlightStyle || {};
      return chunks.map((chunk: HighLightTextHTMLChunk, index: number) => {
        const { end, start, highlight, style, className } = chunk;
        const text = sourceString.substr(start, end - start);
        if (highlight) {
          return createVNode(
            markEle,
            {
              style: { ...highlightStyle, ...style },
              className: `${highlightClassName} ${className || ''}`.trim(),
              key: text + index,
            },
            text
          );
        } else {
          return text;
        }
      });
    };

    return () => {
      const { searchWords, sourceString, component, highlightClassName, highlightStyle, caseSensitive, autoEscape } =
        props;

      const tagCls = cls(
        {
          [`${prefixCls}-tag`]: true,
        },
        highlightClassName
      );

      const option = {
        highlightTag: component,
        highlightClassName: tagCls,
        highlightStyle,
        caseSensitive,
        autoEscape,
      };

      return (
        getHighLightTextHTML({ sourceString, searchWords, option })
      );
    };
  },
});

export default Highlight;
