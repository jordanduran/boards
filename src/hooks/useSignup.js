import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate('/');
        console.log('User successfully created an account!', response.user);
      })
      .catch((error) => {
        switch (error.message) {
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            return setError('Password should be at least 6 characters long.');
          case 'Firebase: Error (auth/email-already-in-use).':
            return setError('The email you have provided already exists.');
          default:
            return setError(error.message);
        }
      });
  };

  return { error, signup };
};
