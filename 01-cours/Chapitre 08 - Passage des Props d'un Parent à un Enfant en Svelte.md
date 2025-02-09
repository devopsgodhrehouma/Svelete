## **Passage des Props d'un Parent à un Enfant en Svelte**  

---

### **1. Qu’est-ce qu’un "prop" en Svelte ?**  

Un **prop** (abréviation de *property* ou propriété) est une **valeur envoyée** d’un composant **parent** à un composant **enfant**.  

📌 **À retenir** :  
- Le **parent** envoie des **données** à l'enfant.  
- L'**enfant** reçoit et **affiche** ces données.  
- L’enfant **ne peut pas modifier directement** les props qu’il reçoit.  

---

### **2. Exemple Basique de Passage de Props**  

Nous allons voir **comment un parent peut envoyer une valeur à un enfant**.  

#### **Étape 1 : Créer un composant enfant qui reçoit un prop**  

📌 **Créez `Enfant.svelte`**  
```svelte
<script>
  export let nom;
</script>

<p>Bonjour, {nom} !</p>
```

✅ **Explication :**  
- `export let nom;` → Déclare un **prop** appelé `nom` qui sera envoyé par le parent.  
- `{nom}` → Affiche la valeur reçue.  

---

#### **Étape 2 : Envoyer un prop depuis le parent**  

📌 **Modifiez `App.svelte` pour envoyer un prop à `Enfant.svelte`**  
```svelte
<script>
  import Enfant from "./Enfant.svelte";
</script>

<Enfant nom="Alice" />
<Enfant nom="Bob" />
<Enfant nom="Charlie" />
```

✅ **Explication :**  
- **`<Enfant nom="Alice" />`** → Passe `"Alice"` comme valeur du prop `nom`.  
- **`<Enfant nom="Bob" />`** → Passe `"Bob"`.  
- Chaque enfant reçoit un **nom différent** et l’affiche.  

---

### **3. Passer Plusieurs Props à un Enfant**  

Un composant peut recevoir **plusieurs données en même temps**.  

#### **Étape 1 : Modifier l’Enfant pour accepter deux props**  

📌 **Modifiez `Enfant.svelte` pour recevoir `nom` et `age`**  
```svelte
<script>
  export let nom;
  export let age;
</script>

<p>{nom} a {age} ans.</p>
```

#### **Étape 2 : Envoyer les props depuis le parent**  

📌 **Modifiez `App.svelte`**  
```svelte
<Enfant nom="Alice" age={25} />
<Enfant nom="Bob" age={30} />
<Enfant nom="Charlie" age={20} />
```

✅ **Explication :**  
- **`<Enfant nom="Alice" age={25} />`** → Passe **"Alice"** et **25 ans**.  
- **L’enfant affiche `{nom} a {age} ans.`**, donc il affichera :  
  ```
  Alice a 25 ans.
  Bob a 30 ans.
  Charlie a 20 ans.
  ```

---

### **4. Passer un Objet Complet en Props**  

Parfois, il est plus pratique de **passer un objet** au lieu de plusieurs props séparés.  

#### **Étape 1 : Modifier `Enfant.svelte` pour accepter un objet `personne`**  

📌 **Modifiez `Enfant.svelte`**  
```svelte
<script>
  export let personne;
</script>

<p>{personne.nom} a {personne.age} ans.</p>
```

#### **Étape 2 : Envoyer un objet au lieu de valeurs séparées**  

📌 **Modifiez `App.svelte`**  
```svelte
<script>
  import Enfant from "./Enfant.svelte";

  let personnes = [
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 30 },
    { nom: "Charlie", age: 20 }
  ];
</script>

{#each personnes as personne}
  <Enfant personne={personne} />
{/each}
```

✅ **Explication :**  
- On passe **un objet `personne` complet** au lieu de plusieurs props.  
- `{#each personnes as personne}` → Affiche tous les éléments du tableau.  

---

### **5. Passer des Props Dynamiquement avec un Champ Input**  

Un prop peut aussi être **mis à jour dynamiquement** à partir d’un `input`.  

#### **Étape 1 : Modifier `Enfant.svelte` pour afficher un message**  

📌 **Modifiez `Enfant.svelte`**  
```svelte
<script>
  export let message;
</script>

<p>{message}</p>
```

#### **Étape 2 : Modifier `App.svelte` pour envoyer un message dynamique**  

📌 **Modifiez `App.svelte`**  
```svelte
<script>
  import Enfant from "./Enfant.svelte";

  let monMessage = "Bienvenue !";
</script>

<input type="text" bind:value={monMessage} placeholder="Tapez un message" />
<Enfant message={monMessage} />
```

✅ **Explication :**  
- **`bind:value={monMessage}`** → Met à jour `monMessage` en temps réel.  
- **`<Enfant message={monMessage} />`** → Passe `monMessage` en prop.  
- **Quand on tape dans l’input, l’affichage change immédiatement.**  

---

### **6. Protéger un Prop avec une Valeur par Défaut**  

Si un parent **oublie** d’envoyer un prop, on peut définir une **valeur par défaut**.  

📌 **Exemple dans `Enfant.svelte`**  
```svelte
<script>
  export let nom = "Utilisateur inconnu";
</script>

<p>Bonjour, {nom} !</p>
```

✅ **Si `nom` n’est pas fourni, il prendra la valeur `"Utilisateur inconnu"`**.  

---

## **7. Résumé du Passage de Props en Svelte**  

| Fonction | Explication |
|----------|------------|
| `export let prop;` | Déclare un **prop** dans l’enfant |
| `<Enfant prop="valeur" />` | Passe une valeur au composant |
| `export let prop = "valeur par défaut";` | Définit une **valeur par défaut** |
| `<Enfant objet={objet} />` | Passe un objet complet |
| `bind:value={variable}` | Permet d’envoyer une valeur **dynamique** |

---

## **Conclusion**  

✅ **Les props permettent de transmettre des données d’un parent vers un enfant**.  
✅ **On peut passer des valeurs simples, des objets ou des tableaux**.  
✅ **Les props peuvent être dynamiques grâce à `bind:value`**.  
✅ **Il est possible de définir des valeurs par défaut** pour éviter les erreurs.  

---

### **Prochain chapitre : Transmission des données en profondeur!** 🚀
