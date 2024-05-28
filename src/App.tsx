import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login/';
import HomePage from './pages/Home/';
import UsersPage from './pages/Users/';
import EventsPage from './pages/Events';
import SeeEventPage from './pages/Events/SeeEvent';

import './App.css';

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<SeeEventPage />} /> {/* Corrigir o caminho da rota */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
