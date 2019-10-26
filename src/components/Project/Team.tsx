import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import breakpoints from "../../breakpoints";

const Container = styled.div`
  text-align: center;
  padding: 1.25rem;
  .hob-typography {
    font-size: 1.75rem;
    ${breakpoints.mobile} {
      font-size: 1.125rem;
    }
  }
`;

export const Team = ({
  team,
  press
}: {
  team: string[];
  press: string[];
}): ReactElement => (
  <Container className="team-press">
    {team.length > 0 && (
      <HobTypography variant="body1">TEAM: {team.join(", ")}</HobTypography>
    )}
    {press.length > 0 && press[0] !== "" && (
      <HobTypography variant="body1">PRESS: {press.join(", ")}</HobTypography>
    )}
  </Container>
);
