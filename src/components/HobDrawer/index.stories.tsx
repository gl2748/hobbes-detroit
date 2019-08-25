import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { HobDrawer } from ".";
import { HobButton } from "../HobButton";
import { HobLetters } from "../HobLetters";

export default {
  title: "Drawer"
};

const Container = styled.div`
  display: flex;
  background-color: var(--hob-color--dark);
  height: 100vh;
  width: 100%;
  padding: 1rem;
`;

export const visible = () => (
  <Container>
    <HobDrawer isVisible={true} onClose={action("closed")}>
      hello
    </HobDrawer>
  </Container>
);

export const withState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  return (
    <Container>
      <HobDrawer isVisible={isOpen} onClose={toggleDrawer}>
        <HobLetters size="lg" />
      </HobDrawer>

      <HobButton variant="contained" color="secondary" onClick={toggleDrawer}>
        Toggle
      </HobButton>
    </Container>
  );
};
