import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { HobIconButton } from "../HobIconButton";

export interface IDrawerProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Drawer = styled.div`
  padding: 1.25rem;
  position: absolute;
  height: 100vh;
  z-index: 100;
  left: -100%;
  top: 0;
  transition: left 300ms ease;
  background-color: var(--hob-color--light);
  width: 447px;
  &.hob-drawer--visible {
    left: 0;
  }

  .hob-icon-button--close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

export const HobDrawer: React.FC<IDrawerProps> = ({
  isVisible,
  children,
  onClose
}) => {
  return (
    <Drawer
      className={`hob-drawer hob-drawer--${isVisible ? "visible" : "hidden"}`}
    >
      <HobIconButton
        onClick={onClose}
        name="close"
        size="sm"
        variant="text"
        color="primary"
      />
      {children}
    </Drawer>
  );
};
