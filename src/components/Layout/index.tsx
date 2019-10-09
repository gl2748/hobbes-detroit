import styled from "@emotion/styled";
import { NavigateFn } from "@reach/router";
import { LocationState } from "history";
import React, {
  EventHandler,
  HTMLProps,
  ReactNode,
  Ref,
  TouchEventHandler,
  useEffect,
  useReducer
} from "react";
import { Helmet } from "react-helmet";
import { useIdentityContext } from "react-netlify-identity-widget";
import { withLocation } from "../../higherOrderComponents/withLocation";
import useLoading from "../../hooks/useLoading";
import useMobileDetect from "../../hooks/useMobileDetect";
import { ConfirmEmailForm } from "../ConfirmEmailForm";
import { Footer } from "../Footer";
import { HobIcon } from "../HobIcon";
import { HobLink } from "../HobLink";
import { HobTypography } from "../HobTypography";
import { LoginForm } from "../LoginForm";
import { LogoutForm } from "../LogoutForm";
import "../main.css";
import { Portal, PortalWithLocation } from "../Portal";
import { RecoverAccountForm } from "../RecoverAccountForm";
import { useSiteMetadata } from "../SiteMetadata";

export const debounced = (delay: number, fn: (...args: any[]) => void) => {
  let timerId: any;
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export interface ILayoutProps {
  children: ReactNode;
  portalLinks?: [{ label: string; href: string }];
  portalCopy?: string;
  location?: LocationState;
  navigate?: NavigateFn;
  forwardedRef?: Ref<HTMLDivElement>;
}
const defaultLinks: Array<{ href: string; label: string }> = [];
const defaultPortalCopy = "";
export interface ILayoutState {
  pauseLottie: boolean;
  showDrawer: boolean;
  isLoggedIn: boolean;
  username: string;
  confirmEmailToken: string;
  recoveryToken: string;
  toggleDrawer?: () => void;
  toggleLottie?: () => void;
}

type TAction =
  | { type: "toggleLottie"; payload?: boolean }
  | { type: "toggleDrawer"; payload?: boolean }
  | { type: "updateUsername"; payload: string }
  | { type: "updateIsLoggedIn"; payload: boolean }
  | { type: "updateConfirmEmailToken"; payload: string }
  | { type: "updateRecoveryToken"; payload: string };

const layoutReducer = (state: ILayoutState, action: TAction) => {
  switch (action.type) {
    case "toggleLottie":
      return {
        ...state,
        pauseLottie:
          action.payload === undefined ? !state.pauseLottie : action.payload
      };
    case "toggleDrawer":
      return {
        ...state,
        showDrawer:
          action.payload === undefined ? !state.showDrawer : action.payload
      };
    case "updateUsername":
      return { ...state, username: action.payload };
    case "updateIsLoggedIn":
      return { ...state, isLoggedIn: action.payload };
    case "updateConfirmEmailToken":
      return { ...state, confirmEmailToken: action.payload };
    case "updateRecoveryToken":
      return { ...state, recoveryToken: action.payload };
    default:
      throw new Error(); // Will give us a Typescript compilation error if we attempt to use an undefined action type.
  }
};
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
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

const initialState: ILayoutState = {
  confirmEmailToken: "",
  isLoggedIn: false,
  pauseLottie: false,
  recoveryToken: "",
  showDrawer: false,
  username: ""
};

export const AppContext = React.createContext<ILayoutState>(initialState);
export const AppConsumer = AppContext.Consumer;

export const Layout: React.FC<ILayoutProps & HTMLProps<HTMLDivElement>> = ({
  children,
  className = "",
  portalCopy = defaultPortalCopy,
  portalLinks = defaultLinks,
  location,
  forwardedRef
}) => {
  const { title, description } = useSiteMetadata();
  const [isLoading, load] = useLoading();
  const detectMobile = useMobileDetect();
  const [state, dispatch] = useReducer(layoutReducer, initialState);
  const identity = useIdentityContext();

  useEffect(() => {
    // Only do this if iOS.
    if (detectMobile.isIos()) {
      const htmlElement = document.getElementById("scrollWatcher");
      const pauseLottie: EventHandler<any> = (element: any) => {
        dispatch({ type: "toggleLottie", payload: true });
      };
      if (htmlElement) {
        htmlElement.addEventListener("scroll", debounced(300, pauseLottie)); // Not reliable
      }
      return function cleanup() {
        if (htmlElement) {
          htmlElement.removeEventListener("scroll", pauseLottie);
        }
      };
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "updateIsLoggedIn", payload: identity.isLoggedIn });
    if (location && location.hash.search("invite_token") > -1) {
      const inviteToken: string = location.hash.split("=")[1];
      // Logout the currently logged in user.
      if (identity.isLoggedIn) {
        load(identity.logoutUser());
      }
      dispatch({ type: "toggleDrawer", payload: true });
      dispatch({ type: "updateConfirmEmailToken", payload: inviteToken });
    }
    if (location && location.hash.search("recovery_token") > -1) {
      const recoveryToken: string = location.hash.split("=")[1];
      // Logout the currently logged in user.
      if (identity.isLoggedIn) {
        load(identity.logoutUser());
      }
      dispatch({ type: "toggleDrawer", payload: true });
      dispatch({ type: "updateRecoveryToken", payload: recoveryToken });
    }
  }, [identity, location]);

  const toggleDrawer = (payload?: boolean) => () =>
    dispatch({ type: "toggleDrawer", payload });

  return (
    <AppContext.Provider value={{ ...state, toggleDrawer: toggleDrawer() }}>
      <Container id={"scrollWatcher"} className={className} ref={forwardedRef}>
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
        {state.showDrawer && (
          <PortalWithLocation
            onClose={toggleDrawer(false)}
            isVisible={state.showDrawer}
          >
            {state.isLoggedIn &&
              state.confirmEmailToken.length === 0 &&
              state.recoveryToken.length === 0 && (
                <LogoutForm onClose={toggleDrawer(false)} />
              )}
            {!state.isLoggedIn &&
              state.confirmEmailToken.length === 0 &&
              state.recoveryToken.length === 0 && (
                <LoginForm onClose={toggleDrawer(false)} />
              )}
            {state.confirmEmailToken.length > 0 && (
              <ConfirmEmailForm
                onClose={toggleDrawer(false)}
                token={state.confirmEmailToken}
              />
            )}
            {state.recoveryToken.length > 0 && (
              <RecoverAccountForm
                onClose={toggleDrawer(false)}
                token={state.recoveryToken}
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
        )}
        {children}
        <Footer toggleDrawer={toggleDrawer()} />
      </Container>
    </AppContext.Provider>
  );
};

export const LayoutWithLocation = withLocation(Layout);
