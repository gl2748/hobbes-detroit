import styled from "@emotion/styled";
import React from "react";
import { useIdentityContext } from "react-netlify-identity";
import useLoading from "../../higherOrderComponents/useLoading";
import { HobButton } from "../HobButton";
import { HobTypography } from "../HobTypography";

export interface ILogoutFormProps {
  onClose: () => void;
}

const LoggedInText = styled(HobTypography)`
  margin-bottom: 1rem;
`;

export const LogoutForm: React.FC<ILogoutFormProps> = ({
  onClose
}: ILogoutFormProps) => {
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

  const [isLoading, load] = useLoading();
  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    load(identity.logoutUser());
    onClose();
  };

  return (
    <form className="form">
      <LoggedInText variant="body1">
        Logged in as: <HobTypography variant="caption">{n}</HobTypography>
      </LoggedInText>
      <HobButton
        type="submit"
        color="primary"
        variant="outlined"
        className={isLoading ? "btn saving" : "btn"}
        onClick={logout}
      >
        Log out
      </HobButton>
    </form>
  );
};
