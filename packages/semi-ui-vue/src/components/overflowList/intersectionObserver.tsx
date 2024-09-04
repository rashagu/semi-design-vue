import * as PropTypes from '../PropTypes';
import { isEqual, isEmpty } from 'lodash';
import {
  ComponentObjectPropsOptions,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  useSlots,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps, VueJsxNode } from '../interface';
import isElement from '@douyinfe/semi-foundation/utils/isElement';

export interface ReactIntersectionObserverProps {
  onIntersect?: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
  // children?: VueJsxNode;
  root?: IntersectionObserverInit['root'];
  threshold?: IntersectionObserverInit['threshold'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  items?: Record<string, Element>;
}

const propTypes: CombineProps<ReactIntersectionObserverProps> = {
  onIntersect: PropTypes.func as PropType<ReactIntersectionObserverProps['onIntersect']>,
  option: PropTypes.object,
  root: PropTypes.any as PropType<ReactIntersectionObserverProps['root']>,
  threshold: [PropTypes.number, PropTypes.array],
  rootMargin: PropTypes.string,
  items: PropTypes.object,
};

const defaultProps = {
  onIntersect: (): void => undefined,
  threshold: 0.75,
  rootMargin: '0px',
  option: {},
  items: {},
};

export const vuePropsType = vuePropsMake<ReactIntersectionObserverProps>(propTypes, defaultProps);
const ReactIntersectionObserver = defineComponent({
  props: { ...vuePropsType },
  name: 'ReactIntersectionObserver',
  setup(props, {}) {
    const slots = useSlots();
    let observer: IntersectionObserver;
    let cachedKeys: Array<string>;


    watch(()=>props.root, (v)=>{
      if(!observer && v){
        const { items } = props;
        cachedKeys = Object.keys(items);
        const { root, threshold, rootMargin, option, onIntersect } = props;
        observer = new IntersectionObserver(onIntersect, {
          root,
          threshold,
          rootMargin,
          ...option,
        });
        observeElement();
      }
    }, {immediate: true})




    watch(
      [
        () => Object.keys(props.items),
        ()=>props.root,
      ],
      () => {
        if(observer){
          const { items } = props;
          const itemKeys = Object.keys(items);
          if (!isEqual(cachedKeys, itemKeys)) {
            observeElement(true);
            cachedKeys = itemKeys;
          }
        }
      }
    );

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });

    function observeElement(force = false): void {
      const { items } = props;
      if (isEmpty(items)) {
        // stop everything if not defined
        observer?.disconnect();
        return;
      }
      if (force) {
        observer?.disconnect();
      }

      // observer callback is invoked immediately when observing new elements
      Object.keys(items).forEach((key) => {
        const node = items[key];
        if (!node) {
          return;
        }
        //@ts-ignore
        const node_ = isElement(node) ? node : node.$el;
        observer?.observe(node_);
      });
    }

    // 不能直接 return slots.default，会失去响应
    return () => slots.default?.();
  },
});

export default ReactIntersectionObserver;
