# **Chapitre 18 - LocalStorage et Persistance des Données en Svelte** 💾  

---

## **1. Introduction : Pourquoi utiliser LocalStorage en Svelte ?**  

Lorsque l'utilisateur ferme l'application, les **données stockées en mémoire sont perdues**.  
📌 **Solution : Sauvegarder les données localement avec LocalStorage**  

✅ **Permet de stocker des données même après le rechargement**  
✅ **Pratique pour enregistrer des préférences utilisateur (mode sombre, langue, etc.)**  
✅ **Facile à utiliser avec les stores Svelte (`writable()`)**  

---

## **2. Lire et Écrire des Données dans LocalStorage**  

📌 **LocalStorage permet de stocker des données sous forme de texte (`string`).**  

### **Exemple : Sauvegarder un nom d’utilisateur**  

```svelte
<script>
  let nom = localStorage.getItem("nom") || "";

  function sauvegarderNom() {
    localStorage.setItem("nom", nom);
  }
</script>

<input type="text" bind:value={nom} placeholder="Votre nom" />
<button on:click={sauvegarderNom}>Sauvegarder</button>

<p>Nom sauvegardé : {nom}</p>
```

✅ **Le nom est conservé après rechargement de la page !**  

---

## **3. Utiliser un `store` pour gérer LocalStorage**  

📌 **Svelte propose les `stores` pour gérer les données globalement.**  

### **1️⃣ Créer un `store` persistant (`localStore.js`)**  

```js
import { writable } from "svelte/store";

export function creerLocalStore(nomCle, valeurInitiale) {
  const store = writable(localStorage.getItem(nomCle) || valeurInitiale);

  store.subscribe((val) => {
    localStorage.setItem(nomCle, val);
  });

  return store;
}

export const theme = creerLocalStore("theme", "clair");
```

### **2️⃣ Utiliser le store dans `App.svelte`**  

```svelte
<script>
  import { theme } from "./localStore.js";
</script>

<button on:click={() => theme.set($theme === "clair" ? "sombre" : "clair")}>
  Changer de Thème
</button>

<p>Thème actuel : {$theme}</p>
```

✅ **Le thème reste enregistré même après un rechargement.**  

---

## **4. Sauvegarder des Données Complexes avec `JSON.stringify()`**  

📌 **LocalStorage ne stocke que des chaînes de caractères (`string`).**  
💡 **On doit convertir les objets en JSON (`JSON.stringify()` / `JSON.parse()`).**  

### **Exemple : Sauvegarder une liste de tâches**  

```svelte
<script>
  let taches = JSON.parse(localStorage.getItem("taches")) || [];
  let nouvelleTache = "";

  function ajouterTache() {
    taches = [...taches, nouvelleTache];
    localStorage.setItem("taches", JSON.stringify(taches));
    nouvelleTache = "";
  }
</script>

<input type="text" bind:value={nouvelleTache} placeholder="Nouvelle tâche" />
<button on:click={ajouterTache}>Ajouter</button>

<ul>
  {#each taches as tache}
    <li>{tache}</li>
  {/each}
</ul>
```

✅ **Les tâches restent enregistrées même après rechargement de la page.**  

---

## **5. Supprimer des Données de LocalStorage**  

📌 **On peut supprimer un élément spécifique ou vider tout LocalStorage.**  

### **Exemple : Supprimer une tâche et tout réinitialiser**  

```svelte
<script>
  let taches = JSON.parse(localStorage.getItem("taches")) || [];

  function supprimerTache(index) {
    taches.splice(index, 1);
    localStorage.setItem("taches", JSON.stringify(taches));
  }

  function resetLocalStorage() {
    localStorage.clear();
    taches = [];
  }
</script>

<ul>
  {#each taches as tache, i}
    <li>
      {tache} <button on:click={() => supprimerTache(i)}>❌</button>
    </li>
  {/each}
</ul>

<button on:click={resetLocalStorage}>Réinitialiser</button>
```

✅ **Les données sont bien supprimées de LocalStorage.**  

---

## **6. Comparaison entre LocalStorage et SessionStorage**  

| Fonctionnalité | LocalStorage | SessionStorage |
|---------------|-------------|---------------|
| **Durée** | Persistant après rechargement | Effacé à la fermeture du navigateur |
| **Capacité** | 5 Mo | 5 Mo |
| **Scope** | Partagé entre les onglets | Valable uniquement pour l’onglet actuel |
| **Utilisation** | Sauvegarde des préférences, listes de données | Données temporaires, formulaires |

📌 **`SessionStorage` fonctionne exactement comme `LocalStorage`, sauf qu’il est supprimé quand l’utilisateur ferme l’onglet.**  

---

## **7. Utiliser `SessionStorage` au lieu de `LocalStorage`**  

📌 **Même fonctionnement, mais les données sont effacées à la fermeture de l’onglet.**  

```svelte
<script>
  let note = sessionStorage.getItem("note") || "";

  function sauvegarderNote() {
    sessionStorage.setItem("note", note);
  }
</script>

<input type="text" bind:value={note} placeholder="Note temporaire" />
<button on:click={sauvegarderNote}>Sauvegarder</button>

<p>Note : {note}</p>
```

✅ **La note disparaît si l’onglet est fermé.**  

---

## **8. Bonnes Pratiques pour LocalStorage en Svelte**  

✔️ **Utilisez `try/catch` pour éviter les erreurs si LocalStorage n’est pas disponible.**  
✔️ **Utilisez `JSON.stringify()` et `JSON.parse()` pour les objets et tableaux.**  
✔️ **Utilisez un `store` pour centraliser la gestion des données.**  
✔️ **Évitez d’y stocker des données sensibles (ex: mots de passe).**  

---

## **9. Résumé**  

| Fonction | LocalStorage |
|----------|-------------|
| **Sauvegarder une valeur** | `localStorage.setItem("clé", "valeur")` |
| **Lire une valeur** | `localStorage.getItem("clé")` |
| **Supprimer une valeur** | `localStorage.removeItem("clé")` |
| **Vider tout LocalStorage** | `localStorage.clear()` |
| **Stocker un objet** | `JSON.stringify(objet)` |
| **Lire un objet** | `JSON.parse(localStorage.getItem("clé"))` |

---

## **10. Conclusion**  

✅ **LocalStorage est idéal pour stocker des données persistantes** (préférences, thèmes, liste de tâches).  
✅ **SessionStorage est utile pour stocker des données temporaires** (champs de formulaires).  
✅ **Svelte facilite la gestion de LocalStorage avec `stores`.**  
✅ **Pensez à bien convertir vos données avec `JSON.stringify()` et `JSON.parse()`.**  

---

### **Prochain Chapitre : Création d'un Plugin Svelte !** 
