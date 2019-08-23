import React, { ReactNode, useReducer } from "react";
import { Helmet } from "react-helmet";
import { useIdentityContext } from "react-netlify-identity-widget";
import { Footer } from "./Footer";
import { LoginForm } from "./LoginForm";
import { LogoutForm } from "./LogoutForm";
import "./main.css";
import { Navbar } from "./Navbar";
import { Panel } from "./Panel";
import { useSiteMetadata } from "./SiteMetadata";

export interface ILayoutProps {
  children: ReactNode;
}
export interface ILayoutState {
  showPanel: boolean;
}
export interface ILayoutActions {
  type: "togglePanel";
  payload: boolean;
}

const layoutReducer = (state: ILayoutState, action: ILayoutActions) => {
  switch (action.type) {
    case "togglePanel":
      return { ...state, showPanel: action.payload };
    default:
      return state;
  }
};

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const initialState: ILayoutState = {
    showPanel: false
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

  const togglePanel = (payload: boolean) => () =>
    dispatch({ type: "togglePanel", payload });

  return (
    <div>
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
      <Panel onClose={togglePanel(false)} isVisible={state.showPanel}>
        <div>
          {isLoggedIn ? (
            <LogoutForm onClose={togglePanel(false)} />
          ) : (
            <LoginForm onClose={togglePanel(false)} />
          )}
        </div>
      </Panel>
      <nav>
        {" "}
        {isLoggedIn ? (
          <div onClick={togglePanel(true)}>Sign Out</div>
        ) : (
          <div onClick={togglePanel(true)}>Sign In</div>
        )}
      </nav>
      <div>{children}</div>
      <Footer />
    </div>
  );
};
