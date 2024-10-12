import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/Navbar/NavBar";
import Contact from "./Pages/Contact/Contact";
import Features from "./Pages/Features/Features";
import LandingPage from "./Pages/Landing Page/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Pages/Map/Map";
import Disclaimer from "./Components/Disclaimer/Disclaimer";

const App = () => {
  return (
    <div className='relative'>
      <BrowserRouter>
        <NavBar />
        <Disclaimer />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/features' element={<Features />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/map' element={<Map />} />
          <Route path='*' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer className='fixed bottom-0' />
    </div>
  );
};

export default App;
