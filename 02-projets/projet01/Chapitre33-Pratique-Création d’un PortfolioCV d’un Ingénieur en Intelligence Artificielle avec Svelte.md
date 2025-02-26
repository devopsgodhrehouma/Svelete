# **Chapitre 33 - Pratique : Création d’un Portfolio/CV d’un Ingénieur en Intelligence Artificielle avec Svelte 🤖**  

Dans ce projet, nous allons construire un **portfolio interactif** pour un **ingénieur en intelligence artificielle (IA)**.  
Ce projet inclura :  
✅ **Une page d'accueil élégante avec présentation**  
✅ **Une section pour afficher les compétences et technologies maîtrisées**  
✅ **Une section pour les projets réalisés avec des liens vers GitHub et articles de recherche**  
✅ **Un formulaire de contact avec validation**  
✅ **Une mise en page responsive et animations fluides**  
✅ **Déploiement sur Vercel**  

📌 **Technologies utilisées :**  
✔️ **Svelte + SvelteKit** pour le framework  
✔️ **Tailwind CSS** pour un design moderne  
✔️ **Animations avec `fade` et `slide`**  
✔️ **Formulaire de contact avec validation**  
✔️ **Déploiement sur Vercel**  

---

# **1. Initialisation du Projet SvelteKit**  

📌 **Créer un projet SvelteKit avec Vite**  

```sh
rd /s /q portfolio-ia
npx sv create portfolio-ia
cd portfolio-ia
npm install
```

📌 **Lancer le projet**  

```sh
npm run dev
```

✅ **Votre projet SvelteKit est maintenant prêt !**  

---

# **2. Installer Tailwind CSS pour le Design 🎨**  

📌 **1️⃣ Installer Tailwind CSS dans le projet**  

- Mettre à jour package.json
```sh
{
	"name": "portfolio-ia",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^4.0.0",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"autoprefixer": "^10.4.20",
		"postcss": "^8.5.3",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^3.4.17",
		"typescript": "^5.0.0",
		"vite": "^6.0.0"
	}
}

```

- Installer tailwind
  
```
node --version
npm --version
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```


### En cas de problèmes
```sh
npm list tailwindcss
npm install -D tailwindcss
npx tailwindcss init -p
npx --version
npm update -g
node -v
npm -v
nvm install latest
nvm use latest
```
### Si le problème persiste

```sh
npm cache clean --force
npm install -D tailwindcss
rm -rf node_modules package-lock.json # Sur macOS/Linux
rd /s /q node_modules package-lock.json # Sur Windows CMD
npm install
npx tailwindcss init -p
```

---



📌 **2️⃣ Configurer `tailwind.config.cjs`**  

Remplacez le contenu par :  

```js
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

📌 **3️⃣ Ajouter Tailwind à `src/app.css`**  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


✅ **Tailwind CSS est maintenant activé pour le projet.**  

- Redémarrez le serveur ==> CTL+C ensuite npm run dev
  
---

# **3. Page d’Accueil (`src/routes/+page.svelte`)**  

📌 **Ouvrir `src/routes/+page.svelte` et coller le code suivant :**  

```svelte
<script>
  import { fade } from "svelte/transition";
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
  <div transition:fade class="text-center p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-4xl font-bold text-blue-600">👨‍💻 Ingénieur en Intelligence Artificielle</h1>
    <p class="text-lg mt-2">Passionné par l’apprentissage automatique et la recherche en IA.</p>
    <p class="mt-4 text-gray-600">Bienvenue sur mon portfolio, où je partage mes projets et expériences.</p>

    <div class="mt-6">
      <a href="/projects" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Voir mes projets</a>
      <a href="/contact" class="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">Me contacter</a>
    </div>
  </div>
</main>
```

✅ **Cette page affiche une introduction avec un bouton pour voir les projets et un autre pour le contact.**  




## Faire ces modifications :

### postcss.config.js

```svelte
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```


### tailwind.config.js

```svelte
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```



#### +page.svelte
```svelte
<script>
    import { fade } from "svelte/transition";
    import "../app.css";
</script>
  
