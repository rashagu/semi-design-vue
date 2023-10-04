import Notice from '../notice';
import { NoticeInstance } from '@douyinfe/semi-foundation/notification/notificationFoundation';
import {ComponentObjectPropsOptions, defineComponent, h, PropType, ref, useSlots, watch} from "vue";

export interface HookNoticeProps extends NoticeInstance{
    afterClose: (id: string) => void;
}

export const vuePropsType:ComponentObjectPropsOptions<HookNoticeProps> = {
    id: String,
    afterClose: Function as PropType<HookNoticeProps['afterClose']>,
    motion: [Object, String, Boolean,] as PropType<HookNoticeProps['motion']>,
}
const HookNotice = defineComponent<HookNoticeProps>((props, {expose, attrs}) => {

    const slots = useSlots()
    const visible = ref(true);

    function setVisible(val:boolean) {
        visible.value = val
    }
    const close = () => {
        setVisible(false);
    };
    watch(visible, ()=>{
        if (!visible.value) {
            props.afterClose(String(props.id));
        }
    }, {immediate:true})

    return () => {

        const { afterClose, ...config } = attrs

        return visible ? (
          <Notice
            {...config}
            onHookClose={close}
          />
        ) : null;
    }
}, {
    props: vuePropsType,
    name: 'HookNotice'
})


export default HookNotice

