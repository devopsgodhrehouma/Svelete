# **Chapitre 11 - Gestion des Styles et du CSS en Svelte**  

---

## **1. Introduction : Comment styliser une application Svelte ?**  

Svelte propose plusieurs façons d’ajouter du CSS :  
1. **Styles locaux** → Styles spécifiques à un composant (`<style>` dans un fichier `.svelte`).  
2. **Styles globaux** → Affectent toute l’application (`<style>` dans `App.svelte` ou un fichier CSS externe).  
3. **Classes dynamiques** → Modifier l’apparence en fonction d’une variable (`class:`).  
4. **Bind avec `bind:class`** → Associer une classe à une variable.  
5. **Utilisation de frameworks CSS** → Bootstrap, Tailwind, etc.  

Dans ce chapitre, nous allons explorer **chacune de ces méthodes en profondeur**.

---

## **2. Ajouter des Styles Locaux dans un Composant**  

📌 **Svelte permet d’écrire du CSS directement dans un composant `.svelte`.**  

### **Exemple : Appliquer un style uniquement à un composant**  

```svelte
<script>
  let message = "Bonjour, Svelte !";
</script>

<h1>{message}</h1>

<style>
  h1 {
    color: blue;
    font-size: 24px;
    font-weight: bold;
  }
</style>
```

✅ **Explication :**  
- **Les styles sont encapsulés**, c’est-à-dire qu’ils ne s’appliquent **qu’à ce fichier `.svelte`**.  
- **Ce `h1` ne sera pas affecté par un autre `h1` ailleurs.**  

---

## **3. Ajouter des Styles Globaux**  

📌 **Les styles locaux ne s’appliquent qu’au composant. Pour des styles globaux, utilisez `:global()`.**  

### **Exemple : Appliquer un style à tous les `h1` du projet**  

```svelte
<style>
  :global(h1) {
    font-family: Arial, sans-serif;
    color: darkgreen;
  }
</style>
```

✅ **Tous les `h1` de l’application auront ce style.**  

---

## **4. Utiliser un Fichier CSS Externe**  

Svelte permet aussi **d’inclure un fichier CSS externe** pour styliser toute l’application.  

### **Étape 1 : Créer un fichier `styles.css`**  
Dans `src/`, créez un fichier `styles.css` et ajoutez ce code :  

```css
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}
```

### **Étape 2 : Importer `styles.css` dans `App.svelte`**  

```svelte
<script>
  import "./styles.css";
</script>

<h1>Bienvenue sur mon site !</h1>
```

✅ **Le CSS externe est appliqué à toute l’application.**  

---

## **5. Ajouter des Classes Dynamiques (`class:`)**  

Svelte permet d’ajouter **des classes dynamiques** en fonction d’une variable.  

### **Exemple : Changer la couleur du texte dynamiquement**  

```svelte
<script>
  let actif = false;
</script>

<p class:rouge={actif}>Ce texte change de couleur</p>
<button on:click={() => actif = !actif}>Changer Couleur</button>

<style>
  .rouge {
    color: red;
  }
</style>
```

✅ **Si `actif = true`, la classe `rouge` est appliquée.**  

---

## **6. Appliquer Plusieurs Classes avec `class`**  

On peut aussi **ajouter plusieurs classes conditionnellement**.  

### **Exemple : Appliquer plusieurs classes en fonction d’un état**  

```svelte
<script>
  let estRouge = true;
  let estGras = false;
</script>

<p class:rouge={estRouge} class:gras={estGras}>Texte stylisé</p>

<button on:click={() => estRouge = !estRouge}>Changer Couleur</button>
<button on:click={() => estGras = !estGras}>Changer Gras</button>

<style>
  .rouge {
    color: red;
  }
  .gras {
    font-weight: bold;
  }
</style>
```

✅ **Les classes sont ajoutées dynamiquement en fonction des variables.**  

---

## **7. Associer une Classe Dynamique avec `bind:class`**  

Si une variable contient une classe, on peut la **lier directement** à un élément.  

### **Exemple : Basculer entre deux thèmes (`sombre` et `clair`)**  

```svelte
<script>
  let theme = "clair";
</script>

<div bind:class={theme}>
  <p>Mode actuel : {theme}</p>
  <button on:click={() => theme = theme === "clair" ? "sombre" : "clair"}>
    Changer de thème
  </button>
</div>

<style>
  .clair {
    background-color: white;
    color: black;
  }
  .sombre {
    background-color: black;
    color: white;
  }
</style>
```

✅ **L’élément change de style en fonction du `theme`.**  

---

## **8. Utiliser des Styles en Ligne avec `style="..."`**  

On peut aussi utiliser des **styles en ligne** en Svelte.  

### **Exemple : Changer la taille d’un texte dynamiquement**  

```svelte
<script>
  let taille = 16;
</script>

<p style="font-size: {taille}px;">Texte ajustable</p>
<button on:click={() => taille += 2}>Augmenter la taille</button>
<button on:click={() => taille -= 2}>Diminuer la taille</button>
```

✅ **Le texte grandit ou rétrécit en cliquant sur les boutons.**  

---

## **9. Utiliser des Frameworks CSS (Bootstrap, Tailwind, etc.)**  

📌 **Exemple : Ajouter Bootstrap à un projet Svelte**  

### **Étape 1 : Installer Bootstrap via npm**  
```sh
npm install bootstrap
```

### **Étape 2 : Importer Bootstrap dans `App.svelte`**  
```svelte
<script>
  import "bootstrap/dist/css/bootstrap.min.css";
</script>

<button class="btn btn-primary">Bouton Bootstrap</button>
```

✅ **Bootstrap est maintenant disponible dans tout le projet !**  

---

## **10. Comparaison des Différentes Méthodes de Stylisation**  

| Méthode | Quand l’utiliser ? | Exemple |
|---------|------------------|---------|
| **CSS Local** (`<style>`) | Styles propres à un composant | `<style> h1 { color: blue; } </style>` |
| **CSS Global (`:global()`)** | Styles appliqués à toute l’application | `:global(body) { background: white; }` |
| **Fichier CSS Externe** | Chargement d’un style global | `import "./styles.css";` |
| **Classes Dynamiques (`class:`)** | Ajouter une classe en fonction d’un état | `class:rouge={estRouge}` |
| **`bind:class`** | Lier une classe à une variable | `bind:class={theme}` |
| **Styles en ligne (`style=""`)** | Modifier une propriété dynamiquement | `style="color: {couleur};"` |
| **Frameworks CSS (Bootstrap, Tailwind)** | Ajouter un design rapide | `class="btn btn-primary"` |

---

## **11. Conclusion**  

✅ **Les styles locaux permettent d’éviter les conflits avec d’autres composants.**  
✅ **On peut appliquer des styles globaux avec `:global()` ou un fichier CSS.**  
✅ **Les classes dynamiques (`class:`) permettent d’ajouter des styles en fonction d’un état.**  
✅ **Les frameworks CSS comme Bootstrap ou Tailwind peuvent être intégrés facilement.**  

---

### **Prochain chapitre : Animation et Transitions en Svelte !** 🚀
