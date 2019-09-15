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
  text-decoration: none;
  color: ${({ color }: IHobLinkProps) => `var(--hob-color--${color})`};
  transition: opacity var(--hob-transition-duration);
  .hob-typography {
    transition: opacity var(--hob-transition-duration);
    color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :visited {
    color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :hover,
  :focus {
    .hob-typography {
      opacity: 0.5;
      cursor: pointer;
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
