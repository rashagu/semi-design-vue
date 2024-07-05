import { defineComponent, ref, h, VueElement, ComponentObjectPropsOptions } from 'vue';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';

let _id = -1;

export interface IconProps {
  id?: number;
  component?: VueElement;
  size?: number;
  className?: string;
  type?: string;
}

export const VuePropsType: ComponentObjectPropsOptions<IconProps> = {
  id: Number,
  component: Object,
  size: Number,
  className: String,
  type: String,
};
const Icon = defineComponent({
  props: VuePropsType,
  name: 'Icon',
  setup(props) {
    const { id: propsId, className, ...rest } = props;
    let _propsId = propsId;
    if (isNullOrUndefined(_propsId)) {
      _id++;
      _propsId = _id;
    }
    const id = `linearGradient-${_propsId}`;
    return () => (
      <svg
        {...rest}
        class={className}
        width="48"
        height="48"
        viewBox="0 0 36 36"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id={id}>
            <stop stop-color="currentColor" stop-opacity="0" offset="0%" />
            <stop stop-color="currentColor" stop-opacity="0.50" offset="39.9430698%" />
            <stop stop-color="currentColor" offset="100%" />
          </linearGradient>
        </defs>
        <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect id="Rectangle" fill-opacity="0.01" fill="#FFFFFF" x="0" y="0" width="36" height="36" />
          <path
            d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951"
            id="Path"
            stroke={`url(#${id})`}
            stroke-width="4"
            stroke-linecap="round"
          />
        </g>
      </svg>
    );
  },
});

export default Icon;
