import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React, { Fragment, useState } from "react";
import { HobCarousel } from ".";
import { HobLetters } from "../HobLetters";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

export default {
  title: "Carousel"
};

const Horse = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hob-logo {
    flex: 1;
  }
  .hob-typography {
    color: var(--hob-color--dark-gray);
    font-size: 1.75rem;
  }
`;

export const demo = () => (
  <HobCarousel>
    {["blue", "purple", "yellow", "pink", "green"].map(color => (
      <Horse key={color}>
        <HobLogo fill={`var(--hob-color--${color})`} />
        <HobTypography variant="h3">{color}</HobTypography>
      </Horse>
    ))}
  </HobCarousel>
);
