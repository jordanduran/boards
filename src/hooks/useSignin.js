import { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useSignin = () => {
  const [error, setError] = useState(null);
  const setSignedInUser = useStoreActions((actions) => actions.setSignedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const signin = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setSignedInUser(response.user);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        navigate('/');
      })
      .catch((error) => {
        switch (error.message) {
          case 'Firebase: Error (auth/wrong-password).':
            return setError('The email or password entered is incorrect.');
          default:
            return setError(error.message);
        }
      });
  };

  return { error, signin };
};
