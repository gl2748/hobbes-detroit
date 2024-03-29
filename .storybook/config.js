import { configure } from "@storybook/react";
import "../src/components/main.css";

global.___loader = {
  enqueue: () => {},
  hovering: () => {}
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = "";
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname);
};

// automatically import all files ending in *.stories.tsx
configure(require.context("../src", true, /\.stories\.tsx$/), module);
