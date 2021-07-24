import Typography, { Props } from "./Typography";
import { Meta, Story } from "@storybook/react";
import { Router } from "@reach/router";
export default {
  component: Typography,
  title: "global/Typography"
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <Typography {...args}>{args.children}</Typography>;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = { variant: "blue", children: "Typography" };
