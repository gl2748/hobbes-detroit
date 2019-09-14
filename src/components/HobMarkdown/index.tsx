import { HobLink } from "@components/HobLink";
import { HobTypography, IHobTypographyProps } from "@components/HobTypography";
import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";
import breaks from "remark-breaks";
import breakpoints from "../../breakpoints";

declare module "remark-breaks" {}

const Heading = styled(HobTypography)`
  margin-bottom: 3rem;
  font-size: 2.8125rem;
  ${breakpoints.mobile} {
    font-size: 1.75rem;
  }

  * + & {
    margin-top: 3rem;
  }
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

const Paragraph = styled(HobTypography)`
  font-size: 1.75rem;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${breakpoints.mobile} {
    font-size: 1.125rem;
  }
`;

const HobMarkdownParagraph = ({
  children
}: HTMLProps<HTMLParagraphElement>) => (
  <Paragraph variant="body1" className="markdown">
    {children}
  </Paragraph>
);

const Link = styled(HobLink)``;

const HobMarkdownLink = ({
  children,
  href,
  target
}: HTMLProps<HTMLAnchorElement>) => (
  <Link color="primary" className="markdown" {...{ href, target }}>
    {children}
  </Link>
);
const renderers = {
  heading: HobMarkdownHeading,
  link: HobMarkdownLink,
  paragraph: HobMarkdownParagraph
};

export const HobMarkdown = ({ source }: ReactMarkdownProps) => (
  <ReactMarkdown
    source={source}
    renderers={renderers}
    plugins={[breaks]}
    linkTarget="_blank"
  />
);
