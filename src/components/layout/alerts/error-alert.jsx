import { useState, useEffect } from 'react';
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';

const ErrorAlert = ({ error }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [error]);

  if (error && isOpen) {
    return (
      <div className='rounded-md bg-red-50 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <CheckCircleIcon
              className='h-5 w-5 text-red-400'
              aria-hidden='true'
            />
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium text-red-800'>{error}</p>
          </div>
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                type='button'
                className='inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600'
                onClick={() => setIsOpen(false)}
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ErrorAlert;
