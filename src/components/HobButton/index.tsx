import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { MouseEvent, ReactNode } from "react";
import { HobTypography } from "../HobTypography";
export interface IHobButtonProps {
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary";
  children: ReactNode;
  onClick: (x: MouseEvent<HTMLButtonElement>) => void;
}

const shared = css`
  padding: 1rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 300ms, background-color 300ms, opacity 300ms, border 300ms;

  :hover {
    cursor: pointer;
  }

  .hob-typography--button {
    font-size: 28px;
  }
`;

const TextButton = styled.button`
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

const OutlinedButton = styled.button`
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

const ContainedButton = styled.button`
  ${shared}
  background-color: ${({ color }) => `var(--hob-color--${color})`};
  color: ${({ color }) => `var(--hob-color-alt--${color})`};

  :hover,
  :focus {
    opacity: 0.8;
  }
`;

export const HobButton: React.FC<IHobButtonProps> = ({
  variant,
  color,
  onClick,
  children
}: IHobButtonProps) => {
  const Button = {
    contained: ContainedButton,
    outlined: OutlinedButton,
    text: TextButton
  }[variant];
  return (
    <Button
      className={`hob-button hob-button--${color} hob-button--${variant}`}
      onClick={onClick}
      color={color}
    >
      <HobTypography variant="button">{children}</HobTypography>
    </Button>
  );
};
