import { Link } from 'react-router-dom';

const CheckoutCancelPage = () => {
  return (
    <div className='bg-amber-700'>
      <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
          <span className='block'>The checkout process has been canceled,</span>
          <span className='block'>and no payment has been made.</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-amber-200'>
          If you would like to still shop, click below to go back to the home
          page.
        </p>
        <Link
          to='/'
          className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-amber-600 bg-white hover:bg-amber-50 sm:w-auto'
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancelPage;
