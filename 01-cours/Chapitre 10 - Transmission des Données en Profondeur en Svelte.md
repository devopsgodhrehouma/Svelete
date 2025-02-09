# **Chapitre 09 - Transmission des Données en Profondeur en Svelte**  

---

## **1. Introduction : Comment transmettre des données en Svelte ?**  

Dans une application Svelte, les **données** peuvent être transmises **d’un composant parent à un enfant, puis à ses propres enfants, et ainsi de suite**.  

📌 **Les trois méthodes principales de transmission des données en profondeur :**  
1. **Les props (`export let`)** → Permet de transmettre des données d’un parent à un enfant.  
2. **Les événements (`createEventDispatcher`)** → Permet à un enfant d’envoyer des données à son parent.  
3. **Les stores (`writable()`, `readable()`)** → Permet de partager des données **sans passer par tous les niveaux de composants**.  

Dans ce chapitre, nous allons explorer **chacune de ces méthodes en profondeur**.

---

## **2. Transmission des Données avec les Props (`export let`)**  

Un parent peut **envoyer des données** à un composant enfant en utilisant **les props** (`export let`).  

📌 **Cas simple : Un parent transmet une valeur à un enfant**  

### **1️⃣ Créer un composant enfant `Profil.svelte`**  
```svelte
<script>
  export let nom;
  export let age;
</script>

<p>{nom} a {age} ans.</p>
```

### **2️⃣ Utiliser `Profil.svelte` dans `App.svelte`**  
```svelte
<script>
  import Profil from "./Profil.svelte";
</script>

<Profil nom="Alice" age={25} />
<Profil nom="Bob" age={30} />
```

✅ **Chaque composant `Profil` reçoit un nom et un âge différents.**  

---

## **3. Propagation des Données à Plusieurs Niveaux**  

Si **un composant enfant doit transmettre des données plus loin** à son propre enfant, il doit **passer les props à son tour**.

📌 **Exemple : Transmission de `nom` depuis `App.svelte` jusqu’à `Nom.svelte` via `Profil.svelte`**  

### **1️⃣ Créer un composant `Nom.svelte` (dernier niveau)**  
```svelte
<script>
  export let nom;
</script>

<p>Nom : {nom}</p>
```

### **2️⃣ Modifier `Profil.svelte` pour passer le nom à `Nom.svelte`**  
```svelte
<script>
  import Nom from "./Nom.svelte";
  export let nom;
  export let age;
</script>

<Nom nom={nom} />
<p>Âge : {age} ans</p>
```

### **3️⃣ Modifier `App.svelte` pour utiliser `Profil.svelte`**  
```svelte
<script>
  import Profil from "./Profil.svelte";
</script>

<Profil nom="Alice" age={25} />
<Profil nom="Bob" age={30} />
```

✅ **Les données voyagent de `App.svelte` → `Profil.svelte` → `Nom.svelte`**.  
✅ **Mais si les niveaux de profondeur sont trop nombreux, cette méthode devient difficile à gérer.**  

---

## **4. Transmettre des Données en Remontant avec `createEventDispatcher()`**  

Si un **composant enfant** doit envoyer des données **vers son parent**, il ne peut **pas directement modifier une prop**.  
Il doit **émettre un événement** que le parent écoutera.  

📌 **Cas d’usage : Un formulaire dans un enfant qui envoie les données au parent.**  

### **1️⃣ Créer `Formulaire.svelte` (composant enfant)**  
```svelte
<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let nom = "";
  let age = "";
  
  function envoyer() {
    dispatch("soumission", { nom, age });
  }
</script>

<input type="text" bind:value={nom} placeholder="Nom" />
<input type="number" bind:value={age} placeholder="Âge" />
<button on:click={envoyer}>Envoyer</button>
```

### **2️⃣ Dans `App.svelte`, écouter l’événement `soumission`**  
```svelte
<script>
  import Formulaire from "./Formulaire.svelte";
  let utilisateur = { nom: "", age: "" };

  function miseAJour(event) {
    utilisateur = event.detail;
  }
</script>

<Formulaire on:soumission={miseAJour} />

<p>Utilisateur : {utilisateur.nom}, Âge : {utilisateur.age}</p>
```

✅ **Explication :**  
- `dispatch("soumission", { nom, age })` → Envoie un événement avec les valeurs.  
- `on:soumission={miseAJour}` → Capture les données et les met à jour dans `App.svelte`.  

---

## **5. Transmettre des Données à Tous les Enfants avec `setContext()` et `getContext()`**  

Quand **plusieurs composants enfants** ont besoin des mêmes données, il est **compliqué de passer des props à chaque niveau**.  
Svelte propose une **solution plus élégante** avec `setContext()` et `getContext()`.  

📌 **Cas d’usage : Un `Thème` (clair/sombre) partagé par plusieurs composants enfants.**  

### **1️⃣ Définir un contexte dans `App.svelte`**  
```svelte
<script>
  import { setContext } from "svelte";
  
  let theme = "sombre";
  setContext("theme", theme);
</script>

<h1>Application avec Thème</h1>
```

### **2️⃣ Accéder au contexte dans `Enfant.svelte`**  
```svelte
<script>
  import { getContext } from "svelte";
  let theme = getContext("theme");
</script>

<p>Thème actif : {theme}</p>
```

✅ **Tous les enfants ont accès à `theme` sans passer par des props !**  

---

## **6. Utiliser un Store (`writable()`) pour Partager des Données Globalement**  

Si l’application utilise des données **partagées entre plusieurs composants**, il est plus simple d’utiliser un **store**.  

📌 **Cas d’usage : Un compteur accessible depuis plusieurs composants.**  

### **1️⃣ Définir un store global dans `store.js`**  
```js
import { writable } from "svelte/store";
export const compteur = writable(0);
```

### **2️⃣ Utiliser `$compteur` dans `Compteur.svelte`**  
```svelte
<script>
  import { compteur } from "./store.js";
</script>

<p>Compteur : {$compteur}</p>
<button on:click={() => compteur.update(n => n + 1)}>+1</button>
```

### **3️⃣ Afficher le compteur partout sans props**  
Dans **`App.svelte`** et d'autres composants :  
```svelte
<script>
  import { compteur } from "./store.js";
</script>

<h2>Valeur du compteur : {$compteur}</h2>
```

✅ **Tous les composants affichent le même compteur sans avoir besoin de props !**  

---

## **7. Comparaison des Différentes Méthodes**  

| Méthode | Quand l’utiliser ? | Exemple |
|---------|------------------|---------|
| **Props (`export let`)** | Transmission simple de parent à enfant | `nom={nom}` |
| **Événements (`createEventDispatcher`)** | Envoi de l’enfant vers le parent | `on:soumission={miseAJour}` |
| **Context API (`setContext/getContext`)** | Partage de valeurs dans une hiérarchie de composants | `getContext("theme")` |
| **Stores (`writable()`)** | Stockage global des données réactives | `$compteur` |

---

## **8. Conclusion**  

✅ **Les props sont utiles pour transmettre des données d’un parent à un enfant.**  
✅ **Les événements permettent aux enfants d’envoyer des données aux parents.**  
✅ **`setContext()` permet de partager des valeurs à travers une hiérarchie.**  
✅ **Les stores offrent un moyen simple d’avoir des données globales réactives.**  

---

### **Prochain chapitre : Gestion des styles et du CSS en Svelte !** 🚀
