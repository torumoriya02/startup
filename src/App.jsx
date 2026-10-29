
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Home from './home/Home';
import Search from './search/Search';
import Messages from './messages/Messages';
import Profile from './profile/Profile';

import './main.css';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          {' | '}
          <NavLink to="/search">Find Babysitters</NavLink>
          {' | '}
          <NavLink to="/messages">Messages</NavLink>
          {' | '}
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <footer>
        <p>
          NearbySitter |{' '}
          <a href="https://github.com/torumoriya02/startup">
            GitHub
          </a>
        </p>
      </footer>
    </BrowserRouter>
  );
}
