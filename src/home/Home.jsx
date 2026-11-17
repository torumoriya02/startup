import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home({
  userName,
  onLogin,
  onLogout,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // Mock authentication.
    // This will be replaced with a backend service.
    onLogin(email.trim());

    setEmail('');
    setPassword('');
    setError('');
  }

  return (
    <main className="container py-5">
      <section className="text-center py-5">
        <h1>Find Trusted Babysitters Near You</h1>

        <p>
          Connect with local babysitters and find
          the right care for your family.
        </p>

        <Link
          to="/search"
          className="btn btn-primary"
        >
          Find Babysitters
        </Link>
      </section>

      <section
        id="login"
        className="card mx-auto p-4"
        style={{ maxWidth: '450px' }}
      >
        {userName ? (
          <div className="text-center">
            <h2>Welcome!</h2>

            <p>{userName}</p>

            <Link
              to="/profile"
              className="btn btn-primary m-2"
            >
              My Profile
            </Link>

            <Link
              to="/messages"
              className="btn btn-outline-primary m-2"
            >
              Messages
            </Link>

            <button
              className="btn btn-danger m-2"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center">
              Login
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </div>

              {error && (
                <p className="text-danger">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
              >
                Login
              </button>

              <button
                type="submit"
                className="btn btn-outline-primary w-100"
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}