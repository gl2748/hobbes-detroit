import styled from "@emotion/styled";
import React, { ReactNode } from "react";

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
    | "overline"
    | "subtitle1"
    | "subtitle2";
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div`
  font-family: var(--hob-font--regular);
`;
const VARIANTS = {
  body1: styled("p")`
    line-height: 1.1em;
  `,
  body2: styled("p")`
    font-size: 14px;
    line-height: 1.1em;
  `,
  button: styled("span")`
    font-family: var(--hob-font--medium);
    font-size: 14px;
  `,
  caption: styled("span")`
    font-size: 12px;
  `,
  h1: styled("h1")`
    font-size: 96px;
  `,
  h2: styled("h2")`
    font-size: 60px;
  `,
  h3: styled("h3")`
    font-size: 48px;
  `,
  h4: styled("h4")`
    font-size: 34px;
  `,
  h5: styled("h5")`
    font-size: 24px;
  `,
  h6: styled("h6")`
    font-size: 20px;
    font-family: var(--hob-font--medium);
  `,
  overline: styled("span")`
    font-size: 10px;
    text-transform: uppercase;
  `,
  subtitle1: styled("h6")`
    font-size: 16px;
  `,
  subtitle2: styled("h6")`
    font-size: 14px;
    font-family: var(--hob-font--medium);
  `
};

export const HobTypography: React.FC<IHobTypographyProps> = ({
  variant,
  children,
  className
}: IHobTypographyProps) => {
  const tag = VARIANTS[variant];
  const classNameDefault = `hob-typography hob-typography--${variant}`;
  return (
    <Wrapper>
      {React.createElement(tag, {
        children,
        className: `${classNameDefault} ${className ? className : ""}`.trim()
      })}
    </Wrapper>
  );
};
