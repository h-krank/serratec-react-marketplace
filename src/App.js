import React from 'react';
import Header from './components/header'
import Routes from './Routes'

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
      
      <GlobalStyle />
    </>

  );
}

export default App;
