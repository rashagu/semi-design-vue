import type { Meta, StoryObj } from '@storybook/vue3';

import TreeDemo from "../__test__/TreeDemo";
import TreeCheckDemo from "../__test__/TreeCheckDemo";

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '导航类/Tree',
  render: (args: any) => ({
    setup() {
      return ()=>(<div style={{padding: '10px'}}>
        {args.name === 'TreeDemo'?<TreeDemo/>:null}
        {args.name === 'TreeCheckDemo'?<TreeCheckDemo/>:null}
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


export const Tree: Story = {
  args: {
    name: 'TreeDemo'
  },
};
export const TreeCheck: Story = {
  args: {
    name: 'TreeCheckDemo'
  },
};
