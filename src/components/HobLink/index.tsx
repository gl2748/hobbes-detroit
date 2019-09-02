import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import { HobTypography } from "../HobTypography";

export interface IHobLinkProps {
  color: "primary" | "secondary" | "dark-gray";
}

// any styling changes should be duplicated in components/GatsbyLink
// There is an issue with loadingi { Link } in storybook
// https://github.com/storybookjs/storybook/issues/7884
const StyledLink = styled.a`
  text-decoration: underline;
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
> = ({ color, children, className = "", ...props }) => {
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
