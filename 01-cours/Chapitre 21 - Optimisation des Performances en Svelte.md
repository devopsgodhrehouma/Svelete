# **Chapitre 21 - Optimisation des Performances en Svelte** 🚀  

---

## **1. Introduction : Pourquoi optimiser Svelte ?**  

Svelte est déjà **ultra rapide** par nature, car il **compile le code en JavaScript natif**.  
Cependant, certaines **mauvaises pratiques** peuvent ralentir votre application.  

📌 **Ce que nous allons voir dans ce chapitre :**  
✅ Optimiser le rendu et limiter les re-renders inutiles  
✅ Réduire la taille du bundle et améliorer le chargement  
✅ Gérer efficacement les stores et la réactivité  
✅ Utiliser le pré-chargement (`preload`, `svelte:head`)  
✅ Profiler et analyser les performances  

---

## **2. Éviter les Rendus Inutiles (`$store` et `tick()`)**  

📌 **Problème : Un store qui se met à jour trop souvent**  

```svelte
<script>
  import { writable } from "svelte/store";

  const compteur = writable(0);

  function incrementer() {
    compteur.set($compteur + 1);
  }
</script>

<button on:click={incrementer}>+1</button>
<p>Valeur : {$compteur}</p>
```

📌 **Solution : Utiliser `tick()` pour s’assurer que le DOM est à jour avant le re-render**  

```svelte
<script>
  import { writable, tick } from "svelte/store";

  const compteur = writable(0);

  async function incrementer() {
    compteur.set($compteur + 1);
    await tick(); // Attendre que le DOM soit mis à jour
    console.log("Compteur mis à jour :", $compteur);
  }
</script>
```

✅ **Moins de rendus inutiles et meilleure fluidité !**  

---

## **3. Réduire la Taille du Bundle avec le Lazy Loading**  

📌 **Problème : Importer tous les composants alourdit l’application.**  

```svelte
<script>
  import ComposantLourd from "./ComposantLourd.svelte";
</script>
```

📌 **Solution : Charger un composant uniquement quand il est nécessaire (lazy loading)**  

```svelte
<script>
  let ComposantLourd;

  async function chargerComposant() {
    ComposantLourd = (await import("./ComposantLourd.svelte")).default;
  }
</script>

<button on:click={chargerComposant}>Charger le composant</button>

{#if ComposantLourd}
  <svelte:component this={ComposantLourd} />
{/if}
```

✅ **Gagnez en performance en ne chargeant les gros composants qu’au moment voulu !**  

---

## **4. Utiliser les Stores de Manière Efficace**  

📌 **Problème : Mettre à jour un `store` trop fréquemment peut causer des ralentissements.**  

```svelte
<script>
  import { writable } from "svelte/store";
  
  const liste = writable([]);

  function ajouterElement(element) {
    liste.set([...$liste, element]); // ⚠️ Mauvaise pratique (re-crée tout le tableau)
  }
</script>
```

📌 **Solution : Utiliser `update()` pour modifier les valeurs sans recréer l’objet**  

```svelte
<script>
  import { writable } from "svelte/store";

  const liste = writable([]);

  function ajouterElement(element) {
    liste.update(l => {
      l.push(element);
      return l;
    });
  }
</script>
```

✅ **Moins de calculs inutiles et meilleure réactivité !**  

---

## **5. Optimiser les Boucles avec `{#each}`**  

📌 **Problème : Une boucle `{#each}` qui crée trop d’éléments dans le DOM.**  

```svelte
<ul>
  {#each tableau as item}
    <li>{item.nom}</li>
  {/each}
</ul>
```

📌 **Solution : Ajouter une `key` pour optimiser le rendu**  

```svelte
<ul>
  {#each tableau as item (item.id)}
    <li>{item.nom}</li>
  {/each}
</ul>
```

✅ **Svelte saura mieux gérer les mises à jour et ne recréera pas toute la liste !**  

---

## **6. Précharger les Données avec `load()` et `preload` (SvelteKit)**  

📌 **Problème : Une API qui se charge lentement après l'affichage de la page.**  

📌 **Solution : Charger les données *avant* d’afficher la page !**  

### **1️⃣ Utiliser `load()` dans `+page.js` (SvelteKit)**  

```js
export async function load({ fetch }) {
  const res = await fetch("/api/data");
  const data = await res.json();
  return { data };
}
```

### **2️⃣ Afficher les données dans `+page.svelte`**  

```svelte
<script>
  export let data;
</script>

<ul>
  {#each data as item}
    <li>{item.nom}</li>
  {/each}
</ul>
```

✅ **Les données sont déjà disponibles dès l'affichage de la page !**  

---

## **7. Réduire le Poids des Images avec `srcset` et WebP**  

📌 **Problème : Charger des images trop lourdes ralentit le site.**  

📌 **Solution : Utiliser WebP et le responsive `srcset`**  

```html
<img 
  src="image.jpg" 
  srcset="image-480w.webp 480w, image-1024w.webp 1024w"
  sizes="(max-width: 600px) 480px, 1024px"
  alt="Image optimisée"
/>
```

✅ **Les utilisateurs mobiles chargent des images plus légères !**  

---

## **8. Activer l’Optimisation du Build (Vite/SvelteKit)**  

📌 **Ajoutez ces options dans `vite.config.js` pour minimiser le code final**  

```js
import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    minify: "terser", // Minification avancée
    sourcemap: false, // Désactiver les maps en production
  },
});
```

✅ **Le bundle final est plus léger et plus rapide à charger !**  

---

## **9. Analyser les Performances avec Vite et Lighthouse**  

📌 **Vérifier la taille du bundle avec Vite**  

```sh
npm run build
```

📌 **Utiliser Lighthouse pour mesurer la performance**  

1. **Ouvrir Chrome**  
2. **Aller dans DevTools (`F12` > "Lighthouse")**  
3. **Générer un rapport**  

✅ **Cela vous donne des recommandations pour accélérer votre application.**  

---

## **10. Résumé des Optimisations Clés**  

| Optimisation | Solution |
|-------------|---------|
| **Éviter les re-renders** | Utiliser `$store` intelligemment et `tick()` |
| **Réduire le bundle** | Charger les composants en `lazy loading` |
| **Optimiser les stores** | Utiliser `update()` au lieu de `set()` |
| **Améliorer les boucles** | Ajouter une `key` dans `{#each}` |
| **Précharger les données** | Utiliser `load()` dans SvelteKit |
| **Optimiser les images** | Utiliser WebP et `srcset` |
| **Analyser les performances** | Lighthouse et `npm run build` |

---

## **11. Conclusion**  

✅ **Svelte est performant, mais certaines optimisations sont nécessaires.**  
✅ **Évitez les re-renders inutiles et utilisez `tick()`.**  
✅ **Utilisez `lazy loading` et `preload` pour accélérer l’affichage.**  
✅ **Analysez votre performance avec Lighthouse et Vite.**  

---

### **Prochain Chapitre : Accessibilité (`a11y`) en Svelte !** 
