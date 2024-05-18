import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
