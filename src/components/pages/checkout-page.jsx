import { useState, useEffect, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { RadioGroup } from '@headlessui/react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircleIcon } from '@heroicons/react/solid';
import ErrorAlert from '../layout/alerts/error-alert';

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [formError, setFormError] = useState(null);
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cart = useStoreState((state) => state.cart);

  const addOrderShippingInfo = useStoreActions(
    (state) => state.addOrderShippingInfo
  );

  const shippingInformation = useMemo(() => {
    const shippingInfo = {
      email,
      firstName,
      lastName,
      company,
      address,
      apt,
      city,
      country,
      state,
      postalCode,
      phone,
      selectedDeliveryMethod,
    };
    addOrderShippingInfo(shippingInfo);
    return shippingInfo;
  }, [
    email,
    firstName,
    lastName,
    company,
    address,
    apt,
    city,
    country,
    state,
    postalCode,
    phone,
    selectedDeliveryMethod,
    addOrderShippingInfo,
  ]);

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
    if (
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      address === '' ||
      apt === '' ||
      city === '' ||
      country === '' ||
      state === '' ||
      postalCode === '' ||
      phone === ''
    ) {
      setFormError('Please fill out all  fields.');
      return;
    }
    setIsLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    if (error) setStripeError(error.message);
    setIsLoading(true);
    setFormError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const shippingInfo = {
    //   email,
    //   firstName,
    //   lastName,
    //   company,
    //   address,
    //   apt,
    //   city,
    //   country,
    //   state,
    //   postalCode,
    //   phone,
    //   selectedDeliveryMethod,
    // };
    // sessionStorage.setItem('orderShippingInfo', JSON.stringify(shippingInfo));
    // addOrderShippingInfo(shippingInfo);
  };

  useEffect(() => {
    if (formError !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [formError]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  console.log(formError);

  if (cart?.length) {
    return (
      <div className='bg-gray-50'>
        <ErrorAlert error={formError || stripeError} />
        <div className='max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-4xl lg:px-8 w/'>
          <h2 className='sr-only'>Checkout</h2>

          <form
            className='lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16'
            onSubmit={handleSubmit}
          >
            <div>
              <div>
                <h2 className='text-lg font-medium text-gray-900'>
                  Contact information
                </h2>

                <div className='mt-4'>
                  <label
                    htmlFor='email-address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      type='email'
                      id='email-address'
                      name='email-address'
                      autoComplete='email'
                      className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        formError !== null &&
                        email === '' &&
                        'border border-red-500'
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-10 border-t border-gray-200 pt-10'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Shipping information
                </h2>

                <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  <div>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        autoComplete='given-name'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          firstName === '' &&
                          'border border-red-500'
                        }`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        autoComplete='family-name'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          lastName === '' &&
                          'border border-red-500'
                        }`}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='company'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='company'
                        id='company'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Address
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='address'
                        id='address'
                        autoComplete='street-address'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          address === '' &&
                          'border border-red-500'
                        }`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='apartment'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='apartment'
                        id='apartment'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          apt === '' &&
                          'border border-red-500'
                        }`}
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        autoComplete='address-level2'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          city === '' &&
                          'border border-red-500'
                        }`}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <div className='mt-1'>
                      <select
                        id='country'
                        name='country'
                        autoComplete='country-name'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          country === '' &&
                          'border border-red-500'
                        }`}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value='United States'>United States</option>
                        <option value='Canada'>Canada</option>
                        <option value='Mexico'>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium text-gray-700'
                    >
                      State / Province
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='region'
                        id='region'
                        autoComplete='address-level1'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          state === '' &&
                          'border border-red-500'
                        }`}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Postal code
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          postalCode === '' &&
                          'border border-red-500'
                        }`}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Phone
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        autoComplete='tel'
                        className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                          formError !== null &&
                          phone === '' &&
                          'border border-red-500'
                        }`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <fieldset className='space-y-5'>
                  <legend className='sr-only'>Notifications</legend>
                  <div className='relative flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='billingSameAsShipping'
                        aria-describedby='billingSameAsShipping'
                        name='billingSameAsShipping'
                        type='checkbox'
                        className='focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded'
                        checked={billingSameAsShipping}
                        onChange={() =>
                          setBillingSameAsShipping(!billingSameAsShipping)
                        }
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='offers'
                        className='font-medium text-gray-700'
                      >
                        Billing same as shipping
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/*Billing Info */}

              {!billingSameAsShipping && (
                <div className='mt-10 border-t border-gray-200 pt-10'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    Billing information
                  </h2>

                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    <div>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          id='firstName'
                          name='firstName'
                          autoComplete='given-name'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          id='lastName'
                          name='lastName'
                          autoComplete='family-name'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='company'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Company
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='company'
                          id='company'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Address
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='address'
                          id='address'
                          autoComplete='street-address'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='apartment'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='apartment'
                          id='apartment'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={apt}
                          onChange={(e) => setApt(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium text-gray-700'
                      >
                        City
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='city'
                          id='city'
                          autoComplete='address-level2'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Country
                      </label>
                      <div className='mt-1'>
                        <select
                          id='country'
                          name='country'
                          autoComplete='country-name'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value='United States'>United States</option>
                          <option value='Canada'>Canada</option>
                          <option value='Mexico'>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium text-gray-700'
                      >
                        State / Province
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='region'
                          id='region'
                          autoComplete='address-level1'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Postal code
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='postal-code'
                          id='postal-code'
                          autoComplete='postal-code'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Phone
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                            formError !== null &&
                            email === '' &&
                            'border border-red-500'
                          }`}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className='mt-10 border-t border-gray-200 pt-10'>
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className='text-lg font-medium text-gray-900'>
                    Delivery method
                  </RadioGroup.Label>

                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-amber-500' : '',
                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className='flex-1 flex'>
                              <span className='flex flex-col'>
                                <RadioGroup.Label
                                  as='span'
                                  className='block text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-1 flex items-center text-sm text-gray-500'
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-6 text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className='h-5 w-5 text-amber-600'
                                aria-hidden='true'
                              />
                            ) : null}
                            <span
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
            </div>
            <div className='border-t border-gray-200 py-6'>
              <button
                type='submit'
                className='w-full bg-amber-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500'
                disabled={isLoading}
                onClick={redirectToCheckout}
              >
                Proceed to payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default CheckoutPage;
