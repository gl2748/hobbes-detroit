import styled from "@emotion/styled";
import React from "react";
import breakpoints from "../../breakpoints";
import { GatsbyLink as Link } from "../GatsbyLink";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

const Container = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  padding: 0 2.5rem 1.8125rem;

  ${breakpoints.mobile} {
    flex-direction: column;
    padding: 0 1.125rem 2rem;
  }
`;

const Logo = styled.div`
  flex: 2;
  margin-right: 1rem;

  ${breakpoints.mobile} {
    margin-bottom: 1.5rem;
  }
`;

const Copyright = styled.div`
  flex: 1;
`;

const Links = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .hob-link {
    margin-bottom: 0.375rem;

    ${breakpoints.mobile} {
      margin-bottom: 0;
    }
  }
`;

export const Footer: React.FC = () => {
  return (
    <Container>
      <Logo>
        <HobLogo />
      </Logo>

      <Copyright>
        <HobTypography variant="body1">2019 (c) Hobbes</HobTypography>
      </Copyright>

      <Links>
        <Link to="/legal" color="primary">
          Legal Information
        </Link>
        <Link to="/cookie" color="primary">
          Cookie Policy
        </Link>
      </Links>
    </Container>
  );
};
