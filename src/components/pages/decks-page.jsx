import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const DecksPage = () => {
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    const ref = collection(db, 'decks');
    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDecks(results);
    });
  }, []);

  return (
    <div className='bg-white'>
      <div className='py-16 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
          Skateboard Decks
        </h1>
      </div>
      <div className='max-w-2xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {decks?.length &&
            decks.map((deck) => (
              <a key={deck.id} href={deck.href} className='group'>
                <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
                  <img
                    src={deck.imageSrc}
                    alt={deck.name}
                    className='w-full h-full object-center object-cover group-hover:opacity-75'
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700 capitalize'>
                  {deck.name}
                </h3>
                <p className='mt-1 text-lg font-medium text-gray-900'>
                  ${deck.price}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DecksPage;
