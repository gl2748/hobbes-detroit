import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { MouseEvent, ReactNode } from "react";
import { HobButtonBase } from "../HobButtonBase";
import { HobIcon } from "../HobIcon";

export interface IHobIconButtonProps {
  size: "sm" | "md" | "lg";
  variant: "text";
  color: "primary" | "secondary";
  name: "lock" | "close";
  onClick: (x: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const shared = css`
  padding: 0.8rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color var(--hob-transition-duration),
    background-color var(--hob-transition-duration),
    opacity var(--hob-transition-duration),
    border var(--hob-transition-duration);
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

export const HobIconButton: React.FC<IHobIconButtonProps> = ({
  variant,
  color,
  name,
  onClick,
  size,
  className
}) => {
  const Button = {
    text: TextButton
  }[variant];
  return (
    <Button
      className={`${
        className ? className : ""
      } hob-icon-button hob-icon-button--${color} hob-icon-button--${size}  hob-icon-button--${name} hob-icon-button--${variant}`}
      onClick={onClick}
      color={color}
      variant={variant}
    >
      <HobIcon name={name} size={size} color={color} />
    </Button>
  );
};
