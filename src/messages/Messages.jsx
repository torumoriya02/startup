import React, { useState, useEffect } from 'react';

export default function Messages() {
  const [sitters, setSitters] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [sendError, setSendError] = useState('');
  const [sending, setSending] = useState(false);
  const selectedSitter = sitters.find((sitter) => sitter.id === selectedId) ?? sitters[0];

  useEffect(() => {
    const controller = new AbortController();

    async function loadSitters() {
      try {
        const response = await fetch('/api/sitters', { signal: controller.signal });
        if (!response.ok) throw new Error();
        setSitters(await response.json());
      } catch {
        if (!controller.signal.aborted) setLoadError('Unable to load babysitters.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    let timeout;
    async function loadMessages() {
      try {
        const response = await fetch('/api/messages', { signal: controller.signal });
        if (response.status === 401) {
          setMessageError('Your session expired. Log in again to see your messages.');
          return;
        }
        if (!response.ok) throw new Error();
        const history = await response.json();
        setMessages((previous) => {
          const knownIds = new Set(history.map((item) => item.id));
          return [...history, ...previous.filter((item) => !knownIds.has(item.id))];
        });
        setMessageError('');
      } catch {
        if (!controller.signal.aborted) setMessageError('Unable to load messages.');
      }

      if (!controller.signal.aborted) timeout = setTimeout(loadMessages, 3000);
    }

    loadSitters();
    loadMessages();
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSend(event) {
    event.preventDefault();
    const text = message.trim();
    if (!selectedSitter || !text || sending) return;

    setSending(true);
    setSendError('');
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sitterId: selectedSitter.id, text }),
      });
      if (response.status === 401) {
        setSendError('Your session expired. Log in again to send messages.');
        return;
      }
      if (!response.ok) throw new Error();

      const sent = await response.json();
      setMessages((previous) =>
        previous.some((item) => item.id === sent.id) ? previous : [...previous, sent]
      );
      setMessage('');
    } catch {
      setSendError('Unable to send your message. Please try again.');
    } finally {
      setSending(false);
    }
  }

  const conversation = messages.filter((item) => item.sitterId === selectedSitter?.id);

  return (
    <main className="container content-section">
      <h1>Messages</h1>

      <p className="text-muted">
        Connect with babysitters and discuss booking details.
      </p>

      {loading && <p role="status">Loading conversations…</p>}
      {loadError && <p role="alert">{loadError}</p>}
      {messageError && <p role="alert">{messageError}</p>}
      {!loading && !loadError && !selectedSitter && <p>No babysitters are listed.</p>}

      <div className="row g-3" hidden={!selectedSitter}>

        {/* Conversation list */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <strong>Conversations</strong>
            </div>

            <div className="list-group list-group-flush">
              {sitters.map((sitter) => (
                <button
                  key={sitter.id}
                  type="button"
                  className={
                    'list-group-item list-group-item-action ' +
                    (selectedSitter?.id === sitter.id
                      ? 'active'
                      : '')
                  }
                  onClick={() => setSelectedId(sitter.id)}
                >
                  {sitter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat window */}
        <div className="col-md-8">
          <div className="card shadow-sm">

            <div className="card-header">
              <h5 className="mb-0">
                {selectedSitter?.name}
              </h5>

              <small className="text-muted">
                Demo conversation
              </small>
            </div>

            <div
              className="card-body"
              style={{
                height: '400px',
                overflowY: 'auto',
              }}
            >
              {conversation.length === 0 ? (
                <p className="text-muted text-center">
                  No messages yet. Start a conversation!
                </p>
              ) : (
                conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      'd-flex mb-3 ' +
                      (msg.sender === 'You'
                        ? 'justify-content-end'
                        : 'justify-content-start')
                    }
                  >
                    <div
                      className={
                        'rounded p-3 ' +
                        (msg.sender === 'You'
                          ? 'bg-primary text-white'
                          : 'bg-light text-dark')
                      }
                      style={{ maxWidth: '75%' }}
                    >
                      <strong>{msg.sender}</strong>

                      <p className="mb-1">
                        {msg.text}
                      </p>

                      <small>{new Date(msg.time).toLocaleTimeString()}</small>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message input */}
            <div className="card-footer">
              {sendError && <p role="alert">{sendError}</p>}
              <form
                onSubmit={handleSend}
                className="d-flex gap-2"
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  aria-label="Message"
                  value={message}
                  disabled={sending}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending || !message.trim()}
                >
                  {sending ? 'Sending…' : 'Send'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <p className="placeholder-note mt-3">
        Messages and automatic replies are simulated.
      </p>
    </main>
  );
}
