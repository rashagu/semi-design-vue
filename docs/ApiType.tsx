import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { Tag, Tooltip } from '@kousum/semi-ui-vue';




const ApiType = defineComponent({
  props: { detail: String },
  name: 'ApiType',
  setup(props, {  }) {
    const slots = useSlots();


    const ApiDetail = (detailProps) => {
      let detail = detailProps.detail;
      if (detailProps.detail.includes("\\")) {
        detail = detailProps.detail.replaceAll("\\", "");
      }
      return <div class='semi-api-table-interface-detial' style={{ wordBreak: 'break-word' }}>
        {detail}
      </div>;
    };

    return () => {

      return (
        <Tooltip
          content={<ApiDetail {...props}></ApiDetail>}
          style={{ maxWidth: '650px' }}
        >
          <Tag
            color='yellow'
            style={{
              color: 'var(--semi-color-warning)',
              letterSpacing: '-0.02em',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
            }}
          >
            {slots.default?.()}
          </Tag>
        </Tooltip>
      );
    };
  },
});


export default ApiType;


