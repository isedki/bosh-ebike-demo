import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          <div className="max-w-sm">
            <h3 className="text-lg font-semibold mb-4">About Bosch eBike</h3>
            <p className="text-gray-400 text-sm">
              A leader in eBike innovation and technology, delivering premium drive systems for the future of mobility.
            </p>
          </div>
          <div className="md:pl-8">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dealers</a></li>
            </ul>
          </div>
          <div className="md:pl-8">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Bosch eBike Systems. All rights reserved.
            </div>
            <div></div>
            <div className="flex justify-end space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
