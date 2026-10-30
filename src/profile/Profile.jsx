
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <main className="container content-section">
      <h2 className="section-title">Babysitter Profile</h2>

      <section className="border rounded shadow-sm p-4">
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <img
              src="/placeholder.png"
              alt="Babysitter profile picture"
              width="200"
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-8">
            <h3>Emma</h3>

            {/* Database data placeholder */}
            <p>Location: Provo, UT</p>
            <p>Rate: $18/hour</p>
            <p>Rating: 5/5</p>
            <p>Experience: 3 years</p>

            <h3>About Me</h3>
            <p>
              Hi! I'm Emma. I enjoy working with children and
              helping families when they need a babysitter.
            </p>

            <h3>Availability</h3>
            <p>Monday - Friday: 5 PM - 10 PM</p>
            <p>Saturday: Available all day</p>

            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => navigate('/messages')}
            >
              Contact Emma
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
