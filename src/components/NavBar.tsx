import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Our Impact',
    path: '/impact'
  }, {
    name: 'Our Progress',
    path: '/progress'
  }, {
    name: 'Our Team',
    path: '/team'
  }, {
    name: 'Rate Us!',
    path: '/rate-us'
  }];
  return <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/transparentGear.png" alt="Gear Up Robotics Logo" className="h-10 w-auto" />
              <span className="ml-3 text-lg font-bold text-gray-900">
                Gear-Up Robotics
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`${pathname === item.path ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600'} px-1 pt-1 text-sm font-medium transition-all duration-200`}>
                {item.name}
              </Link>)}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none">
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map(item => <Link key={item.name} to={item.path} className={`${pathname === item.path ? 'bg-red-50 text-red-600 border-l-4 border-red-600' : 'text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-l-4 hover:border-red-600'} block pl-3 pr-4 py-2 text-base font-medium transition-all duration-200`}>
              {item.name}
            </Link>)}
        </div>
      </div>
    </nav>;
};
export default NavBar;