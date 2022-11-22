import React, { PropsWithChildren } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="min-h-fit bg-white">
        <Header />
      </header>
      <main className="flex-1 bg-gray-100">{children}</main>
      <footer className="min-h-fit bg-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
