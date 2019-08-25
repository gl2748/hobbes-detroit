import styled from "@emotion/styled";
import React, { MouseEvent, ReactNode } from "react";
export interface IHobButtonBaseProps {
  color?: string;
  variant?: string;
  children: ReactNode;
  className: string;
  onClick: (x: MouseEvent<HTMLButtonElement>) => void;
}

const Button = styled.button`
  border: none;
  background: transparent;
  :hover {
    cursor: pointer;
  }
`;

export const HobButtonBase: React.FC<IHobButtonBaseProps> = ({
  onClick,
  children,
  className
}) => {
  return (
    <Button className={`hob-button-base ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
};
