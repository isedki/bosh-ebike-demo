import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-sm py-6 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Bosch eBike Systems. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
