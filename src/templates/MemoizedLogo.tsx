import React from "react";
import { HobLink, IHobLinkProps } from "../components/HobLink";

export const MemoizedLogo = React.memo(
  (props: IHobLinkProps) => <HobLink {...props} />,
  ({ className: a }, { className: b }) => a === b
);
