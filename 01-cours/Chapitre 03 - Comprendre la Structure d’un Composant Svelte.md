### **Chapitre 03 - Comprendre la Structure d’un Composant Svelte**  

---

## **1. Qu’est-ce qu’un composant Svelte ?**  

Un **composant Svelte** est un fichier `.svelte` qui contient **trois parties principales** :  
1. **Le JavaScript** (`<script>`) : Déclare les variables et la logique.  
2. **Le HTML** (template) : Définit la structure de la page.  
3. **Le CSS** (`<style>`) : Définit les styles propres au composant.  

Contrairement aux autres frameworks comme React ou Vue, Svelte ne nécessite pas de **Virtual DOM**. Il compile le composant en **JavaScript natif optimisé**.  

---

## **2. Exemple de base d’un composant Svelte**  

Créez un fichier **`src/App.svelte`** et copiez le code suivant :  

```svelte
<script>
  let message = "Bienvenue dans Svelte !";
</script>

<h1>{message}</h1>

<style>
  h1 {
    color: blue;
    font-family: Arial, sans-serif;
  }
</style>
```

---

## **3. Explication du code**  

1️⃣ **La section `<script>`** (JS)  
```svelte
<script>
  let message = "Bienvenue dans Svelte !";
</script>
```
- Déclare une variable `message`.  
- Svelte met à jour l’affichage si la variable change.  

2️⃣ **La section HTML**  
```svelte
<h1>{message}</h1>
```
- `{message}` permet d’insérer dynamiquement le texte de la variable.  
- Chaque changement de `message` mettra automatiquement à jour l’interface.  

3️⃣ **La section CSS**  
```svelte
<style>
  h1 {
    color: blue;
    font-family: Arial, sans-serif;
  }
</style>
```
- Applique un style uniquement au composant actuel (CSS encapsulé).  
- Contrairement au CSS classique, ces styles ne s’appliquent **qu'à ce fichier**.  

---

## **4. Tester la mise à jour dynamique**  

Ajoutons un **bouton** qui modifie `message` lorsqu’on clique dessus :  

```svelte
<script>
  let message = "Bienvenue dans Svelte !";

  function changerMessage() {
    message = "Vous avez cliqué sur le bouton !";
  }
</script>

<h1>{message}</h1>
<button on:click={changerMessage}>Changer le message</button>

<style>
  h1 {
    color: blue;
  }
  button {
    margin-top: 10px;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
```

### **Explication** :  
- `on:click={changerMessage}` attache un événement au bouton.  
- Lorsqu’on clique, la fonction `changerMessage()` met à jour `message`.  
- Svelte met **automatiquement à jour** le texte affiché.  

---

## **5. Ajouter plusieurs composants**  

En Svelte, chaque composant `.svelte` est **indépendant**.  
On va créer un **composant séparé** pour afficher un message.

### **Étape 1 : Créer un composant `Message.svelte`**  
Dans `src/`, créez un fichier `Message.svelte` :  

```svelte
<script>
  export let text;
</script>

<p>{text}</p>

<style>
  p {
    color: green;
    font-size: 18px;
  }
</style>
```

### **Étape 2 : Utiliser ce composant dans `App.svelte`**  

Modifiez `App.svelte` pour inclure `Message.svelte` :  

```svelte
<script>
  import Message from "./Message.svelte";
</script>

<h1>Bienvenue sur mon site</h1>
<Message text="Ceci est un composant réutilisable !" />
```

### **Explication** :  
- `export let text;` permet de recevoir une **propriété** (prop).  
- `{text}` affiche dynamiquement le texte passé en paramètre.  
- Dans `App.svelte`, on importe `Message` avec `import Message from "./Message.svelte";`.  
- On affiche `<Message text="Ceci est un composant réutilisable !" />`.  

---

## **6. Résumé**  

✅ Un **composant Svelte** contient **HTML + CSS + JS** dans un seul fichier `.svelte`.  
✅ Les **variables** sont déclarées dans `<script>` et affichées avec `{}`.  
✅ Les **événements** comme `on:click` permettent d’interagir avec l’utilisateur.  
✅ On peut **créer des composants réutilisables** et leur passer des données avec `export let`.  

---

### **Prochain chapitre : Comprendre les variables et la réactivité dans Svelte !** 🚀
