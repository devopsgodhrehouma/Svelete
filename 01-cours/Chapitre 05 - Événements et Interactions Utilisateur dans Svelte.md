
### **Chapitre 05 - Événements et Interactions Utilisateur dans Svelte**  

---

## **1. Introduction aux événements en Svelte**  

Svelte permet de capturer des **événements utilisateur** (clic, saisie clavier, survol, etc.) en utilisant la directive `on:`.  

📌 **Syntaxe générale :**  
```svelte
<élément on:événement={fonction}>Contenu</élément>
```

✅ Exemples d’événements courants :  
- `on:click` → Quand l’utilisateur clique  
- `on:input` → Quand l’utilisateur tape dans un champ  
- `on:mouseover` → Quand la souris passe dessus  
- `on:keydown` → Quand une touche est pressée  

---

## **2. Gérer un clic d’utilisateur avec `on:click`**  

### **Exemple : Bouton qui change un message**
```svelte
<script>
  let message = "Bienvenue dans Svelte !";

  function changerMessage() {
    message = "Vous avez cliqué sur le bouton !";
  }
</script>

<h1>{message}</h1>
<button on:click={changerMessage}>Changer le message</button>
```

### **Explication**  
✅ **`on:click={changerMessage}`** → Exécute `changerMessage()` quand on clique sur le bouton.  
✅ **La variable `message` est mise à jour**, ce qui met automatiquement à jour l’affichage.  

---

## **3. Récupérer l’entrée d’un utilisateur avec `on:input`**  

Svelte permet d’interagir avec les champs de formulaire en utilisant `on:input` ou `bind:value`.  

### **Exemple : Mise à jour en temps réel**  
```svelte
<script>
  let nom = "";
</script>

<input type="text" on:input={e => nom = e.target.value} placeholder="Entrez votre nom" />
<p>Bonjour, {nom} !</p>
```

### **Explication**  
✅ **`on:input={e => nom = e.target.value}`** → Met à jour `nom` à chaque frappe.  
✅ **Quand l’utilisateur tape, le texte se met à jour instantanément.**  

---

## **4. Alternative : Utiliser `bind:value` pour les formulaires**  

Svelte propose `bind:value` pour éviter `on:input`.  

### **Exemple avec `bind:value` (simplifié)**
```svelte
<script>
  let nom = "";
</script>

<input type="text" bind:value={nom} placeholder="Entrez votre nom" />
<p>Bonjour, {nom} !</p>
```

✅ **`bind:value={nom}`** → Synchronise automatiquement l’input et `nom`.  

---

## **5. Écouter des événements clavier avec `on:keydown`**  

### **Exemple : Afficher la touche pressée**  
```svelte
<script>
  let touche = "";
</script>

<input type="text" on:keydown={e => touche = e.key} placeholder="Tapez une touche" />
<p>Dernière touche pressée : {touche}</p>
```

✅ **`on:keydown={e => touche = e.key}`** → Stocke la touche pressée dans `touche`.  

---

## **6. Ajouter des événements avec paramètres**  

Si une fonction a besoin de paramètres, on utilise une fonction fléchée.  

### **Exemple : Boutons qui ajoutent différents nombres**  
```svelte
<script>
  let compteur = 0;

  function ajouter(n) {
    compteur += n;
  }
</script>

<h1>Compteur : {compteur}</h1>
<button on:click={() => ajouter(1)}>+1</button>
<button on:click={() => ajouter(5)}>+5</button>
<button on:click={() => ajouter(10)}>+10</button>
```

✅ **`on:click={() => ajouter(5)}`** → Permet de passer `5` à `ajouter(n)`.  

---

## **7. Empêcher le comportement par défaut (`event.preventDefault()`)**  

Par défaut, un **formulaire** recharge la page lorsqu’on le soumet. On utilise `event.preventDefault()` pour éviter cela.  

### **Exemple : Formulaire qui ne recharge pas la page**  
```svelte
<script>
  let nom = "";
  
  function soumettreFormulaire(e) {
    e.preventDefault(); // Empêche le rechargement
    alert(`Formulaire soumis : ${nom}`);
  }
</script>

<form on:submit={soumettreFormulaire}>
  <input type="text" bind:value={nom} placeholder="Votre nom" />
  <button type="submit">Envoyer</button>
</form>
```

✅ **`e.preventDefault();`** → Empêche le rechargement de la page.  

---

## **8. Écouter des événements de la souris (`on:mouseover`)**  

### **Exemple : Changer la couleur d’un bouton au survol**  
```svelte
<script>
  let couleur = "blue";

  function changerCouleur() {
    couleur = "red";
  }

  function resetCouleur() {
    couleur = "blue";
  }
</script>

<button on:mouseover={changerCouleur} on:mouseleave={resetCouleur} style="background-color: {couleur};">
  Passez la souris ici
</button>
```

✅ **`on:mouseover={changerCouleur}`** → Change la couleur au survol.  
✅ **`on:mouseleave={resetCouleur}`** → Remet la couleur initiale.  

---

## **9. Utiliser `on:event|modificateur` pour simplifier le code**  

Svelte permet d’ajouter des **modificateurs d’événements** (`|`) pour éviter d’écrire `event.preventDefault()`.  

### **Modificateurs utiles**  
| Modificateur | Explication |
|-------------|------------|
| `on:click|once` | Exécute l’événement une seule fois |
| `on:submit|preventDefault` | Empêche le rechargement d’un formulaire |
| `on:keydown|stopPropagation` | Empêche la propagation de l’événement |

---

## **10. Exemple avec `on:submit|preventDefault`**  
Simplifie le formulaire vu précédemment.  

```svelte
<script>
  let nom = "";
</script>

<form on:submit|preventDefault={() => alert(`Formulaire soumis : ${nom}`)}>
  <input type="text" bind:value={nom} placeholder="Votre nom" />
  <button type="submit">Envoyer</button>
</form>
```

✅ **Pas besoin de `e.preventDefault();`** grâce à `on:submit|preventDefault`.  

---

## **11. Résumé des événements en Svelte**  

| Événement | Utilisation |
|-----------|------------|
| `on:click={fonction}` | Détecte un clic |
| `on:input={fonction}` | Détecte la saisie utilisateur |
| `bind:value={variable}` | Liaison automatique avec un input |
| `on:keydown={fonction}` | Détecte une touche pressée |
| `on:mouseover={fonction}` | Détecte le passage de la souris |
| `on:submit|preventDefault` | Empêche le rechargement du formulaire |

---

## **Conclusion**  

✅ **Svelte facilite la gestion des événements utilisateur** avec `on:`.  
✅ **Les modificateurs** comme `|preventDefault` simplifient le code.  
✅ **Les fonctions avec paramètres** permettent de personnaliser les interactions.  

---

### **Prochain chapitre : Les conditions et boucles dans Svelte !** 🚀
