
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';

import Home from './home/Home';
import Search from './search/Search';
import Messages from './messages/Messages';
import Profile from './profile/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <Link className="logo" to="/">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          NearbySitter
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Find Babysitters</NavLink>
          <NavLink to="/messages">Messages</NavLink>
          <Link to="/#login">Login</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <footer className="site-footer">
        <p>Created by Toru Moriya</p>
        <p>
          <a
            href="https://github.com/torumoriya02/startup"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </p>
        <p>&copy; 2026 NearbySitter</p>
      </footer>
    </BrowserRouter>
  );
}
