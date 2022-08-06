import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { loadStripe } from '@stripe/stripe-js';
import { CheckIcon, ClockIcon } from '@heroicons/react/solid';
import ErrorAlert from '../layout/alerts/error-alert';

const CartPage = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cart = useStoreState((state) => state.cart);

  const cartTotal = cart.reduce(
    (total, product) =>
      Number(product.displayPrice) * Number(product.quantity) + total,
    0
  );

  const deleteFromCart = useStoreActions((state) => state.deleteFromCart);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let stripePromise;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    return stripePromise;
  };

  const stripeItems = () => {
    let finishedCart = [];
    cart.forEach((product) => {
      let finalQty = cart
        .filter((x) => x.price === product.price)
        .reduce((accum, p) => accum + p.quantity, 0);
      if (!finishedCart.some((item) => item.price === product.price)) {
        finishedCart.push({ price: product.price, quantity: finalQty });
      }
    });
    return finishedCart;
  };

  const checkoutOptions = {
    lineItems: stripeItems(),
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setIsLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    if (error) setStripeError(error.message);
    setIsLoading(true);
  };

  if (cart?.length) {
    return (
      <div className='bg-white'>
        <ErrorAlert error={stripeError} />
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0'>
          <h1 className='text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl'>
            Shopping Cart
          </h1>

          <form className='mt-12' onSubmit={handleSubmit}>
            <section aria-labelledby='cart-heading'>
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>

              {cart.map((product, index) => (
                <li key={index} className='flex py-6'>
                  <div className='flex-shrink-0'>
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      className='w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32'
                    />
                  </div>
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
                          ${product.displayPrice}
                        </p>
                      </div>
                      <div className='flex justify-between'>
                        <p className='mt-1 text-sm text-gray-700'>Quantity</p>
                        <p className='mt-1 text-sm text-gray-700'>
                          {product.quantity}
                        </p>
                      </div>
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
                          onClick={() => deleteFromCart(product.idx)}
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
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
                      $
                      {cartTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </dd>
                  </div>
                </dl>
                <p className='mt-1 text-sm text-gray-500'>
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className='mt-10'>
                <button
                  onClick={redirectToCheckout}
                  disabled={isLoading}
                  type='submit'
                  className='checkout-button w-full bg-amber-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500'
                >
                  Checkout
                </button>
              </div>

              <div className='mt-6 text-sm text-center'>
                <p>
                  or{' '}
                  <Link
                    to='/decks'
                    className='text-amber-600 font-medium hover:text-amber-500'
                  >
                    Continue Shopping<span aria-hidden='true'> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>Your cart</span>
            <span className='block'>is currently empty.</span>
          </h2>
        </div>
      </div>
    );
  }
};

export default CartPage;
