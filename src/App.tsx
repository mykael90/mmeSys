import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import RoutesPages from './routes';
import './App.scss';
import Header from './components/shareds/Header';

const App = () => (
  <>
    <Header />

    {/* <div style={{ minHeight: 'calc(100vh - 66px - 186px)' }}> */}
    <RoutesPages />
    {/* </div> */}
    {/* <Footer /> */}
  </>
);

export default App;
