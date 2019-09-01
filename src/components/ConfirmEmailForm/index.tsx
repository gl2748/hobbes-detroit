import styled from "@emotion/styled";
import React, { useReducer } from "react";
import { useIdentityContext } from "react-netlify-identity";
import useLoading from "../../hooks/useLoading";
import { HobButton } from "../HobButton";
import { HobTextField } from "../HobTextField";
import { HobTypography } from "../HobTypography";

export interface IConfirmEmailFormProps {
  onClose: () => void;
  confirmationToken: string;
}

export interface IConfirmEmailFormState {
  password: string;
  message: string;
}

export interface IConfirmEmailFormActions {
  type: "updatePassword" | "updateMessage";
  payload: string;
}

const loginFormReducer = (
  state: IConfirmEmailFormState,
  action: IConfirmEmailFormActions
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

export const ConfirmEmailForm: React.FC<IConfirmEmailFormProps> = ({
  onClose,
  confirmationToken
}: IConfirmEmailFormProps) => {
  const initialState = {
    message: "",
    password: ""
  };
  const { _goTrueInstance } = useIdentityContext();
  const [isLoading, load] = useLoading();
  const [state, dispatch] = useReducer(loginFormReducer, initialState);

  const clearMessage = () => dispatch({ type: "updateMessage", payload: "" });

  const handleConfirmEmail = (confirmToken: string, password: string) => (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    dispatch({ type: "updateMessage", payload: "" });
    load(_goTrueInstance.acceptInvite(confirmToken, password, true))
      .then(user => {
        onClose();
      })
      .catch(
        err =>
          void console.error(err) ||
          dispatch({ type: "updateMessage", payload: "Error: " + err.message })
      );
  };

  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "updatePassword", payload: e.currentTarget.value });
  };
  return (
    <Form className="form">
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
        onClick={handleConfirmEmail(confirmationToken, state.password)}
        variant="outlined"
        color="primary"
        className={isLoading ? "btn saving" : "btn"}
      >
        Sign In
      </HobButton>
    </Form>
  );
};
