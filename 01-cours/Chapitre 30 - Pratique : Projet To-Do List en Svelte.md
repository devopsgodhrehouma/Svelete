# **Chapitre 30 - Pratique : Projet To-Do List en Svelte ✅**  

Dans ce chapitre, nous allons créer **une application To-Do List en Svelte** qui inclut plusieurs notions vues précédemment :  

✅ **Composants et gestion de l’état (`store`)**  
✅ **Stockage des tâches en `LocalStorage` pour la persistance**  
✅ **Transitions et animations pour un rendu fluide**  
✅ **Gestion des formulaires et validation**  
✅ **Filtrage des tâches (`terminées`, `en cours`)**  

---

## **1. Présentation du Projet : "Svelte To-Do List" 📝**  

Notre **application To-Do List** permettra de :  
- **Ajouter** des tâches.  
- **Supprimer** des tâches.  
- **Marquer des tâches comme terminées.**  
- **Filtrer les tâches (toutes, en cours, terminées).**  
- **Sauvegarder les tâches dans `LocalStorage` pour les conserver après un rechargement.**  

📌 **Technologies utilisées :**  
✔️ **Svelte** (Framework UI)  
✔️ **Svelte Stores (`writable()`)** pour gérer l’état  
✔️ **LocalStorage** pour sauvegarder les tâches  
✔️ **Transitions (`fade`, `slide`)** pour fluidifier l’interface  

---

## **2. Initialisation du Projet Svelte**  

📌 **Créer un projet Svelte avec Vite**  

```sh
npm create vite@latest svelte-todo --template svelte
cd svelte-todo
npm install
```

📌 **Lancer le projet**  

```sh
npm run dev
```

✅ **Votre projet Svelte est maintenant prêt !**  

---

## **3. Création du `store` pour gérer les Tâches 🗂️**  

Nous allons utiliser **un store (`writable()`)** pour gérer les tâches globalement.  

📌 **Créer un fichier `src/lib/stores.js`**  

```js
import { writable } from "svelte/store";

// Charger les tâches depuis LocalStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Créer le store des tâches
export const tasks = writable(savedTasks);

// Sauvegarder les tâches à chaque mise à jour
tasks.subscribe((t) => {
  localStorage.setItem("tasks", JSON.stringify(t));
});

// Fonction pour ajouter une tâche
export function addTask(text) {
  tasks.update((t) => [...t, { id: Date.now(), text, completed: false }]);
}

// Fonction pour supprimer une tâche
export function deleteTask(id) {
  tasks.update((t) => t.filter(task => task.id !== id));
}

// Fonction pour basculer l’état d’une tâche (terminée / en cours)
export function toggleTask(id) {
  tasks.update((t) =>
    t.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
  );
}
```

✅ **Le store permet d’ajouter, supprimer et modifier l’état des tâches !**  

---

## **4. Interface Principale (`App.svelte`)**  

📌 **Ouvrir `src/App.svelte` et remplacer le contenu par ceci :**  

```svelte
<script>
  import { tasks, addTask, deleteTask, toggleTask } from "./lib/stores.js";
  import { fade } from "svelte/transition";

  let newTask = "";
  let filter = "all"; // all, active, completed

  function handleSubmit() {
    if (newTask.trim() === "") return;
    addTask(newTask);
    newTask = "";
  }
</script>

<main>
  <h1>📝 To-Do List</h1>

  <!-- Formulaire d'ajout -->
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={newTask} placeholder="Nouvelle tâche..." />
    <button type="submit">Ajouter</button>
  </form>

  <!-- Filtres -->
  <div class="filters">
    <button on:click={() => filter = "all"} class:selected={filter === "all"}>Toutes</button>
    <button on:click={() => filter = "active"} class:selected={filter === "active"}>En cours</button>
    <button on:click={() => filter = "completed"} class:selected={filter === "completed"}>Terminées</button>
  </div>

  <!-- Liste des tâches -->
  <ul>
    {#each $tasks as task (task.id)}
      {#if filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed)}
        <li transition:fade>
          <input type="checkbox" checked={task.completed} on:change={() => toggleTask(task.id)} />
          <span class:completed={task.completed}>{task.text}</span>
          <button on:click={() => deleteTask(task.id)}>❌</button>
        </li>
      {/if}
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    max-width: 400px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  form {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  }

  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
  }

  button {
    padding: 8px 12px;
    cursor: pointer;
  }

  .filters {
    margin-bottom: 10px;
  }

  .filters button {
    margin-right: 5px;
    padding: 6px 10px;
    border: none;
    cursor: pointer;
    background-color: #ddd;
  }

  .filters button.selected {
    background-color: #555;
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
  }

  li .completed {
    text-decoration: line-through;
    color: gray;
  }

  li button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
```

✅ **Ce composant affiche la liste des tâches, les filtre et permet d'ajouter, terminer ou supprimer une tâche.**  

---

## **5. Déploiement du Projet sur Vercel 🚀**  

📌 **1️⃣ Installer Vercel CLI**  

```sh
npm install -g vercel
```

📌 **2️⃣ Déployer l’application**  

```sh
vercel
```

📌 **Suivez les instructions et obtenez une URL publique (`https://svelte-todo.vercel.app`).**  

✅ **Le projet est maintenant en ligne !**  

---

## **6. Résumé des Fonctionnalités du Projet**  

✔️ **Ajout, suppression et modification des tâches**  
✔️ **Filtrage des tâches (toutes, en cours, terminées)**  
✔️ **Stockage des tâches avec `LocalStorage`**  
✔️ **Utilisation d’un `store` (`writable()`) pour la gestion de l’état**  
✔️ **Transitions (`fade`) pour rendre les changements fluides**  
✔️ **Déploiement sur Vercel**  

---

## **7. Conclusion 🎉**  

🚀 **Félicitations ! Vous avez construit une application To-Do List complète avec Svelte.**  
✅ **Vous pouvez maintenant améliorer l’application avec :**  
- **Un mode sombre**  
- **Une intégration avec Firebase pour synchroniser les tâches en temps réel**  
- **Des animations avancées pour les ajouts/suppressions**  

---

📌 **Prochain Projet : Un Dashboard interactif avec Svelte !** Veux-tu que je commence la rédaction ? 😊
