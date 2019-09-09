import styled from "@emotion/styled";
import { Link } from "gatsby";
import GatsbyLink from "gatsby-link";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IHobLinkProps {
  color: "primary" | "secondary" | "dark-gray";
  to?: string;
  unsetTypography?: boolean;
}

const withStyle = (C: "a" | (typeof GatsbyLink)) => styled<any>(C)<
  IHobLinkProps & HTMLProps<HTMLAnchorElement>
>`
  text-decoration: underline;
  color: ${({ color }: IHobLinkProps) => `var(--hob-color--${color})`};
  .hob-typography {
    color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :visited {
    color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :hover,
  :focus {
    .hob-typography {
      background-color: ${({ color }) => `var(--hob-color--${color})`};
      color: ${({ color }) => `var(--hob-color-alt--${color})`};
      text-decoration: underline;
    }
  }
`;

export const HobLink: React.FC<
  IHobLinkProps & HTMLProps<HTMLAnchorElement>
> = ({
  color,
  children,
  className = "",
  to,
  unsetTypography = false,
  ...props
}) => {
  const StyledLink = withStyle(to ? Link : "a");
  return (
    <StyledLink
      className={`hob-link hob-link--${color} ${className}`}
      color={color}
      {...(to ? { to } : {})}
      {...props}
    >
      {unsetTypography ? (
        children
      ) : (
        <HobTypography variant="link">{children}</HobTypography>
      )}
    </StyledLink>
  );
};
