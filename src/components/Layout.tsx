import React, { ReactNode, useReducer } from "react";
import { Helmet } from "react-helmet";
import IdentityModal, {
  useIdentityContext
} from "react-netlify-identity-widget";
import { Footer } from "./Footer";
import { HobDrawer } from "./HobDrawer";
import { LoginForm } from "./LoginForm";
import { LogoutForm } from "./LogoutForm";
import "./main.css";
import { Navbar } from "./Navbar";
import { useSiteMetadata } from "./SiteMetadata";

export interface ILayoutProps {
  children: ReactNode;
}
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

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
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

  const onCloseModal = () => null;

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
      <IdentityModal showDialog={false} onCloseDialog={onCloseModal} />
      <Navbar />
      <HobDrawer onClose={toggleDrawer(false)} isVisible={state.showDrawer}>
        <div>
          {isLoggedIn ? (
            <LogoutForm onClose={toggleDrawer(false)} />
          ) : (
            <LoginForm onClose={toggleDrawer(false)} />
          )}
        </div>
      </HobDrawer>
      <nav>
        {" "}
        {isLoggedIn ? (
          <div onClick={toggleDrawer(true)}>Sign Out</div>
        ) : (
          <div onClick={toggleDrawer(true)}>Sign In</div>
        )}
      </nav>
      <div>{children}</div>
      <Footer />
    </div>
  );
};
