import { Link } from 'react-router-dom';

const trendingProducts = [
  {
    id: 1,
    name: 'Cupid Deck',
    color: 'Gold / Pink / White / Green',
    price: '$50',
    href: '#',
    imageSrc: 'https://i.ibb.co/TcgX5nB/RODRIGUEZ-CUPID-1344x1344.png',
    imageAlt: 'Skateboard with lips',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 2,
    name: 'Fluorescent Deck',
    color: 'Purple / Orange / Green / Blue',
    price: '$50',
    href: '#',
    imageSrc: 'https://i.ibb.co/CtJMzW1/SILVAS-DECK-GREY-1408x1408.png',
    imageAlt: 'Skateboard with face on the design',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 3,
    name: 'Mystic Deck',
    color: 'Blue / Green / Orange / Yellow',
    price: '$50',
    href: '#',
    imageSrc: 'https://i.ibb.co/MP14LTV/HAMILTON-DECK-1408x1408.png',
    imageAlt: 'Skateboard with lips',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 4,
    name: 'Home Deck',
    color: 'Sky Blue / White / Yellow / Green',
    price: '$50',
    href: '#',
    imageSrc: 'https://i.ibb.co/HPKtNvJ/PS22-W0043-HOMETEAM-1408x1408.png',
    imageAlt: 'Skateboard with lips',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
];

const TrendingProducts = () => {
  return (
    <section aria-labelledby='trending-heading' className='bg-white'>
      <div className='py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8'>
        <div className='px-4 flex items-center justify-between sm:px-6 lg:px-0'>
          <h2
            id='trending-heading'
            className='text-2xl font-extrabold tracking-tight text-gray-900'
          >
            Trending Products
          </h2>
          <Link
            to='/decks'
            className='hidden sm:block text-sm font-semibold text-amber-600 hover:text-amber-500'
          >
            View more<span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>

        <div className='mt-8 relative'>
          <div className='relative w-full overflow-x-auto'>
            <ul
              role='list'
              className='mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8'
            >
              {trendingProducts.map((product) => (
                <li
                  key={product.id}
                  className='w-64 inline-flex flex-col text-center lg:w-auto'
                >
                  <div className='group relative'>
                    <div className='w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className='w-full h-full object-center object-cover group-hover:opacity-75'
                      />
                    </div>
                    <div className='mt-6'>
                      <p className='text-sm text-gray-500'>{product.color}</p>
                      <h3 className='mt-1 font-semibold text-gray-900'>
                        <a href={product.href}>
                          <span className='absolute inset-0' />
                          {product.name}
                        </a>
                      </h3>
                      <p className='mt-1 text-gray-900'>{product.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-12 px-4 sm:hidden'>
          <a
            href='#'
            className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'
          >
            See everything<span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
