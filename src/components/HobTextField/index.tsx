import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
export interface IHobTextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (x: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = styled.input`
  height: 4rem;
  padding: 1rem;
  font-size: 28px;
  font-family: GT Haptik;
  border: 1px solid var(--hob-color--dark);
  width: 100%;
  background-color: transparent;
  ::placeholder {
    color: #8d8d8f;
  }
`;

export const HobTextField: React.FC<IHobTextFieldProps> = ({
  value,
  onChange,
  placeholder
}: IHobTextFieldProps) => {
  return (
    <TextField
      type="text"
      className="hob-text-field"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
