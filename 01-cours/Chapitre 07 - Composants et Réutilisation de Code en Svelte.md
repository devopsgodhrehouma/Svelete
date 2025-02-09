### **Chapitre 07 - Composants et Réutilisation de Code en Svelte**  

---

## **1. Introduction aux Composants Svelte**  

Un composant Svelte est un **fichier `.svelte`** qui contient **HTML, CSS et JavaScript** dans un seul fichier.  

✅ **Pourquoi utiliser des composants ?**  
- Organiser son code en **petits blocs réutilisables**  
- Rendre l’application **plus modulaire et facile à maintenir**  
- Simplifier le développement en réutilisant des éléments  

---

## **2. Création d’un Composant Simple**  

Les composants sont des **fichiers `.svelte`** que l’on peut **importer et utiliser dans d’autres fichiers**.  

📌 **Exemple : Créer un composant `Message.svelte`**  

Dans le dossier `src/`, créez un fichier **`Message.svelte`** et collez ce code :  

```svelte
<script>
  export let texte = "Message par défaut";
</script>

<p>{texte}</p>

<style>
  p {
    font-size: 18px;
    color: green;
  }
</style>
```

✅ **Explication** :  
- `export let texte;` → Permet de passer une valeur depuis un autre composant.  
- `{texte}` → Affiche dynamiquement le message passé en paramètre.  
- Le style est **encapsulé**, il ne s’applique qu’à ce composant.  

---

## **3. Utiliser un Composant dans un Autre**  

Maintenant, utilisons **`Message.svelte`** dans **`App.svelte`**.  

📌 **Modifiez `src/App.svelte` :**  
```svelte
<script>
  import Message from "./Message.svelte";
</script>

<h1>Mon Application</h1>

<Message texte="Bienvenue dans mon application !" />
<Message texte="Svelte est génial !" />
<Message texte="Les composants sont réutilisables." />
```

✅ **Explication** :  
- **`import Message from "./Message.svelte";`** → Importe le composant.  
- **`<Message texte="Bienvenue !" />`** → Passe un message différent à chaque instance.  
- **Trois composants `Message` affichent du texte personnalisé.**  

---

## **4. Passer Plusieurs Propriétés (`props`)**  

Un composant peut recevoir **plusieurs propriétés** avec `export let`.  

📌 **Ajoutez un paramètre `couleur` dans `Message.svelte`**  
```svelte
<script>
  export let texte;
  export let couleur = "black";
</script>

<p style="color: {couleur};">{texte}</p>
```

📌 **Utilisez-le dans `App.svelte`**  
```svelte
<Message texte="Texte rouge" couleur="red" />
<Message texte="Texte bleu" couleur="blue" />
<Message texte="Texte vert" couleur="green" />
```

✅ **Chaque texte a maintenant une couleur différente !**  

---

## **5. Émettre un Événement d’un Composant Enfant vers un Parent**  

Un composant enfant peut **envoyer des événements** à son parent avec `createEventDispatcher()`.  

### **Exemple : Un bouton dans `Bouton.svelte` qui envoie un message au parent**  

📌 **Créez `Bouton.svelte`**  
```svelte
<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function cliquer() {
    dispatch("clic", { message: "Le bouton a été cliqué !" });
  }
</script>

<button on:click={cliquer}>Cliquez-moi</button>
```

📌 **Utilisez `Bouton.svelte` dans `App.svelte` et écoutez l’événement**  
```svelte
<script>
  import Bouton from "./Bouton.svelte";

  function afficherMessage(event) {
    alert(event.detail.message);
  }
</script>

<Bouton on:clic={afficherMessage} />
```

✅ **Explication** :  
- `createEventDispatcher()` crée un événement personnalisé `clic`.  
- `dispatch("clic", { message: "Le bouton a été cliqué !" });` envoie l’événement.  
- `on:clic={afficherMessage}` dans `App.svelte` écoute l’événement et affiche un message.  

---

## **6. Transmettre du Contenu avec `<slot>`**  

Un `slot` permet d’injecter du **contenu dynamique** dans un composant.  

### **Exemple : Créer une boîte réutilisable `Boite.svelte`**  

📌 **Créez `Boite.svelte`**  
```svelte
<div class="boite">
  <slot></slot>
</div>

<style>
  .boite {
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
  }
</style>
```

📌 **Utilisez-le dans `App.svelte`**  
```svelte
<Boite>
  <h2>Bonjour !</h2>
  <p>Ceci est un message dans une boîte.</p>
</Boite>
```

✅ **Tout ce qui est à l’intérieur de `<Boite>...</Boite>` est injecté dans `<slot>`.**  

---

## **7. Résumé des Composants en Svelte**  

| Fonction | Explication |
|----------|------------|
| `export let variable;` | Permet de passer une **propriété** (prop) |
| `<Composant attribut="valeur" />` | Passe une valeur au composant |
| `createEventDispatcher()` | Permet à un composant d’émettre un événement |
| `on:evenement={fonction}` | Permet d’écouter un événement dans le parent |
| `<slot></slot>` | Permet d’injecter du contenu dynamique |

---

## **Conclusion**  

✅ **Les composants rendent l’application modulaire et réutilisable.**  
✅ **On peut leur passer des données avec `export let`.**  
✅ **On peut émettre des événements avec `createEventDispatcher()`.**  
✅ **Les `slots` permettent d’insérer du contenu dynamique.**  

---

### **Prochain chapitre : Stockage et Gestion de l’État avec les Stores en Svelte !** 🚀
