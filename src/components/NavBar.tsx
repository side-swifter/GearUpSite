import { useEffect, useState, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';

type NavItem = {
  name: string;
} & (
  | { path: string; onClick?: never }
  | { path?: never; onClick: (e: MouseEvent) => void }
);
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const scrollToGoals = (e: MouseEvent) => {
    e.preventDefault();
    
    if (pathname === '/') {
      // If already on home page, just scroll to the section
      const goalsSection = document.getElementById('goals');
      if (goalsSection) {
        goalsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, use Link to navigate and then scroll
      // We'll use sessionStorage to trigger the scroll after navigation
      sessionStorage.setItem('scrollToGoals', 'true');
      window.location.href = '/';
    }
  };

  const navItems: NavItem[] = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Our Goals',
    onClick: scrollToGoals
  }, {
    name: 'Our Team',
    path: '/team'
  }, {
    name: 'Rate Us!',
    path: '/rate-us'
  }, {
    name: 'Contact Us',
    path: '/contact'
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
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600 px-1 pt-1 text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`${pathname === item.path ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600'} px-1 pt-1 text-sm font-medium transition-all duration-200`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link 
              to="/signup" 
              className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Sign Up for Classes
            </Link>
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map(item => 
            item.path ? (
              <Link 
                key={item.name} 
                to={item.path} 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={item.onClick}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                {item.name}
              </button>
            )
          )}
          <Link to="/signup" className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
            Sign Up for Classes
          </Link>
        </div>
      </div>
    </nav>;
};
export default NavBar;