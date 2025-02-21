### **Chapitre 01 - Introduction à Svelte**  

---

## **Qu'est-ce que Svelte ?**  

Svelte est un **framework JavaScript** qui permet de créer des interfaces utilisateur interactives. Contrairement à React ou Vue, Svelte **compile** votre code au moment du développement, ce qui signifie que l’application n’a pas besoin d’un moteur d’exécution supplémentaire dans le navigateur.  

### **Pourquoi utiliser Svelte ?**  
✅ **Plus simple** : Moins de code à écrire que dans d’autres frameworks.  
✅ **Plus rapide** : Les composants sont transformés en JavaScript natif optimisé.  
✅ **Sans Virtual DOM** : Contrairement à React, il n’a pas besoin de mises à jour intermédiaires.  
✅ **Facile à apprendre** : Il repose sur HTML, CSS et JavaScript standard.  

### **Comment fonctionne Svelte ?**  
1. Vous écrivez du code dans des fichiers `.svelte` contenant **HTML, CSS et JavaScript**.  
2. Svelte compile votre code en JavaScript natif pour le navigateur.  
3. L’application est plus rapide et plus légère.  

---

## **Premier exemple de code**  

### **Objectif : Afficher "Bonjour, Svelte !"**
Nous allons voir comment fonctionne un fichier `.svelte`.  

🔹 **Copiez-collez** ce code dans un fichier `App.svelte` :  

```svelte
<script>
  let message = "Bonjour, Svelte !";
</script>

<h1>{message}</h1>

<style>
  h1 {
    color: blue;
    font-family: Arial, sans-serif;
  }
</style>
```

### **Explication**  
1. **`<script>`** : Déclaration de la variable `message`.  
2. **`<h1>{message}</h1>`** : Affichage dynamique du texte.  
3. **`<style>`** : Ajout de styles CSS uniquement pour ce composant.  

### **Ce que vous allez voir dans le navigateur**  
🔹 **Texte affiché en bleu :**  
```
Bonjour, Svelte !
```

Dans le prochain chapitre, nous verrons **comment installer Svelte et créer notre premier projet**. 🚀  


# Références:
- https://svelte.dev/tutorial/svelte/welcome-to-svelte
- https://svelte.dev/docs/svelte/overview
- 
