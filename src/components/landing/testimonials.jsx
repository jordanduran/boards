const testimonials = [
  {
    id: 1,
    quote:
      'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
    attribution: 'Michael Scott, Pennsylvania',
  },
  {
    id: 2,
    quote:
      'I had to return a purchase that wasn’t the right fit for the house as I thought it would be. The whole process was so simple that I ended up ordering two new items!',
    attribution: 'Stanley Hudson, Pennsylvania',
  },
  {
    id: 3,
    quote:
      'Now that I’m on holiday for the summer, I’ll probably order a few more wall art. It’s just so amazing, and I love the look it gives my home.',
    attribution: 'Pam Beesly, Pennsylvania',
  },
];

const Testimonials = () => {
  return (
    <div className='relative overflow-hidden'>
      {/* Testimonials */}
      <section
        aria-labelledby='testimonial-heading'
        className='relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:py-32 lg:px-8'
      >
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <h2
            id='testimonial-heading'
            className='text-2xl font-extrabold tracking-tight text-gray-900'
          >
            What Are People Saying?
          </h2>

          <div className='mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className='sm:flex lg:block'>
                <svg
                  width={24}
                  height={18}
                  viewBox='0 0 24 18'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  className='flex-shrink-0 text-gray-300'
                >
                  <path
                    d='M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z'
                    fill='currentColor'
                  />
                </svg>
                <div className='mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0'>
                  <p className='text-lg text-gray-600'>{testimonial.quote}</p>
                  <cite className='mt-4 block font-semibold not-italic text-gray-900'>
                    {testimonial.attribution}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <div className='bg-white'>
        <div className='relative bg-gray-900'>
          {/* Decorative image and overlay */}
          <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
            <img
              src='https://i.ibb.co/Tk60GgB/pexels-allan-franca-carmo-3133688-1.jpg'
              alt=''
              className='w-full h-fit object-center object-cover'
            />
          </div>
          <div
            aria-hidden='true'
            className='absolute inset-0 bg-gray-900 opacity-50'
          />

          <div className='relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0'>
            <h1 className='text-4xl font-extrabold tracking-tight text-white lg:text-6xl'>
              New arrivals are here
            </h1>
            <p className='mt-4 text-xl text-white'>
              The new arrivals have, well, newly arrived. Check out the latest
              options from our summer small-batch release while they're still in
              stock.
            </p>
            <a
              href='#'
              className='mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100'
            >
              Shop New Arrivals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
