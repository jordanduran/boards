import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';

const product = {
  name: 'Abyss',
  href: '#',
  price: '$50',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  imageSrc:
    'https://i.ibb.co/LYX8FvK/PS22-W0010-DESARMOABYSSDECK-1500x1500.png',
  imageAlt:
    'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Decks', href: '/decks' },
  ],
  sizes: [
    { name: '8.5', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '8.0', description: 'Enough room for a serious amount of snacks.' },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DeckProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { id: deckId } = useParams();

  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8'>
        {/* Product details */}
        <div className='lg:max-w-lg lg:self-end'>
          <nav aria-label='Breadcrumb'>
            {/*eslint-disable-next-line jsx-a11y/no-redundant-roles*/}
            <ol role='list' className='flex items-center space-x-2'>
              {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className='flex items-center text-sm'>
                    <Link
                      to={breadcrumb.href}
                      className='font-medium text-gray-500 hover:text-gray-900'
                    >
                      {breadcrumb.name}
                    </Link>
                    {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
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
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              {product.name}
            </h1>
          </div>

          <section aria-labelledby='information-heading' className='mt-4'>
            <h2 id='information-heading' className='sr-only'>
              Product information
            </h2>

            <div className='flex items-center'>
              <p className='text-lg text-gray-900 sm:text-xl'>
                {product.price}
              </p>
            </div>

            <div className='mt-4 space-y-6'>
              <p className='text-base text-gray-500'>{product.description}</p>
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
              src={product.imageSrc}
              alt={product.imageAlt}
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

            <form>
              <div className='sm:flex sm:justify-between'>
                {/* Size selector */}
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
                    Size
                  </RadioGroup.Label>
                  <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 text-center'>
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        as='div'
                        key={size.name}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            active ? 'ring-2 ring-amber-500' : '',
                            'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none hover:bg-amber-100'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as='p'
                              className='text-base font-medium text-gray-900'
                            >
                              {size.name}
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
                <a
                  href='#'
                  className='group inline-flex text-sm text-gray-500 hover:text-gray-700'
                >
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className='flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </a>
              </div>
              <div className='mt-10'>
                <button
                  type='submit'
                  className='w-full bg-amber-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500'
                >
                  Add to bag
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeckProductPage;
