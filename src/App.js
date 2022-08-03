import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import LandingPage from './components/pages/landing-page';
import SignUp from './components/pages/sign-up';
import SignIn from './components/pages/sign-in';
import Footer from './components/layout/footer';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
