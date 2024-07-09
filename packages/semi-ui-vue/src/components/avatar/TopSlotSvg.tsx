import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
interface TopSlotSvgProps {
  gradientStart: string;
  gradientEnd: string;
}

export const vuePropsType: ComponentObjectPropsOptions<Required<TopSlotSvgProps>> = {
  gradientStart: String,
  gradientEnd: String,
};
const TopSlotSvg = defineComponent({
  props: vuePropsType,
  name: 'TopSlotSvg',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const id = getUuidShort();
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="52" viewBox="0 0 51 52" fill="none">
          <g filter="url(#filter0_d_6_2)">
            <path
              d="M40.4918 46.5592C44.6795 43.176 46.261 34.1333 47.5301 25.6141C49.5854 11.8168 39.6662 1 25.8097 1C11.2857 1 3 11.4279 3 25.3518C3 33.7866 6.29361 43.8947 10.4602 46.5592C12.5868 47.9192 12.5868 47.9051 25.8097 47.9192C38.3651 47.9282 38.5352 48.14 40.4918 46.5592Z"
              fill={`url(#${id})`}
            />
          </g>
          <defs>
            <filter
              id="filter0_d_6_2"
              x="0.789215"
              y="0.447304"
              width="49.2216"
              height="51.3549"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1.65809" />
              <feGaussianBlur stdDeviation="1.10539" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_2" result="shape" />
            </filter>
            <linearGradient id={id} x1="17.671" y1="31.7392" x2="17.671" y2="47.9333" gradientUnits="userSpaceOnUse">
              <stop stop-color={props.gradientStart} />
              <stop offset="1" stop-color={props.gradientEnd} />
            </linearGradient>
          </defs>
        </svg>
      );
    };
  },
});

export default TopSlotSvg;
