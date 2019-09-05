import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IHobLinkProps {
  color: "primary" | "secondary" | "dark-gray";
  to?: string;
  unsetTypography?: boolean;
}

const withStyle = C => styled(C)`
  text-decoration: underline;
  color: ${({ color }) => `var(--hob-color--${color})`};
  .hob-typography {
    color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :visited {
    text-decoration-color: ${({ color }) => `var(--hob-color--${color})`};
  }

  :hover,
  :focus {
    .hob-typography {
      background-color: ${({ color }) => `var(--hob-color--${color})`};
      color: ${({ color }) => `var(--hob-color-alt--${color})`};
      text-decoration-color: ${({ color }) => `var(--hob-color-alt--${color})`};
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
