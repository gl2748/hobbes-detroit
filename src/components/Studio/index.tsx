import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
export interface IStudioProps {
  description: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  social: Array<{ title: string; url: string }>;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--hob-color--secondary);
`;

export const Studio: React.FC<IStudioProps> = ({
  title,
  description,
  address,
  phone,
  email,
  social
}: IStudioProps) => {
  return (
    <Container id="studio">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{social[0].title}</p>
      <p>{social[0].url}</p>
    </Container>
  );
};
