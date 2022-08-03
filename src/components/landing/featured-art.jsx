const collections = [
  {
    id: 1,
    name: 'YFOSART',
    description: `Keith Haring Single Skateboard Art Haring Pop Art`,
    imageSrc: 'https://i.ibb.co/5kWQkCt/il-1588x-N-3971370353-b5xo.png',
    imageAlt: 'Skateboard with heart on design.',
    href: '#',
  },
  {
    id: 2,
    name: 'YFOSART',
    description: 'Andy Warhol Campbells Soup Skateboard Pop Art',
    imageSrc: 'https://i.ibb.co/XLMsYXZ/il-1588x-N-3923888052-k5d1.png',
    imageAlt: `Skateboard with Campbell's soup`,
    href: '#',
  },
  {
    id: 3,
    name: 'YFOSART',
    description: 'Keith Haring The Blueprint drawings 6 1990 Skateboard Art',
    imageSrc: 'https://i.ibb.co/86Y4b7F/il-1588x-N-3971556963-ldaq.png',
    imageAlt: 'Skateboard with people on design.',
    href: '#',
  },
];

const FeaturedArt = () => {
  return (
    <section aria-labelledby='collections-heading' className='bg-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none'>
          <h2
            id='collections-heading'
            className='text-2xl font-extrabold text-gray-900'
          >
            Featured Wall Art
          </h2>

          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6'>
            {collections.map((collection) => (
              <div key={collection.id} className='group relative'>
                <div className='relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                  <img
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className='w-full h-full object-center object-cover'
                  />
                </div>
                <h3 className='mt-6 text-sm text-gray-500'>
                  <a href={collection.href}>
                    <span className='absolute inset-0' />
                    {collection.name}
                  </a>
                </h3>
                <p className='text-base font-semibold text-gray-900'>
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArt;
