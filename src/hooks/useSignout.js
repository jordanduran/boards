import { useStoreActions } from 'easy-peasy';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useSignout = () => {
  const setSignedInUser = useStoreActions((actions) => actions.setSignedInUser);
  const navigate = useNavigate();

  const signout = () => {
    signOut(auth)
      .then(() => {
        setSignedInUser(null);
        console.log('User successfully signed out!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { signout };
};
