import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

import Login from './Login';
import Register from './Register';

import Countries from './Countries';

const About = lazy(() => import('./About'));

const RoutesPages: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="countries" element={<Countries />} />
    <Route
      path="about"
      element={
        <Suspense fallback={<Spin />}>
          <About />
        </Suspense>
      }
    />
  </Routes>
);

export default RoutesPages;
