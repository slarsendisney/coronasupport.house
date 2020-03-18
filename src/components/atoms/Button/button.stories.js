import React from "react";
import Button from "./Button";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  parameters: {
    componentSubtitle: "Simple Button",
    component: Button
  }
};

export const Story1 = () => (
  <Button onClick={action("button-click")} disabled>
    Button
  </Button>
);
Story1.story = { name: "Default Disabled" };

export const Story2 = () => (
  <Button onClick={action("button-click")} variant="primary">
    Button
  </Button>
);
Story2.story = { name: "Primary" };

export const Story3 = () => (
  <Button onClick={action("button-click")} variant="primary" disabled>
    Button
  </Button>
);
Story3.story = { name: "Primary Disabled" };

export const Story4 = () => (
  <Button onClick={action("button-click")} variant="secondary">
    Button
  </Button>
);
Story4.story = { name: "Secondary" };

export const Story5 = () => (
  <Button onClick={action("button-click")} variant="secondary" disabled>
    Button
  </Button>
);
Story5.story = { name: "Secondary Disabled" };
