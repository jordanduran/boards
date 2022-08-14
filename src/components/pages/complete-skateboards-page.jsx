import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import Loader from '../layout/loader';

const CompleteSkateboardsPage = () => {
  const { documents: completeSkateboards } = useCollection(
    'completeSkateboards'
  );

  if (!completeSkateboards?.length) {
    return <Loader />;
  } else {
    return (
      <div className='bg-white'>
        <div className='py-16 text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
            Complete Skateboards
          </h1>
        </div>
        <div className='max-w-2xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Products</h2>

          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {completeSkateboards.map((complete) => (
              <Link
                key={complete.id}
                to={`/complete/${complete.id}/${complete.name.split(' ')[0]}`}
                className='group'
              >
                <div className='w-full aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-10'>
                  <img
                    src={complete.imageSrc}
                    alt={complete.name}
                    className='w-full h-full object-center object-scale-down group-hover:opacity-75'
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700 text-center capitalize'>
                  {complete.name}
                </h3>
                <p className='mt-1 text-lg font-medium text-gray-900 text-center'>
                  ${complete.displayPrice}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default CompleteSkateboardsPage;
