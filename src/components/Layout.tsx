import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
const Layout = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    const targetSection = sessionStorage.getItem('scrollToSection');
    if (pathname === '/' && targetSection) {
      sessionStorage.removeItem('scrollToSection');
      window.setTimeout(() => {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-grow">
        <div className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>;
};
export default Layout;
