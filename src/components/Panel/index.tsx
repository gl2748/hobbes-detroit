import React, { ReactNode, useReducer } from 'react';

export interface IPanelProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Panel: React.FC<IPanelProps> = ({
  isVisible,
  children,
  onClose,
}: IPanelProps) => {
  if (isVisible) {
    return (
      <div>
        This is the panel!
        {children}
        <div onClick={onClose}>CLOSE</div>
      </div>
    );
  } else {
    return null;
  }
};
