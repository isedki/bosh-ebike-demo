import React from 'react';

const BOSCH_LOGO = "Bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";

export const NavigationBar = () => {
  return (
    <header className="p-6 flex items-center justify-between max-w-screen-2xl mx-auto">
      <img src={SUPERGRAPHIC} alt="Bosch Supergraphic" className="h-2 w-full absolute top-0 left-0 " />
      <div className="flex items-center space-x-4 max-w-[150px]">
        <a href="/">
          <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
        </a>


      </div>
      <nav className="space-x-6 font-medium">
        <a href="#" className="text-gray-700 hover:text-black">Products</a>
        <a href="#" className="text-gray-700 hover:text-black">Technology</a>
      </nav>
    </header>
  );
};

export default NavigationBar;
