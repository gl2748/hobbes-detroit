import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { HTMLProps, MouseEvent, ReactNode } from "react";
import { HobButtonBase } from "../HobButtonBase";
import { HobTypography } from "../HobTypography";
export interface IHobButtonProps {
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary";
  onClick: (e: React.MouseEvent) => void;
}

const shared = css`
  padding: 1rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color var(--hob-transition-duration),
    background-color var(--hob-transition-duration),
    opacity var(--hob-transition-duration),
    border var(--hob-transition-duration);

  :hover {
    cursor: pointer;
  }

  .hob-typography--button {
    font-size: 1.75rem;
  }
`;

const TextButton = styled(HobButtonBase)`
  ${shared}
  border: var(--hob-border);
  border-color: transparent;
  background-color: transparent;
  color: ${({ color }) => `var(--hob-color--${color})`};

  :hover,
  :focus {
    border-color: ${({ color }) => `var(--hob-color--${color})`};
  }
`;

const OutlinedButton = styled(HobButtonBase)`
  ${shared}
  border: var(--hob-border);
  border-color: ${({ color }) => `var(--hob-color--${color})`};
  color: ${({ color }) => `var(--hob-color--${color})`};
  background-color: transparent;

  :hover,
  :focus {
    background-color: ${({ color }) => `var(--hob-color--${color})`};
    color: ${({ color }) => `var(--hob-color-alt--${color})`};
  }
`;

const ContainedButton = styled(HobButtonBase)`
  ${shared}
  background-color: ${({ color }) => `var(--hob-color--${color})`};
  color: ${({ color }) => `var(--hob-color-alt--${color})`};

  :hover,
  :focus {
    opacity: 0.8;
  }
`;

export const HobButton: React.FC<
  IHobButtonProps & HTMLProps<HTMLButtonElement>
> = ({ variant, color, onClick, children, className = "", ...props }) => {
  const Button = {
    contained: ContainedButton,
    outlined: OutlinedButton,
    text: TextButton
  }[variant];
  return (
    <Button
      className={`hob-button hob-button--${color} hob-button--${variant} ${className}`}
      onClick={onClick}
      color={color}
      {...props}
    >
      <HobTypography variant="button">{children}</HobTypography>
    </Button>
  );
};
