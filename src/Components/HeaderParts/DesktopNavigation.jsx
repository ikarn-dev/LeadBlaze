import React, { useState } from 'react';
import NavigationLink from './NavigationLink';

const DesktopNavigation = ({ navigationLinks, onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (itemName) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClick = (item, dropdownItem = null) => {
    if (dropdownItem) {
      onNavigate(dropdownItem.path);
    } else if (!item.dropdown) {
      onNavigate(item.path);
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navigationLinks.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <NavigationLink
            name={item.name}
            onClick={() => handleClick(item)}
            className={`cursor-pointer hover:text-orange-500 ${
              activeDropdown === item.name ? 'text-orange-500' : ''
            }`}
          />
          {item.dropdown && (
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700 transition-all duration-200 ${
                activeDropdown === item.name 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-2">
                {item.dropdown.map((dropdownItem) => (
                  <button
                    key={dropdownItem.name}
                    onClick={() => handleClick(item, dropdownItem)}
                    className="w-full px-4 py-2 text-left text-white hover:text-orange-500 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                  >
                    {dropdownItem.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;