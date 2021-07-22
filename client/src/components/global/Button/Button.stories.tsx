import Button, { Props } from "./Button";
import { Meta, Story } from "@storybook/react";
export default {
  component: Button,
  title: "global/Button"
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = { onClick: () => alert("I've been pressed"), text: "I am a button" };
