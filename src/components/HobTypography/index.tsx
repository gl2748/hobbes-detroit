import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import breakpoints from "../../breakpoints";

export interface IHobTypographyProps {
  variant:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "link"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  children: ReactNode;
  className?: string;
}

const VARIANTS = {
  body1: styled("p")`
    font-size: 1.125rem;
    line-height: 1.278em;
  `,
  body2: styled("p")`
    font-size: 0.875rem;
    line-height: 1.1em;
  `,
  button: styled("span")`
    font-size: 0.875rem;
  `,
  caption: styled("span")`
    font-size: 0.75rem;
  `,
  h1: styled("h1")`
    font-size: 6rem;
    ${breakpoints.mobile} {
      font-size: 3rem;
    }
  `,
  h2: styled("h2")`
    font-size: 3.75rem;
  `,
  h3: styled("h3")`
    font-size: 3rem;
  `,
  h4: styled("h4")`
    font-size: 2.125rem;
  `,
  h5: styled("h5")`
    font-size: 1.5rem;
  `,
  h6: styled("h6")`
    font-size: 1.25rem;
    font-family: var(--hob-font--medium);
  `,
  link: styled.span`
    font-size: 1.125rem;
    line-height: 1.278em;
  `,
  overline: styled("span")`
    font-size: 0.625rem;
    text-transform: uppercase;
  `,
  subtitle1: styled("h6")`
    font-size: 1rem;
  `,
  subtitle2: styled("h6")`
    font-size: 0.875rem;
    font-family: var(--hob-font--medium);
  `
};

export const HobTypography: React.FC<IHobTypographyProps> = ({
  variant,
  children,
  className
}: IHobTypographyProps) => {
  const Tag = VARIANTS[variant];
  const classNameDefault = `hob-typography hob-typography--${variant}`;
  return (
    <Tag className={`${classNameDefault} ${className ? className : ""}`.trim()}>
      {children}
    </Tag>
  );
};
