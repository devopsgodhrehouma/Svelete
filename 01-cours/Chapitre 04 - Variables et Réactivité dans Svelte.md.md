### **Chapitre 04 - Variables et Réactivité dans Svelte**  

---

## **1. Introduction aux Variables en Svelte**  

Dans un composant Svelte, les variables sont déclarées **comme en JavaScript classique** dans la section `<script>`.  

Exemple simple :  

```svelte
<script>
  let nom = "Alice";
</script>

<p>Bonjour, {nom} !</p>
```

### **Explication**  
✅ **`let nom = "Alice";`** → Déclare une variable `nom`.  
✅ **`{nom}`** → Affiche la variable directement dans le HTML.  
✅ Si `nom` change, l’affichage est **automatiquement mis à jour**.  

---

## **2. Réactivité en Svelte : Mise à Jour Dynamique**  

Svelte met à jour l’interface automatiquement dès qu’une variable change.  

### **Exemple interactif : Modifier une variable avec un bouton**  

```svelte
<script>
  let compteur = 0;

  function incrementer() {
    compteur += 1;
  }
</script>

<h1>Compteur : {compteur}</h1>
<button on:click={incrementer}>+1</button>
```

### **Explication**  
✅ **`let compteur = 0;`** → Initialise le compteur.  
✅ **`on:click={incrementer}`** → Exécute `incrementer()` quand on clique sur le bouton.  
✅ **`compteur += 1;`** → Augmente la valeur et Svelte met à jour l'affichage automatiquement.  

---

## **3. Dépendances Réactives avec `$:`**  

Parfois, une variable dépend d’une autre et doit être **calculée automatiquement**.  

### **Exemple : Calcul automatique**  
```svelte
<script>
  let a = 5;
  let b = 3;
  $: somme = a + b;
</script>

<p>Valeur de A : {a}</p>
<p>Valeur de B : {b}</p>
<p>Somme : {somme}</p>

<button on:click={() => a += 1}>Augmenter A</button>
<button on:click={() => b += 1}>Augmenter B</button>
```

### **Explication**  
✅ **`$:`** est une **déclaration réactive**. À chaque changement de `a` ou `b`, `somme` est recalculé.  
✅ Lorsque l’utilisateur clique sur un bouton, `a` ou `b` augmente, et `somme` est **instantanément mis à jour**.  

---

## **4. Liaison de Variables avec `bind:`**  

Svelte permet de **lier un élément HTML** à une variable avec `bind:`.  

### **Exemple : Liaison d’un champ de texte**  
```svelte
<script>
  let nom = "Alice";
</script>

<input type="text" bind:value={nom} />
<p>Votre nom est : {nom}</p>
```

### **Explication**  
✅ **`bind:value={nom}`** → Synchronise l’`input` et la variable `nom`.  
✅ **Quand l’utilisateur tape dans l’input, la variable `nom` est automatiquement mise à jour.**  

---

## **5. Réactivité et Tableaux/Objets**  

Svelte **détecte automatiquement** les changements dans les variables, même pour des **tableaux et objets**.  

### **Exemple : Ajouter un élément dans un tableau**  
```svelte
<script>
  let fruits = ["Pomme", "Banane"];

  function ajouterFruit() {
    fruits = [...fruits, "Orange"]; // Mise à jour du tableau
  }
</script>

<ul>
  {#each fruits as fruit}
    <li>{fruit}</li>
  {/each}
</ul>

<button on:click={ajouterFruit}>Ajouter une orange</button>
```

### **Explication**  
✅ **`{#each fruits as fruit}`** → Boucle qui affiche chaque fruit.  
✅ **`fruits = [...fruits, "Orange"];`** → Ajoute un élément et met à jour la liste affichée.  

---

## **6. Réactivité avec des Objets**  

Quand on modifie une propriété d’un objet, Svelte ne détecte pas toujours le changement immédiatement. **Il faut recréer l’objet**.  

### **Exemple : Mise à jour d’un objet**  
```svelte
<script>
  let utilisateur = { nom: "Alice", age: 25 };

  function augmenterAge() {
    utilisateur = { ...utilisateur, age: utilisateur.age + 1 };
  }
</script>

<p>Nom : {utilisateur.nom}</p>
<p>Âge : {utilisateur.age}</p>

<button on:click={augmenterAge}>Vieillir</button>
```

### **Explication**  
✅ **`{ nom: "Alice", age: 25 }`** → Objet `utilisateur`.  
✅ **`utilisateur = { ...utilisateur, age: utilisateur.age + 1 };`**  
→ Remplace l’objet existant par une nouvelle version avec `age` mis à jour.  

---

## **7. Résumé**  

| Concept | Explication |
|---------|------------|
| **Déclaration** | `let variable = valeur;` |
| **Interpolation** | `{variable}` affiche la valeur |
| **Événements** | `on:click={fonction}` pour interagir |
| **Réactivité** | `$:` pour recalculer automatiquement |
| **bind:** | Liaison d’éléments HTML aux variables |
| **Tableaux/Objets** | Mise à jour avec `[...tableau]` ou `{ ...objet }` |

---

### **Prochain chapitre : Les événements et interactions utilisateur dans Svelte !** 🚀
