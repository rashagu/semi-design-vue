import { defineComponent, ref, h, Fragment, useSlots, VNode, PropType } from 'vue';
import { CombineProps } from '../../interface';

import { cssClasses } from '@douyinfe/semi-foundation/chat/constants';
import copy from 'copy-text-to-clipboard';
import { IconCopyStroked, IconTick } from '@kousum/semi-icons-vue';
import { nth } from 'lodash';
import { code } from '../../markdownRender/components';
// code's default height type is html/js/css, add jsx & tsx;
// import 'prismjs/components/prism-jsx.js';
// import 'prismjs/components/prism-tsx.js';
import { LocaleConsumerFunc } from '../../locale/localeConsumer';
import { Locale } from '../../locale/interface';
import { useMemo } from '../../_utils/useMemo';
const { PREFIX_CHAT_BOX } = cssClasses;
const LocaleConsumer = LocaleConsumerFunc<Locale['Chat']>();

interface codeProps {
  className?: string;
  children?: string;
}

export const vuePropsType: CombineProps<codeProps> = {
  className: String,
  children: String,
};
const Code = defineComponent({
  props: { ...vuePropsType },
  name: 'chatCode',
  setup(props, { attrs }) {
    const slots = useSlots();
    const copied = ref(false);
    const language = useMemo(() => {
      return nth(props.className?.split('-'), -1);
    }, [()=>props.className]);

    const onCopyButtonClick = () => {
      copy(props.children as string);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    };
    return () => {
      return language.value ? (
        <div class={`${PREFIX_CHAT_BOX}-content-code semi-always-dark`}>
          <div class={`${PREFIX_CHAT_BOX}-content-code-topSlot`}>
            <span class={`${PREFIX_CHAT_BOX}-content-code-topSlot-type`}>{language.value}</span>
            <span class={`${PREFIX_CHAT_BOX}-content-code-topSlot-copy`}>
              {copied.value ? (
                <span class={`${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper`}>
                  <IconTick />
                  <LocaleConsumer componentName="Chat">{(locale: Locale['Chat']) => locale['copied']}</LocaleConsumer>
                </span>
              ) : (
                <button
                  class={`${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper ${PREFIX_CHAT_BOX}-content-code-topSlot-toCopy`}
                  onClick={onCopyButtonClick}
                >
                  <IconCopyStroked />
                  <LocaleConsumer componentName="Chat">{(locale: Locale['Chat']) => locale['copy']}</LocaleConsumer>
                </button>
              )}
            </span>
          </div>
          {code({ ...props })}
        </div>
      ) : (
        code({ ...props })
      );
    };
  },
});

export default Code;
