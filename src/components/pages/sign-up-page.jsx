import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useSignup } from '../../hooks/useSignup';
import ErrorAlert from '../layout/alerts/error-alert';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <div className='bg-gray-100'>
      <ErrorAlert error={error} />
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className='mx-auto w-14 h-14 w-auto'
              src={require('../../images/boards-logo.png')}
              alt='Boards logo'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Create Account
            </h2>
          </div>
          <form
            className='mt-8 space-y-6'
            action='#'
            method='POST'
            onSubmit={handleSubmit}
          >
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link
                  to='#'
                  className='font-medium text-amber-600 hover:text-amber-500'
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-amber-500 group-hover:text-amber-400'
                    aria-hidden='true'
                  />
                </span>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
