import styled from "@emotion/styled";
import React, { useReducer } from "react";
import { useIdentityContext } from "react-netlify-identity";
import useLoading from "../../higherOrderComponents/useLoading";
import { HobButton } from "../HobButton";
import { HobTextField } from "../HobTextField";
import { HobTypography } from "../HobTypography";

export interface ILoginFormProps {
  onClose: () => void;
}

export interface ILoginFormState {
  email: string;
  password: string;
  message: string;
}

export interface ILoginFormActions {
  type: "updateEmail" | "updatePassword" | "updateMessage";
  payload: string;
}

const loginFormReducer = (
  state: ILoginFormState,
  action: ILoginFormActions
) => {
  switch (action.type) {
    case "updateEmail":
      return { ...state, email: action.payload };
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
  flex: 1;

  .hob-text-field {
    margin-bottom: 1rem;
  }

  .hob-button {
    margin-bottom: 1rem;
  }

  .error {
    color: var(--hob-color--error);
    margin: 1rem 0;
    display: block;
  }
`;

export const LoginForm: React.FC<ILoginFormProps> = ({
  onClose
}: ILoginFormProps) => {
  const initialState = {
    email: "",
    message: "",
    password: ""
  };
  const { loginUser, requestPasswordRecovery } = useIdentityContext();
  const [isLoading, load] = useLoading();
  const [state, dispatch] = useReducer(loginFormReducer, initialState);

  const clearMessage = () => dispatch({ type: "updateMessage", payload: "" });

  const handlePasswordRecover = (e: React.MouseEvent) => {
    e.preventDefault();
    clearMessage();
    load(requestPasswordRecovery(state.email))
      .then(res => {
        return;
      })
      .catch(
        err =>
          void console.error(err) ||
          dispatch({ type: "updateMessage", payload: "Error: " + err.message })
      );
  };

  const handleLogin = (email: string, password: string) => (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    dispatch({ type: "updateMessage", payload: "" });
    load(loginUser(email, password, true))
      .then(user => {
        console.log("Success! Logged in", user);
        onClose();
      })
      .catch(
        err =>
          void console.error(err) ||
          dispatch({ type: "updateMessage", payload: "Error: " + err.message })
      );
  };

  const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "updateEmail", payload: e.currentTarget.value });
  };
  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "updatePassword", payload: e.currentTarget.value });
  };
  return (
    <Form className="form">
      <HobTextField
        placeholder="Client ID"
        value={state.email}
        name="email"
        type="email"
        required={true}
        onChange={changeEmail}
      />
      <HobTextField
        placeholder="Password"
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
        onClick={handleLogin(state.email, state.password)}
        variant="outlined"
        color="primary"
        className={isLoading ? "btn saving" : "btn"}
      >
        Sign In
      </HobButton>
    </Form>
  );
};
