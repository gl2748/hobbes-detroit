import styled from "@emotion/styled";
import React from "react";
import { HobTypography } from ".";

export default {
  title: "Typography"
};

const Container = styled.div`
  padding: 1rem;
  .hob-typography {
    margin: 1rem 0;
  }

  span {
    display: block;
  }
`;

export const demo = () => (
  <Container>
    <HobTypography variant="h1">H1: Heading</HobTypography>
    <HobTypography variant="h2">H2: Heading</HobTypography>
    <HobTypography variant="h3">H3: Heading</HobTypography>
    <HobTypography variant="h4">H4: Heading</HobTypography>
    <HobTypography variant="h5">H5: Heading</HobTypography>
    <HobTypography variant="h6">H6: Heading</HobTypography>
    <HobTypography variant="subtitle1">Subtitle1</HobTypography>
    <HobTypography variant="subtitle2">Subtitle2</HobTypography>
    <HobTypography variant="body1">
      Body1: Victorious evil dead spirit joy disgust of holiest mountains
      ubermensch disgust. Decrepit right zarathustra good eternal-return reason
      love. Play self overcome hope revaluation ocean dead justice
      transvaluation salvation salvation sexuality.
    </HobTypography>
    <HobTypography variant="body2">
      Body2: Hatred inexpedient right zarathustra intentions contradict
      christian value holiest free victorious intentions horror hope. Ultimate
      abstract depths horror revaluation chaos victorious.
    </HobTypography>
    <HobTypography variant="button">Button</HobTypography>
    <HobTypography variant="caption">Caption</HobTypography>
    <HobTypography variant="overline">overline</HobTypography>
  </Container>
);
