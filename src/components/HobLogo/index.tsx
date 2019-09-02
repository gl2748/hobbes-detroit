import styled from "@emotion/styled";
import React from "react";

export interface IHobLogoProps {
  fill?: string;
  stroke?: string;
  height?: string;
  width?: string;
}

interface ISvgProps {
  height?: string;
  width?: string;
}
const SvgContainer = styled.div<ISvgProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HobLogo: React.FC<IHobLogoProps> = ({
  fill = "#000",
  stroke,
  width = "var(--hob-logo-size--md)",
  height = width
}) => {
  return (
    <SvgContainer height={height} width={width} className="hob-logo">
      <svg
        viewBox="0 0 37 41"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        stroke={stroke}
      >
        <path d="M0.5 17.4382V0.5H35.7015V17.4382H0.5Z" />
        <path d="M35.6944 40.5H0.507102C0.774292 31.106 8.54655 23.5618 18.1008 23.5618C27.6549 23.5618 35.4272 31.106 35.6944 40.5Z" />
      </svg>
    </SvgContainer>
  );
};
