import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home({
  userName,
  onLogin,
  onLogout,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [quote, setQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  // Third-party API
  useEffect(() => {
    fetch('https://quote.cs260.click')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load quote');
        }

        return response.json();
      })
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch(() => {
        setQuote('Inspirational quote unavailable.');
        setQuoteAuthor('');
      });
  }, []);

  // Login or create an account using the backend.
  async function loginOrCreate(endpoint) {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.email);

        setEmail('');
        setPassword('');
        setError('');
      } else {
        setError(data.msg || 'Authentication failed.');
      }
    } catch {
      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginOrCreate('/api/auth/login');
  }

  function handleCreateAccount() {
    loginOrCreate('/api/auth/create');
  }

  return (
    <main className="container py-5">

      {/* Home page introduction */}
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

      {/* Authentication section */}
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
              type="button"
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
                  disabled={loading}
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
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <p className="text-danger" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
              >
                {loading ? 'Please wait...' : 'Login'}
              </button>

              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={handleCreateAccount}
                disabled={loading}
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </section>

      {/* Third-party quote API */}
      <section className="text-center py-5">
        <h2>Daily Inspiration</h2>

        <blockquote className="blockquote">
          <p>
            {quote || 'Loading inspirational quote...'}
          </p>

          {quoteAuthor && (
            <footer className="blockquote-footer">
              {quoteAuthor}
            </footer>
          )}
        </blockquote>
      </section>

      <section className="text-center">
        <a
          href="https://github.com/torumoriya02/startup"
          target="_blank"
          rel="noopener noreferrer"
        >
          View NearbySitter on GitHub
        </a>
      </section>

    </main>
  );
}
