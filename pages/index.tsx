import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="min-h-fit bg-white">
        <Header />
      </header>
      <main className="flex-1 bg-gray-100">
        <Main />
      </main>
      <footer className="min-h-fit bg-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
