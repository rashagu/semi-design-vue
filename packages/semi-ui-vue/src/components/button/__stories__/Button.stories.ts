// Button.stories.ts

import {Button} from '@kousum/semi-ui-vue';

import {Meta, Story, StoryFn} from '@storybook/vue3';
import {ButtonProps} from "../index";

//
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as Meta<ButtonProps>;
const Template: Story<ButtonProps> = (args: ButtonProps) => ({
  components: { Button },
  setup(){
    return {args}
  },
  template: '<Button v-bind="args" >Button</Button>',
});
const types  = [
  'primary',
  'secondary',
  'tertiary',
  'warning',
  'danger'
]
export const Primary = Template.bind({});
Primary.args = { type: 'primary', };
