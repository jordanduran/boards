import { useStoreState, useStoreActions } from 'easy-peasy';
import { CheckIcon, ClockIcon } from '@heroicons/react/solid';

const CartPage = () => {
  const cart = useStoreState((state) => state.cart);
  const deleteFromCart = useStoreActions((state) => state.deleteFromCart);

  const cartTotal = cart.reduce(
    (total, product) => Number(product.price) + total,
    0
  );
  console.log('cart->', cart);

  if (cart?.length) {
    return (
      <div className='bg-white'>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0'>
          <h1 className='text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl'>
            Shopping Cart
          </h1>

          <form className='mt-12'>
            <section aria-labelledby='cart-heading'>
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>

              <ul
                role='list'
                className='border-t border-b border-gray-200 divide-y divide-gray-200'
              >
                {cart.sort().map((product, index) => (
                  <li key={index} className='flex py-6'>
                    <div className='flex-shrink-0'>
                      <img
                        src={product.imageSrc}
                        alt={product.name}
                        className='w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32'
                      />
                    </div>
                    <p>{index}</p>
                    <div className='ml-4 flex-1 flex flex-col sm:ml-6'>
                      <div>
                        <div className='flex justify-between'>
                          <h4 className='text-sm'>
                            <a
                              href={product.href}
                              className='font-medium text-gray-700 hover:text-gray-800 capitalize'
                            >
                              {product.name}
                            </a>
                          </h4>
                          <p className='ml-4 text-sm font-medium text-gray-900'>
                            ${product.price}
                          </p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>
                          {product.color}
                        </p>
                        <p className='mt-1 text-sm text-gray-500'>
                          {product.size}
                        </p>
                      </div>

                      <div className='mt-4 flex-1 flex items-end justify-between'>
                        <p className='flex items-center text-sm text-gray-700 space-x-2'>
                          {Number(product.inStock) > 0 ? (
                            <CheckIcon
                              className='flex-shrink-0 h-5 w-5 text-green-500'
                              aria-hidden='true'
                            />
                          ) : (
                            <ClockIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-300'
                              aria-hidden='true'
                            />
                          )}

                          <span>
                            {product.inStock > 0
                              ? 'In stock'
                              : `Will ship in 5-7 business days.`}
                          </span>
                        </p>
                        <div className='ml-4'>
                          <button
                            type='button'
                            className='text-sm font-medium text-amber-600 hover:text-amber-500'
                            onClick={() => deleteFromCart(index)}
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section aria-labelledby='summary-heading' className='mt-10'>
              <h2 id='summary-heading' className='sr-only'>
                Order summary
              </h2>

              <div>
                <dl className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-base font-medium text-gray-900'>
                      Subtotal
                    </dt>
                    <dd className='ml-4 text-base font-medium text-gray-900'>
                      ${cartTotal}
                    </dd>
                  </div>
                </dl>
                <p className='mt-1 text-sm text-gray-500'>
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className='mt-10'>
                <button
                  type='submit'
                  className='w-full bg-amber-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500'
                >
                  Checkout
                </button>
              </div>

              <div className='mt-6 text-sm text-center'>
                <p>
                  or{' '}
                  <a
                    href='#'
                    className='text-amber-600 font-medium hover:text-amber-500'
                  >
                    Continue Shopping<span aria-hidden='true'> &rarr;</span>
                  </a>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
    );
  } else {
    return 'Your cart is currently empty.';
  }
};

export default CartPage;
