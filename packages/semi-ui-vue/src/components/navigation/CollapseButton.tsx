import {ComponentObjectPropsOptions, defineComponent, FunctionalComponent, h, PropType, VNode} from "vue";
import {noop} from 'lodash';
import {IconSidebar} from '@kousum/semi-icons-vue';
import Button from '../button';
import Tooltip from '../tooltip';
import {Locale} from '../locale/interface';
import {VueJsxNode} from "../interface";

export interface CollapseButtonProps {
  prefixCls?: string;
  locale?: Locale['Navigation'];

  collapseText?(isCollapsed: boolean): VueJsxNode;

  isCollapsed?: boolean;

  onClick?(e: boolean): void;
}

const vuePropsType:ComponentObjectPropsOptions<CollapseButtonProps> = {
  prefixCls: String,
  locale: Object,
  collapseText: Function as PropType<CollapseButtonProps['collapseText']>,
  isCollapsed: {
    type: Boolean,
    default: undefined
  },
  onClick: Function as PropType<CollapseButtonProps['onClick']>,
}
const CollapseButton = defineComponent<CollapseButtonProps>((props, ctx) => {


  const handleClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick(!props.isCollapsed);
    }
  };

  const btnProps = {
    icon: <IconSidebar/>,
    type: 'tertiary',
    theme: 'borderless',
    onClick: handleClick,
  };


  return () => {

    const {
      prefixCls,
      locale,
      collapseText,
      isCollapsed,
      onClick = noop
    } = props
    let finalCollapseText: VueJsxNode = isCollapsed ? locale?.expandText : locale?.collapseText;

    if (typeof collapseText === 'function') {
      finalCollapseText = collapseText(isCollapsed);
    }


    return (
      <div class={`${prefixCls}-collapse-btn`}>
        {isCollapsed ? (
          <Tooltip content={finalCollapseText} position="right">
            <Button {...(btnProps as any)} />
          </Tooltip>
        ) : (
          <Button {...(btnProps as any)}>{finalCollapseText}</Button>
        )}
      </div>
    );
  }
}, {
  props: vuePropsType,
  name: 'CollapseButton'
})


export default CollapseButton
