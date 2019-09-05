import { HobTypography, IHobTypographyProps } from "@components/HobTypography";
import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";

const Heading = styled(HobTypography)`
  margin-bottom: 3rem;
  font-size: 2.8125rem;

  * + & {
    margin-top: 3rem;
  }
`;
const Paragraph = styled(HobTypography)`
  font-size: 1.75rem;
`;

const HobMarkdownHeading = ({
  children,
  level
}: {
  level: "1" | "2" | "3" | "4" | "5" | "6";
} & HTMLProps<HTMLHeadingElement>) => {
  const variant = `h${level}` as IHobTypographyProps["variant"];
  return (
    <Heading variant={variant} className="markdown">
      {children}
    </Heading>
  );
};

const HobMarkdownParagraph = ({
  children
}: HTMLProps<HTMLParagraphElement>) => (
  <Paragraph variant="body1" className="markdown">
    {children}
  </Paragraph>
);

const renderers = {
  heading: HobMarkdownHeading,
  paragraph: HobMarkdownParagraph
};

export const HobMarkdown = ({ source }: ReactMarkdownProps) => (
  <ReactMarkdown source={source} renderers={renderers} />
);
