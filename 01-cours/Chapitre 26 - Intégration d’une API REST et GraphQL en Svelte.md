# **Chapitre 26 - Intégration d’une API REST et GraphQL en Svelte 🌐**  

---

## **1. Introduction : Pourquoi utiliser une API avec Svelte ?**  

Svelte est un framework léger, mais les applications modernes nécessitent souvent de **communiquer avec des APIs externes**.  
📌 **Pourquoi utiliser une API REST ou GraphQL avec Svelte ?**  
✅ **Récupérer des données dynamiques** (ex : articles de blog, utilisateurs, produits).  
✅ **Envoyer des informations à un backend** (ex : formulaires, authentification).  
✅ **Optimiser les performances** avec GraphQL en ne récupérant que les données nécessaires.  

Dans ce chapitre, nous allons voir :  
1. **Comment consommer une API REST avec `fetch()`**  
2. **Utiliser un store (`writable()`) pour gérer les données**  
3. **Envoyer des données à une API (POST, PUT, DELETE)**  
4. **Utiliser GraphQL avec `graphql-request`**  

---

## **2. Consommer une API REST avec `fetch()`**  

📌 **Problème : Comment récupérer des données depuis une API externe ?**  
📌 **Solution : Utiliser `fetch()` pour envoyer une requête GET**  

### **1️⃣ Exemple avec une API publique (JSONPlaceholder)**
```svelte
<script>
  let posts = [];

  async function chargerPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts = await res.json();
  }
</script>

<button on:click={chargerPosts}>Charger les articles</button>

<ul>
  {#each posts as post}
    <li>{post.title}</li>
  {/each}
</ul>
```
✅ **Lorsque l'utilisateur clique, les articles sont chargés depuis l’API !**  

---

## **3. Gérer les Données avec un `store` (`writable()`)**  

📌 **Problème : Comment partager les données API entre plusieurs composants ?**  
📌 **Solution : Utiliser un `store` pour centraliser les données.**  

### **1️⃣ Créer un fichier `store.js`**  
```js
import { writable } from "svelte/store";

export const articles = writable([]);

export async function chargerArticles() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  articles.set(await res.json());
}
```

### **2️⃣ Utiliser le store dans `App.svelte`**  
```svelte
<script>
  import { articles, chargerArticles } from "./store.js";
</script>

<button on:click={chargerArticles}>Charger les articles</button>

<ul>
  {#each $articles as article}
    <li>{article.title}</li>
  {/each}
</ul>
```
✅ **Les articles sont maintenant gérés globalement et peuvent être utilisés dans plusieurs composants !**  

---

## **4. Envoyer des Données à une API REST (POST, PUT, DELETE)**  

📌 **Envoyer des informations à un serveur est souvent nécessaire (ex : formulaire, création d'utilisateur).**  

### **1️⃣ Ajouter un article avec `POST`**  
```svelte
<script>
  let titre = "";
  let contenu = "";

  async function ajouterArticle() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titre, body: contenu, userId: 1 })
    });

    const data = await res.json();
    console.log("Article ajouté :", data);
  }
</script>

<input type="text" bind:value={titre} placeholder="Titre" />
<textarea bind:value={contenu} placeholder="Contenu"></textarea>
<button on:click={ajouterArticle}>Ajouter</button>
```
✅ **Un nouvel article est envoyé à l’API en JSON !**  

### **2️⃣ Modifier un article avec `PUT`**  
```js
async function modifierArticle(id, nouveauTitre) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nouveauTitre, userId: 1 })
  });

  const data = await res.json();
  console.log("Article modifié :", data);
}
```

### **3️⃣ Supprimer un article avec `DELETE`**  
```js
async function supprimerArticle(id) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  });

  console.log(`Article ${id} supprimé`);
}
```

✅ **POST, PUT et DELETE permettent de gérer le contenu dynamiquement !**  

---

## **5. Consommer une API GraphQL avec `graphql-request`**  

📌 **Pourquoi GraphQL ?**  
✔️ **Récupérer uniquement les données nécessaires (optimisation des performances).**  
✔️ **Éviter les appels multiples à différentes routes REST.**  
✔️ **Flexible et efficace pour des applications complexes.**  

### **1️⃣ Installer `graphql-request`**  
```sh
npm install graphql-request
```

### **2️⃣ Créer un fichier `graphql.js`**  
```js
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://countries.trevorblades.com");

export async function getCountries() {
  const query = gql`
    {
      countries {
        code
        name
        emoji
      }
    }
  `;

  return await client.request(query);
}
```

### **3️⃣ Utiliser GraphQL dans `App.svelte`**  
```svelte
<script>
  import { getCountries } from "./graphql.js";
  let countries = [];

  async function chargerPays() {
    countries = await getCountries();
  }
</script>

<button on:click={chargerPays}>Charger les pays</button>

<ul>
  {#each countries.countries as country}
    <li>{country.emoji} {country.name} ({country.code})</li>
  {/each}
</ul>
```
✅ **GraphQL permet d’obtenir les données en une seule requête, sans overfetching !**  

---

## **6. Comparaison REST vs GraphQL**  

| Critère | REST | GraphQL |
|---------|------|---------|
| **Nombre de requêtes** | Plusieurs endpoints | Une seule requête |
| **Données récupérées** | Fixe (ex : `/articles`) | Personnalisable (ex : `{ titre, auteur }`) |
| **Performance** | Peut être lent si trop de requêtes | Optimisé pour le client |
| **Complexité** | Simple pour les petites APIs | Mieux pour les grandes applications |

✅ **REST est simple et facile à implémenter.**  
✅ **GraphQL est plus flexible et performant pour des projets complexes.**  

---

## **7. Résumé et Bonnes Pratiques**  

✔️ **Utiliser `fetch()` pour consommer des APIs REST.**  
✔️ **Gérer les données globalement avec un `store` (`writable()`).**  
✔️ **Envoyer des données avec `POST`, `PUT`, `DELETE`.**  
✔️ **Utiliser GraphQL pour optimiser les requêtes et éviter l’overfetching.**  
✔️ **Toujours gérer les erreurs (`try/catch`) pour éviter les bugs.**  

---

## **8. Conclusion**  

✅ **Svelte facilite l’intégration des APIs REST et GraphQL avec `fetch()`.**  
✅ **Les `stores` permettent de centraliser les données récupérées.**  
✅ **REST est plus simple à mettre en place, GraphQL est plus efficace pour les gros projets.**  
✅ **Avec ces outils, vous pouvez connecter Svelte à n’importe quelle API !** 🚀  

---

### **Prochain Chapitre : Utilisation de WebSockets en Svelte !** 🔥 Veux-tu que je commence la rédaction ? 😊
