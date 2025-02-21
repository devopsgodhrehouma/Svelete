# **Chapitre 14 - Gestion des Erreurs et Messages d’Alerte en Svelte**  

---

## **1. Introduction : Pourquoi gérer les erreurs et messages en Svelte ?**  

Dans une application web, il est **essentiel** d’informer l’utilisateur des erreurs et des actions réussies.  
Svelte propose plusieurs techniques pour **afficher et gérer les erreurs** :

✅ **Affichage dynamique avec `{#if}`** → Afficher ou cacher un message.  
✅ **Classes CSS dynamiques (`class:`)** → Changer l’apparence des alertes.  
✅ **Stores (`writable()`)** → Gérer les erreurs globalement.  
✅ **Try/Catch et `on:error`** → Gérer les erreurs d’exécution.  

---

## **2. Afficher un Message d’Erreur avec `{#if}`**  

📌 **Utiliser `{#if}` pour afficher un message d’erreur conditionnellement.**  

### **Exemple : Afficher un message si un champ est vide**  

```svelte
<script>
  let nom = "";
  let erreur = "";
  
  function verifierNom() {
    erreur = nom.length < 3 ? "Le nom doit contenir au moins 3 caractères." : "";
  }
</script>

<input type="text" bind:value={nom} on:input={verifierNom} placeholder="Votre nom" />
{#if erreur}
  <p style="color: red;">⚠️ {erreur}</p>
{/if}
```

✅ **Si `nom` a moins de 3 caractères, un message d’erreur apparaît.**  

---

## **3. Changer l’Apparence des Erreurs avec des Classes Dynamiques**  

📌 **Svelte permet de changer l’apparence d’un élément en fonction d’un état (`class:`).**  

### **Exemple : Ajouter une bordure rouge si une erreur est présente**  

```svelte
<script>
  let email = "";
  let erreur = false;
  
  function verifierEmail() {
    erreur = !email.includes("@");
  }
</script>

<input type="email" bind:value={email} on:input={verifierEmail} class:invalide placeholder="Votre email" />
{#if erreur}
  <p class="message-erreur">⚠️ Email invalide.</p>
{/if}

<style>
  .invalide {
    border: 2px solid red;
  }
  .message-erreur {
    color: red;
  }
</style>
```

✅ **Le champ devient rouge et un message d’erreur apparaît si l’email est invalide.**  

---

## **4. Afficher des Messages de Succès ou d’Échec**  

📌 **Utiliser un message temporaire après une action réussie.**  

### **Exemple : Message de confirmation après envoi d’un formulaire**  

```svelte
<script>
  let message = "";

  function envoyerFormulaire(event) {
    event.preventDefault();
    message = "✅ Formulaire envoyé avec succès !";
    setTimeout(() => message = "", 3000); // Efface après 3 sec
  }
</script>

<form on:submit={envoyerFormulaire}>
  <input type="text" placeholder="Votre nom" required />
  <button type="submit">Envoyer</button>
</form>

{#if message}
  <p class="succes">{message}</p>
{/if}

<style>
  .succes {
    color: green;
  }
</style>
```

✅ **Le message disparaît après 3 secondes grâce à `setTimeout()`.**  

---

## **5. Gérer les Erreurs Globalement avec un Store (`writable()`)**  

📌 **Si plusieurs composants doivent afficher des erreurs, utiliser un `store`.**  

### **1️⃣ Créer un Store `errorStore.js`**  

```js
import { writable } from "svelte/store";

export const messageErreur = writable("");
```

### **2️⃣ Utiliser le store dans `App.svelte`**  

```svelte
<script>
  import { messageErreur } from "./errorStore.js";

  function declencherErreur() {
    messageErreur.set("⚠️ Une erreur est survenue !");
  }
</script>

<button on:click={declencherErreur}>Générer une Erreur</button>

{#if $messageErreur}
  <p class="alerte">{$messageErreur}</p>
{/if}

<style>
  .alerte {
    color: red;
    font-weight: bold;
  }
</style>
```

✅ **N’importe quel composant peut maintenant afficher une erreur globale.**  

---

## **6. Utiliser `try/catch` pour Capturer les Erreurs en JavaScript**  

📌 **Les erreurs en JavaScript peuvent être gérées avec `try/catch`.**  

### **Exemple : Gérer une erreur dans une fonction**  

```svelte
<script>
  let message = "";

  function diviserParZero() {
    try {
      let resultat = 10 / 0; // Division par zéro
      if (!isFinite(resultat)) throw new Error("Division par zéro interdite !");
    } catch (error) {
      message = `⚠️ Erreur : ${error.message}`;
    }
  }
</script>

<button on:click={diviserParZero}>Diviser par Zéro</button>
{#if message}
  <p class="alerte">{message}</p>
{/if}

<style>
  .alerte {
    color: red;
  }
</style>
```

✅ **Si une erreur se produit, elle est capturée et affichée.**  

---

## **7. Utiliser `on:error` pour Gérer les Erreurs Globales en Svelte**  

📌 **`on:error` permet de capturer des erreurs non gérées dans un composant.**  

### **Exemple : Capturer une erreur dans un composant enfant**  

#### **1️⃣ Créer `ErreurComponent.svelte`**  

```svelte
<script>
  throw new Error("Erreur critique !");
</script>

<p>Ce texte ne s'affichera jamais.</p>
```

#### **2️⃣ Utiliser `on:error` dans `App.svelte`**  

```svelte
<script>
  import ErreurComponent from "./ErreurComponent.svelte";
</script>

<svelte:catch let:error>
  <p class="erreur">⚠️ Une erreur a été détectée : {error.message}</p>
</svelte:catch>

<ErreurComponent />
```

✅ **L'erreur est interceptée et affichée proprement sans bloquer l’application.**  

---

## **8. Comparaison des Méthodes de Gestion des Erreurs**  

| Méthode | Utilisation |
|---------|------------|
| **`{#if}`** | Afficher ou cacher un message d’erreur |
| **Classes dynamiques (`class:`)** | Modifier l’apparence en cas d’erreur |
| **Stores (`writable()`)** | Gérer les erreurs globalement |
| **`try/catch`** | Capturer une erreur dans une fonction |
| **`on:error`** | Intercepter les erreurs d’un composant |

---

## **9. Conclusion**  

✅ **Svelte facilite la gestion des erreurs avec `{#if}` et `class:`.**  
✅ **Les messages peuvent être temporaires ou permanents.**  
✅ **Les stores permettent de gérer des erreurs globalement.**  
✅ **`try/catch` et `on:error` capturent les erreurs critiques.**  

---

### **Prochain chapitre : Optimisation des performances en Svelte !** 🚀
