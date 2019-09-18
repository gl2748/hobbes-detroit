import styled from "@emotion/styled";
import React from "react";
import breakpoints from "../../breakpoints";
import { HobLink as Link } from "../HobLink";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

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

  & + .hob-link {
    position: absolute;
    z-index: 1;
    left: 1rem;
    bottom: 1.25rem;
  }

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

export const Footer: React.FC<Props> = React.memo(
  ({ toggleDrawer }) => {
    const handleDrawerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      toggleDrawer();
    };
    return (
      <Container className="footer">
        <Logo>
          <Link unsetTypography={true} color="primary" to="/">
            <HobLogo />
          </Link>
        </Logo>

        <Copyright>
          <HobTypography variant="body1">2019 © Hobbes</HobTypography>
        </Copyright>

        <Links>
          {/*
          <Link to="/legal" color="primary">
            Legal Information
          </Link>

          <Link to="/cookie" color="primary">
            Cookie Policy
          </Link>
          */}

          <Link onClick={handleDrawerClick} color="primary">
            Client Portal
          </Link>
        </Links>
      </Container>
    );
  },
  () => true
);
