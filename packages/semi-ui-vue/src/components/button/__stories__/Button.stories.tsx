import type { Meta, StoryObj } from '@storybook/vue3';

import Button, {ButtonProps} from '../index';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'B输入类/Button',
  component: Button as any,
  render: (args: any) => ({
    components: { Button: Button },
    setup() {
      return ()=>(<div style={{padding: '10px'}}>
        <Button {...args}>123</Button>
      </div>);
    },
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary"
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary"
  },
};
