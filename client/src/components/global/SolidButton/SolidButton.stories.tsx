import SolidButton, { Props } from "./SolidButton";
import { Meta, Story } from "@storybook/react";
export default {
  component: SolidButton,
  title: "global/SolidButton",
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
  <SolidButton {...args}>I am a solid button.</SolidButton>
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {};
