import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import LandingPage from './components/pages/landing-page';
import SignUpPage from './components/pages/sign-up-page';
import SignInPage from './components/pages/sign-in-page';
import DecksPage from './components/pages/decks-page';
import TrucksPage from './components/pages/trucks-page';
import WheelsPage from './components/pages/wheels-page';
import CompleteSkateboardsPage from './components/pages/complete-skateboards-page';
import NewArrivalsPage from './components/pages/new-arrivals-page';
import WallArtPage from './components/pages/wall-art-page';
import Footer from './components/layout/footer';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/decks' element={<DecksPage />} />
        <Route path='/trucks' element={<TrucksPage />} />
        <Route path='/wheels' element={<WheelsPage />} />
        <Route path='/new-arrivals' element={<NewArrivalsPage />} />
        <Route path='/wall-art' element={<WallArtPage />} />
        <Route
          path='/complete-skateboards'
          element={<CompleteSkateboardsPage />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
