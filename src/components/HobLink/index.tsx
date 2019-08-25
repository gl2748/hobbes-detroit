import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IHobLinkProps {
  color: "primary" | "secondary";
}

const Link = styled.a`
  text-decoration: underline;
  color: ${({ color }) => `var(--hob-color--${color})`};

  :hover,
  :focus {
    background-color: ${({ color }) => `var(--hob-color--${color})`};
    color: ${({ color }) => `var(--hob-color-alt--${color})`};
  }
`;

export const HobLink: React.FC<
  IHobLinkProps & HTMLProps<HTMLAnchorElement>
> = ({ color, children, className, ...props }) => {
  return (
    <Link
      className={`hob-link hob-link--${color} ${className}`}
      color={color}
      {...props}
    >
      <HobTypography variant="link">{children}</HobTypography>
    </Link>
  );
};
