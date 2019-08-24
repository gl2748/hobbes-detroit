import styled from "@emotion/styled";
import React from "react";
import { Close, Lock } from "./icons";

const Icons = {
  close: Close,
  lock: Lock
};

export interface IHobIconProps {
  color?: string;
  name: "lock" | "close";
  size: "sm" | "md" | "lg";
}

const SIZES = {
  lg: "3rem",
  md: "1.5rem",
  sm: "0.75rem"
};
interface ISvgProps {
  size: "sm" | "md" | "lg";
}
const SvgContainer = styled.div<ISvgProps>`
  width: ${({ size }) => SIZES[size]};
  svg {
    width: 100%;
  }
`;

export const HobIcon: React.FC<IHobIconProps> = ({
  color = "var(--hob-color--dark)",
  name,
  size
}) => {
  const Svg = Icons[name];

  return (
    <SvgContainer size={size}>
      <Svg color={color} />
    </SvgContainer>
  );
};