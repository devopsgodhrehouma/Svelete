# **Chapitre 15 - API et Données Externes en Svelte**  

---

## **1. Introduction : Pourquoi utiliser des API en Svelte ?**  

Dans une application moderne, il est **essentiel** de récupérer des données dynamiques à partir d’une **API externe** (ex: REST, GraphQL, Firebase).  
Svelte facilite la gestion des API en utilisant `fetch()` et des **techniques réactives** pour afficher et mettre à jour les données.  

📌 **Ce que nous allons apprendre dans ce chapitre :**  
✅ Récupérer des données avec `fetch()`  
✅ Afficher dynamiquement des données JSON  
✅ Gérer les erreurs et les états de chargement  
✅ Envoyer des données (`POST`, `PUT`, `DELETE`)  
✅ Utiliser un **store Svelte** pour stocker les données d’une API  

---

## **2. Récupérer des Données avec `fetch()`**  

📌 **La fonction `fetch()` permet d’envoyer une requête HTTP et de récupérer les données JSON.**  

### **Exemple : Récupérer une blague aléatoire avec une API**  

```svelte
<script>
  let blague = "";

  async function obtenirBlague() {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await res.json();
    blague = data.value;
  }
</script>

<button on:click={obtenirBlague}>Obtenir une Blague</button>
<p>{blague}</p>
```

✅ **Explication :**  
- **`fetch()`** envoie une requête HTTP.  
- **`await res.json()`** transforme la réponse en JSON.  
- **Le texte est mis à jour dynamiquement dans `{blague}`**.  

---

## **3. Afficher une Liste d’Éléments depuis une API**  

📌 **On peut récupérer et afficher plusieurs éléments dynamiquement avec `{#each}`.**  

### **Exemple : Récupérer une liste d’utilisateurs avec l’API JSONPlaceholder**  

```svelte
<script>
  let utilisateurs = [];

  async function chargerUtilisateurs() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    utilisateurs = await res.json();
  }
</script>

<button on:click={chargerUtilisateurs}>Charger les Utilisateurs</button>

<ul>
  {#each utilisateurs as user}
    <li>{user.name} - {user.email}</li>
  {/each}
</ul>
```

✅ **Explication :**  
- **On stocke les utilisateurs dans `utilisateurs`.**  
- **Chaque utilisateur est affiché dynamiquement avec `{#each}`.**  
- **Le bouton charge les données au clic.**  

---

## **4. Gérer les Erreurs et l’État de Chargement**  

📌 **Lorsqu’on interroge une API, il est important de gérer les erreurs et l’état `loading`.**  

### **Exemple : Gérer les erreurs et afficher un message de chargement**  

```svelte
<script>
  let utilisateurs = [];
  let erreur = "";
  let enChargement = false;

  async function chargerUtilisateurs() {
    enChargement = true;
    erreur = "";

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Erreur lors du chargement des données.");
      utilisateurs = await res.json();
    } catch (err) {
      erreur = err.message;
    } finally {
      enChargement = false;
    }
  }
</script>

<button on:click={chargerUtilisateurs} disabled={enChargement}>
  {enChargement ? "Chargement..." : "Charger les Utilisateurs"}
</button>

{#if erreur}
  <p style="color: red;">⚠️ {erreur}</p>
{:else if enChargement}
  <p>🔄 Chargement des utilisateurs...</p>
{:else}
  <ul>
    {#each utilisateurs as user}
      <li>{user.name} - {user.email}</li>
    {/each}
  </ul>
{/if}
```

✅ **Explication :**  
- **`enChargement = true`** → Active l’indicateur de chargement.  
- **`try { ... } catch (err) { ... }`** → Gère les erreurs si `fetch()` échoue.  
- **Le bouton est désactivé (`disabled`) pendant le chargement.**  

---

## **5. Envoyer des Données avec `POST`**  

📌 **On peut aussi envoyer des données à une API avec `POST` pour les enregistrer.**  

### **Exemple : Ajouter un nouvel utilisateur via une API**  

```svelte
<script>
  let nom = "";
  let email = "";
  let message = "";

  async function ajouterUtilisateur() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nom, email: email }),
    });

    if (res.ok) {
      message = "✅ Utilisateur ajouté avec succès !";
    } else {
      message = "⚠️ Erreur lors de l’ajout.";
    }
  }
</script>

<input type="text" bind:value={nom} placeholder="Nom" />
<input type="email" bind:value={email} placeholder="Email" />
<button on:click={ajouterUtilisateur}>Ajouter</button>

<p>{message}</p>
```

✅ **Explication :**  
- **`method: "POST"`** → Envoie une requête pour **ajouter un utilisateur**.  
- **`headers: { "Content-Type": "application/json" }`** → Définit le format des données.  
- **`body: JSON.stringify(...)`** → Envoie les données sous forme JSON.  

---

## **6. Stocker les Données API dans un Store Svelte (`writable()`)**  

📌 **On peut utiliser un store pour garder les données accessibles dans plusieurs composants.**  

### **1️⃣ Créer un Store `utilisateurStore.js`**  

```js
import { writable } from "svelte/store";

export const utilisateurs = writable([]);
```

### **2️⃣ Utiliser le store dans `App.svelte`**  

```svelte
<script>
  import { utilisateurs } from "./utilisateurStore.js";

  async function chargerUtilisateurs() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    utilisateurs.set(await res.json());
  }
</script>

<button on:click={chargerUtilisateurs}>Charger</button>

<ul>
  {#each $utilisateurs as user}
    <li>{user.name} - {user.email}</li>
  {/each}
</ul>
```

✅ **Maintenant, les données sont **globales** et accessibles depuis n’importe quel composant !**  

---

## **7. Résumé des Bonnes Pratiques API en Svelte**  

| Fonction | Explication |
|----------|------------|
| **`fetch()`** | Récupère des données d’une API |
| **`await res.json()`** | Transforme la réponse en JSON |
| **`try/catch`** | Gère les erreurs API |
| **État `loading`** | Indique à l’utilisateur que les données se chargent |
| **`method: "POST"`** | Envoie des données à une API |
| **Stores (`writable()`)** | Stocke les données API globalement |

---

## **8. Conclusion**  

✅ **Svelte simplifie la gestion des API avec `fetch()`.**  
✅ **On peut récupérer et afficher des données dynamiquement.**  
✅ **Les erreurs et le chargement doivent être gérés proprement.**  
✅ **L’envoi de données (`POST`) permet d’interagir avec une API.**  
✅ **Les stores permettent de gérer les données globalement.**  

---

### **Prochain Chapitre : Routage avec SvelteKit !** 🚀
