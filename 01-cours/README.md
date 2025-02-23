

```sh
/mon-projet-sveltekit
│── src/
│   ├── routes/
│   │   ├── +layout.svelte         # Layout global (navigation)
│   │   ├── +error.svelte          # Page d'erreur globale
│   │   ├── +page.svelte           # Page d'accueil "/"
│   │   │
│   │   ├── about/
│   │   │   ├── +page.svelte       # Page "À propos" "/about"
│   │   │
│   │   ├── blog/
│   │   │   ├── +page.svelte       # Liste des articles "/blog"
│   │   │   ├── [id]/
│   │   │   │   ├── +page.svelte   # Page d'un article "/blog/:id"
│   │   │   │   ├── +page.js       # Chargement des données API
│   │   │   │   ├── +error.svelte  # Gestion des erreurs sur "/blog/:id"
│   │   │
│   │   ├── contact/
│   │   │   ├── +page.svelte       # Formulaire de contact "/contact"
│   │   │
│   ├── lib/
│   │   ├── styles.css             # Fichier de styles global
│   │   ├── api.js                 # Fichier de gestion des requêtes API
│   │
│   ├── app.html                    # Template HTML principal
│   ├── hooks.server.js              # Gestion des hooks et middleware
│   ├── stores.js                    # Gestion des stores SvelteKit
│
│── static/                          # Fichiers statiques (images, favicons)
│── package.json                      # Dépendances du projet
│── svelte.config.js                   # Configuration de SvelteKit
│── vite.config.js                     # Configuration Vite
│── README.md                          # Documentation du projet
```
