import styled from "@emotion/styled";
import React from "react";
import { HobLogo } from "../HobLogo";
import { HobGrid } from "./";

export default {
  title: "Grid"
};

const Centered = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
`;

export const oneByOne = () => {
  return (
    <HobGrid>
      <Centered>
        <HobLogo fill="var(--hob-color--purple)" />
      </Centered>
    </HobGrid>
  );
};

export const twoByOne = () => {
  return (
    <HobGrid>
      {["purple", "blue"].map(color => (
        <HobLogo key="color" fill={`var(--hob-color--${color})`} />
      ))}
    </HobGrid>
  );
};

export const threeByOne = () => {
  return (
    <HobGrid>
      {["purple", "blue", "green"].map(color => (
        <HobLogo key="color" fill={`var(--hob-color--${color})`} />
      ))}
    </HobGrid>
  );
};

export const fourByOne = () => {
  return (
    <HobGrid>
      {["purple", "blue", "green", "pink"].map(color => (
        <HobLogo key="color" fill={`var(--hob-color--${color})`} />
      ))}
    </HobGrid>
  );
};

export const fiveByOne = () => {
  return (
    <HobGrid>
      {["purple", "blue", "green", "pink", "yellow"].map(color => (
        <HobLogo key="color" fill={`var(--hob-color--${color})`} />
      ))}
    </HobGrid>
  );
};
