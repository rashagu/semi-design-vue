import { IconArrowRight } from "@kousum/semi-icons-vue";
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/chat/constants';
import { CSSProperties, VNode } from 'vue';
const { PREFIX_HINT } = cssClasses;

interface HintProps {
    className?: string;
    style?: CSSProperties;
    value?: string[];
    onHintClick?: (item: string) => void;
    renderHintBox?: (props: {content: string; index: number; onHintClick: () => void}) => VNode
}

const Hint = (props: HintProps) => {
    const { value, onHintClick, renderHintBox, className, style } = props;
    return (
      <section
        class={cls(`${PREFIX_HINT}s`, {
            [className]: !!className,
        })}
        style={style}
      >
          {value.map((item, index) => {
              if (renderHintBox) {
                  return renderHintBox({
                      content: item,
                      index: index,
                      onHintClick: () => {
                          onHintClick?.(item);
                      }
                  });
              }
              return (
                <div
                  class={`${PREFIX_HINT}-item`}
                  key={index}
                  onClick={() => {
                      onHintClick?.(item);
                  }}
                >
                    <div class={`${PREFIX_HINT}-content`}>
                        {item}
                    </div>
                    <IconArrowRight class={`${PREFIX_HINT}-icon`}/>
                </div>
              );
          })}
      </section>
    );
}

export default Hint;
