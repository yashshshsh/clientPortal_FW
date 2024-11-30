import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import routesConfig from './routesConfig';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AppWithRouter = () => {
  const location = useLocation();

  return (
    <>
      {routesConfig.some(route => route.path === location.pathname && route.navbarVisible) && <Navbar />}

      <Routes>
        {routesConfig.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
};

export default AppWithRouter;