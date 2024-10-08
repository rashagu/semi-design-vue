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
      <rect x={1} y={4} width={22} height={16} rx={3} fill="#DDE3E8" />
      <path d="M15 4H20C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H15V4Z" fill="#4CC3FA" />
      <path d="M19 7.5L21 10.5H17L19 7.5Z" fill="white" />
      <path d="M19 16.5L17 13.5H21L19 16.5Z" fill="white" />
      <path
        d="M8.35791 15.7759C7.39307 15.7759 6.70752 15.1792 6.70752 14.354C6.70752 13.5225 7.39307 12.9194 8.35791 12.9194C9.31641 12.9194 10.0083 13.5225 10.0083 14.354C10.0083 15.1792 9.31641 15.7759 8.35791 15.7759ZM8.35791 11.7261C7.55811 11.7261 6.98682 11.1992 6.98682 10.4756C6.98682 9.7583 7.55811 9.24414 8.35791 9.24414C9.15771 9.24414 9.729 9.7583 9.729 10.4756C9.729 11.2056 9.15771 11.7261 8.35791 11.7261ZM8.33887 17.0137C10.3447 17.0137 11.7095 15.979 11.7095 14.4619C11.7095 13.3955 10.9795 12.5322 9.89404 12.3101V12.2148C10.8208 11.9292 11.3667 11.2056 11.3667 10.2915C11.3667 8.9458 10.1289 8 8.35791 8C6.58691 8 5.34912 8.9458 5.34912 10.2915C5.34912 11.2119 5.88867 11.9292 6.81543 12.2148V12.3101C5.72363 12.5322 5 13.3955 5 14.4683C5 15.9917 6.33936 17.0137 8.33887 17.0137Z"
        fill="#324350"
      />
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconInputNumber',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'input-number'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
