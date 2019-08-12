import React, { useReducer } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import useLoading from '../../higherOrderComponents/useLoading';


export interface ILoginFormProps {
    onClose: () => void
}

export interface ILoginFormState {
    email: string;
    password: string;
    message: string
}

export interface ILoginFormActions {
    type: 'updateEmail' | 'updatePassword' | 'updateMessage';
    payload: string;
}

const loginFormReducer = (state: ILoginFormState, action: ILoginFormActions) => {
    switch (action.type) {
        case 'updateEmail':
            return { ...state, email: action.payload };
        case 'updatePassword':
            return { ...state, password: action.payload };
        case 'updateMessage':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export const LoginForm: React.FC<ILoginFormProps> = ({ onClose }: ILoginFormProps) => {
    const initialState = {
        email: '',
        password: '',
        message: '',
    }
    const { loginUser, requestPasswordRecovery } = useIdentityContext();
    const [isLoading, load] = useLoading();
    const [state, dispatch] = useReducer(loginFormReducer, initialState)

   const clearMessage = () => dispatch({type: 'updateMessage', payload: ''}) 

    const handlePasswordRecover = () => {
        dispatch({type: 'updateMessage', payload: ''}) 
        load(requestPasswordRecovery(state.email))
            .then(res => {
                return
            })
            .catch(
                err => void console.error(err) || dispatch({ type: 'updateMessage', payload: 'Error: ' + err.message })
            )
        debugger
    }

    const handleLogin = () => {
        dispatch({type: 'updateMessage', payload: ''}) 
        load(loginUser(state.email, state.password, true))
            .then(user => {
                console.log('Success! Logged in', user);
                // Close the modal?
            })
            .catch(
                err => void console.error(err) || dispatch({ type: 'updateMessage', payload: 'Error: ' + err.message })
            );
    }
    return (
        <form
            className='form'

        >
            <div className='formGroup' key='email'>
                <label>
                    <input
                        className='formControl'
                        type='email'
                        name='email'
                        placeholder='Email'
                        autoCapitalize='off'
                        required={true}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => { dispatch({ type: 'updateEmail', payload: e.currentTarget.value }) }}
                    />
                    <div className='inputFieldIcon inputFieldEmail' />
                </label>
            </div>
            <div className='formGroup' key='password'>
                <label>
                    <input
                        className='formControl'
                        type='password'
                        name='password'
                        placeholder='Password'
                        required={true}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => { dispatch({ type: 'updatePassword', payload: e.currentTarget.value }) }}
                    />
                    <div className='inputFieldIcon inputFieldPassword' />
                </label>
            </div>

            <div>
                <button onClick={handleLogin} className={isLoading ? 'btn saving' : 'btn'}>
                    Log in
        </button>
                {state.message.length > 0 && <pre>{state.message}</pre>}
            </div>
            <button type='button' onClick={handlePasswordRecover} className='btnLink forgotPasswordLink'>
                Recover password?
      </button>
        </form>
    );
};
