import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut, auth } from "../utils/firebase";

import Logo from "./HeaderParts/Logo";
import DesktopNavigation from "./HeaderParts/DesktopNavigation";
import UserDropdown from "./HeaderParts/UserDropdown";
import MobileNavigation from "./HeaderParts/MobileNavigation";

const Header = ({ user }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClickOutside = () => setShowDropdown(false);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/10 backdrop-blur-lg py-4" 
          : "bg-black/10 backdrop-blur-lg py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />

        {user && (
          <DesktopNavigation 
            navigationLinks={navigationLinks} 
            onNavigate={handleNavigate} 
          />
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden text-white p-2 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <UserDropdown
                user={user}
                showDropdown={showDropdown}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
                onDropdownClose={() => setShowDropdown(!showDropdown)}
              />
            </>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <MobileNavigation 
        isOpen={isMenuOpen}
        navigationLinks={navigationLinks}
        onNavigate={handleNavigate}
      />
    </header>
  );
};

export default Header;