import type { Meta, StoryObj } from '@storybook/vue3';

import ModalDemo from "../__test__/ModalDemo";
import ModalDemoHook from "../__test__/ModalDemoHook";
import ModalDemoConfirm from "../__test__/ModalDemoConfirm";

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '展示类/Modal',
  render: (args: any) => ({
    setup() {
      return ()=>(<div style={{padding: '10px'}}>
        {args.name === 'ModalDemo'? <ModalDemo/>:null}
        {args.name === 'ModalDemoHook'? <ModalDemoHook/>:null}
        {args.name === 'ModalDemoConfirm'? <ModalDemoConfirm/>:null}
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

export const Modal: Story = {
  args: {
    name: 'ModalDemo'
  },
};
export const ModalHook: Story = {
  args: {
    name: 'ModalDemoHook'
  },
};
export const ModalConfirm: Story = {
  args: {
    name: 'ModalDemoConfirm'
  },
};


