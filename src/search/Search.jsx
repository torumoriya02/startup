import React, { useState } from 'react';

const sitters = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Chicago, IL',
    rating: 4.9,
    reviews: 24,
    price: 22,
    distance: '0.8 miles away',
    experience: 6,
    tags: ['CPR Certified', 'First Aid', 'Non-smoker'],
    bio: 'Experienced preschool teacher looking for weekend sitting.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Chicago, IL',
    rating: 4.8,
    reviews: 15,
    price: 18,
    distance: '1.2 miles away',
    experience: 4,
    tags: ['Has Car', 'Homework Help', 'Toddlers'],
    bio: 'College student with 4 years of experience with all ages.',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    location: 'Provo, UT',
    rating: 5.0,
    reviews: 42,
    price: 25,
    distance: '2.5 miles away',
    experience: 10,
    tags: ['Bilingual', 'Infant Care', 'Cooks'],
    bio: 'Professional nanny with 10+ years experience.',
  },
  {
    id: 4,
    name: 'Jessica Taylor',
    location: 'Provo, UT',
    rating: 4.7,
    reviews: 8,
    price: 20,
    distance: '3.1 miles away',
    experience: 3,
    tags: ['Pet Friendly', 'Arts & Crafts'],
    bio: 'Energetic caregiver who loves outdoor activities.',
  },
];

export default function Search() {
  const [experience, setExperience] = useState('any');
  const [sortOrder, setSortOrder] = useState('recommended');
  const [appliedExperience, setAppliedExperience] = useState('any');

  const [selectedSitter, setSelectedSitter] = useState(null);
  const [message, setMessage] = useState('');

  const [location, setLocation] = useState('Chicago, IL');
  const [appliedLocation, setAppliedLocation] = useState('Chicago, IL');

  const [date, setDate] = useState(
    new Date().toLocaleDateString('en-CA')
  );

  const [appliedDate, setAppliedDate] = useState(date);

  // Filter babysitters by experience and location.
  let results = sitters.filter((sitter) => {
    const matchesExperience =
      appliedExperience === 'any' ||
      sitter.experience >= Number(appliedExperience);

    const matchesLocation =
      sitter.location.toLowerCase().includes(
        appliedLocation.trim().toLowerCase()
      );

    return matchesExperience && matchesLocation;
  });

  // Sort search results.
  if (sortOrder === 'price') {
    results = [...results].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortOrder === 'rating') {
    results = [...results].sort(
      (a, b) => b.rating - a.rating
    );
  }

  // Apply search filters.
  function handleSearch() {
    setAppliedExperience(experience);
    setAppliedLocation(location);
    setAppliedDate(date);
  }

  // Close booking modal.
  function closeModal() {
    setSelectedSitter(null);
    setMessage('');
  }

  // Mock booking request.
  function previewRequest() {
    alert('Demo only: No booking request was sent.');
    closeModal();
  }

  return (
    <>
      <main className="container content-section">
        <section className="search-section border shadow-sm">
          <h1>Find a babysitter near you</h1>

          <p className="text-muted mb-4">
            Explore sample babysitter profiles and compare their details.
          </p>

          <div className="search-grid">
            <div>
              <label htmlFor="location" className="form-label">
                Location
              </label>

              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Enter City"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="date" className="form-label">
                When?
              </label>

              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="experience" className="form-label">
                Experience
              </label>

              <select
                id="experience"
                className="form-select"
                value={experience}
                onChange={(event) =>
                  setExperience(event.target.value)
                }
              >
                <option value="any">Any Experience</option>
                <option value="2">2+ Years</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </section>

        <section aria-labelledby="results-count">
          <div className="results-header">
            <h2 id="results-count">
              Available Babysitters ({results.length})
            </h2>

            <select
              id="sort-order"
              className="form-select sort-select"
              aria-label="Sort babysitters"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value)
              }
            >
              <option value="recommended">
                Sort by: Recommended
              </option>

              <option value="price">
                Price: Low to High
              </option>

              <option value="rating">
                Highest Rated
              </option>
            </select>
          </div>

          <p className="text-muted">
            Searching in {appliedLocation || 'all locations'} for {appliedDate}
          </p>

          <p className="placeholder-note">
            Sample profiles for demonstration only.
            Availability and bookings are not real.
          </p>

          <div className="sitter-grid" id="sitter-list">
            {results.length === 0 ? (
              <p>
                No babysitters match your search.
                Try another location or experience level.
              </p>
            ) : (
              results.map((sitter) => (
                <article
                  key={sitter.id}
                  className="sitter-card card border-0 shadow-sm"
                >
                  <div className="sitter-card-header">
                    <div className="avatar">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="#b2bec3"
                        aria-hidden="true"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>

                  <div className="sitter-card-body">
                    <div className="name-row">
                      <h3 className="sitter-name">
                        {sitter.name}
                      </h3>

                      <span className="rating">
                        ★ {sitter.rating.toFixed(1)}
                      </span>
                    </div>

                    <p className="meta">
                      {sitter.location} • {sitter.distance}
                    </p>

                    <p className="meta">
                      {sitter.reviews} example reviews •{' '}
                      {sitter.experience} years of experience
                    </p>

                    <p className="sitter-bio">
                      {sitter.bio}
                    </p>

                    <div className="tags">
                      {sitter.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="price">
                      ${sitter.price}/hr
                    </div>

                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      type="button"
                      onClick={() => setSelectedSitter(sitter)}
                    >
                      Preview Booking
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {selectedSitter && (
        <div
          className="modal-overlay"
          role="presentation"
          style={{ display: 'flex' }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="booking-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-name"
          >
            <button
              className="close-modal"
              type="button"
              aria-label="Close booking request"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 id="modal-name">
              Request {selectedSitter.name}
            </h2>

            <p>Location: {selectedSitter.location}</p>

            <p>Date: {appliedDate}</p>

            <p>Rate: ${selectedSitter.price}/hr</p>

            <p className="mb-3">
              This is a demonstration booking request.
              No actual message will be sent.
            </p>

            <div className="mb-3">
              <label
                htmlFor="booking-message"
                className="form-label"
              >
                Message to Sitter
              </label>

              <textarea
                id="booking-message"
                className="form-control"
                rows={4}
                placeholder="Write your message here..."
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
              />
            </div>

            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={previewRequest}
            >
              Preview Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}
