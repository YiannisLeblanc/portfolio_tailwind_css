# Projet Web

Ce projet est une version améliorée du portfolio avec les fonctionnalités suivantes :

## Fonctionnalités implémentées

- Routage client avec `react-router-dom` :
  - `/` : page d’accueil
  - `/login` : page de connexion
  - `/contact` : page de contact
  - `/admin/projects` : espace administration projets
  - `*` : page 404

- Pseudo authentification :
  - Système d’authentification géré via `useReducer` et `useContext`
  - Accès protégé à la page `/admin/projects`
  - Déconnexion disponible depuis l’en-tête

- Administration de projet :
  - Liste des projets en mémoire
  - Ajout de projet
  - Modification de projet
  - Suppression de projet

- Formulaire contact :
  - Validation des champs requis
  - Vérification basique du format d’email
  - Affichage des messages envoyés localement

- Chargement paresseux
  - Routes principales chargées avec `React.lazy` et `Suspense`
  - Le lazy loading signifie que le code des pages n’est chargé que quand l’utilisateur y accède, ce qui réduit le temps de chargement initial

## Structure minimale

- `src/App.jsx` : route principale et page d’accueil
- `src/index.js` : point d’entrée avec `AuthProvider`
- `src/context/AuthContext.jsx` : contexte d’authentification
- `src/pages/Login.jsx` : page de connexion
- `src/pages/AdminProjects.jsx` : page d’administration des projets
- `src/pages/Contact.jsx` : page de contact
- `src/pages/NotFound.jsx` : page 404
- `src/App.css` : style global et styles des nouveaux composants

## Installation et exécution

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```
