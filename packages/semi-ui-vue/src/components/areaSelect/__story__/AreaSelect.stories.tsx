import {h} from 'vue'
import AreaSelectDemo from '../__test__/AreaSelectDemo';
import {Meta, Story, StoryFn} from "@storybook/vue3";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example3/Button',
  component: AreaSelectDemo,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta<any>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: Story<any> = (args) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return ()=><div><AreaSelectDemo {...args} /></div>;
  },
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  type: 'primary',
};