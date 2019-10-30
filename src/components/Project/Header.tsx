import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import breakpoints from "../../breakpoints";

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 4rem;
  padding: 0 1.25rem;
  ${breakpoints.mobile} {
    height: 2.25rem;
  }
  .hob-typography {
    margin: 0 auto;
    font-size: 2.8125rem;
  }
`;

export const Header = ({ text }: { text: string }): ReactElement => (
  <Container>
    <HobTypography variant="h2">{text}</HobTypography>
  </Container>
);
