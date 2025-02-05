import { Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import About from "../Components/About";  // Import About component
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Footer from "../Components/Footer";
import Features from "../Components/Features";

const MainLayout = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header user={user} />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <About />
              <Features/>
              <Footer />
            </>
          } 
        />
        <Route 
          path="/about"  // Add About route
          element={
            <>
              <About />
              <Footer />
            </>
          } 
        />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
