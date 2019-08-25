import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React from "react";
import { HobLink } from ".";

export default {
  title: "Link"
};

const Container = styled.div`
  width: 400px;
  padding: 1rem;

  .hob-link {
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
        <HobLink href="www.google.com" color="primary" target="_blank">
          Text
        </HobLink>
      </LightBg>
      <DarkBg>
        <HobLink color="secondary" href="www.google.com">
          Open in same tab
        </HobLink>
      </DarkBg>
    </Container>
  );
};
