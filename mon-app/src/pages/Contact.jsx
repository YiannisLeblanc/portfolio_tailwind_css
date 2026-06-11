import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Le nom est requis.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'L’email est requis.';
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = 'Le format de l’email est invalide.';
    }
    if (!form.message.trim()) {
      nextErrors.message = 'Le message est requis.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess('');
      return;
    }

    setMessages((current) => [
      { id: Date.now(), ...form },
      ...current,
    ]);
    setForm(initialForm);
    setErrors({});
    setSuccess('Message envoyé avec succès.');
  };

  return (
    <main className="page page--center">
      <section className="contact-card">
        <h1>Contact</h1>
        <p>Envoyez un message et je vous répondrai rapidement.</p>
        <form onSubmit={handleSubmit} className="form-stack contact-form">
          <label>
            Nom
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </label>
          {success && <p className="form-success">{success}</p>}
          <button type="submit" className="btn btn--primary">
            Envoyer
          </button>
        </form>

        {messages.length > 0 && (
          <div className="card message-list">
            <h2>Derniers messages</h2>
            {messages.map((message) => (
              <article key={message.id} className="message-item">
                <strong>{message.name}</strong>
                <p>{message.email}</p>
                <p>{message.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
