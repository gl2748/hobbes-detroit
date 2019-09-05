import styled from "@emotion/styled";
import React from "react";
import { HobGallery } from ".";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

export default {
  title: "Gallery"
};

const Container = styled(HobGallery)`
  background-color: var(--hob-color--white);
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hob-logo {
    width: 100px;
    height: 100px;
  }
  .hob-typography {
    color: var(--hob-color--);
    font-size: 1.75rem;
  }
`;

export const demo = () => (
  <Container>
    {["blue", "purple", "yellow", "pink", "green"].map(color => (
      <Slide key={color}>
        <HobLogo fill={`var(--hob-color--${color})`} />
        <HobTypography variant="h3">{color}</HobTypography>
      </Slide>
    ))}
  </Container>
);
