import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { HobDrawer } from ".";
import { HobButton } from "../HobButton";
import { HobLetters } from "../HobLetters";
import { HobLogo } from "../HobLogo";
import { HobTextField } from "../HobTextField";
import { HobTypography } from "../HobTypography";

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
      <HobLetters size="lg" />
      <HobTypography variant="body1">This is great</HobTypography>
      <HobLogo />
    </HobDrawer>
  </Container>
);

export const withState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const onChange = action("change");
  return (
    <Container>
      <HobDrawer isVisible={isOpen} onClose={toggleDrawer}>
        <HobLetters size="lg" />
        <HobTextField value="sweet" onChange={onChange} />
        <HobTypography variant="body1">This is great</HobTypography>
        <HobLogo />
      </HobDrawer>

      <HobButton variant="contained" color="secondary" onClick={toggleDrawer}>
        Toggle
      </HobButton>
    </Container>
  );
};
