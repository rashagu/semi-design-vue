import { defineComponent, ref, h, onActivated } from 'vue';
import { ConvertIcon, vuePropsType as iconVuePropsType } from '../components/Icon';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <rect x={3} y={8} width={18} height={8} rx={1} fill="#FAC800" />
      <path
        d="M4.44346 4.44341C4.2627 4.62417 4.16115 4.86934 4.16115 5.12498V8.18054C4.16115 8.43618 4.2627 8.68134 4.44346 8.86211C4.62423 9.04287 4.86939 9.14442 5.12503 9.14442C5.38067 9.14442 5.62584 9.04287 5.80661 8.86211C5.98737 8.68134 6.08892 8.43618 6.08892 8.18054V6.08887H11.0361V17.9111H8.94448C8.68884 17.9111 8.44367 18.0126 8.26291 18.1934C8.08214 18.3742 7.98059 18.6193 7.98059 18.875C7.98059 19.1306 8.08214 19.3758 8.26291 19.5566L8.40433 19.4151L8.26291 19.5566C8.44367 19.7373 8.68884 19.8389 8.94448 19.8389H15.0556C15.3112 19.8389 15.5564 19.7373 15.7372 19.5566C15.9179 19.3758 16.0195 19.1306 16.0195 18.875C16.0195 18.6193 15.9179 18.3742 15.7372 18.1934C15.5564 18.0126 15.3112 17.9111 15.0556 17.9111H12.9639V6.08887H17.9111V8.18054C17.9111 8.43617 18.0127 8.68134 18.1935 8.86211C18.3742 9.04287 18.6194 9.14442 18.875 9.14442C19.1307 9.14442 19.3758 9.04287 19.5566 8.86211C19.7374 8.68134 19.8389 8.43617 19.8389 8.18054V5.12498C19.8389 4.86934 19.7374 4.62417 19.5566 4.44341C19.3758 4.26264 19.1307 4.16109 18.875 4.16109H5.12503C4.86939 4.16109 4.62423 4.26264 4.44346 4.44341Z"
        fill="#6A6F7F"
        stroke="#6A6F7F"
        stroke-width={0.4}
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconHighlight',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'highlight'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
