import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import useLoading from '../../higherOrderComponents/useLoading';

export interface ILogoutFormProps {
  onClose: () => void;
}

export const LogoutForm: React.FC<ILogoutFormProps> = ({
  onClose,
}: ILogoutFormProps) => {
  const identity = useIdentityContext();

  let n = '';
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
    n = 'anonymous';
  }

  const [isLoading, load] = useLoading();
  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    load(identity.logoutUser());
    onClose();
  };

  return (
    <>
      <div className='header'>
        <button className='btn btnHeader active'>Logged in</button>
      </div>
      <form className='form '>
        <p className='infoText'>
          Logged in as <br />
          <span className='infoTextEmail'>{n}</span>
        </p>
        <button
          type='submit'
          className={isLoading ? 'btn saving' : 'btn'}
          onClick={logout}
        >
          Log out
        </button>
      </form>
    </>
  );
};
