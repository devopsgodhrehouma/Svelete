# **Chapitre 16 - Routage avec SvelteKit** 🚀  

---

## **1. Introduction : Pourquoi utiliser SvelteKit pour le routage ?**  

SvelteKit est le **framework officiel de Svelte** qui simplifie la création d’applications web **multi-pages** avec un système de **routage dynamique**.  

📌 **Pourquoi utiliser SvelteKit ?**  
✅ **Système de fichiers = Système de routes** (pas besoin de `react-router`)  
✅ **Routage dynamique** (pages générées selon les paramètres d’URL)  
✅ **Chargement des données côté serveur (`load()`)**  
✅ **Navigation ultra rapide avec `svelte:link`**  

---

## **2. Installation de SvelteKit**  

📌 **Pour commencer un projet SvelteKit, exécutez :**  

```sh
npm create svelte@latest mon-projet
cd mon-projet
npm install
npm run dev
```

✅ **Ouvrez `http://localhost:5173/` pour voir l’application en action.**  

---

## **3. Comprendre le Routage Basé sur les Fichiers**  

📌 **Dans SvelteKit, chaque fichier `.svelte` dans `src/routes/` devient une page.**  

| Fichier | Route générée |
|---------|--------------|
| `src/routes/+page.svelte` | `/` (Page d'accueil) |
| `src/routes/contact/+page.svelte` | `/contact` |
| `src/routes/blog/+page.svelte` | `/blog` |

📌 **Créer une page `À propos` (`/about`)**  

1️⃣ **Créez le fichier** `src/routes/about/+page.svelte`  
2️⃣ **Ajoutez ce contenu :**  

```svelte
<h1>À propos de notre site</h1>
<p>Bienvenue sur notre application construite avec SvelteKit !</p>
```

📌 **Accédez à `http://localhost:5173/about` pour voir la page.**  

✅ **SvelteKit gère automatiquement le routage, sans config spéciale !**  

---

## **4. Navigation entre Pages avec `<a>` ou `svelte:link`**  

📌 **On peut naviguer entre pages avec `<a href="">`, mais `svelte:link` est plus rapide.**  

### **Exemple : Ajouter un menu de navigation**  

Dans `src/routes/+layout.svelte`, ajoutez :  

```svelte
<nav>
  <a href="/">Accueil</a>
  <a href="/about" use:sveltekit-preload>À propos</a>
</nav>

<slot />
```

✅ **Explication :**  
- **`<a href="/">`** → Lien vers la page d’accueil.  
- **`<slot />`** → Affiche le contenu des pages enfants.  
- **`use:sveltekit-preload`** → Charge la page avant même le clic !  

---

## **5. Créer des Routes Dynamiques (`[param]`)**  

📌 **SvelteKit permet de créer des pages dynamiques avec des paramètres dans l’URL.**  

### **Exemple : Afficher un article selon son `id`**  

1️⃣ **Créez un dossier `src/routes/blog/[id]`**  
2️⃣ **Ajoutez le fichier `src/routes/blog/[id]/+page.svelte`**  
3️⃣ **Ajoutez ce code :**  

```svelte
<script>
  export let params;
</script>

<h1>Article {params.id}</h1>
<p>Bienvenue sur l’article numéro {params.id}.</p>
```

📌 **Accédez à `http://localhost:5173/blog/123` et `params.id` affichera `123`.**  

✅ **SvelteKit extrait automatiquement `id` depuis l’URL !**  

---

## **6. Charger des Données avec `load()` (`+page.js`)**  

📌 **SvelteKit peut récupérer des données avant d’afficher une page grâce à `load()`.**  

### **Exemple : Charger un article depuis une API**  

1️⃣ **Créez `src/routes/blog/[id]/+page.js`**  

```js
export async function load({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  if (!res.ok) throw new Error("Article non trouvé !");
  const article = await res.json();
  return { article };
}
```

2️⃣ **Modifiez `src/routes/blog/[id]/+page.svelte`**  

```svelte
<script>
  export let data;
</script>

<h1>{data.article.title}</h1>
<p>{data.article.body}</p>
```

📌 **Allez sur `http://localhost:5173/blog/1` pour voir un article chargé dynamiquement !**  

✅ **L’API est appelée avant le rendu de la page !**  

---

## **7. Gérer les Erreurs avec `+error.svelte`**  

📌 **Si `fetch()` échoue, SvelteKit permet d’afficher une page d’erreur.**  

1️⃣ **Créez `src/routes/blog/[id]/+error.svelte`**  

```svelte
<script>
  export let error;
</script>

<h1>Erreur : {error.message}</h1>
<a href="/">Retour à l'accueil</a>
```

📌 **Si un article n’existe pas (`id` inexistant), SvelteKit affiche cette page.**  

✅ **Gestion propre des erreurs sans `try/catch` manuel !**  

---

## **8. Ajouter des Métadonnées (`title`, `description`)**  

📌 **SvelteKit permet de modifier le `<title>` et le `<meta description>` dynamiquement.**  

Ajoutez ce code dans `src/routes/blog/[id]/+page.js` :  

```js
export async function load({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  if (!res.ok) throw new Error("Article non trouvé !");
  const article = await res.json();

  return {
    article,
    title: article.title,
    description: article.body.substring(0, 100) + "..."
  };
}
```

📌 **Dans `+page.svelte`, ajoutez :**  

```svelte
<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content="{data.description}" />
</svelte:head>

<h1>{data.article.title}</h1>
<p>{data.article.body}</p>
```

✅ **SEO amélioré !**  

---

## **9. Comparaison entre Svelte et SvelteKit pour le Routage**  

| Fonctionnalité | Svelte classique | SvelteKit |
|---------------|-----------------|-----------|
| Création de pages | Nécessite un `router` externe | Basé sur les fichiers |
| Routes dynamiques | À gérer manuellement | `[param]` automatique |
| Chargement API | `fetch()` dans `onMount()` | `load()` avec `+page.js` |
| SEO (`title`, `meta`) | À gérer avec JS | Automatique avec `<svelte:head>` |

✅ **SvelteKit est une solution complète et optimisée pour le routage !**  

---

## **10. Résumé et Bonnes Pratiques**  

✔️ **Chaque fichier `.svelte` dans `src/routes/` est une page.**  
✔️ **Les routes dynamiques utilisent `[param]`.**  
✔️ **Le chargement des données se fait dans `+page.js` avec `load()`.**  
✔️ **Les erreurs sont gérées proprement avec `+error.svelte`.**  
✔️ **`svelte:head` permet d’optimiser le SEO des pages.**  

---

### **Prochain Chapitre : Gestion des erreurs globales en Svelte !** 🚀
