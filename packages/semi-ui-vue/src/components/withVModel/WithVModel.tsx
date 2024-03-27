import { defineComponent, DefineSetupFnComponent, ref } from 'vue';
import { omit } from 'lodash';
import { WithFieldOption } from '@douyinfe/semi-foundation/form/interface';
import * as ObjectUtil from '@douyinfe/semi-foundation/utils/object';

export default function WithVModel<T>(Comp: DefineSetupFnComponent<T>, opt?: WithFieldOption) {
  return defineComponent<T>(
    (props: any, { emit, slots, expose }) => {
      const instance = ref();

      expose({
        ...instance.value,
      });
      return () => {
        if (props['onUpdate:modelValue']){
          return (
            //@ts-ignore
            <Comp
              {...omit(props, 'update:modelValue', 'modelValue', opt?.valueKey || 'value', 'onChange')}
              {...{
                [opt?.valueKey || 'value']: props.modelValue,
                [opt?.onKeyChangeFnName || 'onChange']: (v) => {
                  console.log(v);
                  let val = opt?.valuePath ? ObjectUtil.get(v, opt.valuePath) : v
                  if (Array.isArray(val)){
                    val = [...val]
                  }
                  props['onUpdate:modelValue']?.(val);
                },
              }}
            >
              {{ default: slots.default }}
            </Comp>
          );
        }else{
          //@ts-ignore
          return <Comp
            {...omit(props, 'update:modelValue', 'modelValue')}
          />
        }
      };
    },
    {
      name: Comp.name,
      props: {
        //@ts-ignore
        ...Comp.props,
        modelValue: [Number, String, Object, Array, Boolean],
        'onUpdate:modelValue': Function,
      },
    }
  );
}
