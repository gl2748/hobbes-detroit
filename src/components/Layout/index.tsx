import styled from "@emotion/styled";
import { NavigateFn } from "@reach/router";
import { LocationState } from "history";
import React, { ReactNode, useEffect, useReducer, HTMLProps } from "react";
import { Helmet } from "react-helmet";
import { useIdentityContext } from "react-netlify-identity-widget";
import useLoading from "../../hooks/useLoading";
import { withLocation } from "../../higherOrderComponents/withLocation";
import { ConfirmEmailForm } from "../ConfirmEmailForm";
import { Footer } from "../Footer";
import { HobIcon } from "../HobIcon";
import { HobLink } from "../HobLink";
import { HobTypography } from "../HobTypography";
import { LoginForm } from "../LoginForm";
import { LogoutForm } from "../LogoutForm";
import "../main.css";
import { Navbar } from "../Navbar";
import { Portal, PortalWithLocation } from "../Portal";
import { useSiteMetadata } from "../SiteMetadata";
import breakpoints from "../../breakpoints";

export interface ILayoutProps {
  children: ReactNode;
  portalLinks?: [{ label: string; href: string }];
  portalCopy?: string;
  location?: LocationState;
  navigate?: NavigateFn;
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
  isLoggedIn: boolean;
  username: string;
  confirmEmailToken: string;
}

type TAction =
  | { type: "toggleDrawer"; payload: boolean }
  | { type: "updateUsername"; payload: string }
  | { type: "updateIsLoggedIn"; payload: boolean }
  | { type: "updateConfirmEmailToken"; payload: string };

const layoutReducer = (state: ILayoutState, action: TAction) => {
  switch (action.type) {
    case "toggleDrawer":
      return { ...state, showDrawer: action.payload };
    case "updateUsername":
      return { ...state, username: action.payload };
    case "updateIsLoggedIn":
      return { ...state, isLoggedIn: action.payload };
    case "updateConfirmEmailToken":
      return { ...state, confirmEmailToken: action.payload };
    default:
      throw new Error(); // Will give us a Typescript compilation error if we attempt to use an undefined action type.
  }
};
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 3rem;

  ${breakpoints.mobile} {
    padding-bottom: 10rem;
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

export const Layout: React.FC<ILayoutProps & HTMLProps<HTMLDivElement>> = ({
  children,
  className = "",
  portalCopy = defaultPortalCopy,
  portalLinks = defaultLinks,
  location,
  navigate
}) => {
  const { title, description } = useSiteMetadata();
  const [isLoading, load] = useLoading();
  const initialState: ILayoutState = {
    confirmEmailToken: "",
    isLoggedIn: false,
    showDrawer: false,
    username: ""
  };
  const [state, dispatch] = useReducer(layoutReducer, initialState);
  const identity = useIdentityContext();

  useEffect(() => {
    dispatch({ type: "updateIsLoggedIn", payload: identity.isLoggedIn });
    if (location && location.hash.search("invite_token") > -1) {
      const inviteToken: string = location.hash.split("=")[1];
      if (identity.isLoggedIn) {
        load(identity.logoutUser());
      }
      dispatch({ type: "toggleDrawer", payload: true });
      dispatch({ type: "updateConfirmEmailToken", payload: inviteToken });
    }
  }, [identity, location]);

  const toggleDrawer = (payload: boolean) => () =>
    dispatch({ type: "toggleDrawer", payload });

  return (
    <Container className={className}>
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
      <PortalWithLocation
        onClose={toggleDrawer(false)}
        isVisible={state.showDrawer}
      >
        {state.isLoggedIn && state.confirmEmailToken.length === 0 && (
          <LogoutForm onClose={toggleDrawer(false)} />
        )}
        {!state.isLoggedIn && state.confirmEmailToken.length === 0 && (
          <LoginForm onClose={toggleDrawer(false)} />
        )}
        {state.confirmEmailToken.length > 0 && (
          <ConfirmEmailForm
            onClose={toggleDrawer(false)}
            token={state.confirmEmailToken}
          />
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
      </PortalWithLocation>
      <nav>
        {state.isLoggedIn ? (
          <div onClick={toggleDrawer(true)}>Sign Out</div>
        ) : (
          <div onClick={toggleDrawer(true)}>Sign In</div>
        )}
      </nav>
      <div>{children}</div>
      <Footer />
    </Container>
  );
};

export const LayoutWithLocation = withLocation(Layout);
