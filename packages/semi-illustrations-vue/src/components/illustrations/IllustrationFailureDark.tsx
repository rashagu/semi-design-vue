import { defineComponent, h } from 'vue';
const SvgComponent = defineComponent((props, { slots }) => {
  return () => (
    <svg
      width={200}
      height={200}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // @ts-ignore
            focusable={false}
      aria-hidden={true}
      {...props}
    >
      <path
        d="M74.7 78.6c20.78-6.32 57.55-12.26 71.81-9.86 4.21.7 8.12 1.98 11.36 3.42-.51-1.69-.95-3.5-1.38-5.3l-.04-.18c-1.03-4.27-2.05-8.44-3.95-10.55-4.8-5.32.67-10.12.67-10.12l.93-10.53c13.02 4.82 21.65 14.92 27 25.08 4.57 8.67 6.75 17.37 7.25 22.89 1.06 12-8.18 18.86-19.2 18.86-9.74 0-18.36-1.64-24.81-3.1.64 2.18 5.44 19.18 7.53 32.66l-46.15.58-7.58-14.68-4.66-12.26c-19.46 7.46-50.77 19.02-64.9 18.44-10.35-.42-15.68-15.68-17.44-28.7a71.55 71.55 0 0 1-.67-9.4c0-5.64.3-12.18 2.22-17.89.74-2.21 1.73-4.3 3.04-6.17a18.1 18.1 0 0 1 4.6-4.59c0 4-1.02 13.54 2.8 14.12 5.06.78 10.4-9.08 13.85-7.06 3.87 2.27-1.65 16.34-1.33 17.2.27.7.53 1.4.76 2.07a48.99 48.99 0 0 1 2.25 8.55C46.59 87.56 60 83.06 74.69 78.6Z"
        fill="#C6CACD"
      />
      <path
        d="M181.1 60.56c4.57 8.67 6.75 17.37 7.25 22.89 1.06 12-8.18 18.86-19.2 18.86-9.74 0-18.36-1.64-24.81-3.1m36.77-38.65c-5.36-10.16-13.99-20.26-27-25.08l-.94 10.53s-5.46 4.8-.67 10.12c1.9 2.11 2.92 6.28 3.95 10.55m24.66-6.12c-6-.37-18.32.8-24.66 6.12m0 0c1.57 6.53 3.15 13.3 7.91 13.3 7.2 0-3.6-8.84-17.85-11.24-14.25-2.4-51.03 3.54-71.82 9.86-20.78 6.32-39.04 12.71-42.77 19.1-3.63 6.23 13.24 10.92 4.49-14.17m0 0c-.23-.67-.49-1.36-.76-2.08-.32-.85 5.2-14.92 1.33-17.19-3.45-2.02-8.8 7.84-13.85 7.06-3.82-.58-2.8-10.12-2.8-14.12a18.1 18.1 0 0 0-4.6 4.6M36.4 83.52c-7.27 1.58-21.92 8.1-25.27 11.73m0 0a71.55 71.55 0 0 1-.67-9.41c0-5.64.3-12.18 2.22-17.89m-1.55 27.3c1.76 13 7.09 28.27 17.45 28.7 14.12.57 45.43-10.99 64.89-18.45l4.66 12.26 7.58 14.68 46.15-.58c-2.09-13.48-6.89-30.48-7.53-32.67M15.73 61.8c-.98 3-1.08 5.5.19 7.8m-.2-7.8a24.08 24.08 0 0 0-3.03 6.16m0 0a5.43 5.43 0 0 0 1.25 4.22m130.4 27.02c-.9-3.08-3.12-9.95-4.76-12.76"
        stroke="#1C1F23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="m156.89 15.66-2.04 27.96 2.57 28.1c-7.51-3.07-13.32-4.34-27.25-3.36-11.94.83-31.75 3.95-46.23 7.62-16.66 4.27-37.81 11.64-45.21 15.9-.77-4.64-2.92-10.15-2.92-10.15-.07-.7 2.63-8.32 2.73-13.06.08-3.08-.91-4.45-2.33-4.75a3.47 3.47 0 0 0-2.05.35c-.63.32-.86.48-1.38.84-1.34.98-2.38 2.02-3.95 3.34a17.14 17.14 0 0 1-3.04 2.17 4.6 4.6 0 0 1-2.89.63c-.63-.1-1.21-.47-1.71-1.58l-.07-.89c-.5-5.79-2.7-20.12-2.7-34.91 0-7.74 1.61-10.04 2.7-11.59l.13-.18c3.85-5.53 13.67-6.75 23.12-6.96 2.5-.14 5.2-.2 8.1-.17l.11.15H53.15l-.52.07 18.32 25.49-3.62 14.08 10.2 15.98-2.84-16.49 10-11.99-3.5-27.7s8.78-.5 19.47-1.77c10.69-1.28 18.47-1.9 29.42-1.83 1.64.01 3.4.1 5.23.22 9.64.65 18.55 2.56 21.46 4.4l.13.09h-.01Z"
        fill="var(--semi-color-primary)"
        fill-opacity={0.2}
      />
      <path
        d="M143 27.91a1.38 1.38 0 0 1 1.77-.85c.5.17.98.41 1.44.71a1.38 1.38 0 0 1-1.53 2.31c-.26-.17-.53-.3-.82-.4a1.38 1.38 0 0 1-.85-1.77Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M140.65 28.12c.21.74-.21 1.5-.95 1.71-.36.1-.73.23-1.11.37a1.38 1.38 0 1 1-.95-2.6c.43-.16.87-.3 1.3-.43.74-.2 1.5.22 1.71.95Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M134.74 30.4c.37.67.14 1.51-.53 1.89l-1.07.62a1.38 1.38 0 1 1-1.41-2.38l1.12-.65a1.38 1.38 0 0 1 1.89.52Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M97.86 31.43h.76a1.38 1.38 0 1 1-.06 2.77h-.52a6.7 6.7 0 0 0-.57.1 1.38 1.38 0 1 1-.64-2.68c.33-.08.64-.14.94-.18l.09-.01Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M147.78 31.75c.73-.23 1.5.19 1.72.92.13.42.25.88.35 1.35a1.38 1.38 0 0 1-2.7.58c-.1-.4-.19-.78-.3-1.13-.22-.73.2-1.5.93-1.72Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M102.27 33.13c.19-.75.94-1.2 1.68-1.01.45.11.89.23 1.3.37a1.38 1.38 0 0 1-.84 2.63c-.36-.11-.73-.22-1.13-.32a1.38 1.38 0 0 1-1-1.67Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M129.3 33.68c.42.64.25 1.5-.4 1.92l-.52.34-.53.36a1.38 1.38 0 0 1-1.53-2.31l.32-.21.21-.14.3-.2.23-.15c.64-.42 1.5-.25 1.92.39Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M108.25 35.22c.36-.67 1.2-.92 1.88-.55a246.5 246.5 0 0 1 1.11.61 1.38 1.38 0 0 1-1.33 2.43l-.5-.28h-.01l-.6-.34a1.38 1.38 0 0 1-.55-1.87Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M92.83 35.77c.76-.01 1.4.6 1.4 1.36.01.16.03.34.07.54a1.38 1.38 0 1 1-2.7.58 5.62 5.62 0 0 1-.13-1.07c-.01-.76.6-1.4 1.36-1.4Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M124 37.2c.31.7 0 1.51-.7 1.82a6.07 6.07 0 0 1-1.44.45 1.38 1.38 0 1 1-.67-2.68l.58-.16c.1-.03.24-.07.42-.15.7-.3 1.51.02 1.82.72Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M113.9 38.14c.15-.75.89-1.22 1.63-1.07.35.08.72.14 1.1.17a1.38 1.38 0 0 1-.26 2.76c-.49-.05-.96-.12-1.41-.22a1.38 1.38 0 0 1-1.07-1.64Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M148.98 37.95c.76-.01 1.4.6 1.4 1.36a38.45 38.45 0 0 1 0 1.42 1.38 1.38 0 0 1-2.77-.08 24.28 24.28 0 0 0 0-1.3c0-.76.6-1.39 1.37-1.4Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M148.6 44.88c.75.16 1.22.9 1.06 1.65-.1.47-.22.94-.34 1.41a1.38 1.38 0 1 1-2.68-.7c.12-.43.22-.87.31-1.3.17-.75.9-1.22 1.65-1.06Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M146.69 51.6c.7.31 1 1.13.7 1.83-.2.44-.41.88-.63 1.31a1.38 1.38 0 0 1-2.48-1.24c.2-.4.4-.8.58-1.2.31-.7 1.13-1.01 1.83-.7Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M41.67 55.45c.07.76-.5 1.44-1.25 1.5-.43.04-.86.1-1.26.19a1.38 1.38 0 0 1-.54-2.72c.5-.1 1.02-.17 1.55-.22.76-.07 1.43.5 1.5 1.25Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M44.58 55.78c.22-.73 1-1.15 1.72-.93l.74.23a1.38 1.38 0 1 1-.9 2.62l-.62-.2a1.38 1.38 0 0 1-.94-1.72Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M91.9 56.9c.05.76-.52 1.41-1.29 1.46-.44.03-.89.07-1.32.12a1.38 1.38 0 0 1-.31-2.75c.48-.05.96-.1 1.45-.13.77-.05 1.42.53 1.47 1.3Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M94.72 56.95c.07-.76.74-1.33 1.5-1.26l1.43.14a1.38 1.38 0 1 1-.32 2.75c-.45-.05-.9-.1-1.35-.13a1.38 1.38 0 0 1-1.26-1.5Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M101.64 57.83c.16-.75.9-1.22 1.64-1.07l1.39.3a1.38 1.38 0 1 1-.62 2.7l-1.34-.29a1.38 1.38 0 0 1-1.07-1.64Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M34.85 57.26c.48.6.39 1.46-.2 1.94-.33.27-.63.55-.9.84a1.38 1.38 0 0 1-2.03-1.89c.36-.39.76-.76 1.18-1.1.6-.48 1.46-.39 1.95.2Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M85 57.9c.29.71-.06 1.51-.78 1.8a15.8 15.8 0 0 0-1.26.54 1.38 1.38 0 1 1-1.15-2.52 74.1 74.1 0 0 1 1.4-.6c.71-.28 1.52.07 1.8.78Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M143.4 57.76c.61.47.72 1.34.26 1.94-.3.4-.62.78-.94 1.15a1.38 1.38 0 0 1-2.09-1.81 24 24 0 0 0 .84-1.03c.47-.6 1.33-.71 1.94-.25Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M108.43 59.46c.22-.74.99-1.15 1.72-.93l1.35.4a1.38 1.38 0 1 1-.82 2.65l-1.32-.4a1.38 1.38 0 0 1-.93-1.72Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M115.08 61.58a1.38 1.38 0 0 1 1.77-.83l1.32.5a1.38 1.38 0 0 1-.97 2.58l-1.3-.48a1.38 1.38 0 0 1-.82-1.77Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M138.67 62.89c.42.64.25 1.5-.4 1.92-.41.27-.85.54-1.29.78a1.38 1.38 0 0 1-1.32-2.43c.37-.2.73-.43 1.1-.66.63-.42 1.49-.25 1.91.39Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M30.5 62.78c.77.07 1.33.74 1.26 1.5l-.03.59.01.75-1.6 1.4a1.38 1.38 0 0 1-1.16-1.32l-.02-.83c0-.28.02-.56.04-.84.07-.76.75-1.32 1.5-1.25Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M121.6 64.07c.3-.7 1.1-1.04 1.8-.75a135.68 135.68 0 0 1 1.26.52 1.38 1.38 0 1 1-.97 2.59 19.62 19.62 0 0 1-1.35-.55c-.7-.3-1.04-1.1-.74-1.81Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M72.11 64.94c.48.6.4 1.47-.2 1.95-.38.3-.74.61-1.09.92A1.38 1.38 0 1 1 69 65.73c.37-.33.76-.66 1.17-.99.59-.48 1.46-.4 1.94.2Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M132.4 65.92c.09.76-.46 1.44-1.22 1.53-.5.05-1.02.08-1.53.09a1.38 1.38 0 1 1-.02-2.77c.42 0 .84-.03 1.25-.07.76-.09 1.44.46 1.53 1.22Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M66.66 69.9c.57.52.6 1.4.09 1.96l-.73.8-.02.02-.16.18-.08.09a1.38 1.38 0 0 1-2.05-1.86l.25-.28.75-.82c.51-.56 1.39-.6 1.95-.09Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M61.6 75.28c.45.61.31 1.48-.3 1.93-.44.31-.88.61-1.36.89a1.38 1.38 0 1 1-1.4-2.4c.4-.22.77-.46 1.12-.73a1.38 1.38 0 0 1 1.94.3Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M37.67 75.97c.42.19.86.36 1.35.53a1.38 1.38 0 0 1-.89 2.62c-.56-.19-1.1-.4-1.6-.63l.72-2.63c.14.01.28.05.42.11Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M55.05 78.57c.12.75-.4 1.46-1.15 1.58-.5.08-1 .15-1.54.2a1.38 1.38 0 0 1-.28-2.75c.49-.05.95-.11 1.39-.18.75-.12 1.46.4 1.58 1.15Z"
        fill="var(--semi-color-primary)"
      />
      <path
        d="M43.4 78.87c.06-.76.73-1.33 1.49-1.27a38.43 38.43 0 0 0 1.5.1 1.38 1.38 0 1 1-.12 2.76 62.94 62.94 0 0 1-1.6-.1 1.38 1.38 0 0 1-1.27-1.5Z"
        fill="var(--semi-color-primary)"
      />
      <g clip-path="url(#clip_failure_dark_46_27)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.9 46.87a13.45 13.45 0 0 1 9.37-16.53 13.45 13.45 0 0 1 16.52 9.39c2.64 9.56-4.77 29.27-5.14 29.9a.75.75 0 0 1-.99.27c-.64-.34-17.11-13.47-19.76-23.03Zm14.36 1.54a6.1 6.1 0 0 1-3.25-11.75 6.1 6.1 0 0 1 3.25 11.75Z"
          fill="var(--semi-color-primary)"
        />
      </g>
      <path d="M102.31 100.69c-2.8 1.55-5.63 2.85-9.36 4.58l1.48 3.92c2.14-.96 6.16-6.03 7.88-8.5Z" fill="#1C1F23" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M121 63.04c8.85 2.1 12.43-6.5 13.12-8.77.68-2.27-5.6-11.86-8-11.2-.13.05-.3.09-.47.13l-.18.05-1.37.37c-3.64 1.03-9.93 3.2-10.98 7.63-1.3 5.46 2.4 10.49 7.88 11.79Z"
        fill="#1C1F23"
      />
      <path
        d="M134.5 64.73c-.43.47-1.2.74-2.33.73a12.7 12.7 0 0 1-4.06-.86 31.25 31.25 0 0 1-9.94-6.22c-3.25-2.97-5.97-5.8-7.59-8.42-1.61-2.61-2.05-4.89-.98-6.84a3.7 3.7 0 0 1 2.11-1.86 4.53 4.53 0 0 1 2.9.15c2.16.76 4.57 2.83 6.48 6.01 3.4 5.64 6.89 8.24 9.7 10.33.49.36.95.7 1.38 1.04a7.3 7.3 0 0 1 2.61 3.48c.34 1.1.16 1.97-.28 2.46Z"
        fill="#C6CACD"
        stroke="#1C1F23"
      />
      <mask
        id="mask_failure_dark_130_527"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={101}
        y={47}
        width={30}
        height={22}
      >
        <path
          d="M130.53 62.1c-.5-3.3-9.52-14.75-16.08-15.03l-12.68 4.52 6.47 14.16 17.25 3.07c1.84-1.14 5.43-4.07 5.04-6.72Z"
          fill="#C4C4C4"
        />
      </mask>
      <g mask="url(#mask_failure_dark_130_527)">
        <path
          d="M127.2 63.62a9.74 9.74 0 0 1-13.76.5 9.74 9.74 0 0 1-.32-13.78 9.74 9.74 0 0 1 13.77-.49 9.74 9.74 0 0 1 .32 13.77Z"
          fill="#C6CACD"
          stroke="#1C1F23"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m116.79 47.35-.02.37c2.86.5 8.57 2.59 8.58 6.87 0 5.36-7.44 9.34-14.47 3.46-.34-.28-.66-.53-.95-.74a10.09 10.09 0 0 0 3.17 7.17 10.24 10.24 0 0 0 14.47-.52 10.24 10.24 0 0 0-.34-14.47 10.16 10.16 0 0 0-10.44-2.14Z"
          fill="#1C1F23"
        />
        <path d="M119.34 55a.79.79 0 1 0-1.1-1.12.79.79 0 0 0 1.1 1.12Z" fill="#1C1F23" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M119.98 50.72c.21-.09.45.01.54.22a7.86 7.86 0 0 0 1.84 2.65.41.41 0 0 1-.55.62 8.67 8.67 0 0 1-2.05-2.95.41.41 0 0 1 .22-.54Z"
          fill="#1C1F23"
        />
        <path d="M114.85 52.4a.79.79 0 1 0-1.1-1.11.79.79 0 0 0 1.1 1.12Z" fill="#1C1F23" />
        <mask id="path-15-inside-1" fill="white">
          <ellipse rx={2.97818} ry={2.97818} transform="matrix(0.727696 0.6859 -0.685903 0.727693 128.435 60.0508)" />
        </mask>
        <ellipse
          rx={2.97818}
          ry={2.97818}
          transform="matrix(0.727696 0.6859 -0.685903 0.727693 128.435 60.0508)"
          fill="#C6CACD"
        />
        <path
          d="m128.42 60.04.01-.01a.03.03 0 0 1 .02 0l-4.12 4.37a5.98 5.98 0 0 0 8.45-.25l-4.36-4.11Zm.03 0v.02l-4.37-4.11a5.98 5.98 0 0 0 .25 8.45l4.12-4.37Zm0 .03h-.03l4.12-4.37a5.98 5.98 0 0 0-8.46.25l4.37 4.12Zm-.03 0v-.03l4.37 4.11a5.98 5.98 0 0 0-.25-8.45l-4.12 4.37Z"
          fill="#1C1F23"
          mask="url(#path-15-inside-1)"
        />
      </g>
      <path
        d="M145.63 40.19c1.37-2.75 12.75 2.35 16.14 6.78 3.38 4.43 1.48 10.74-1.9 9.68-6.69-2.12-7.56-6.7-7.94-9.48-1.2-1.85-7.67-4.24-6.3-6.98Z"
        fill="#C6CACD"
        stroke="#1C1F23"
      />
      <path d="m158.95 41.56 6.64 2.52 1.66 12.47-8.3 1.98-3.47-12.03 3.47-4.94Z" fill="#C6CACD" />
      <path
        d="M167.3 151.94c5.19 1.66 23.35 35.57 19.05 35.57-13.86 0-34.5.53-71.42.53-15.63 0-17.9-5.16-11.79-22.08a353.23 353.23 0 0 1 6.14-15.76l32.5 1.26c-.43 1.53-.91 3.07-1.38 4.4a26.82 26.82 0 0 1 8.73-1.47c5.27 0 7.04 1.4 11.77 0 2.13-.62 4.8-2.97 6.4-2.45Z"
        fill="#C6CACD"
      />
      <path
        d="M140.4 155.87c.47-1.34.95-2.88 1.38-4.4l-32.5-1.27a353.23 353.23 0 0 0-6.14 15.76c-6.1 16.92-3.84 22.08 11.79 22.08 36.93 0 57.56-.53 71.42-.53 4.3 0-13.86-33.91-19.06-35.57-1.6-.52-4.26 1.83-6.4 2.45-4.72 1.4-6.5 0-11.76 0-3.08 0-6.06.55-8.72 1.48Zm0 0a26.67 26.67 0 0 1-4.44 8.38c-1.7 2.22-3.99 4.43-5.43 4.33-1.44-.1-1.42-3.18 0-5.66 1.97-3.44 6.45-5.87 9.88-7.05Z"
        stroke="#1C1F23"
      />
      <path
        d="M149.25 131.7s3.36 19.46-12.34 21.04c-11.53 1.15-40.77-4.55-53.76-7.79 4.72 12.82 9.61 39.86 7 42.16-3.33 2.93-47.55 1.76-55.96 0-8.42-1.75 13.82-11.46 15.45-14.66 2.99-5.84-5.48-21.18-5.75-45.45-.27-24.27 18.18-24.86 34.47-21.64 13.02 2.57 41.63 18.33 52.56 26.86l18.33-.52Z"
        fill="#C6CACD"
        stroke="#1C1F23"
      />
      <path
        d="M141.5 153.87c-3.11 2.55-27.72 5-35.58 3.53l2.75-6.8c20.23 2.85 28.08 3.34 33.46 1.16l-.63 2.11Z"
        fill="#1C1F23"
      />
      <path d="M126.02 142.7c-3.1-2.99-5-7.5-4.16-12.35" stroke="#1C1F23" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M130.6 95.65c-9.03-10.98-18.97-19.74-25.5-24.56l1.63-2.22c6.7 4.95 16.81 13.86 26 25.02 9.18 11.16 17.54 24.67 20.59 38.83l-2.7.59c-2.91-13.56-10.97-26.67-20.02-37.66Z"
        fill="#1C1F23"
      />
      <path
        d="m149.12 107.09-16.36 13.2 22.27 17.8 8.87-19.19c-.14-3.93-2.34-5.34-5.83-4.66l-3.12-2.5c.08-3.5-2.18-5.64-5.83-4.65Z"
        fill="#6B7075"
      />
      <path d="m148.24 128.62 9.45-14.34-2.91-2.33-10.94 13.07 4.4 3.6Z" stroke="#1C1F23" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M143.67 127.98a6.93 6.93 0 1 1-10.82-8.66 6.93 6.93 0 0 1 10.82 8.66Zm12.28 9.82a6.93 6.93 0 1 1-10.82-8.65 6.93 6.93 0 0 1 10.82 8.65Z"
        fill="#1C1F23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="m133.43 123.46 9.21-1.8.32 1.61-9.2 1.81-.33-1.62Z"
        fill="#C6CACD"
      />
      <path fill-rule="evenodd" clip-rule="evenodd" d="m145.5 133.11 9.21-1.8.32 1.62-9.2 1.8-.33-1.62Z" fill="#C6CACD" />
      <defs>
        <clipPath id="clip_failure_dark_46_27">
          <rect
            width={44.4004}
            height={44.4627}
            fill="white"
            transform="matrix(0.963965 -0.266028 0.266198 0.963918 18.4214 34.6221)"
          />
        </clipPath>
      </defs>
    </svg>
  );
});
const IconComponent = defineComponent({
  name: 'IllustrationFailureDark',
  setup() {
    return () => <SvgComponent />;
  },
});
IconComponent.props = {};
export default IconComponent;
export { SvgComponent };
