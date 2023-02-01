import type { Meta, StoryObj } from '@storybook/vue3';

import FormDemo from '../__test__/FormDemo';
import WithFieldDemo from '../__test__/WithFieldDemo';
import WithFieldDemo2 from '../__test__/WithFieldDemo2';
import WithFormApiDemo from '../__test__/WithFormApiDemo';
import WithFormStateDemo from '../__test__/WithFormStateDemo';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '输入类/Form',
  render: (args: any) => ({
    setup() {
      const comp = {
        FormDemo,
        WithFieldDemo,
        WithFieldDemo2,
        WithFormApiDemo,
        WithFormStateDemo,
      };
      const Demo = comp[args.demoName];
      return () => (
        <div style={{ padding: '10px' }}>
          <Demo />
        </div>
      );
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

export const Form: Story = {
  args: {
    demoName: 'FormDemo',
  },
};
export const WithField: Story = {
  args: {
    demoName: 'WithFieldDemo',
  },
};
export const WithField2: Story = {
  args: {
    demoName: 'WithFieldDemo2',
  },
};
export const WithFormApi: Story = {
  args: {
    demoName: 'WithFormApiDemo',
  },
};
export const WithFormState: Story = {
  args: {
    demoName: 'WithFormStateDemo',
  },
};
