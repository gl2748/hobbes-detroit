import React from "react";
import { HobMarkdown } from "./";

export default {
  title: "Markdown"
};

const broken = `

body2:

tnahoeutnsha


atnoheusntao



thaosetnuhsatnoehu
`;

export const demo = () => (
  <>
    <HobMarkdown source="# H1" />
    <HobMarkdown source="# H2" />
    <HobMarkdown source="# H3" />
    <HobMarkdown source="# H4" />
    <HobMarkdown source="# H5" />
    <HobMarkdown source="# H6" />
    <HobMarkdown source="body1: Just some good ole boys" />
    <HobMarkdown source={broken} />
    <HobMarkdown source="[Link](https://www.google.com)" />
  </>
);
