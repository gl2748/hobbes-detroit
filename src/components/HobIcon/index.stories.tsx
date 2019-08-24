import styled from "@emotion/styled";
import React from "react";
import { HobIcon } from ".";
import { HobTypography } from "../HobTypography";

export default {
  title: "Icon"
};

const Container = styled.div`
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1rem 0;

  .hob-typography {
    margin: 0 1rem;
    &--h4 {
      width: 100px;
      display: block;
    }
  }
`;

export const demo = () => (
  <Container>
    <Flex>
      <HobTypography variant="h4">Lock</HobTypography>
      <HobTypography variant="caption">sm</HobTypography>
      <HobIcon size="sm" name="lock" />
      <HobTypography variant="caption">md</HobTypography>
      <HobIcon size="md" name="lock" />
      <HobTypography variant="caption">lg</HobTypography>
      <HobIcon size="lg" name="lock" />
    </Flex>

    <Flex>
      <HobTypography variant="h4">Close</HobTypography>
      <HobTypography variant="caption">sm</HobTypography>
      <HobIcon size="sm" name="close" />
      <HobTypography variant="caption">md</HobTypography>
      <HobIcon size="md" name="close" />
      <HobTypography variant="caption">lg</HobTypography>
      <HobIcon size="lg" name="close" />
    </Flex>
  </Container>
);
