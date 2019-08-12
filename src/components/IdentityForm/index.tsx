import React, { ReactNode, useReducer } from 'react';
import IdentityModal from 'react-netlify-identity-widget';
import './styles.scss';

export interface IIdentityFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export const IdentityForm: React.FC<IIdentityFormProps> = ({
  isVisible,
  onClose,
}: IIdentityFormProps) => {
  return <IdentityModal showDialog={isVisible} onCloseDialog={onClose} />;
};
