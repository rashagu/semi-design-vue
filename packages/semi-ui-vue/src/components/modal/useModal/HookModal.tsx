import ConfirmModal from '../ConfirmModal';
import { get } from 'lodash';
import { ConfirmProps } from '../confirm';
import { Motion } from '../../_base/base';
import {defineComponent, h, ref, useSlots} from "vue";

interface HookModalProps {
    afterClose: (...args: any[]) => void;
    config: ConfirmProps;
    motion?: Motion;
}

export interface HookModalRef {
    destroy: () => void;
    update: (newConfig: ConfirmProps) => void
}
// useImperativeHandle 定义子组件暴露给父组件的属性或方法


export const vuePropsType = {
    afterClose: Function,
    config: Object,
    motion: [Object, Function]
}

const HookModal = defineComponent<HookModalProps>((props_, {expose}) => {

    const slots = useSlots()

    const { afterClose, config, ...props } = props_
    const innerConfig = ref<ConfirmProps>(config);

    expose({
        destroy: () => {
            innerConfig.value = {
                ...innerConfig.value,
                visible: false,
            }
        },
        update: newConfig => {
            innerConfig.value = {
                ...innerConfig.value,
                ...newConfig,
            }
        },
    })

    return () => {

        const { motion } = props;
        /* istanbul ignore next */
        const mergedMotion =
          typeof motion === 'undefined' || motion ?
            {
                ...(motion as any),
                didLeave: (...args: any[]) => {
                    const didLeave = get(props.motion, 'didLeave');

                    if (typeof didLeave === 'function') {
                        didLeave(...args);
                    }
                    afterClose();
                },
            } :
            false;

        // @ts-ignore
        const innerConfig_ = innerConfig.value as ConfirmProps
        return (
          <ConfirmModal
            {...innerConfig_}
            // visible={!visible ? visible : undefined}
            motion={mergedMotion}
          />
        );
    }
})

HookModal.props = vuePropsType
HookModal.name = 'HookModal'

export default HookModal
