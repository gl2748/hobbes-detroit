import styled from "@emotion/styled";
import React, { ChangeEvent, HTMLProps } from "react";

const TextField = styled.input`
  height: 4rem;
  padding: 1rem;
  font-size: 1.75rem;
  font-family: GT Haptik;
  border: var(--hob-border);
  width: 100%;
  background-color: transparent;
  ::placeholder {
    color: #8d8d8f;
  }
`;

export const HobTextField: React.FC<HTMLProps<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return <TextField className={`hob-text-field ${className}`} {...props} />;
};
