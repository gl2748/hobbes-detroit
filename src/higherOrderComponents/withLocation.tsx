// withLocation.js
import { Location, NavigateFn } from "@reach/router";
import { LocationState } from "history";
import queryString from "query-string";
import React from "react";

// Taken from here: https://medium.com/@chrisfitkin/how-to-get-query-string-parameter-values-in-gatsby-f714161104f

export const withLocation = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => {
  return (
    <Location>
      {({
        location,
        navigate
      }: {
        location: LocationState;
        navigate: NavigateFn;
      }) => {
        return (
          <Component
            {...props}
            location={location}
            navigate={navigate}
            search={location.search ? queryString.parse(location.search) : {}}
          />
        );
      }}
    </Location>
  );
};
