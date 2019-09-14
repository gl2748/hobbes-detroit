import css from "@emotion/css";
import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";

export interface ILargeMediaProps {
  children: ReactNode[] | ReactNode;
  bleed?: boolean;
}

export interface TLargeMediaStyles {
  bleed?: boolean;
}

const LargeMedia = styled.div<TLargeMediaStyles>`
  width: 100vw;
  position: relative;
  img {
    width: 100%;
  }
  ${props =>
    props.bleed
      ? css`
          padding: 1.25rem 0;
        `
      : css`
          padding: 1.25rem;
        `}
`;

export const HobLargeMedia: React.FC<ILargeMediaProps> = ({
  children,
  bleed = false
}) => {
  return (
    <LargeMedia bleed={bleed} className="hob-large-media">
      {children}
    </LargeMedia>
  );
};
