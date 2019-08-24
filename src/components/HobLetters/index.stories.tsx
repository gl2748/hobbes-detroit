import styled from "@emotion/styled";
import React from "react";
import { HobLetters } from ".";
import { HobTypography } from "../HobTypography";

export default {
  title: "Letters"
};

const Container = styled.div`
  padding: 1rem;
`;

const WhiteBg = styled.div`
  padding: 1rem;
  background-color: #ffffff;
`;

const BlackBg = styled.div`
  padding: 1rem;
  background-color: #000000;
  .hob-typography {
    color: #ffffff;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1rem 0;

  .hob-typography {
    width: 100px;
    display: block;
  }
`;

export const demo = () => (
  <Container>
    <WhiteBg>
      <Flex>
        <HobTypography variant="caption">Small:</HobTypography>
        <HobLetters size="sm" />
      </Flex>

      <Flex>
        <HobTypography variant="caption">Medium:</HobTypography>
        <HobLetters size="md" />
      </Flex>

      <Flex>
        <HobTypography variant="caption">Large:</HobTypography>
        <HobLetters size="lg" />
      </Flex>
    </WhiteBg>

    <BlackBg>
      <Flex>
        <HobTypography variant="caption">Small:</HobTypography>
        <HobLetters size="sm" color="#fff" />
      </Flex>

      <Flex>
        <HobTypography variant="caption">Medium:</HobTypography>
        <HobLetters size="md" color="#fff" />
      </Flex>

      <Flex>
        <HobTypography variant="caption">Large:</HobTypography>
        <HobLetters size="lg" color="#fff" />
      </Flex>
    </BlackBg>
  </Container>
);
