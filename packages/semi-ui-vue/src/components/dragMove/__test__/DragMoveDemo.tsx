import { defineComponent, ref, h, Fragment, useSlots, shallowRef, watch } from 'vue';
import { CombineProps } from '../../interface';
import DragMove from '../index';

interface DragMoveDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<DragMoveDemoProps> = {
  name: String,
};
const DragMoveDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'DragMoveDemo',
  setup(props, { attrs }) {
    const slots = useSlots();


    const aa = shallowRef()

    watch(aa, v=>{
      console.log(v);
    })
    return () => {
      return (
        <DragMove>
          <div ref={aa}
            style={{
              backgroundColor: 'var(--semi-color-primary)',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              fontWeight: 500,
              position: 'absolute',
              color: 'rgba(var(--semi-white), 1)',
            }}
          >
            Drag me
          </div>
        </DragMove>
      );
    };
  },
});

export default DragMoveDemo;
