import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex flex-col border-b border-gray-200 lg:border-0 z-0'>
      <div className='relative'>
        <div
          aria-hidden='true'
          className='hidden absolute w-1/2 h-full bg-gray-100 lg:block'
        />
        <div className='relative bg-gray-100 lg:bg-transparent z-0'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2'>
            <div className='max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none'>
              <div className='lg:pr-16'>
                <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-7xl'>
                  boards.
                </h1>
                <p className='mt-4 text-xl text-gray-600'>
                  Shop from one of the largest selections of decks, pre-built
                  complete skateboards, and wall art. Lowest prices guaranteed.
                </p>
                <div className='mt-6'>
                  <Link
                    to='/decks'
                    className='inline-block bg-amber-600 border border-transparent py-3 px-6 rounded-md font-medium text-white text-base hover:bg-amber-700'
                  >
                    Shop Skateboards
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full'>
          <img
            src={require('../../images/landing-hero.jpg')}
            alt=''
            className='w-full h-full object-center object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
