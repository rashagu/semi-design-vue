import type { Meta, StoryObj } from '@storybook/vue3';

import TableDemo1 from "../__test__/TableDemo1";
import TableDemo2 from "../__test__/TableDemo2";
import TableDemo3 from "../__test__/TableDemo3";
import TableDemo4 from "../__test__/TableDemo4";
import TableDemo5 from "../__test__/TableDemo5";
import TableDemo6 from "../__test__/TableDemo6";
import TableDemo7 from "../__test__/TableDemo7";
import TableDemo8 from "../__test__/TableDemo8";
import TableDemo9 from "../__test__/TableDemo9";
import TableDemo10 from "../__test__/TableDemo10";
import TableDemo11 from "../__test__/TableDemo11";
import TableDemo12 from "../__test__/TableDemo12";
import TableDemo13Virtualized from "../__test__/TableDemo13Virtualized";

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'D展示类/Table',
  render: (args: any) => ({
    setup() {
      return ()=>(<div style={{padding: '10px'}}>
        {args.name === 'TableDemo1'? <TableDemo1/>:null}
        {args.name === 'TableDemo2'? <TableDemo2/>:null}
        {args.name === 'TableDemo3'? <TableDemo3/>:null}
        {args.name === 'TableDemo4'? <TableDemo4/>:null}
        {args.name === 'TableDemo5'? <TableDemo5/>:null}
        {args.name === 'TableDemo6'? <TableDemo6/>:null}
        {args.name === 'TableDemo7'? <TableDemo7/>:null}
        {args.name === 'TableDemo8'? <TableDemo8/>:null}
        {args.name === 'TableDemo9'? <TableDemo9/>:null}
        {args.name === 'TableDemo10'? <TableDemo10/>:null}
        {args.name === 'TableDemo11'? <TableDemo11/>:null}
        {args.name === 'TableDemo12'? <TableDemo12/>:null}
        {args.name === 'TableDemo13Virtualized'? <TableDemo13Virtualized/>:null}
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

export const SideSheet: Story = {
  args: {
    name: 'SideSheetDemo'
  },
};
export const Table1: Story = {
  args: {
    name: 'TableDemo1'
  },
};
export const Table2: Story = {
  args: {
    name: 'TableDemo2'
  },
};
export const Table3: Story = {
  args: {
    name: 'TableDemo3'
  },
};
export const Table4: Story = {
  args: {
    name: 'TableDemo4'
  },
};
export const Table5: Story = {
  args: {
    name: 'TableDemo5'
  },
};
export const Table6: Story = {
  args: {
    name: 'TableDemo6'
  },
};
export const Table7: Story = {
  args: {
    name: 'TableDemo7'
  },
};
export const Table8: Story = {
  args: {
    name: 'TableDemo8'
  },
};
export const Table9: Story = {
  args: {
    name: 'TableDemo9'
  },
};
export const Table10: Story = {
  args: {
    name: 'TableDemo10'
  },
};
export const Table11: Story = {
  args: {
    name: 'TableDemo11'
  },
};
export const Table12: Story = {
  args: {
    name: 'TableDemo12'
  },
};
export const Table13Virtualized: Story = {
  args: {
    name: 'TableDemo13Virtualized'
  },
};
