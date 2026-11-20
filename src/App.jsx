import React, { useState, useEffect } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
} from 'react-router-dom';

import Home from './home/Home';
import Search from './search/Search';
import Messages from './messages/Messages';
import Profile from './profile/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

export default function App() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Check authentication when the application starts.
  useEffect(() => {
    fetch('/api/auth/me')
      .then(async (response) => {
        if (response.ok) {
          const user = await response.json();
          setUserName(user.email);
        } else if (response.status !== 401) {
          setAuthError('Unable to verify your session.');
        }
      })
      .catch(() => {
        setAuthError('Unable to connect to the server.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleLogin(name) {
    setUserName(name);
    setAuthError('');
  }

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUserName('');
      setAuthError('');
      localStorage.removeItem('userName');
    } catch {
      setAuthError('Unable to log out. Please try again.');
    }
  }

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <p>Loading NearbySitter...</p>
      </main>
    );
  }

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

          <NavLink to="/search">
            Find Babysitters
          </NavLink>

          {userName ? (
            <>
              <NavLink to="/messages">
                Messages
              </NavLink>

              <NavLink to="/profile">
                Profile
              </NavLink>

              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/#login">Login</Link>
          )}
        </nav>
      </header>

      {authError && (
        <div className="alert alert-danger m-3" role="alert">
          {authError}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              userName={userName}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />

        <Route
          path="/search"
          element={<Search userName={userName} />}
        />

        <Route
          path="/messages"
          element={
            userName ? (
              <Messages key={userName} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            userName ? (
              <Profile key={userName} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
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
