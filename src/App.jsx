import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Scroll } from './components/Scroll';
import { NewsProvider } from './NewsProvider';

const App = () => {
  const location = useLocation();
  const { pathname, search } = location;

  return (
    <NewsProvider>
      <div className="App" id={`${pathname}${search}`}>
        <div className="App-Container" id={`${pathname}${search}`}>
          <Header />
          <Main />
        </div>
        <Footer />
        <Scroll />
      </div>
    </NewsProvider>
  );
};

export default App;
