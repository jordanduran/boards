import '@stripe/react-stripe-js';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import LandingPage from './components/pages/landing-page';
import CartPage from './components/pages/cart-page';
import CheckoutShippingPage from './components/pages/checkout-shipping-page';
import SignUpPage from './components/pages/sign-up-page';
import SignInPage from './components/pages/sign-in-page';
import DecksPage from './components/pages/decks-page';
import DeckProductPage from './components/pages/deck-product-page';
import TrucksPage from './components/pages/trucks-page';
import TruckProductPage from './components/pages/truck-product-page';
import WheelsPage from './components/pages/wheels-page';
import WheelProductPage from './components/pages/wheel-product-page';
import CompleteSkateboardsPage from './components/pages/complete-skateboards-page';
import CompleteSkateboardProductPage from './components/pages/complete-skateboard-product-page';
import NewArrivalsPage from './components/pages/new-arrivals-page';
import WallArtPage from './components/pages/wall-art-page';
import CheckoutSuccessfulPage from './components/pages/checkout-successful-page';
import CheckoutCancelPage from './components/pages/checkout-cancel-page';
import Footer from './components/layout/footer';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout/shipping' element={<CheckoutShippingPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/decks' element={<DecksPage />} />
        <Route path='/decks/:id/:name' element={<DeckProductPage />} />
        <Route path='/trucks' element={<TrucksPage />} />
        <Route path='/trucks/:id/:name' element={<TruckProductPage />} />
        <Route path='/wheels' element={<WheelsPage />} />
        <Route path='/wheels/:id/:name' element={<WheelProductPage />} />
        <Route path='/new-arrivals' element={<NewArrivalsPage />} />
        <Route path='/wall-art' element={<WallArtPage />} />
        <Route path='/success' element={<CheckoutSuccessfulPage />} />
        <Route path='/cancel' element={<CheckoutCancelPage />} />
        <Route
          path='/complete-skateboards'
          element={<CompleteSkateboardsPage />}
        />
        <Route
          path='/complete/:id/:name'
          element={<CompleteSkateboardProductPage />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
