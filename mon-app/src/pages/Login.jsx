import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Email requis');
      return;
    }

    login({ name: 'Madelyn', email: email.trim() });
    navigate('/admin/projects');
  };

  return (
    <main className="page page--center">
      <section className="auth-card">
        <h1>Connexion</h1>
        <p>Connectez-vous pour accéder à l’espace administration.</p>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              placeholder="votre@email.com"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn--primary">
            Se connecter
          </button>
        </form>

        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => {
            login({ name: 'Madelyn', email: 'madelyn@example.com' });
            navigate('/admin/projects');
          }}
        >
          Connexion Google
        </button>

        {user && (
          <p className="small-text">
            Connecté en tant que <strong>{user.email}</strong>.
          </p>
        )}

        <p className="small-text">
          <Link to="/">Retour à l’accueil</Link>
        </p>
      </section>
    </main>
  );
}
