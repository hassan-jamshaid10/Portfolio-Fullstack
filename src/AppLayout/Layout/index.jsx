import React from 'react';
import Header from '../../Components/Header/index';
import LandingPage from '../../Components/LandingPage/index';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16"> {/* Add padding to prevent overlap with the header */}
        <LandingPage />
      </main>
    </div>
  );
};

export default Layout;
