import React from 'react';
import {HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
