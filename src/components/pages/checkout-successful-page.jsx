import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const CheckoutSuccessfulPage = () => {
  const cart = useStoreState((state) => state.cart);
  const productsPurchased = useStoreState((state) => state.productsPurchased);
  const orderShippingInfo = useStoreState((state) => state.orderShippingInfo);
  const orderBillingInfo = useStoreState((state) => state.orderBillingInfo);

  const purchasedProductsTotal = productsPurchased.reduce(
    (total, product) =>
      Number(product.displayPrice) * Number(product.quantity) + total,
    0
  );

  const shipping =
    purchasedProductsTotal > 100
      ? Number('0.0')
      : Number(orderShippingInfo?.selectedDeliveryMethod?.price?.substr(1, 5));

  const addProductsPurchased = useStoreActions(
    (state) => state.addProductsPurchased
  );

  const clearCart = useStoreActions((state) => state.clearCart);

  const shuffledNumbers = '52345678910123456789'
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');

  useEffect(() => {
    addProductsPurchased(cart);
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProductsPurchased, clearCart]);

  if (productsPurchased.length) {
    return (
      <div className='bg-white'>
        <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          <div className='max-w-xl'>
            <h1 className='text-sm font-semibold uppercase tracking-wide text-amber-600'>
              Thank you!
            </h1>
            <p className='mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl'>
              It's on the way!
            </p>
            <p className='mt-2 text-base text-gray-500'>
              Your order #{shuffledNumbers.slice(11, 19)} has shipped and will
              be with you soon.
            </p>

            <dl className='mt-12 text-sm font-medium'>
              <dt className='text-gray-900'>Tracking number</dt>
              <a
                href='https://www.ups.com/track?loc=en_US&requester=ST/'
                target='_blank'
                rel='noreferrer'
              >
                <dd className='text-amber-600 mt-2 hover:text-amber-500'>
                  {shuffledNumbers}
                </dd>
              </a>
            </dl>
          </div>

          <div className='mt-10 border-t border-gray-200'>
            <h2 className='sr-only'>Your order</h2>

            <h3 className='sr-only'>Items</h3>
            {productsPurchased.map((product, index) => (
              <div
                key={index}
                className='py-10 border-b border-gray-200 flex space-x-6'
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className='flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40'
                />
                <div className='flex-auto flex flex-col'>
                  <div>
                    <h4 className='font-medium text-gray-900 capitalize'>
                      <a href={product.href}>{product.name}</a>
                    </h4>
                    <p className='mt-2 text-sm text-gray-600'>
                      {product.description}
                    </p>
                  </div>
                  <div className='mt-6 flex-1 flex items-end'>
                    <dl className='flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6'>
                      <div className='flex'>
                        <dt className='font-medium text-gray-900'>Quantity</dt>
                        <dd className='ml-2 text-gray-700'>
                          {product.quantity}
                        </dd>
                      </div>
                      <div className='pl-4 flex sm:pl-6'>
                        <dt className='font-medium text-gray-900'>Price</dt>
                        <dd className='ml-2 text-gray-700'>
                          ${product.displayPrice * product.quantity}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className='sm:ml-40 sm:pl-6'>
              <h3 className='sr-only'>Your information</h3>

              <h4 className='sr-only'>Addresses</h4>
              <dl className='grid grid-cols-2 gap-x-6 text-sm py-10'>
                <div>
                  <dt className='font-medium text-gray-900'>
                    Shipping address
                  </dt>
                  <dd className='mt-2 text-gray-700'>
                    <address className='not-italic'>
                      <span className='block capitalize'>{`${orderShippingInfo.firstName} ${orderShippingInfo.lastName}`}</span>
                      <span className='block capitalize'>{`${orderShippingInfo.address} ${orderShippingInfo.apt}`}</span>
                      <span className='block capitalize'>{`${orderShippingInfo.city}, ${orderShippingInfo.state} ${orderShippingInfo.postalCode}`}</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className='font-medium text-gray-900'>Billing address</dt>
                  <dd className='mt-2 text-gray-700'>
                    <address className='not-italic'>
                      <span className='block capitalize'>
                        {orderBillingInfo.billingAddress !== ''
                          ? `${orderBillingInfo.billingFirstName} ${orderBillingInfo.billingLastName}`
                          : `${orderShippingInfo.firstName} ${orderShippingInfo.lastName}`}
                      </span>
                      <span className='block capitalize'>
                        {orderBillingInfo.billingAddress !== ''
                          ? `${orderBillingInfo.billingAddress} ${orderBillingInfo.billingApt}`
                          : `${orderShippingInfo.address} ${orderShippingInfo.apt}`}
                      </span>
                      <span className='block capitalize'>
                        {orderBillingInfo.billingAddress !== ''
                          ? `${orderBillingInfo.billingCity}, ${orderBillingInfo.billingState} ${orderBillingInfo.billingPostalCode}`
                          : `${orderShippingInfo.city}, ${orderShippingInfo.state} ${orderShippingInfo.postalCode}`}
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h4 className='sr-only'>Payment</h4>
              <dl className='grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10'>
                <div>
                  <dt className='font-medium text-gray-900'>Payment method</dt>
                  <dd className='mt-2 text-gray-700'>
                    <p>Stripe</p>
                    <p>Debit/Credit</p>
                    {/* <p>
                      <span aria-hidden='true'>•••• </span>
                      <span className='sr-only'>Ending in </span>1545
                    </p> */}
                  </dd>
                </div>
                <div>
                  <dt className='font-medium text-gray-900'>Shipping method</dt>
                  <dd className='mt-2 text-gray-700'>
                    <p>UPS</p>
                    <p>{orderShippingInfo.selectedDeliveryMethod.title}</p>
                    <p>{orderShippingInfo.selectedDeliveryMethod.turnaround}</p>
                  </dd>
                </div>
              </dl>

              <h3 className='sr-only'>Summary</h3>

              <dl className='space-y-6 border-t border-gray-200 text-sm pt-10'>
                <div className='flex justify-between'>
                  <dt className='font-medium text-gray-900'>Subtotal</dt>
                  <dd className='text-gray-700'>${purchasedProductsTotal}</dd>
                </div>
                {purchasedProductsTotal > 100 && (
                  <div className='flex justify-between'>
                    <dt className='flex font-medium text-gray-900'>
                      Discount
                      <span className='rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2'>
                        FREESHIPPING
                      </span>
                    </dt>
                    <dd className='text-gray-700'>
                      -{orderShippingInfo.selectedDeliveryMethod.price}
                    </dd>
                  </div>
                )}
                <div className='flex justify-between'>
                  <dt className='font-medium text-gray-900'>Shipping</dt>
                  <dd className='text-gray-700'>${shipping}</dd>
                </div>
                <div className='flex justify-between'>
                  <dt className='font-medium text-gray-900'>Total</dt>
                  <dd className='text-gray-900'>
                    ${purchasedProductsTotal + shipping}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CheckoutSuccessfulPage;