<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
  <div transition:fade class="text-center p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-4xl font-bold text-blue-600">👨‍💻 Ingénieur en Intelligence Artificielle</h1>
    <p class="text-lg mt-2">Passionné par l'apprentissage automatique et la recherche en IA.</p>
    <p class="mt-4 text-gray-600">Bienvenue sur mon portfolio, où je partage mes projets et expériences.</p>

    <div class="mt-6">
      <a href="/projects" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Voir mes projets</a>
      <a href="/contact" class="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">Me contacter</a>
    </div>
  </div>
</main>
```









---

# **4. Page des Compétences (`src/routes/skills/+page.svelte`)**  

📌 **Créer un fichier `src/routes/skills/+page.svelte`** et coller :  

```svelte
<script>
  const skills = [
    { name: "Python", icon: "🐍" },
    { name: "TensorFlow", icon: "🔬" },
    { name: "PyTorch", icon: "🔥" },
    { name: "Machine Learning", icon: "📊" },
    { name: "Deep Learning", icon: "🧠" },
    { name: "Computer Vision", icon: "📷" },
  ];
</script>

<main class="p-10 text-center">
  <h1 class="text-3xl font-bold">🛠️ Compétences</h1>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
    {#each skills as skill}
      <div class="p-4 bg-white shadow-md rounded-lg">
        <p class="text-4xl">{skill.icon}</p>
        <p class="text-lg font-semibold mt-2">{skill.name}</p>
      </div>
    {/each}
  </div>
</main>
```

✅ **Affiche les compétences avec des icônes et un design moderne.**  

---

# **5. Page des Projets (`src/routes/projects/+page.svelte`)**  

📌 **Créer un fichier `src/routes/projects/+page.svelte`** et ajouter :  

```svelte
<script>
  const projects = [
    { title: "Détection d'objets avec YOLO", link: "https://github.com/user/yolo" },
    { title: "Reconnaissance faciale avec OpenCV", link: "https://github.com/user/opencv" },
    { title: "Chatbot IA avec GPT-3", link: "https://github.com/user/chatbot" },
  ];
</script>

<main class="p-10 text-center">
  <h1 class="text-3xl font-bold">📂 Mes Projets</h1>
  <div class="mt-6 space-y-4">
    {#each projects as project}
      <a href={project.link} target="_blank" class="block bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
        {project.title}
      </a>
    {/each}
  </div>
</main>
```

✅ **Affiche les projets avec des liens vers GitHub.**  

---

# **6. Page de Contact (`src/routes/contact/+page.svelte`)**  

📌 **Créer un fichier `src/routes/contact/+page.svelte`** et ajouter :  

```svelte
<script>
  let name = "";
  let email = "";
  let message = "";

  function submitForm() {
    alert(`Merci ${name}, votre message a été envoyé !`);
    name = "";
    email = "";
    message = "";
  }
</script>

<main class="p-10 text-center">
  <h1 class="text-3xl font-bold">📩 Me Contacter</h1>
  <form on:submit|preventDefault={submitForm} class="mt-6 space-y-4">
    <input type="text" bind:value={name} placeholder="Votre nom" required class="p-2 w-full border rounded" />
    <input type="email" bind:value={email} placeholder="Votre email" required class="p-2 w-full border rounded" />
    <textarea bind:value={message} placeholder="Votre message" required class="p-2 w-full border rounded"></textarea>
    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Envoyer</button>
  </form>
</main>
```

✅ **Formulaire interactif avec alerte de confirmation.**  

---

# **7. Déploiement sur Vercel 🚀**  

📌 **1️⃣ Installer Vercel CLI**  

```sh
npm install -g vercel
```

📌 **2️⃣ Déployer le projet**  

```sh
vercel
```

✅ **Votre portfolio est maintenant en ligne !**  

---

# **8. Résumé du Portfolio 🚀**  

✔️ **Présentation avec animation `fade`**  
✔️ **Affichage des compétences avec une grille dynamique**  
✔️ **Liste des projets avec liens vers GitHub**  
✔️ **Formulaire de contact interactif**  
✔️ **Déploiement rapide sur Vercel**  

---

📌 **Prochain Projet : Un Blog IA en Svelte !** Veux-tu que je commence la rédaction ? 😊
