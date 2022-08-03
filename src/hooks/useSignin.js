import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useSignin = () => {
  const [error, setError] = useState(null);

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
        console.log('User successfully signed in!', response.user);
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
