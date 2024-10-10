import Contact from "./Pages/Contact/Contact";
import Features from "./Pages/Features/Features";
import LandingPage from "./Pages/Landing Page/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/features' element={<Features />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path="/map" element={<Map />} /> */}
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
