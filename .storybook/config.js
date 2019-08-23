import {configure} from "@storybook/react";
import "../src/components/main.css";
// automatically import all files ending in *.stories.tsx
configure(require.context("../src", true, /\.stories\.tsx$/), module);
