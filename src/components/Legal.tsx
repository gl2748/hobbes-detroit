import React from 'react';

export interface ILegalProps {
  title: string;
  description: string;
}

export const Legal: React.FC<ILegalProps> = ({
  title,
  description,
}: ILegalProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};
