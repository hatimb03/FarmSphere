import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/Navbar/NavBar";
import Contact from "./Pages/Contact/Contact";
import Features from "./Pages/Features/Features";
import LandingPage from "./Pages/Landing Page/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Pages/Map/Map";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/features' element={<Features />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/map' element={<Map />} />
          <Route path='*' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
