import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page page--center">
      <section className="auth-card">
        <h1>404</h1>
        <p>La page demandée n’a pas été trouvée.</p>
        <Link to="/" className="btn btn--primary">
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
