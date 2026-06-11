import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import heroImage from './assets/hero.png';
import instagramIcon from './assets/instagram.png';
import linkedinIcon from './assets/LinkedIn.png';
import mailIcon from './assets/mail.png';
import { useAuth } from './context/AuthContext';

const Login = lazy(() => import('./pages/Login'));
const AdminProjects = lazy(() => import('./pages/AdminProjects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const projects = [
  {
    id: 1,
    title: 'Project Name',
    description: 'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: '/project1.jpeg',
    link: '#',
  },
  {
    id: 2,
    title: 'Project Name',
    description: 'What was your role, your deliverables, if the project was personal, freelancing.',
    image: '/project2.png',
    link: '#',
  },
  {
    id: 3,
    title: 'Project Name',
    description: 'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: '/project3.png',
    link: '#',
  },
];

function ProjectCard({ title, description, image, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-card__image" />
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <a href={link} className="project-card__link">Voir le projet</a>
      </div>
    </div>
  );
}

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Hello, my<br />name is<br />Madelyn Torff
          </h1>
          <p className="hero__subtitle">
            Short text with details about you, what you do or your professional career. You can add more information on the about page.
          </p>
          <div className="hero__buttons">
            <Link to="/contact" className="btn btn--primary">
              Contact
            </Link>
            <Link to="/admin/projects" className="btn btn--secondary">
              Admin
            </Link>
          </div>
        </div>
        <div className="hero__image-wrapper">
          <img src={heroImage} alt="Madelyn Torff" className="hero__image" />
        </div>
      </section>

      <section className="projects">
        <h2 className="projects__title">Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__icons">
          <a href="#" className="footer__icon" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="#" className="footer__icon" aria-label="LinkedIn">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a href="#" className="footer__icon" aria-label="Mail">
            <img src={mailIcon} alt="Mail" />
          </a>
        </div>
      </footer>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="app-title">Portfolio</div>
          <nav className="app-nav">
            <Link to="/">Accueil</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin/projects">Admin</Link>
          </nav>
          <div className="app-actions">
            {user ? (
              <button type="button" className="btn btn--secondary" onClick={logout}>
                Déconnexion
              </button>
            ) : (
              <Link to="/login" className="btn btn--primary">
                Connexion
              </Link>
            )}
          </div>
        </header>

        <Suspense fallback={<div className="page page--center"><p>Chargement...</p></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
