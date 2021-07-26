import Button, { Props } from "./Button";
import { Meta, Story } from "@storybook/react";
export default {
  component: Button,
  title: "global/Button"
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
  <Button variant={args.variant} onClick={args.onClick}>
    {args.children}
  </Button>
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = { onClick: () => alert("I've been pressed"), children: "I am a button" };
