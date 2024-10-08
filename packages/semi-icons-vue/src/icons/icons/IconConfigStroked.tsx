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
      <g clip-path="url(#clip0_1478_52)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.9539 4.23508C16.9539 3.61376 17.4575 3.11008 18.0789 3.11008H21.3947C22.016 3.11008 22.5197 3.61376 22.5197 4.23508C22.5197 4.8564 22.016 5.36008 21.3947 5.36008H18.0789C17.4575 5.36008 16.9539 4.8564 16.9539 4.23508Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.6579 0.900024C14.2792 0.900024 14.7829 1.4037 14.7829 2.02502V6.44608C14.7829 7.0674 14.2792 7.57108 13.6579 7.57108C13.0366 7.57108 12.5329 7.0674 12.5329 6.44608V2.02502C12.5329 1.4037 13.0366 0.900024 13.6579 0.900024Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.375 4.23508C0.375 3.61376 0.87868 3.11008 1.5 3.11008H13.6579C14.2792 3.11008 14.7829 3.61376 14.7829 4.23508C14.7829 4.8564 14.2792 5.36008 13.6579 5.36008H1.5C0.87868 5.36008 0.375 4.8564 0.375 4.23508Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.375 11.9727C0.375 11.3514 0.87868 10.8477 1.5 10.8477H5.92106C6.54238 10.8477 7.04606 11.3514 7.04606 11.9727C7.04606 12.594 6.54238 13.0977 5.92106 13.0977H1.5C0.87868 13.0977 0.375 12.594 0.375 11.9727Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.3421 8.63694C10.9634 8.63694 11.4671 9.14062 11.4671 9.76194V14.183C11.4671 14.8043 10.9634 15.308 10.3421 15.308C9.72079 15.308 9.21711 14.8043 9.21711 14.183V9.76194C9.21711 9.14062 9.72079 8.63694 10.3421 8.63694Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.21711 11.9727C9.21711 11.3514 9.72079 10.8477 10.3421 10.8477H22.5C23.1213 10.8477 23.625 11.3514 23.625 11.9727C23.625 12.594 23.1213 13.0977 22.5 13.0977H10.3421C9.72079 13.0977 9.21711 12.594 9.21711 11.9727Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.9539 19.7096C16.9539 19.0883 17.4575 18.5846 18.0789 18.5846H21.3947C22.016 18.5846 22.5197 19.0883 22.5197 19.7096C22.5197 20.3309 22.016 20.8346 21.3947 20.8346H18.0789C17.4575 20.8346 16.9539 20.3309 16.9539 19.7096Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.6579 16.3739C14.2792 16.3739 14.7829 16.8775 14.7829 17.4989V21.9199C14.7829 22.5412 14.2792 23.0449 13.6579 23.0449C13.0366 23.0449 12.5329 22.5412 12.5329 21.9199V17.4989C12.5329 16.8775 13.0366 16.3739 13.6579 16.3739Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.375 19.7096C0.375 19.0883 0.87868 18.5846 1.5 18.5846H13.6579C14.2792 18.5846 14.7829 19.0883 14.7829 19.7096C14.7829 20.3309 14.2792 20.8346 13.6579 20.8346H1.5C0.87868 20.8346 0.375 20.3309 0.375 19.7096Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1478_52">
          <rect width={24} height={24} fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IconConfigStroked',
  props: {
    ...iconVuePropsType,
  },
  setup(props, { slots }) {
    return () => (
      <ConvertIcon iconType={'config_stroked'} {...props}>
        {{
          default: () => <SvgComponent />,
        }}
      </ConvertIcon>
    );
  },
});
export default IconComponent;
export { SvgComponent };
