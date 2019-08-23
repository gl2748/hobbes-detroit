import React, { ReactNode } from "react"

export interface IPanelProps {
  isVisible: boolean
  children: ReactNode
  onClose: () => void
}

export const Panel: React.FC<IPanelProps> = ({
  isVisible,
  children,
  onClose,
}: IPanelProps) => {
  if (isVisible) {
    return (
      <div>
        {children}
        <div onClick={onClose}>CLOSE</div>
      </div>
    )
  } else {
    return null
  }
}
