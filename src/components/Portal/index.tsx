import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";
import { HobDrawer } from "../HobDrawer";
import { HobLetters } from "../HobLetters";
import { HobLogo } from "../HobLogo";

export interface IDrawerProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const PortalDrawer = styled(HobDrawer)`
  .portal {
    &__header,
    &__footer {
      flex: 1;
    }
    &__footer {
      display: flex;
      flex-direction: column-reverse;
    }
    &__content {
      flex: 4;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
`;

export const Portal: React.FC<IDrawerProps> = ({
  isVisible,
  onClose,
  children
}) => {
  return (
    <PortalDrawer onClose={onClose} isVisible={isVisible}>
      <div className="portal__header">
        <HobLetters size="lg" />
      </div>

      <div className="portal__content">{children}</div>

      <div className="portal__footer">
        <HobLogo width="4rem" />
      </div>
    </PortalDrawer>
  );
};
