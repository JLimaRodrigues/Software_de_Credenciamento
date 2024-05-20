import React from 'react';
import {HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import UsersPage from './pages/Users/UsersPage';

import './App.css';

function App() {
  return (
    <div className='App'>
      <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
