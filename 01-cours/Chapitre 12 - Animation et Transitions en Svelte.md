# **Chapitre 12 - Animation et Transitions en Svelte**  

---

## **1. Introduction : Pourquoi utiliser les Animations en Svelte ?**  

Les animations et transitions permettent de rendre une interface plus **fluide et attrayante**.  
Svelte intègre des fonctionnalités **puissantes et simples à utiliser** pour gérer les animations, sans avoir besoin d'une bibliothèque externe.

📌 **Deux types d'animations en Svelte :**  
1. **Les transitions (`transition:`)** → Ajout ou suppression fluide d’un élément.  
2. **Les animations (`animate:`)** → Changement de position des éléments dans une liste.  

---

## **2. Ajouter une Transition à un Élément (`transition:`)**  

📌 **Svelte propose plusieurs transitions intégrées :**  
- `fade` → Faire apparaître/disparaître en fondu.  
- `slide` → Faire glisser un élément.  
- `scale` → Faire apparaître avec un effet de zoom.  
- `fly` → Déplacer un élément en changeant l'opacité.  

### **Exemple : Faire apparaître un texte avec `fade`**  

```svelte
<script>
  import { fade } from "svelte/transition";
  let visible = false;
</script>

<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"} le texte
</button>

{#if visible}
  <p transition:fade>Ce texte apparaît et disparaît en fondu.</p>
{/if}
```

✅ **Explication :**  
- **`transition:fade`** → Applique un effet de fondu lors de l’affichage/disparition.  
- **Le texte apparaît/disparaît progressivement au clic.**  

---

## **3. Contrôler la Durée et l’Easing d’une Transition**  

📌 **On peut personnaliser une transition en lui passant des options :**  

### **Exemple : Changer la durée et l’easing d’un `fade`**  

```svelte
<script>
  import { fade } from "svelte/transition";
  let visible = true;
</script>

<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"}
</button>

{#if visible}
  <p transition:fade={{ duration: 1000, easing: cubicOut }}>
    Ce texte disparaît en 1 seconde.
  </p>
{/if}
```

✅ **Explication :**  
- **`duration: 1000`** → La transition dure 1000ms (1 seconde).  
- **`easing: cubicOut`** → Effet d'accélération/décélération fluide.  

---

## **4. Utiliser d’Autres Types de Transitions**  

📌 **Svelte offre plusieurs effets de transition prédéfinis :**  

### **Exemple : Utiliser `slide` et `scale`**  

```svelte
<script>
  import { slide, scale } from "svelte/transition";
  let visible = false;
</script>

<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"}
</button>

{#if visible}
  <p transition:slide>Ce texte glisse.</p>
  <p transition:scale>Ce texte grandit.</p>
{/if}
```

✅ **Explication :**  
- **`slide`** → Fait glisser l’élément.  
- **`scale`** → Change la taille de l’élément.  

---

## **5. Créer une Animation d’Entrée avec `fly`**  

📌 **L’animation `fly` permet de déplacer un élément avec un effet de fondu.**  

### **Exemple : Déplacer un élément vers le bas en entrant**  

```svelte
<script>
  import { fly } from "svelte/transition";
  let visible = false;
</script>

<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"}
</button>

{#if visible}
  <p transition:fly={{ y: 50, duration: 500 }}>Je me déplace vers le bas !</p>
{/if}
```

✅ **Explication :**  
- **`y: 50`** → L’élément part de 50 pixels plus haut.  
- **`duration: 500`** → L’animation dure 500ms.  

---

## **6. Appliquer des Transitions Différentes à l’Entrée et à la Sortie**  

📌 **On peut utiliser `in:` et `out:` pour personnaliser les transitions d’entrée et de sortie.**  

### **Exemple : Différencier l’entrée et la sortie**  

```svelte
<script>
  import { fade, fly } from "svelte/transition";
  let visible = false;
</script>

<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"}
</button>

{#if visible}
  <p in:fade out:fly={{ y: 50 }}>
    Entrée en fondu, sortie en vol !
  </p>
{/if}
```

✅ **Explication :**  
- **`in:fade`** → L’élément apparaît en fondu.  
- **`out:fly`** → L’élément disparaît en glissant vers le bas.  

---

## **7. Animer une Liste d’Éléments (`animate:`)**  

📌 **Svelte permet d’animer des listes qui changent dynamiquement.**  

### **Exemple : Ajouter et supprimer des éléments animés**  

```svelte
<script>
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  let items = ["Pomme", "Banane", "Cerise"];

  function ajouterFruit() {
    items = [...items, "Orange"];
  }

  function supprimerFruit(index) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<button on:click={ajouterFruit}>Ajouter un fruit</button>

<ul>
  {#each items as item, i (item)}
    <li transition:fade animate:flip>
      {item} 
      <button on:click={() => supprimerFruit(i)}>❌</button>
    </li>
  {/each}
</ul>

<style>
  li {
    display: flex;
    justify-content: space-between;
    background: lightgray;
    padding: 5px;
    margin: 5px;
  }
</style>
```

✅ **Explication :**  
- **`transition:fade`** → Chaque élément apparaît/disparaît en fondu.  
- **`animate:flip`** → Anime les éléments qui changent d’ordre.  
- **Les éléments peuvent être ajoutés et supprimés avec une animation fluide.**  

---

## **8. Créer une Animation Personnalisée**  

📌 **On peut aussi créer une animation unique avec `tweened` ou `spring`.**  

### **Exemple : Animation fluide avec `tweened`**  

```svelte
<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let progress = tweened(0, { duration: 1000, easing: cubicOut });

  function augmenter() {
    progress.set(Math.min($progress + 10, 100));
  }
</script>

<button on:click={augmenter}>Augmenter</button>
<p>Progression : {$progress}%</p>
<progress value={$progress} max="100"></progress>
```

✅ **Explication :**  
- **`tweened(0, { duration: 1000 })`** → Crée une animation fluide sur 1 seconde.  
- **`progress.set(100)`** → Met à jour la valeur avec une transition animée.  

---

## **9. Résumé des Animations et Transitions en Svelte**  

| Fonction | Utilisation |
|----------|------------|
| `transition:fade` | Fondu à l’apparition/disparition |
| `transition:slide` | Glissement horizontal ou vertical |
| `transition:scale` | Zoom avant/arrière |
| `transition:fly` | Déplacement + fondu |
| `in:transition / out:transition` | Animation différente à l’entrée et sortie |
| `animate:flip` | Anime le changement d’ordre dans une liste |
| `tweened()` | Animation fluide d’une valeur numérique |

---

## **10. Conclusion**  

✅ **Svelte permet d’ajouter des animations avec un code minimal.**  
✅ **Les transitions intégrées (`fade`, `slide`, `fly`, etc.) facilitent l’ajout d’effets visuels.**  
✅ **Les animations (`animate:flip`) rendent les listes dynamiques plus fluides.**  

---

### **Prochain chapitre : Gestion des formulaires et validation en Svelte !** 🚀
