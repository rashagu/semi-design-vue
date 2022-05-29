import {h} from 'vue'
import MyButton, {ButtonProps} from '../../button';
import Input from "../../input";
import { IconClear, IconEyeOpened, IconEyeClosedSolid } from '@kousum/semi-icons-vue';
import Popover from "../../popover";
import {Radio, Group as RadioGroup} from "../../radio";
import {Meta, Story, StoryFn} from "@storybook/vue3";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example2/Button',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta<ButtonProps>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: Story<ButtonProps> = (args) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return ()=><div><Input/><MyButton {...args}>122223</MyButton></div>;
  },
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  type: 'primary',
};