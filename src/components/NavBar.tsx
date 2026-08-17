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
    name: 'Programs',
    onClick: scrollToSection('programs')
  }, {
    name: 'Hackathon',
    path: '/hackathon'
  }, {
    name: 'Sponsor',
    onClick: scrollToSection('sponsor')
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <nav className="sticky top-0 z-50 border-b-2 border-[#0b8fc5] bg-[#14314a] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/gear-logo.png" alt="Gear Up Foundation Logo" className="h-10 w-auto rounded-full bg-[#f4f0e7] p-1" />
              <span className="ml-3 text-base font-black text-white sm:text-lg">
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
                  className="text-[#d7edf5] hover:text-white px-1 pt-1 text-sm font-black transition-all duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${pathname === item.path ? 'text-white' : 'text-[#d7edf5] hover:text-white'} px-1 pt-1 text-sm font-black transition-all duration-200`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="https://hcb.hackclub.com/donations/start/gear-up-foundation"
              className="ml-4 inline-flex items-center gap-2 border-2 border-[#0b8fc5] bg-[#0b8fc5] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0879a7]"
            >
              <HeartHandshake className="h-4 w-4" />
              Donate
            </a>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 text-white hover:text-[#d7edf5] focus:outline-none">
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#14314a] border-t-2 border-[#0b8fc5]">
          {navItems.map(item =>
            item.path ? (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-base font-black text-[#d7edf5] hover:text-white"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={item.onClick}
                className="w-full text-left px-3 py-2 text-base font-black text-[#d7edf5] hover:text-white"
              >
                {item.name}
              </button>
            )
          )}
          <a href="https://hcb.hackclub.com/donations/start/gear-up-foundation" className="block w-full border-2 border-[#0b8fc5] bg-[#0b8fc5] px-4 py-3 text-center text-sm font-black text-white">
            Donate via HCB
          </a>
        </div>
      </div>
    </nav>;
};
export default NavBar;
