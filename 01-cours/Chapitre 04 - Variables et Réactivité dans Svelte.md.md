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

## **7. Exercices Formatifs** 🎯  

### **Exercice 1 : Modification Dynamique d'une Variable**  
📌 **Objectif :** Ajouter un bouton qui réinitialise le compteur à zéro.  

1. Ajoutez un bouton **"Réinitialiser"** sous le bouton **"+1"**.  
2. Lorsque l'utilisateur clique dessus, la valeur de `compteur` doit revenir à `0`.  

✅ **Bonus :** Désactivez le bouton "Réinitialiser" si `compteur` est déjà à zéro.  

---

### **Exercice 2 : Ajouter un Élément à une Liste via un Champ de Texte**  
📌 **Objectif :** Permettre à l'utilisateur d'ajouter un fruit de son choix via un `input`.  

1. Ajoutez un champ `<input>` avec `bind:value` à une variable `nouveauFruit`.  
2. Modifiez la fonction `ajouterFruit()` pour ajouter le fruit entré par l’utilisateur.  
3. Empêchez d’ajouter un élément vide.  
4. Réinitialisez le champ après l'ajout.  

✅ **Bonus :** Affichez un message d’erreur si l’utilisateur essaie d’ajouter un fruit vide.  

---

### **Exercice 3 : Suppression d’un Élément d’une Liste**  
📌 **Objectif :** Ajouter un bouton de suppression pour chaque fruit.  

1. Ajoutez un bouton **"❌ Supprimer"** à côté de chaque fruit.  
2. Lorsqu'on clique dessus, le fruit doit être supprimé de la liste.  
3. Affichez un message **"Aucun fruit dans la liste"** si elle devient vide.  

✅ **Bonus :** Ajoutez un effet visuel pour la suppression des fruits (ex: **fade-out**).  

---

## **8. Résumé**  

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

🎯 **Challenge Final :** Modifiez l’exercice 3 pour utiliser un **tableau d'objets** avec des IDs uniques et ajoutez une **fonction de tri alphabétique**. 🚀
