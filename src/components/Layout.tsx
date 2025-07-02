import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
const Layout = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
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