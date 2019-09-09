import { HobTextField } from "@components/HobTextField";
import styled from "@emotion/styled";
import { navigate } from "gatsby";
import React, { useReducer } from "react";
import { useIdentityContext } from "react-netlify-identity";
import useLoading from "../../hooks/useLoading";
import { HobButton } from "../HobButton";
import { HobTypography } from "../HobTypography";

export interface IRecoverAccountFormProps {
  onClose: () => void;
  token: string;
}

export interface IRecoverAccountFormState {
  password: string;
  message: string;
}

export interface IRecoverAccountFormActions {
  type: "updatePassword" | "updateMessage";
  payload: string;
}

const recoverAccountReducer = (
  state: IRecoverAccountFormState,
  action: IRecoverAccountFormActions
) => {
  switch (action.type) {
    case "updatePassword":
      return { ...state, password: action.payload };
    case "updateMessage":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  .hob-text-field {
    margin-bottom: 1.25rem;

    &:last-of-type {
      margin-bottom: 2.5rem;
    }
  }

  .hob-button {
    margin-bottom: 3rem;
  }

  .error {
    color: var(--hob-color--error);
    margin: 1rem 0;
    display: block;
  }
`;

export const RecoverAccountForm: React.FC<IRecoverAccountFormProps> = ({
  onClose,
  token
}: IRecoverAccountFormProps) => {
  const initialState = {
    message: "",
    password: ""
  };
  const { _goTrueInstance, setUser, updateUser, user } = useIdentityContext();
  const [isLoading, load] = useLoading();
  const [state, dispatch] = useReducer(recoverAccountReducer, initialState);

  const handleRecoverAccount = (recoverToken: string, password: string) => (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    if (state.password.length <= 5) {
      dispatch({
        payload: "Please enter a longer password!",
        type: "updateMessage"
      });
      return;
    } else {
      dispatch({ type: "updateMessage", payload: "" });
      load(_goTrueInstance.recover(recoverToken, true))
        .then(recoveredUser => {
          console.log("User recovered", recoveredUser);
          setUser(recoveredUser);
          if (user !== undefined) {
            load(
              user.update({
                email: recoveredUser.email,
                password: state.password
              })
            ).then(() => {
              console.log("User updated", user);
              navigate("/");
              onClose();
            });
          }
        })
        .catch(
          err =>
            void console.error(err) ||
            dispatch({
              payload: "Error: " + err.message,
              type: "updateMessage"
            })
        );
    }
  };

  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "updatePassword", payload: e.currentTarget.value });
  };

  return (
    <Form className="form">
      <HobTextField
        placeholder="New Password"
        value={state.password}
        name="password"
        type="password"
        required={true}
        onChange={changePassword}
      />
      {state.message.length > 0 && (
        <HobTypography variant="caption" className="error">
          {state.message}
        </HobTypography>
      )}
      <HobButton
        type="submit"
        onClick={handleRecoverAccount(token, state.password)}
        variant="outlined"
        color="primary"
        className={isLoading ? "btn saving" : "btn"}
      >
        Recover Account
      </HobButton>
    </Form>
  );
};
