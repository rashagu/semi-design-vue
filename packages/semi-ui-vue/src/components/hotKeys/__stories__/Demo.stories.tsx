import type { Meta, StoryObj } from '@storybook/vue3';

import Demo from "../__test__/HotKeysDocsDemo";
import Demo1 from "../__test__/HotKeysDemo";
import Demo2 from "../__test__/HotKeysDemo2";

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'BPLUS 组件/HotKeys',
  render: (args: any) => ({
    setup() {
      return ()=>(<div style={{padding: '10px'}}>
        <Demo />
        <Demo1 />
        <Demo2 />
      </div>);
    },
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
