import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IGatsbyLinkProps {
  color: "primary" | "secondary" | "dark-gray";
  to: string;
}
const StyledGatsbyLink = styled(Link)`
  text-decoration: none;
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
    }
  }
`;
export const GatsbyLink: React.FC<
  IGatsbyLinkProps & HTMLProps<HTMLAnchorElement>
> = ({ color, children, to, className = "" }) => {
  return (
    <StyledGatsbyLink
      className={`hob-link hob-link--${color} ${className}`}
      color={color}
      to={to}
    >
      <HobTypography variant="link">{children}</HobTypography>
    </StyledGatsbyLink>
  );
};
