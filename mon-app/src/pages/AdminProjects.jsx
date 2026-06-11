import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const defaultProjects = [
  {
    id: 1,
    title: 'Projet 1',
    description: 'Exemple de projet, interface et expérience utilisateur.',
    link: '#',
  },
  {
    id: 2,
    title: 'Projet 2',
    description: 'Présentation d’un projet technique et de ses résultats.',
    link: '#',
  },
];

export default function AdminProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState(defaultProjects);
  const [form, setForm] = useState({ title: '', description: '', link: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setForm({ title: '', description: '', link: '' });
    setEditId(null);
    setMessage('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setMessage('Le titre et la description sont requis.');
      return;
    }

    if (editId !== null) {
      setProjects((current) =>
        current.map((project) =>
          project.id === editId ? { ...project, ...form } : project
        )
      );
      setMessage('Projet mis à jour.');
    } else {
      setProjects((current) => [
        ...current,
        { id: Date.now(), ...form },
      ]);
      setMessage('Projet ajouté.');
    }

    resetForm();
  };

  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description, link: project.link });
    setEditId(project.id);
    setMessage('Modification du projet en cours.');
  };

  const handleDelete = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    if (id === editId) {
      resetForm();
    }
  };

  return (
    <main className="page">
      <section className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Administration des projets</h1>
            <p>Utilisateur connecté : {user.email}</p>
          </div>
        </div>

        <div className="admin-grid">
          <div className="card admin-card">
            <h2>{editId ? 'Modifier un projet' : 'Ajouter un projet'}</h2>
            <form onSubmit={handleSubmit} className="form-stack">
              <label>
                Titre
                <input name="title" value={form.title} onChange={handleChange} />
              </label>
              <label>
                Description
                <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
              </label>
              <label>
                Lien
                <input name="link" value={form.link} onChange={handleChange} placeholder="https://" />
              </label>
              {message && <p className="form-message">{message}</p>}
              <button type="submit" className="btn btn--primary">
                {editId ? 'Mettre à jour' : 'Ajouter'}
              </button>
              {editId && (
                <button type="button" className="btn btn--secondary" onClick={resetForm}>
                  Annuler
                </button>
              )}
            </form>
          </div>

          <div className="card admin-card">
            <h2>Liste des projets</h2>
            {projects.length === 0 ? (
              <p>Aucun projet enregistré.</p>
            ) : (
              <div className="project-list">
                {projects.map((project) => (
                  <article key={project.id} className="project-item">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-actions">
                      <button type="button" className="btn btn--secondary" onClick={() => handleEdit(project)}>
                        Modifier
                      </button>
                      <button type="button" className="btn btn--primary" onClick={() => handleDelete(project.id)}>
                        Supprimer
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
