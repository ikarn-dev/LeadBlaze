import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MobileNavigation = ({ isOpen, navigationLinks, onNavigate }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleDropdown = (itemName) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  const handleClick = (item, dropdownItem = null) => {
    if (dropdownItem) {
      onNavigate(dropdownItem.path);
    } else if (!item.dropdown) {
      onNavigate(item.path);
    }
  };

  return (
    <div
      className={`md:hidden fixed inset-x-0 top-16 bg-black/90 backdrop-blur-lg transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
        {navigationLinks.map((item) => (
          <div key={item.name} className="flex flex-col">
            <button
              onClick={() => {
                if (item.dropdown) {
                  toggleDropdown(item.name);
                } else {
                  handleClick(item);
                }
              }}
              className="flex items-center justify-between text-white hover:text-orange-500 text-lg font-medium transition-colors duration-200"
            >
              {item.name}
              {item.dropdown && (
                expandedItem === item.name ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {item.dropdown && expandedItem === item.name && (
              <div className="mt-2 ml-4 flex flex-col gap-2">
                {item.dropdown.map((dropdownItem) => (
                  <button
                    key={dropdownItem.name}
                    onClick={() => handleClick(item, dropdownItem)}
                    className="text-white hover:text-orange-500 text-base transition-colors duration-200"
                  >
                    {dropdownItem.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavigation;