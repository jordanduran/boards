import { Fragment, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { useSignout } from '../../hooks/useSignout';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';

const currencies = ['USD'];
const navigation = {
  pages: [
    { name: 'Decks', href: '/decks' },
    { name: 'Trucks', href: '/trucks' },
    { name: 'Wheels', href: '/wheels' },
    { name: 'Complete Skateboards', href: '/complete-skateboards' },
    { name: 'Wall Art', href: '/wall-art' },
    { name: 'New Arrivals', href: '/new-arrivals' },
  ],
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useStoreState((state) => state.user);
  const cartCount = useStoreState((state) => state.cartCount);
  const { signout } = useSignout();

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 flex z-40'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto'>
                <div className='px-4 pt-5 pb-2 flex'>
                  <button
                    type='button'
                    className='-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <Link
                        to={page.href}
                        className='-m-2 p-2 block font-medium text-gray-900'
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  {!user && (
                    <div className='flow-root'>
                      <Link
                        to='/sign-up'
                        className='-m-2 p-2 block font-medium text-gray-900'
                        onClick={() => setOpen(false)}
                      >
                        Create an account
                      </Link>
                    </div>
                  )}
                  {!user ? (
                    <div className='flow-root'>
                      <Link
                        to='/sign-in'
                        className='-m-2 p-2 block font-medium text-gray-900'
                        onClick={() => setOpen(false)}
                      >
                        Sign in
                      </Link>
                    </div>
                  ) : (
                    <div className='flow-root'>
                      <button
                        className='-m-2 p-2 block font-medium text-gray-900'
                        onClick={signout}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  {/* Currency selector */}
                  <form>
                    <div className='inline-block'>
                      <label htmlFor='mobile-currency' className='sr-only'>
                        Currency
                      </label>
                      <div className='-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white'>
                        <select
                          id='mobile-currency'
                          name='currency'
                          className='bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent'
                        >
                          {currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                          ))}
                        </select>
                        <div className='absolute right-0 inset-y-0 flex items-center pointer-events-none'>
                          <svg
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='w-5 h-5 text-gray-500'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M6 8l4 4 4-4'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='relative'>
        <nav aria-label='Top'>
          {/* Top navigation */}
          <div className='bg-amber-600'>
            <div className='max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8'>
              {/* Currency selector */}
              <form className='hidden lg:block lg:flex-1'>
                <div className='flex'>
                  <label htmlFor='desktop-currency' className='sr-only'>
                    Currency
                  </label>
                  <div className='-ml-2 group relative bg-amber-600 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white'>
                    <select
                      id='desktop-currency'
                      name='currency'
                      className='bg-none bg-amber-600 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent'
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className='absolute right-0 inset-y-0 flex items-center pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                        className='w-5 h-5 text-gray-300'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1.5'
                          d='M6 8l4 4 4-4'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <p className='flex-1 text-center text-sm font-medium text-white lg:flex-none'>
                Get free delivery on orders over $100
              </p>

              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                {!user && (
                  <>
                    <Link
                      to='/sign-up'
                      className='text-sm font-medium text-white hover:text-gray-100'
                    >
                      Create an account
                    </Link>
                    <span className='h-6 w-px bg-white' aria-hidden='true' />
                  </>
                )}
                {!user ? (
                  <Link
                    to='/sign-in'
                    className='text-sm font-medium text-white hover:text-gray-100'
                  >
                    Sign in
                  </Link>
                ) : (
                  <>
                    <button
                      className='text-sm font-medium text-white hover:text-gray-100'
                      onClick={signout}
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className='bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='border-b border-gray-200'>
                <div className='h-16 flex items-center justify-between'>
                  {/* Logo (lg+) */}
                  <div className='hidden lg:flex lg:items-center'>
                    <Link to='/'>
                      <span className='sr-only'>boards</span>
                      <img
                        className='h-10 w-10 w-auto'
                        src='https://i.ibb.co/LPxnV1T/letter-b.png'
                        alt=''
                      />
                    </Link>
                  </div>

                  <div className='hidden h-full lg:flex'>
                    {/* Mega menus */}
                    <Popover.Group className='ml-8 z-50'>
                      <div className='h-full flex justify-center space-x-6'>
                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.href}
                            onClick={() => setOpen(false)}
                            className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className='flex-1 flex items-center lg:hidden'>
                    <button
                      type='button'
                      className='-ml-2 bg-white p-2 rounded-md text-gray-400'
                      onClick={() => setOpen(true)}
                    >
                      <span className='sr-only'>Open menu</span>
                      <MenuIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Search */}
                    <Link
                      to='#'
                      className='ml-2 p-2 text-gray-400 hover:text-gray-500'
                    >
                      <span className='sr-only'>Search</span>
                      <SearchIcon className='w-6 h-6' aria-hidden='true' />
                    </Link>
                  </div>

                  {/* Logo (lg-) */}
                  <Link to='/' className='lg:hidden'>
                    <span className='sr-only'>boards</span>
                    <img
                      src='https://i.ibb.co/LPxnV1T/letter-b.png'
                      alt=''
                      className='h-10 w-auto'
                    />
                  </Link>

                  <div className='flex-1 flex items-center justify-end'>
                    <div className='flex items-center lg:ml-8'>
                      <div className='flex space-x-8'>
                        <div className='hidden lg:flex'>
                          <Link
                            to='#'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                          >
                            <span className='sr-only'>Search</span>
                            <SearchIcon
                              className='w-6 h-6'
                              aria-hidden='true'
                            />
                          </Link>
                        </div>

                        {user && (
                          <>
                            <div className='flex'>
                              <Link
                                to='#'
                                className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                              >
                                <span className='sr-only'>Account</span>
                                <UserIcon
                                  className='w-6 h-6'
                                  aria-hidden='true'
                                />
                              </Link>
                            </div>
                          </>
                        )}
                      </div>

                      <span
                        className='mx-4 h-6 w-px bg-gray-200 lg:mx-6'
                        aria-hidden='true'
                      />

                      <div className='flow-root'>
                        <Link
                          to='/cart'
                          className='group -m-2 p-2 flex items-center'
                        >
                          <ShoppingCartIcon
                            className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                          <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                            {cartCount}
                          </span>
                          <span className='sr-only'>
                            items in cart, view bag
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
