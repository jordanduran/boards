import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useSignout = () => {
  const navigate = useNavigate();

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log('User successfully signed out!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { signout };
};
