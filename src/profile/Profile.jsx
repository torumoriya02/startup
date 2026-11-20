import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch('/api/profile', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(response.status === 401
            ? 'Your session expired. Log in again to view your profile.'
            : 'Unable to load your profile.');
        }
        setProfile(await response.json());
      } catch (error) {
        if (!controller.signal.aborted) setLoadError(error.message);
      }
    }

    loadProfile();
    return () => controller.abort();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  }

  async function saveProfile(event) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setSaved(false);
    setSaveError('');
    const { name, location, bio } = profile;
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), location: location.trim(), bio: bio.trim() }),
      });
      if (response.status === 401) {
        setSaveError('Your session expired. Log in again to save your profile.');
        return;
      }
      if (!response.ok) throw new Error();

      setProfile(await response.json());
      setSaved(true);
    } catch {
      setSaveError('Unable to save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="container content-section">
      <h1 className="section-title">My Profile</h1>

      {loadError && <p role="alert">{loadError}</p>}
      {!profile && !loadError && <p role="status">Loading your profile…</p>}

      {profile && (
        <section className="border rounded shadow-sm p-4">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <img src="/placeholder.png" alt="" width="200" className="img-fluid rounded" />
            </div>

            <div className="col-md-8">
              <p>{profile.email}</p>

              <form onSubmit={saveProfile}>
                <fieldset disabled={saving}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="profile-name">Name</label>
                    <input id="profile-name" name="name" className="form-control" value={profile.name} onChange={updateField} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="profile-location">Location</label>
                    <input id="profile-location" name="location" className="form-control" value={profile.location} onChange={updateField} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="profile-bio">About me</label>
                    <textarea id="profile-bio" name="bio" className="form-control" rows={4} value={profile.bio} onChange={updateField} />
                  </div>

                  <button className="btn btn-primary" type="submit">
                    {saving ? 'Saving…' : 'Save Profile'}
                  </button>
                </fieldset>

                {saveError && <p className="mt-3" role="alert">{saveError}</p>}
                {saved && <p className="mt-3" role="status">Profile saved.</p>}
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
