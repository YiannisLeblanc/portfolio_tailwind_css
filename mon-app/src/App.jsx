import './App.css';
import heroImage from './assets/hero.png';
import instagramIcon from './assets/instagram.png';
import linkedinIcon from './assets/LinkedIn.png';
import mailIcon from './assets/mail.png';

// Données des projets
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

// Composant carte projet — réutilisé 3 fois
function ProjectCard({ title, description, image, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-card__image" />
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <a href={link} className="project-card__link">View Project</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>

      {/* SECTION HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Hello, my<br />name is<br />Madelyn Torff
          </h1>
          <p className="hero__subtitle">
            Short text with details about you, what you do or your professional career. You can add more information on the about page.
          </p>
          <div className="hero__buttons">
            <a href="#" className="btn btn--primary">Projects</a>
            <a href="#" className="btn btn--secondary">LinkedIn</a>
          </div>
        </div>
        <div className="hero__image-wrapper">
          <img src={heroImage} alt="Madelyn Torff" className="hero__image" />
        </div>
      </section>

      {/* SECTION PROJETS */}
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__icons">
          {/* Instagram */}
          <a href="#" className="footer__icon" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          {/* LinkedIn */}
          <a href="#" className="footer__icon" aria-label="LinkedIn">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          {/* Mail */}
          <a href="#" className="footer__icon" aria-label="Mail">
            <img src={mailIcon} alt="Mail" />
          </a>
        </div>
      </footer>

    </div>
  );
}
