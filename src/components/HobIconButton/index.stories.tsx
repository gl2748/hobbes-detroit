import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React from "react";
import { HobIconButton } from ".";

export default {
  title: "IconButton"
};

const Container = styled.div`
  width: 400px;
  padding: 1rem;

  .hob-button {
    margin: 1rem 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
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
        <Flex>
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="primary"
            name="lock"
            size="sm"
          />
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="primary"
            name="lock"
            size="md"
          />
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="primary"
            name="lock"
            size="lg"
          />
        </Flex>
      </LightBg>

      <DarkBg>
        <Flex>
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="secondary"
            name="close"
            size="sm"
          />
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="secondary"
            name="close"
            size="md"
          />
          <HobIconButton
            variant="text"
            onClick={action("clicked")}
            color="secondary"
            name="close"
            size="lg"
          />
        </Flex>
      </DarkBg>
    </Container>
  );
};
