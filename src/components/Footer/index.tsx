import { HobLink as Link } from "@components/HobLink";
import { HobLogo } from "@components/HobLogo";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import React from "react";
import breakpoints from "../../breakpoints";

const Container = styled.div`
  position: relative;
  width: 100vw;
  z-index: 2;
  display: flex;
  padding: 1.25rem;

  ${breakpoints.mobile} {
    flex-direction: column;
    padding: 2rem 1.125rem;
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

interface Props {
  toggleDrawer: () => void;
}

export const Footer: React.FC<Props> = ({ toggleDrawer }) => {
  const handleDrawerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleDrawer();
  };
  return (
    <Container className="footer">
      <Logo />

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

        <Link onClick={handleDrawerClick} color="primary">
          Client Portal
        </Link>
      </Links>
    </Container>
  );
};
