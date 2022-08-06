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
        sessionStorage.removeItem('user');
        navigate('/');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return { signout };
};
