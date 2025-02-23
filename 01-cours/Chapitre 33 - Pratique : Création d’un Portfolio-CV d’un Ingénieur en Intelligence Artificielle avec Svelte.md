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
npm create svelte@latest portfolio-ia (voir annexe 1 si la commande ne marche pas)
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

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

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



# Annexe 1 :

La commande correcte pour créer un projet **SvelteKit** en utilisant `npx sv create` avec toutes les options par défaut est :

```sh
npx sv create portfolio-ia --template skeleton --yes
```

📌 **Explication des options :**  
- `npx sv create` → Nouvelle version officielle pour créer un projet SvelteKit.  
- `portfolio-ia` → Nom du dossier du projet.  
- `--template skeleton` → Utilise le modèle minimal sans fichiers de démonstration.  
- `--yes` → Accepte toutes les options par défaut sans poser de questions.  

---

## **Si tu veux voir toutes les options manuelles :**
Tu peux exécuter cette commande sans `--yes` :

```sh
npx sv create portfolio-ia
```

Cela va te poser des questions comme :  
1. **Which Svelte app template?** → `skeleton` (léger) ou `demo` (avec exemples).  
2. **Use TypeScript?** → `Yes` ou `No`.  
3. **Add ESLint for code linting?** → `Yes` ou `No`.  
4. **Add Prettier for formatting?** → `Yes` ou `No`.  

---

### **FAQ :**
✔ **Quelle différence entre `skeleton` et `demo` ?**  
- `skeleton` → Projet minimal (idéal pour commencer rapidement).  
- `demo` → Projet avec des fichiers d’exemples et des composants de base.  

✔ **Pourquoi utiliser `--yes` ?**  
- Pour éviter les questions et utiliser les paramètres par défaut.  

---

💡 **Conclusion :**  
Si tu veux **un projet rapide et minimal**, utilise :  

```sh
npx sv create portfolio-ia --template skeleton --yes
```

Si tu veux **choisir les options manuellement**, utilise :  

```sh
npx sv create portfolio-ia
```

✅ **Après l’installation, lance ton projet avec :**  

```sh
cd portfolio-ia
npm install
npm run dev
```

🚀 **Ton portfolio SvelteKit est maintenant prêt à être développé !**

---

📌 **Prochain Projet : Un Blog IA en Svelte !** Veux-tu que je commence la rédaction ? 😊
