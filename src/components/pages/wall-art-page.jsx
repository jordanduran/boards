const products = [
  {
    id: 1,
    name: 'Cupid Deck',
    href: '#',
    price: '$50',
    imageSrc: 'https://i.ibb.co/TcgX5nB/RODRIGUEZ-CUPID-1344x1344.png',
    imageAlt: 'Skateboard with cupid on the design.',
  },
  {
    id: 2,
    name: 'Fluorescent Deck',
    href: '#',
    price: '$50',
    imageSrc: 'https://i.ibb.co/CtJMzW1/SILVAS-DECK-GREY-1408x1408.png',
    imageAlt: 'Skateboard with face on the design.',
  },
  {
    id: 3,
    name: 'Mystic Deck',
    href: '#',
    price: '$50',
    imageSrc: 'https://i.ibb.co/MP14LTV/HAMILTON-DECK-1408x1408.png',
    imageAlt: 'Skateboard with cactus on the design.',
  },
  {
    id: 4,
    name: 'Home Deck',
    href: '#',
    price: '$50',
    imageSrc: 'https://i.ibb.co/HPKtNvJ/PS22-W0043-HOMETEAM-1408x1408.png',
    imageAlt: 'Skateboard with Earth on the design.',
  },
  {
    id: 5,
    name: 'Demo Deck',
    href: '#',
    price: '$50',
    imageSrc: 'https://i.ibb.co/xsCdg9c/MCCLUNG-2100x2100.png',
    imageAlt: 'Skateboard with sunflower on the design.',
  },
  {
    id: 6,
    name: 'Eyes Deck',
    href: '#',
    price: '$50',
    imageSrc:
      'https://i.ibb.co/k9Yr2h1/PS21-W0012-NEALEYES-2700x2700.png" alt="PS21-W0012-NEALEYES-2700x2700.png',
    imageAlt: 'Skateboard with eyes on the design.',
  },
  {
    id: 7,
    name: 'Abyss Deck',
    href: '#',
    price: '$50',
    imageSrc:
      'https://i.ibb.co/LYX8FvK/PS22-W0010-DESARMOABYSSDECK-1500x1500.png" alt="PS22-W0010-DESARMOABYSSDECK-1500x1500.png',
    imageAlt: 'Skateboard with abyss on the design.',
  },
  {
    id: 8,
    name: 'BlueBell Deck',
    href: '#',
    price: '$50',
    imageSrc:
      'https://i.ibb.co/KzQCcGk/PS22-W0040-SILVASBLUEBELL-1500x1500.png',
    imageAlt: 'Skateboard with Earth on the design.',
  },
];

const WallArtPage = () => {
  return (
    <div className='bg-white'>
      <div className='py-16 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
          Wall Art
        </h1>
      </div>
      <div className='max-w-2xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <a key={product.id} href={product.href} className='group'>
              <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className='w-full h-full object-center object-cover group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>{product.name}</h3>
              <p className='mt-1 text-lg font-medium text-gray-900'>
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallArtPage;
