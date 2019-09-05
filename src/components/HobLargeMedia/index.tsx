import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";

export interface ILargeMediaProps {
  children: ReactNode[];
}

const LargeMedia = styled.div`
  background-color: var(--hob-color--dark);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.875rem;
  overflow-x: hidden;
  height: 100vh;

  .hob-typography {
    color: var(--hob-color--light);
  }
`;

export const HobLargeMedia: React.FC<ILargeMediaProps> = ({ children }) => {
  return <LargeMedia className="hob-large-media">{children}</LargeMedia>;
};
