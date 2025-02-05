// NavigationLink.jsx
import React from 'react';

const NavigationLink = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-200 hover:text-white relative group transition-colors duration-200"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
    </button>
  );
};

export default NavigationLink;