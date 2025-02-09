# **Chapitre 09 - Stockage et Gestion de l’État avec les Stores en Svelte**  

---

## **1. Introduction aux Stores en Svelte**  

En Svelte, les **stores** permettent de **partager des données entre plusieurs composants**, sans avoir à les passer manuellement en props.  

📌 **Pourquoi utiliser des stores ?**  
✅ Évite de devoir **passer des props** de parent à enfant.  
✅ Permet d’avoir **des variables globales accessibles partout**.  
✅ Svelte met automatiquement à jour les composants qui utilisent un store.  

---

## **2. Créer un Store Simple avec `writable()`**  

Svelte propose `writable()`, une fonction pour créer un store réactif.  

📌 **Étape 1 : Créer un fichier `store.js` pour gérer le stockage**  

Dans `src/`, créez un fichier **`store.js`** et ajoutez ce code :  

```js
import { writable } from "svelte/store";

export const compteur = writable(0);
```

📌 **Étape 2 : Utiliser le store dans `App.svelte`**  

```svelte
<script>
  import { compteur } from "./store.js";
</script>

<h1>Compteur : {$compteur}</h1>
<button on:click={() => compteur.update(n => n + 1)}>+1</button>
<button on:click={() => compteur.update(n => n - 1)}>-1</button>
```

✅ **Explication** :  
- **`writable(0)`** crée une variable réactive avec une valeur initiale `0`.  
- **`$compteur`** permet d’accéder directement à la valeur du store.  
- **`compteur.update(n => n + 1)`** met à jour le compteur sans props.  

---

## **3. Lire et Modifier un Store dans un Composant Enfant**  

### **Étape 1 : Créer un composant enfant `Compteur.svelte`**  

📌 **Ajoutez ce code dans `Compteur.svelte`**  

```svelte
<script>
  import { compteur } from "./store.js";
</script>

<h2>Valeur actuelle : {$compteur}</h2>
<button on:click={() => compteur.update(n => n + 1)}>Augmenter</button>
<button on:click={() => compteur.update(n => n - 1)}>Diminuer</button>
```

✅ **Le store `compteur` est accessible partout** sans props !  

📌 **Utilisez `Compteur.svelte` dans `App.svelte`**  

```svelte
<script>
  import Compteur from "./Compteur.svelte";
</script>

<h1>Bienvenue</h1>
<Compteur />
```

✅ **Les composants `App.svelte` et `Compteur.svelte` utilisent le même store.**  

---

## **4. Stocker des Objets avec `writable()`**  

Un store peut contenir **des objets**, pas seulement des nombres.  

📌 **Modifier `store.js` pour gérer un utilisateur**  

```js
import { writable } from "svelte/store";

export const utilisateur = writable({
  nom: "Alice",
  age: 25
});
```

📌 **Afficher les infos de l’utilisateur dans `App.svelte`**  

```svelte
<script>
  import { utilisateur } from "./store.js";
</script>

<p>Nom : {$utilisateur.nom}</p>
<p>Âge : {$utilisateur.age}</p>
<button on:click={() => utilisateur.update(u => ({ ...u, age: u.age + 1 }))}>
  Vieillir
</button>
```

✅ **Explication** :  
- **`{$utilisateur.nom}`** → Accède aux données du store.  
- **`utilisateur.update(u => ({ ...u, age: u.age + 1 }))`** → Modifie l’âge tout en gardant les autres valeurs intactes.  

---

## **5. Utiliser `subscribe()` pour Accéder à un Store sans `$`**  

Dans du **JavaScript classique**, on utilise `subscribe()`.  

📌 **Exemple de `subscribe()`**  

```svelte
<script>
  import { utilisateur } from "./store.js";

  let nomUtilisateur = "";

  utilisateur.subscribe(u => {
    nomUtilisateur = u.nom;
  });
</script>

<p>Bonjour, {nomUtilisateur} !</p>
```

✅ **`subscribe()` permet de récupérer la valeur du store et de la stocker localement.**  

---

## **6. Créer un Store avec `readable()` (Valeur Fixe)**  

Un **store `readable()`** est utile si on ne veut **pas modifier la valeur**.  

📌 **Exemple : Date et heure automatique**  

```js
import { readable } from "svelte/store";

export const heure = readable(new Date().toLocaleTimeString(), set => {
  const interval = setInterval(() => {
    set(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(interval);
});
```

📌 **Afficher l’heure en temps réel dans `App.svelte`**  

```svelte
<script>
  import { heure } from "./store.js";
</script>

<p>Heure actuelle : {$heure}</p>
```

✅ **L’heure est mise à jour automatiquement toutes les secondes.**  

---

## **7. Stocker des Données Localement avec `localStorage`**  

On peut **sauvegarder un store** dans le **`localStorage`** pour conserver les données après rechargement.  

📌 **Modifier `store.js` pour un compteur persistant**  

```js
import { writable } from "svelte/store";

const sauvegarde = localStorage.getItem("compteur");
export const compteur = writable(sauvegarde ? Number(sauvegarde) : 0);

compteur.subscribe(value => {
  localStorage.setItem("compteur", value);
});
```

📌 **Utilisation dans `App.svelte`**  

```svelte
<script>
  import { compteur } from "./store.js";
</script>

<h1>Compteur : {$compteur}</h1>
<button on:click={() => compteur.update(n => n + 1)}>+1</button>
<button on:click={() => compteur.update(n => n - 1)}>-1</button>
```

✅ **Le compteur reste sauvegardé après un rechargement de la page !**  

---

## **8. Résumé des Stores en Svelte**  

| Type de Store | Explication |
|--------------|------------|
| `writable(valeurInitiale)` | Crée un store modifiable |
| `$store` | Accède directement à la valeur |
| `store.subscribe(fonction)` | Écoute les changements du store |
| `store.set(valeur)` | Modifie la valeur du store |
| `store.update(f => modification)` | Met à jour une valeur existante |
| `readable(valeur, set => { ... })` | Crée un store en lecture seule |

---

## **9. Conclusion**  

✅ **Les stores permettent de partager des données entre composants sans props**.  
✅ **`writable()` est le plus utilisé pour les variables dynamiques**.  
✅ **On peut stocker des objets et des tableaux** dans un store.  
✅ **On peut sauvegarder les valeurs avec `localStorage`**.  

---

### **Prochain chapitre : Gestion des styles et du CSS en Svelte !** 🚀
