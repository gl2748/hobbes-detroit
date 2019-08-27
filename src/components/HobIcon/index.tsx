import styled from "@emotion/styled";
import React, { ReactElement } from "react";
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
  sm: "1.125rem"
};

export const HobIcon: React.FC<React.SVGProps<SVGElement> & IHobIconProps> = ({
  color = "primary",
  name,
  size,
  className = ""
}) => {
  const Svg = styled(Icons[name])`
    width: ${({ size: s }) => SIZES[s]};
    height: ${({ size: s }) => SIZES[s]};
  `;

  return (
    <Svg
      color={color}
      size={size}
      className={`hob-icon hob-icon--${name} hob-icon--${size} ${className}`}
    />
  );
};
