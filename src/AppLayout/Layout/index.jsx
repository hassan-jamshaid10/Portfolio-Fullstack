import React from 'react';
import Header from '../../Components/Header/index';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Page Content */}
      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
