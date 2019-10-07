import React, { HTMLProps } from "react";

export const DynamicGradientSvgText = ({
  height,
  offset,
  children,
  from,
  to
}: {
  height: number;
  offset: number;
  from: string;
  to: string;
} & HTMLProps<HTMLElement>) => {
  console.log("offset", offset);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={100}
      viewBox={`0 0 80 ${height}`}
    >
      <defs>
        <linearGradient id="bicolored" y1="0%" y2="100%" x1="100%" x2="100%">
          <stop offset={`${Math.max(100 - offset, 0)}%`} stopColor={from} />
          <stop offset="0%" stopColor={to} />
        </linearGradient>
      </defs>
      <text x="0" y={height * 0.9} fill="url(#bicolored)" fontSize={height}>
        {children}
      </text>
    </svg>
  );
};
