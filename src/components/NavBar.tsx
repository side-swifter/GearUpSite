import { useEffect, useState, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartHandshake, MenuIcon, XIcon } from 'lucide-react';

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
  const scrollToSection = (sectionId: string) => (e: MouseEvent) => {
    e.preventDefault();
    
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      sessionStorage.setItem('scrollToSection', sectionId);
      window.location.href = '/';
    }
  };

  const navItems: NavItem[] = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Programs',
    onClick: scrollToSection('programs')
  }, {
    name: 'Hackathon',
    onClick: scrollToSection('hackathon')
  }, {
    name: 'Sponsor',
    onClick: scrollToSection('sponsor')
  }, {
    name: 'Impact',
    onClick: scrollToSection('impact')
  }, {
    name: 'Team',
    path: '/team'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/gear-logo.png" alt="Gear Up Foundation Logo" className="h-10 w-auto" />
              <span className="ml-3 text-base font-semibold text-slate-950 sm:text-lg">
                Gear Up Foundation
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map(item => (
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="text-slate-600 hover:text-slate-950 px-1 pt-1 text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`${pathname === item.path ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'} px-1 pt-1 text-sm font-medium transition-all duration-200`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="https://hcb.hackclub.com/donations/start/gear-up-foundation"
              className="ml-4 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <HeartHandshake className="h-4 w-4 text-cyan-300" />
              Donate
            </a>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-950 focus:outline-none">
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map(item => 
            item.path ? (
              <Link 
                key={item.name} 
                to={item.path} 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={item.onClick}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50"
              >
                {item.name}
              </button>
            )
          )}
          <a href="https://hcb.hackclub.com/donations/start/gear-up-foundation" className="block w-full rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">
            Donate via HCB
          </a>
        </div>
      </div>
    </nav>;
};
export default NavBar;
