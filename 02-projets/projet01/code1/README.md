# Portfolio Personnel - Guide d'Installation Détaillé

## 📋 Prérequis
- Node.js (version 16+)
- npm (inclus avec Node.js)
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation Pas à Pas

### 1. Création du Projet

```bash
# Créez un nouveau projet SvelteKit
npm create svelte@latest portfolio-ia

# Sélectionnez les options suivantes :
# - Which Svelte app template? → Skeleton project
# - Add type checking with TypeScript? → Yes
# - Add ESLint for code linting? → Yes
# - Add Prettier for code formatting? → Yes

# Accédez au dossier du projet
cd portfolio-ia

# Installez les dépendances
npm install

# Installez Tailwind CSS et ses dépendances
npm install -D tailwindcss postcss autoprefixer

# Initialisez Tailwind CSS
npx tailwindcss init -p
```

### 2. Configuration des Fichiers

Créez/modifiez les fichiers suivants :

**1. src/app.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**2. tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**3. postcss.config.js**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. Création des Pages

**1. src/routes/+page.svelte** (Page d'accueil)
```svelte
<script>
    import { fade } from "svelte/transition";
    import "../app.css";
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div transition:fade class="container mx-auto px-4 py-16">
        <!-- Hero Section -->
        <section class="text-center mb-20">
            <div class="mb-8 text-blue-400">
                <span class="text-xl font-semibold">👋 Bienvenue</span>
            </div>
            <h1 class="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Haythem Rehouma
            </h1>
            <p class="text-2xl text-gray-300 mb-12">Ingénieur en Intelligence Artificielle</p>
            <div class="flex justify-center gap-6">
                <a href="/projects" class="btn-primary">Mes Projets</a>
                <a href="/contact" class="btn-secondary">Me Contacter</a>
            </div>
        </section>

        <!-- Quick Links -->
        <nav class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <a href="/skills" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Compétences</h2>
                    <p class="text-gray-400">Découvrez mes expertises techniques</p>
                </div>
            </a>
            <a href="/projects" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Projets</h2>
                    <p class="text-gray-400">Explorez mes réalisations</p>
                </div>
            </a>
            <a href="/contact" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Contact</h2>
                    <p class="text-gray-400">Travaillons ensemble</p>
                </div>
            </a>
        </nav>
    </div>
</main>

<style>
    .btn-primary {
        @apply px-8 py-4 bg-blue-500 rounded-full font-medium
               hover:bg-blue-600 transform hover:-translate-y-0.5 
               transition-all duration-150 ease-in-out
               shadow-lg hover:shadow-blue-500/50;
    }
    .btn-secondary {
        @apply px-8 py-4 bg-gray-800 rounded-full font-medium
               hover:bg-gray-700 transform hover:-translate-y-0.5
               transition-all duration-150 ease-in-out
               border border-gray-700 hover:border-gray-600;
    }
    .card {
        @apply p-8 rounded-2xl transition-all duration-200 ease-in-out
               bg-gradient-to-br from-gray-800 to-gray-900
               hover:from-gray-800 hover:to-gray-800
               border border-gray-700 hover:border-blue-500/30;
    }
    .card-content {
        @apply transform transition-all duration-200 ease-in-out
               group-hover:-translate-y-1;
    }
</style>
```

**2. src/routes/contact/+page.svelte** (Page de Contact)
```svelte
<script>
  import { fade } from "svelte/transition";
  let formData = {
    name: '',
    email: '',
    message: ''
  };

  function handleSubmit() {
    console.log('Form submitted:', formData);
  }
</script>

<div transition:fade class="container mx-auto px-4 py-16 max-w-2xl">
  <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
    Contact
  </h1>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
    <div>
      <label for="name" class="block mb-2 text-gray-200 font-medium">Nom</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
               transition-all duration-200"
        placeholder="Votre nom"
        required
      />
    </div>
    
    <div>
      <label for="email" class="block mb-2 text-gray-200 font-medium">Email</label>
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
               transition-all duration-200"
        placeholder="votre@email.com"
        required
      />
    </div>
    
    <div>
      <label for="message" class="block mb-2 text-gray-200 font-medium">Message</label>
      <textarea
        id="message"
        bind:value={formData.message}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
               transition-all duration-200 h-32 resize-y"
        placeholder="Votre message..."
        required
      ></textarea>
    </div>
    
    <button type="submit" 
            class="w-full py-4 bg-blue-500 rounded-lg font-medium text-white
                   hover:bg-blue-600 transform hover:-translate-y-0.5 
                   transition-all duration-150 ease-in-out
                   shadow-lg hover:shadow-blue-500/50">
      Envoyer
    </button>
  </form>
</div>
```

### 4. Lancement du Projet

```bash
# Démarrez le serveur de développement
npm run dev

# Le site sera accessible à : http://localhost:5173
```

### 5. Structure des Dossiers
```
portfolio-ia/
├── src/
│   ├── routes/
│   │   ├── +page.svelte
│   │   ├── contact/
│   │   │   └── +page.svelte
│   │   ├── skills/
│   │   │   └── +page.svelte
│   │   └── projects/
│   │       └── +page.svelte
│   └── app.css
├── static/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Déploiement

### Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Installez Vercel CLI :
```bash
npm i -g vercel
```
3. Déployez :
```bash
vercel
```

## 🔧 Dépannage Courant

1. Si les styles Tailwind ne s'appliquent pas :
   - Vérifiez que `app.css` est importé dans `+page.svelte`
   - Redémarrez le serveur de développement

2. Si les transitions ne fonctionnent pas :
   - Vérifiez l'import de `fade` depuis "svelte/transition"

3. Erreurs TypeScript :
   - Exécutez `npm run check` pour voir les erreurs détaillées

## 📚 Ressources Utiles

- [Documentation SvelteKit](https://kit.svelte.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Vercel](https://vercel.com/docs)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :
1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT.
