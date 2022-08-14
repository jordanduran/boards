import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import Filter from '../layout/filter';
import Loader from '../layout/loader';

const NewArrivalsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [noItemsAvailable, setNoItemsAvailable] = useState(false);

  const { documents: newArrivals } = useCollection('newArrivals');

  console.log('newArrivals->', newArrivals);
  console.log('selectedCategories', selectedCategories);
  console.log('noItemsAvailable', noItemsAvailable);

  useEffect(() => {
    if (
      selectedCategories.length &&
      newArrivals?.filter((x) => selectedCategories.includes(x.type)).length ===
        0
    ) {
      setNoItemsAvailable(true);
    } else {
      setNoItemsAvailable(false);
    }
  }, [newArrivals, selectedCategories]);

  if (noItemsAvailable) {
    return (
      <div className='bg-white'>
        <div className='py-16 text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 mb-8'>
            New Arrivals
          </h1>
          <Filter
            newArrivals={newArrivals}
            selectedCategories={selectedCategories}
            onSetSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto text-center pb-24 px-4 sm:px-6 lg:py-16 lg:px-8'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight'>
              <span className='block'>Sorry, unfortunately there</span>
              <span className='block'>
                are no products available at the moment.
              </span>
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (!newArrivals?.length) {
    return <Loader />;
  } else if (newArrivals?.length && selectedCategories?.length) {
    return (
      <div className='bg-white'>
        <div className='py-16 text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 mb-8'>
            New Arrivals
          </h1>
          <Filter
            newArrivals={newArrivals}
            selectedCategories={selectedCategories}
            onSetSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className='max-w-2xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Products</h2>

          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {newArrivals
              .filter((x) => selectedCategories.includes(x.type))
              .map((product) => (
                <Link
                  key={product.id}
                  to={`/new-arrivals/${product.id}/${
                    product.name.split(' ')[0]
                  }`}
                  className='group'
                >
                  <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-10'>
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      className='w-full h-full object-center object-cover group-hover:opacity-75'
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700 text-center capitalize'>
                    {product.name}
                  </h3>
                  <p className='mt-1 text-lg font-medium text-gray-900 text-center'>
                    ${product.displayPrice}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  } else if (newArrivals?.length && !selectedCategories?.length) {
    return (
      <div className='bg-white'>
        <div className='py-16 text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 mb-8'>
            New Arrivals
          </h1>
          <Filter
            newArrivals={newArrivals}
            selectedCategories={selectedCategories}
            onSetSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className='max-w-2xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Products</h2>

          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                to={`/new-arrivals/${product.id}/${product.name.split(' ')[0]}`}
                className='group'
              >
                <div className='w-full aspect-w-6 aspect-h-8 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-10'>
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className='w-full h-full object-center object-cover group-hover:opacity-75'
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700 text-center capitalize'>
                  {product.name}
                </h3>
                <p className='mt-1 text-lg font-medium text-gray-900 text-center'>
                  ${product.displayPrice}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default NewArrivalsPage;
