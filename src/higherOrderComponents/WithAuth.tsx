import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity-widget";

export const WithAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => {
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;

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
