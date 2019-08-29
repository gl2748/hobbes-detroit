import * as React from "react";

export interface ICookieProps {
  title: string;
  description: string;
}

export const Cookie: React.FC<ICookieProps> = ({
  title,
  description
}: ICookieProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};
