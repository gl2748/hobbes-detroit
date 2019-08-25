import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React from "react";
import { HobButtonBase } from ".";

export default {
  title: "ButtonBase"
};

const Container = styled.div`
  width: 400px;
  padding: 1rem;

  .hob-button {
    margin: 1rem 0;
  }
`;

export const basic = () => {
  return (
    <Container>
      <HobButtonBase className="basic" onClick={action("clicked")}>
        ButtonBase
      </HobButtonBase>
    </Container>
  );
};
