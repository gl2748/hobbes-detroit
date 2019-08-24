import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React from "react";
import { HobButton } from ".";

export default {
  title: "Button"
};

const Container = styled.div`
  width: 400px;
  padding: 1rem;

  .hob-button {
    margin: 1rem 0;
  }
`;

const LightBg = styled.div`
  border: var(--hob-border);
  padding: 1rem;
`;

const DarkBg = styled.div`
  background-color: var(--hob-color--dark);
  padding: 1rem;
`;

export const basic = () => {
  return (
    <Container>
      <LightBg>
        <HobButton variant="text" onClick={action("clicked")} color="primary">
          Text
        </HobButton>

        <HobButton
          variant="outlined"
          onClick={action("clicked")}
          color="primary"
        >
          Outlined
        </HobButton>

        <HobButton
          variant="contained"
          onClick={action("clicked")}
          color="primary"
        >
          Contained
        </HobButton>
      </LightBg>
      <DarkBg>
        <HobButton variant="text" onClick={action("clicked")} color="secondary">
          Text
        </HobButton>

        <HobButton
          variant="outlined"
          onClick={action("clicked")}
          color="secondary"
        >
          Outlined
        </HobButton>

        <HobButton
          variant="contained"
          onClick={action("clicked")}
          color="secondary"
        >
          Contained
        </HobButton>
      </DarkBg>
    </Container>
  );
};
