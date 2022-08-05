import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link, useParams } from 'react-router-dom';
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import SuccessAlert from '../layout/alerts/success-alert';

const breadcrumbs = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Decks', href: '/decks' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DeckProductPage = () => {
  const [deck, setDeck] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id: deckId } = useParams();

  const cart = useStoreState((state) => state.cart);

  const addToCart = useStoreActions((actions) => actions.addToCart);
  const addToCartCount = useStoreActions((actions) => actions.addToCartCount);

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuantity(quantity + 1);

    deck.id = deckId;
    deck.size = selectedSize;
    deck.quantity = quantity;
    addToCart(deck);
    addToCartCount();
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (deck?.sizes?.length) {
      setSelectedSize(deck?.sizes[0]);
    }
  }, [deck]);

  useEffect(() => {
    if (formSubmitted) {
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        setFormSubmitted(false);
        setShowAlert(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [formSubmitted, cart, quantity]);

  console.log(cart);

  useEffect(() => {
    const docRef = doc(db, 'decks', deckId);
    const getDeck = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDeck(docSnap.data());
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeck();
  }, [deckId]);

  if (deck) {
    return (
      <div className='bg-white'>
        {showAlert && (
          <SuccessAlert message='You have successfully added this item to your cart.' />
        )}
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8'>
          {/* Product details */}
          <div className='lg:max-w-lg lg:self-end'>
            <nav aria-label='Breadcrumb'>
              {/*eslint-disable-next-line jsx-a11y/no-redundant-roles*/}
              <ol role='list' className='flex items-center space-x-2'>
                {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                  <li key={breadcrumb.id}>
                    <div className='flex items-center text-sm'>
                      <Link
                        to={breadcrumb.href}
                        className='font-medium text-gray-500 hover:text-gray-900'
                      >
                        {breadcrumb.name}
                      </Link>
                      {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                        <svg
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          aria-hidden='true'
                          className='ml-2 flex-shrink-0 h-5 w-5 text-gray-300'
                        >
                          <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <div className='mt-4'>
              <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl capitalize'>
                {deck.name}
              </h1>
            </div>
            <section aria-labelledby='information-heading' className='mt-4'>
              <h2 id='information-heading' className='sr-only'>
                Product information
              </h2>

              <div className='flex items-center'>
                <p className='text-lg text-gray-900 sm:text-xl'>
                  ${deck.price}
                </p>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-gray-500'>{deck.description}</p>
              </div>

              <div className='mt-6 flex items-center'>
                <CheckIcon
                  className='flex-shrink-0 w-5 h-5 text-green-500'
                  aria-hidden='true'
                />
                <p className='ml-2 text-sm text-gray-500'>
                  In stock and ready to ship
                </p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className='mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center'>
            <div className='aspect-w-1 aspect-h-1 rounded-lg overflow-hidden'>
              <img
                src={deck.imageSrc}
                alt={deck.name}
                className='w-full h-full object-center object-cover'
              />
            </div>
          </div>

          {/* Product form */}
          <div className='mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start'>
            <section aria-labelledby='options-heading'>
              <h2 id='options-heading' className='sr-only'>
                Product options
              </h2>

              <form onSubmit={handleSubmit}>
                <div className='sm:flex sm:justify-between'>
                  {/* Size selector */}
                  <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                    <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
                      Size
                    </RadioGroup.Label>
                    <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 text-center'>
                      {deck.sizes.map((size) => (
                        <RadioGroup.Option
                          checked={selectedSize}
                          as='div'
                          key={size}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? 'ring-2 ring-amber-500' : '',
                              'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none hover:bg-amber-100'
                            )
                          }
                          onClick={() => setSelectedSize(size)}
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label
                                as='p'
                                className='text-base font-medium text-gray-900'
                              >
                                {size}
                              </RadioGroup.Label>
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-amber-500'
                                    : 'border-transparent',
                                  'absolute -inset-px rounded-lg pointer-events-none'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className='mt-4'>
                  <Link
                    to='#'
                    className='group inline-flex text-sm text-gray-500 hover:text-gray-700'
                  >
                    <span>What size should I buy?</span>
                    <QuestionMarkCircleIcon
                      className='flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </Link>
                </div>
                <div className='mt-10'>
                  <button
                    type='submit'
                    className='w-full bg-amber-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500'
                  >
                    Add to cart
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default DeckProductPage;
