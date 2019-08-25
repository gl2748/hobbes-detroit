import React from "react";

export interface IIconProps {
  color?: string;
}

export const Lock: React.FC<IIconProps> = ({
  color = "var(--hob-color--dark)"
}) => (
  <svg
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
  >
    <path
      d="M15 9H1V19H15V9Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 9V6C3 3.24 5.24 1 8 1C10.76 1 13 3.24 13 6V9"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Close: React.FC<IIconProps> = ({
  color = "var(--hob-color--dark)"
}) => (
  <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <path d="M14 2L9 7l5 5-2 2-5-5-5 5-2-2 5-5-5-5 2-2 5 5 5-5 2 2z" />
  </svg>
);
