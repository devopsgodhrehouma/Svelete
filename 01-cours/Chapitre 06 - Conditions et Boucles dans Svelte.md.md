### **Chapitre 06 - Conditions et Boucles dans Svelte**  

---

## **1. Introduction**  

Dans une application dynamique, nous avons souvent besoin de **montrer ou cacher des éléments** en fonction d’une condition, ou encore **afficher des listes d’éléments** de manière dynamique.  

Svelte propose des **blocs de contrôle** qui permettent d’écrire des conditions (`{#if}`) et des boucles (`{#each}`) directement dans le template.  

---

## **2. Utiliser `{#if}` pour afficher du contenu conditionnel**  

📌 **Syntaxe de base :**  
```svelte
{#if condition}
  <!-- Code affiché si condition = true -->
{/if}
```

### **Exemple : Afficher un message si l’utilisateur est connecté**  
```svelte
<script>
  let estConnecte = false;
</script>

{#if estConnecte}
  <p>Bienvenue, vous êtes connecté !</p>
{/if}

<button on:click={() => estConnecte = !estConnecte}>
  {estConnecte ? "Se déconnecter" : "Se connecter"}
</button>
```

### **Explication**  
✅ **Si `estConnecte` est `true`, le message apparaît**.  
✅ **Le bouton permet d’activer/désactiver l’état connecté**.  

---

## **3. Ajouter `{:else}` pour gérer un cas alternatif**  

📌 **Syntaxe complète :**  
```svelte
{#if condition}
  <!-- Affiché si condition = true -->
{:else}
  <!-- Affiché si condition = false -->
{/if}
```

### **Exemple : Message différent selon l’état**  
```svelte
<script>
  let estConnecte = false;
</script>

{#if estConnecte}
  <p>Bienvenue, utilisateur !</p>
{:else}
  <p>Veuillez vous connecter.</p>
{/if}

<button on:click={() => estConnecte = !estConnecte}>
  {estConnecte ? "Se déconnecter" : "Se connecter"}
</button>
```

✅ **Si `estConnecte` est `false`, on affiche "Veuillez vous connecter."**  
✅ **Si `estConnecte` est `true`, on affiche "Bienvenue, utilisateur !"**  

---

## **4. Utiliser `{:else if}` pour plusieurs conditions**  

📌 **Syntaxe avec plusieurs conditions :**  
```svelte
{#if condition1}
  <!-- Code affiché si condition1 = true -->
{:else if condition2}
  <!-- Code affiché si condition2 = true -->
{:else}
  <!-- Code affiché si aucune condition n'est remplie -->
{/if}
```

### **Exemple : Afficher un message selon l'âge de l'utilisateur**  
```svelte
<script>
  let age = 20;
</script>

{#if age < 18}
  <p>Vous êtes mineur.</p>
{:else if age >= 18 && age < 65}
  <p>Vous êtes adulte.</p>
{:else}
  <p>Vous êtes senior.</p>
{/if}
```

✅ **L’utilisateur voit un message différent selon son âge.**  

---

## **5. Utiliser `{#each}` pour afficher des listes dynamiques**  

Svelte permet d’afficher **une liste d’éléments dynamiquement** avec `{#each}`.  

📌 **Syntaxe :**  
```svelte
{#each liste as élément}
  <!-- Code pour chaque élément -->
{/each}
```

### **Exemple : Afficher une liste de fruits**  
```svelte
<script>
  let fruits = ["Pomme", "Banane", "Cerise"];
</script>

<ul>
  {#each fruits as fruit}
    <li>{fruit}</li>
  {/each}
</ul>
```

✅ **Chaque élément du tableau `fruits` est affiché dans `<li>`.**  

---

## **6. Utiliser un index avec `{#each}`**  

On peut aussi récupérer **l’index de chaque élément** dans la boucle.  

### **Exemple : Afficher la position des fruits dans la liste**  
```svelte
<script>
  let fruits = ["Pomme", "Banane", "Cerise"];
</script>

<ul>
  {#each fruits as fruit, index}
    <li>{index + 1}. {fruit}</li>
  {/each}
</ul>
```

✅ **L’index commence à `0`, donc on ajoute `+1` pour un affichage classique.**  

---

## **7. Mettre à jour une liste avec un bouton**  

On peut utiliser `{#each}` avec un bouton pour **ajouter ou supprimer des éléments dynamiquement**.  

### **Exemple : Ajouter un fruit à la liste**  
```svelte
<script>
  let fruits = ["Pomme", "Banane"];

  function ajouterFruit() {
    fruits = [...fruits, "Orange"];
  }
</script>

<ul>
  {#each fruits as fruit}
    <li>{fruit}</li>
  {/each}
</ul>

<button on:click={ajouterFruit}>Ajouter une orange</button>
```

✅ **`fruits = [...fruits, "Orange"]` crée une nouvelle liste avec un élément ajouté.**  

---

## **8. Supprimer un élément d’une liste**  

On peut aussi supprimer un élément avec `filter()`.  

### **Exemple : Supprimer un fruit au clic**  
```svelte
<script>
  let fruits = ["Pomme", "Banane", "Cerise"];

  function supprimerFruit(index) {
    fruits = fruits.filter((_, i) => i !== index);
  }
</script>

<ul>
  {#each fruits as fruit, index}
    <li>
      {fruit} 
      <button on:click={() => supprimerFruit(index)}>Supprimer</button>
    </li>
  {/each}
</ul>
```

✅ **`filter((_, i) => i !== index)` crée une nouvelle liste sans l’élément supprimé.**  

---

## **9. Utiliser `{#each}` avec des objets**  

On peut aussi afficher **une liste d’objets**.  

### **Exemple : Afficher une liste de personnes avec leur âge**  
```svelte
<script>
  let personnes = [
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 30 },
    { nom: "Charlie", age: 20 }
  ];
</script>

<ul>
  {#each personnes as personne}
    <li>{personne.nom} - {personne.age} ans</li>
  {/each}
</ul>
```

✅ **Chaque objet contient `nom` et `age`, affichés dynamiquement.**  

---

## **10. Ajouter une clé unique pour optimiser `{#each}`**  

Quand on affiche une liste, il est recommandé d’ajouter une **clé unique** (`id`).  

### **Exemple : Liste avec clé unique**  
```svelte
<script>
  let utilisateurs = [
    { id: 1, nom: "Alice" },
    { id: 2, nom: "Bob" },
    { id: 3, nom: "Charlie" }
  ];
</script>

<ul>
  {#each utilisateurs as utilisateur (utilisateur.id)}
    <li>{utilisateur.nom}</li>
  {/each}
</ul>
```

✅ **La clé `(utilisateur.id)` aide Svelte à optimiser les mises à jour.**  

---

## **11. Résumé des conditions et boucles en Svelte**  

| Fonction | Explication |
|----------|------------|
| `{#if condition}` | Affiche un contenu si la condition est vraie |
| `{:else}` | Gère le cas contraire |
| `{:else if condition}` | Ajoute plusieurs conditions |
| `{#each tableau as élément}` | Boucle sur une liste |
| `{#each tableau as élément, index}` | Récupère aussi l’index |
| `{#each liste as élément (clé)}` | Ajoute une clé unique pour optimiser |

---

## **Conclusion**  

✅ **Les conditions `{#if}` permettent d’afficher ou masquer des éléments dynamiquement.**  
✅ **Les boucles `{#each}` facilitent l’affichage de listes et la mise à jour des données.**  
✅ **Les clés `(clé)` optimisent le rendu des listes.**  

---

### **Prochain chapitre : Composants et Réutilisation de Code en Svelte !** 🚀
