import Hero from '../landing/hero';
import TrendingProducts from '../landing/trending-products';
import FeaturedArt from '../landing/featured-art';
import Testimonials from '../landing/testimonials';

const LandingPage = () => {
  return (
    <div className='bg-white'>
      <main>
        <Hero />
        <TrendingProducts />
        <FeaturedArt />
        <Testimonials />
      </main>
    </div>
  );
};

export default LandingPage;
