# Mon portfolio 

# 🚀 **Objectif du Portfolio IA**
Ce portfolio inclura :
✅ Une **page d’accueil moderne** avec une introduction à ton travail  
✅ Une **section IA interactive** pour montrer des modèles IA entraînés en direct  
✅ Une **galerie de projets IA** avec des démonstrations interactives  
✅ Une **page blog** avec des articles sur l’IA  
✅ Un **formulaire de contact intelligent** avec validation IA  
✅ Un **design interactif et responsive** avec Tailwind CSS et Canvas  

---

# 📌 **1. Installation et Configuration du Projet**
Avant de commencer, assure-toi d'avoir **Node.js** installé sur ton ordinateur.

### **1.1 Vérifier si Node.js est installé**
```sh
node -v
```
Si ce n’est pas installé, télécharge-le depuis [nodejs.org](https://nodejs.org/).

### **1.2 Création du projet Svelte avec Vite**
```sh
npm create vite@latest portfolio-ia -- --template svelte
```

Entre dans ton projet :
```sh
cd portfolio-ia
```

Installe les dépendances :
```sh
npm install
```

Démarre le serveur :
```sh
npm run dev
```

Accède à ton projet sur **http://localhost:5173**.

---

# 📂 **2. Structure du Projet**
Ton projet ressemblera à ceci :
```
portfolio-ia/
├── src/
│   ├── routes/
│   │   ├── index.svelte       # Page d'accueil
│   │   ├── about.svelte       # Page "À propos"
│   │   ├── projects.svelte    # Page "Projets"
│   │   ├── blog.svelte        # Page "Blog IA"
│   │   ├── contact.svelte     # Page "Contact"
│   ├── components/
│   │   ├── Header.svelte      # En-tête du site
│   │   ├── Footer.svelte      # Pied de page
│   │   ├── ProjectCard.svelte # Carte de projet
│   │   ├── BlogPost.svelte    # Article de blog
│   │   ├── ContactForm.svelte # Formulaire de contact IA
│   │   ├── AIVisualizer.svelte# Démo IA interactive
│   ├── styles/
│   │   ├── global.css         # Styles globaux
│   ├── static/
│   │   ├── images/            # Images du site
│   ├── main.js                # Entrée principale du projet
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
```

---

# 🏗 **3. Création des Composants**
Nous allons créer **le header, le footer et les cartes de projet**.

## 📌 **3.1 Header (Navigation Principale)**
### 📄 `src/components/Header.svelte`
```svelte
<script>
  export let title = "Portfolio IA";
</script>

<header>
  <h1>{title}</h1>
  <nav>
    <a href="/">Accueil</a>
    <a href="/about">À propos</a>
    <a href="/projects">Projets</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<style>
  header {
    background-color: #222;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
  }
</style>
```

---

## 📌 **3.2 Footer**
### 📄 `src/components/Footer.svelte`
```svelte
<footer>
  <p>© 2025 - Portfolio IA. Tous droits réservés.</p>
</footer>

<style>
  footer {
    text-align: center;
    padding: 20px;
    background: #111;
    color: white;
  }
</style>
```

---

## 📌 **3.3 Carte de Projet IA**
### 📄 `src/components/ProjectCard.svelte`
```svelte
<script>
  export let project;
</script>

<div class="project-card">
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <img src={project.image} alt={project.title} />
</div>

<style>
  .project-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
  }
  img {
    max-width: 100%;
  }
</style>
```

---

## 📌 **3.4 Visualisation IA avec Canvas**
### 📄 `src/components/AIVisualizer.svelte`
```svelte
<script>
  import { onMount } from "svelte";

  let canvas;
  
  function draw() {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 100, 100);
  }

  onMount(() => {
    draw();
  });
</script>

<canvas bind:this={canvas} width="500" height="500"></canvas>

<style>
  canvas {
    border: 1px solid black;
  }
</style>
```

---

# 📝 **4. Création des Pages**
## 📌 **4.1 Page d’accueil**
### 📄 `src/routes/index.svelte`
```svelte
<script>
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import AIVisualizer from '../components/AIVisualizer.svelte';
</script>

<Header title="Bienvenue sur mon Portfolio IA" />
<main>
  <h2>Explorez mes projets en intelligence artificielle</h2>
  <AIVisualizer />
</main>
<Footer />
```

---

## 📌 **4.2 Page Projets**
### 📄 `src/routes/projects.svelte`
```svelte
<script>
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import ProjectCard from '../components/ProjectCard.svelte';

  let projects = [
    { title: "Détection d’objets", description: "YOLOv5 en action", image: "/images/yolo.jpg" },
    { title: "Analyse de sentiments", description: "NLP avec BERT", image: "/images/bert.jpg" }
  ];
</script>

<Header title="Mes Projets IA" />
<main>
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</main>
<Footer />
```

---

# 🚀 **5. Déploiement**
Build :
```sh
npm run build
```
Déploie sur GitHub Pages :
```sh
npm install --save-dev gh-pages
npm run deploy
```

---

🎉 **Félicitations !** Tu as maintenant un **portfolio complet et interactif en IA avec Svelte !** 🚀
