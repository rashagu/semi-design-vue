import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import CalendarFoundation, { CalendarAdapter } from '@douyinfe/semi-foundation/calendar/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/calendar/constants';
import { useBaseComponent } from '../_base/baseComponent';
import { DayColProps } from './interface';
import '@douyinfe/semi-foundation/calendar/calendar.scss';
import {
  ComponentObjectPropsOptions, CSSProperties,
  defineComponent,
  Fragment,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';

const prefixCls = `${cssClasses.PREFIX}-grid`;

function pad(d: number) {
  return d < 10 ? `0${d.toString()}` : d.toString();
}

export interface DayColState {
  currPos: number;
  showCurrTime: boolean;
}

const propTypes: CombineProps<DayColProps> = {
  events: PropTypes.array,
  displayValue: PropTypes.object,
  showCurrTime: PropTypes.bool,
  scrollHeight: {
    type: PropTypes.number,
    required: true,
  },
  currPos: PropTypes.number,
  handleClick: {
    type: PropTypes.func as PropType<DayColProps['handleClick']>,
    required: true,
  },
  mode: PropTypes.string as PropType<DayColProps['mode']>,
  minEventHeight: PropTypes.number,
  isWeekend: {
    type: PropTypes.bool,
    required: true,
  },
  dateGridRender: PropTypes.func as PropType<DayColProps['dateGridRender']>,
  style: Object as PropType<CSSProperties>,
  className: String
};

const defaultProps = {
  events: [] as DayColProps['events'],
  showCurrTime: true,
  scrollHeight: 0,
  currPos: 0,
  mode: 'dayCol',
  minEventHeight: Number.MIN_SAFE_INTEGER,
};
export const vuePropsType = vuePropsMake<DayColProps>(propTypes, defaultProps);
const DayCol = defineComponent({
  props: { ...vuePropsType },
  name: 'DayCol',
  setup(props, {}) {
    const slots = useSlots();

    const state = reactive<DayColState>({
      currPos: 0,
      showCurrTime: false,
    });
    const { adapter: adapterInject } = useBaseComponent<DayColProps>(props, state);
    function adapter_(): CalendarAdapter<DayColProps, DayColState> {
      return {
        ...adapterInject(),
        updateCurrPos: (currPos) => {
          state.currPos = currPos;
        },
        updateShowCurrTime: () => {
          state.showCurrTime = true;
        },
      };
    }
    const adapter = adapter_();
    const foundation = new CalendarFoundation(adapter);

    onMounted(() => {
      foundation.init();
      foundation.initCurrTime();
    });

    onBeforeUnmount(() => {
      foundation.destroy();
    });

    const renderEvents = () => {
      const { events, scrollHeight, minEventHeight } = props;
      const list = events.map((event, ind) => {
        const { startPos, endPos, children, key } = event;
        const top = startPos * scrollHeight;
        const height = (endPos - startPos) * scrollHeight;
        const style = {
          top: `${top}px`,
          height: `${Math.max(minEventHeight, height)}px`,
        };
        return (
          <li
            class={`${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-day`}
            style={style}
            key={key || `${top}-${ind}`}
          >
            {children}
          </li>
        );
      });
      return list;
    };

    const renderCurrTime = () => {
      const { currPos } = state;
      const { scrollHeight } = props;
      const key = currPos;
      const top = currPos * scrollHeight;
      const style = { top: top + 'px' };
      const circle = <div class={`${prefixCls}-curr-circle`} style={style} />;
      const line = <div class={`${prefixCls}-curr-line`} style={style} />;
      return (
        <Fragment key={key}>
          {circle}
          {line}
        </Fragment>
      );
    };

    const handleClick: DayColProps['handleClick'] = (e, val) => {
      props.handleClick(e, val);
    };

    const renderGrid = () => {
      const showCurrTime = props.showCurrTime ? state.showCurrTime : false;
      const { displayValue, isWeekend, dateGridRender } = props;
      const skCls = cls(`${prefixCls}-skeleton`, {
        [`${cssClasses.PREFIX}-weekend`]: isWeekend,
      });
      return (
        <div class={`${prefixCls}`} role="presentation">
          <div role="gridcell" class={`${prefixCls}-content`}>
            {showCurrTime ? renderCurrTime() : null}
            <ul role="row" class={skCls}>
              {[...Array(25).keys()].map((item) => {
                const line = cls({
                  [`${prefixCls}-skeleton-row-line`]: true,
                });
                return (
                  <Fragment key={`${item}-daycol`}>
                    <li
                      data-time={`${pad(item)}:00:00`}
                      class={line}
                      onClick={(e) => handleClick(e, [displayValue, item, 0, 0])}
                    />
                    <li data-time={`${pad(item)}:30:00`} onClick={(e) => handleClick(e, [displayValue, item, 30, 0])} />
                  </Fragment>
                );
              })}
            </ul>
            {dateGridRender && dateGridRender(displayValue.toString(), displayValue)}
            <ul class={`${cssClasses.PREFIX}-event-items`}>{renderEvents()}</ul>
          </div>
        </div>
      );
    };

    return () => {
      const grid = renderGrid();
      return grid;
    };
  },
});

export default DayCol;
