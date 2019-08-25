import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
export interface IHobTextFieldProps {
  required?: boolean;
  type?: "password" | "email" | "text";
  value: string;
  placeholder?: string;
  onChange: (x: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = styled.input`
  height: 4rem;
  padding: 1rem;
  font-size: 28px;
  font-family: GT Haptik;
  border: var(--hob-border);
  width: 100%;
  background-color: transparent;
  ::placeholder {
    color: #8d8d8f;
  }
`;

export const HobTextField: React.FC<IHobTextFieldProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  required
}: IHobTextFieldProps) => {
  return (
    <TextField
      type={type}
      required={required}
      className="hob-text-field"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
