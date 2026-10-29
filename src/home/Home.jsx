
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const handleLogin = (event) => {
    event.preventDefault();
    alert('Login will be available in a future update.');
  };

  const handleCreateAccount = () => {
    alert('Account registration will be available soon.');
  };

  return (
    <main>
      <section className="hero">
        <h1>Find a trusted babysitter near you</h1>
        <p>
          Discover local babysitters, explore their experience,
          compare hourly rates, and find the right match
          for your family's needs.
        </p>

        <Link className="btn btn-light" to="/search">
          Find a Babysitter
        </Link>
      </section>

      <section className="container content-section">
        <h2 className="section-title">How NearbySitter Works</h2>

        <div className="feature-grid">
          <article className="feature-card border shadow-sm">
            <div className="feature-icon" aria-hidden="true">📍</div>
            <h3>Search Nearby</h3>
            <p>
              Browse babysitters in your area and explore
              their profiles, experience, and availability.
            </p>
          </article>

          <article className="feature-card border shadow-sm">
            <div className="feature-icon" aria-hidden="true">⭐</div>
            <h3>Compare Sitters</h3>
            <p>
              Review sitter details, hourly rates, and
              example ratings to find a good match.
            </p>
          </article>

          <article className="feature-card border shadow-sm">
            <div className="feature-icon" aria-hidden="true">💬</div>
            <h3>Connect Easily</h3>
            <p>
              Send babysitting requests and communicate
              with sitters when messaging is available.
            </p>
          </article>
        </div>
      </section>

      <section className="container content-section" id="login">
        <div className="login-section border shadow-sm">
          <h2>Welcome Back!</h2>

          <form id="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="login-buttons">
              <button className="btn btn-primary" type="submit">
                Login
              </button>

              <button
                className="btn btn-outline-primary"
                type="button"
                id="create-account"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="placeholder-note">
            Demo only: login and registration will be
            connected to the backend in a future deliverable.
          </p>

          <p className="placeholder-note">
            User status: Not logged in
          </p>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to find your next babysitter?</h2>
        <p>
          Explore available sitters and find someone
          who fits your needs.
        </p>

        <Link to="/search" className="btn btn-primary">
          Browse Babysitters
        </Link>
      </section>
    </main>
  );
}
