import React, { useContext, useEffect, useState } from "react";
import { useIdentityContext } from "react-netlify-identity-widget";
import { AppContext } from "../components/Layout";

export const WithAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => {
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;
  const { toggleDrawer, showDrawer } = useContext(AppContext);
  useEffect(() => {
    if (toggleDrawer && !isLoggedIn && !showDrawer) {
      toggleDrawer();
    }
  }, [isLoggedIn, showDrawer]);

  if (isLoggedIn) {
    return <Component {...(props as P)} />;
  } else {
    return (
      <div>
        <h1>PLEASE SIGN IN!</h1>
      </div>
    );
  }
};
