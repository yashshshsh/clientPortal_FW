import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SelectState from './Context/SelectState';
import AppWithRouter from './Configurations/AppWithRouter';

function App() {
  return (
    <SelectState>
      <Router>
        <ToastContainer autoClose={3000} position="top-right" />
        <AppWithRouter />
      </Router>
    </SelectState>
  );
}

export default App; 