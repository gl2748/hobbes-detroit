import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IHobLinkProps {
  color: "primary" | "secondary" | "dark-gray";
  to?: string;
}

const StyledGatsbyLink = styled(Link)`
  text-decoration: underline;
  color: ${({ color }) => `var(--hob-color--${color})`};

  :hover,
  :focus {
    background-color: ${({ color }) => `var(--hob-color--${color})`};
    color: ${({ color }) => `var(--hob-color-alt--${color})`};
  }
`;

const StyledLink = styled.a`
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
> = ({ color, children, to, className = "", ...props }) => {
  if (to) {
    return (
      <StyledGatsbyLink
        className={`hob-link hob-link--${color} ${className}`}
        color={color}
        to={to}
      >
        <HobTypography variant="link">{children}</HobTypography>
      </StyledGatsbyLink>
    );
  }
  return (
    <StyledLink
      className={`hob-link hob-link--${color} ${className}`}
      color={color}
      {...props}
    >
      <HobTypography variant="link">{children}</HobTypography>
    </StyledLink>
  );
};
