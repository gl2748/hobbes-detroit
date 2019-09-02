import styled from "@emotion/styled";
import React, { ReactNode, useReducer } from "react";
import { Helmet } from "react-helmet";
import { useIdentityContext } from "react-netlify-identity-widget";
import { Footer } from "../Footer";
import { HobIcon } from "../HobIcon";
import { HobLetters } from "../HobLetters";
import { HobLink } from "../HobLink";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";
import { LoginForm } from "../LoginForm";
import { LogoutForm } from "../LogoutForm";
import "../main.css";
import { Navbar } from "../Navbar";
import { Portal } from "../Portal";
import { useSiteMetadata } from "../SiteMetadata";

export interface ILayoutProps {
  children: ReactNode;
  portalLinks?: [{ label: string; href: string }];
  portalCopy?: string;
}
const defaultLinks = [
  {
    href: "#todo",
    label: "NDA PDF"
  },
  {
    href: "#todo",
    label: "Click here to Contact"
  }
];
const defaultPortalCopy =
  "Nam turpis nunc, condimentum in ullamcorper et, molestie at justo. Proin tempus turpis sed felis fringilla, et facilisis justo . Nunc id elit ut sapien feugiat pretium. Proin interdum tristique nibh eget volutpat.";
export interface ILayoutState {
  showDrawer: boolean;
}
export interface ILayoutActions {
  type: "toggleDrawer";
  payload: boolean;
}

const layoutReducer = (state: ILayoutState, action: ILayoutActions) => {
  switch (action.type) {
    case "toggleDrawer":
      return { ...state, showDrawer: action.payload };
    default:
      return state;
  }
};
const Container = styled.div`
  position: relative;
  overflow-x: hidden;

  .hob-letters {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    margin-left: 1.25rem;
    margin-top: 1.25rem;
  }

  > .hob-logo {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    margin-left: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

const PortalLegal = styled.div`
  flex: 1;
`;
const Lock = styled(HobIcon)`
  flex: 1;
  margin-bottom: 1.5rem;
`;
const FinePrint = styled(HobTypography)`
  flex: 1;
  margin-bottom: 1.5rem;
`;

export const Layout: React.FC<ILayoutProps> = ({
  children,
  portalCopy = defaultPortalCopy,
  portalLinks = defaultLinks
}) => {
  const { title, description } = useSiteMetadata();
  const initialState: ILayoutState = {
    showDrawer: false
  };
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  const identity = useIdentityContext();
  let n = "";
  const isLoggedIn = identity && identity.isLoggedIn;
  if (
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.full_name
  ) {
    n = identity.user.user_metadata.full_name;
  } else if (isLoggedIn && identity.user) {
    n = identity.user.email;
  } else {
    n = "anonymous";
  }

  const toggleDrawer = (payload: boolean) => () =>
    dispatch({ type: "toggleDrawer", payload });

  return (
    <Container>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-16x16.png"
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>
      <Navbar />
      <HobLetters size="lg" color="var(--hob-color--light)" />
      <HobLogo fill="var(--hob-color--secondary)" />
      <Portal onClose={toggleDrawer(false)} isVisible={state.showDrawer}>
        {isLoggedIn ? (
          <LogoutForm onClose={toggleDrawer(false)} />
        ) : (
          <LoginForm onClose={toggleDrawer(false)} />
        )}
        <PortalLegal>
          <Lock size="sm" color="primary" name="lock" />
          <FinePrint variant="body1">{portalCopy}</FinePrint>
          {portalLinks.map(({ href, label }) => (
            <div key={label}>
              <HobLink href={href} target="blank" color="primary">
                {label}
              </HobLink>
            </div>
          ))}
        </PortalLegal>
      </Portal>
      <div>{children}</div>
      <Footer />
    </Container>
  );
};
