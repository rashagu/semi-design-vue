import classNames from 'classnames';
import type { VNode } from 'vue';

interface IndentProps {
  prefixcls: string;
  level: number;
  isEnd: boolean[];
  showLine: boolean;
}

const Indent = ({ prefixcls, level, isEnd, showLine }: IndentProps) => {
  const baseClassName = `${prefixcls}-indent-unit`;
  const list: VNode[] = [];
  for (let i = 0; i < level; i += 1) {
    list.push(
      <span
        key={i}
        class={classNames(baseClassName, {
          [`${baseClassName}-end`]: isEnd[i],
        })}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      class={classNames(`${prefixcls}-indent`, {
        [`${prefixcls}-indent-show-line`]: showLine,
      })}
    >
      {list}
    </span>
  );
};
export default Indent;
