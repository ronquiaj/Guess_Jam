import Hamburger, { Props } from "./Hamburger";
import { Meta, Story } from "@storybook/react";
export default {
  component: Hamburger,
  title: "global/Hamburger"
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <Hamburger {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {};
