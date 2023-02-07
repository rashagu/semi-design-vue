
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import LocaleConsumer from '../locale/localeConsumer';
import { cssClasses } from '@douyinfe/semi-foundation/calendar/constants';

import '@douyinfe/semi-foundation/calendar/calendar.scss';
import { TimeColProps } from './interface';
import { Locale } from '../locale/interface';
import {defineComponent, h, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

const prefixCls = `${cssClasses.PREFIX}-time`;

const propTypes = {
    className: PropTypes.string,
    renderTimeDisplay: PropTypes.func,
};
export const vuePropsType = vuePropsMake(propTypes, {})
const TimeCol = defineComponent<TimeColProps>((props, {}) => {
    const slots = useSlots()


    function formatTime(item: number) {
        const { renderTimeDisplay } = props;
        if (typeof renderTimeDisplay === 'function') {
            return renderTimeDisplay(item);
        } else {
            const replaceTime = (template: string, time: number) => template.replace('${time}', String(time));
            return (
              <LocaleConsumer componentName="Calendar" key={`locale-${item}`}>
                  {(locale: Locale['Calendar']) => {
                      let time = item < 12 ? replaceTime(locale.AM, item) : replaceTime(locale.PM, item - 12);
                      if (item === 12) {
                          time = replaceTime(locale.PM, item);
                      }
                      return time;
                  }}
              </LocaleConsumer>
            );
        }
    }

    function renderTime() {
        const { className } = props;
        const wrapperCls = cls(className, `${prefixCls}`);
        const list = [...Array(24).keys()].map(item => formatTime(item));
        list.splice(0, 1, '');
        const inner = list.map((item, index) => (
          <li key={`time-${index}`} class={`${prefixCls}-item`}>
              <span>{item}</span>
          </li>
        ));
        return (
          <div class={wrapperCls}>
              <ul class={`${prefixCls}-items`}>
                  {inner}
              </ul>
          </div>
        );
    }

    return () => {
        const time = renderTime();
        return time;
    }
})

TimeCol.props = vuePropsType
TimeCol.name = 'TimeCol'

export default TimeCol
