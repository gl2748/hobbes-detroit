import styled from "@emotion/styled";
import React, { MouseEvent, ReactNode } from "react";
import { HobIconButton } from "../HobIconButton";

export interface IDrawerProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Container = styled.div`
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 100;
  transition: width var(--hob-transition-duration);
  height: 100vh;

  &.hob-drawer-container--visible {
    width: 100vw;
  }
  background: rgba(0, 0, 0, 0.5);
`;

const Drawer = styled.div`
  position: relative;
  padding: 1.25rem;
  height: 100%;
  transition: left var(--hob-transition-duration);
  background-color: var(--hob-color--light);
  width: 447px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .hob-icon-button--close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

export const HobDrawer: React.FC<IDrawerProps> = ({
  isVisible,
  children,
  onClose,
  className
}) => {
  const onlyParent = (fn: (e: MouseEvent<HTMLDivElement>) => void) => (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (e.currentTarget === e.target) {
      fn(e);
    }
  };
  return (
    <Container
      className={`hob-drawer-container hob-drawer-container--${
        isVisible ? "visible" : "hidden"
      } ${className}`}
      onClick={onlyParent(onClose)}
    >
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
    </Container>
  );
};
