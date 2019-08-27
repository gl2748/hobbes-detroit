import styled from "@emotion/styled";
import React from "react";
import { HobLogo } from ".";
import { HobTypography } from "../HobTypography";

export default {
  title: "Logo"
};

const Container = styled.div`
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1rem 0;
  padding: 1rem;

  .hob-typography {
    margin-right: 1rem;
    width: 100px;
  }
`;

const Dark = styled(Flex)`
  background-color: var(--hob-color--dark);
  .hob-typography {
    color: var(--hob-color--light);
  }
`;

export const demo = () => (
  <Container>
    <Dark>
      <HobTypography variant="caption">Fun</HobTypography>
      {["blue", "brown", "green", "pink", "purple", "yellow"].map(color => (
        <HobLogo fill={`var(--hob-color--${color})`} />
      ))}
    </Dark>

    <Flex>
      <HobTypography variant="caption">Default size (big)</HobTypography>
      <HobLogo />
    </Flex>

    <Flex>
      <HobTypography variant="caption">Less Big</HobTypography>
      <HobLogo width="3rem" />
    </Flex>

    <Flex>
      <HobTypography variant="caption">Small</HobTypography>
      <HobLogo width="1rem" />
    </Flex>

    <Flex>
      <HobTypography variant="caption">Fill</HobTypography>
      <HobLogo />
    </Flex>
    <Flex>
      <HobTypography variant="caption">Stroke</HobTypography>
      <HobLogo fill="none" stroke="var(--hob-color--dark)" />
    </Flex>

    <Dark>
      <HobTypography variant="caption">Fill</HobTypography>
      <HobLogo fill="var(--hob-color--light)" />
    </Dark>

    <Dark>
      <HobTypography variant="caption">Stroke</HobTypography>
      <HobLogo fill="none" stroke="var(--hob-color--light)" />
    </Dark>
  </Container>
);
