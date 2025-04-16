import React from 'react';

const BOSCH_LOGO = "Bosch-logo-simple.svg";

export const NavigationBar = () => {
  return (
    <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
      <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
      <nav className="space-x-6 font-medium">
        <a href="#" className="text-gray-700 hover:text-black">Products</a>
        <a href="#" className="text-gray-700 hover:text-black">Technology</a>
        <a href="#" className="text-gray-700 hover:text-black">Support</a>
      </nav>
    </header>
  );
};

export default NavigationBar;
