import React, { useState, useEffect } from 'react';

const sitters = [
  { id: 1, name: 'Sarah Jenkins' },
  { id: 2, name: 'Michael Chen' },
  { id: 3, name: 'Elena Rodriguez' },
  { id: 4, name: 'Jessica Taylor' },
];

export default function Messages({ userName }) {
  const storageKey = `messages-${userName}`;

  const [selectedSitter, setSelectedSitter] = useState(
    sitters[0]
  );

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Save messages whenever the chat history changes.
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(messages)
    );
  }, [messages, storageKey]);

  // Simulate incoming WebSocket messages.
  useEffect(() => {
    const interval = setInterval(() => {
      const pending = messages.find(
        (msg) => msg.sender === 'You' && !msg.replied
      );

      if (pending) {
        setMessages((previous) => [
          ...previous.map((msg) =>
            msg.id === pending.id
              ? { ...msg, replied: true }
              : msg
          ),
          {
            id: crypto.randomUUID(),
            sitterId: pending.sitterId,
            sender: pending.sitterName,
            text: 'Thanks for your message! I will get back to you soon.',
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [messages]);

  // Send a new message.
  function handleSend(event) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const newMessage = {
      id: crypto.randomUUID(),
      sitterId: selectedSitter.id,
      sitterName: selectedSitter.name,
      sender: 'You',
      text: message.trim(),
      time: new Date().toLocaleTimeString(),
      replied: false,
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    setMessage('');
  }

  // Display only the selected conversation.
  const conversation = messages.filter(
    (msg) => msg.sitterId === selectedSitter.id
  );

  return (
    <main className="container content-section">
      <h1>Messages</h1>

      <p className="text-muted">
        Connect with babysitters and discuss booking details.
      </p>

      <div className="row g-3">

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
                    (selectedSitter.id === sitter.id
                      ? 'active'
                      : '')
                  }
                  onClick={() => setSelectedSitter(sitter)}
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
                {selectedSitter.name}
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

                      <small>{msg.time}</small>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message input */}
            <div className="card-footer">
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
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <p className="placeholder-note mt-3">
        Messages and automatic replies are simulated.
        No real messages are sent.
      </p>
    </main>
  );
}