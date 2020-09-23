import React from 'react';
import Search from './pages/search'
import Header from './components/header'
import Login from './pages/login'
import Product from './pages/product'

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Search />
      </BrowserRouter>
      
      <GlobalStyle />
    </>

  );
}

export default App;
