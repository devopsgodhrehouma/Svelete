# **Chapitre 13 - Gestion des Formulaires et Validation en Svelte**  

---

## **1. Introduction : Pourquoi gérer les formulaires en Svelte ?**  

Les formulaires sont **essentiels** dans toute application web. Svelte simplifie la gestion des formulaires grâce à :  

✅ **`bind:value`** → Lie directement une variable à un champ.  
✅ **Événements comme `on:submit`** → Capture la soumission du formulaire.  
✅ **Validation côté client** → Vérifie les données avant l’envoi.  

---

## **2. Liaison Directe avec `bind:value`**  

📌 **Svelte permet de lier un champ à une variable sans `on:input`.**  

### **Exemple : Un formulaire simple avec `bind:value`**  

```svelte
<script>
  let nom = "";
</script>

<input type="text" bind:value={nom} placeholder="Votre nom" />
<p>Bonjour, {nom} !</p>
```

✅ **Dès que l’utilisateur tape, `nom` est mis à jour en temps réel.**  

---

## **3. Capturer la Soumission du Formulaire avec `on:submit`**  

📌 **Svelte permet d’intercepter la soumission d’un formulaire avec `on:submit`.**  

### **Exemple : Formulaire avec soumission contrôlée**  

```svelte
<script>
  let email = "";

  function envoyerFormulaire(event) {
    event.preventDefault();
    alert(`Formulaire soumis avec l'email : ${email}`);
  }
</script>

<form on:submit={envoyerFormulaire}>
  <input type="email" bind:value={email} placeholder="Votre email" required />
  <button type="submit">Envoyer</button>
</form>
```

✅ **Explication :**  
- **`on:submit={envoyerFormulaire}`** → Capture la soumission du formulaire.  
- **`event.preventDefault();`** → Empêche le rechargement de la page.  

---

## **4. Validation des Champs en Temps Réel**  

📌 **Svelte permet de valider un champ sans soumettre le formulaire.**  

### **Exemple : Vérifier si un champ est vide**  

```svelte
<script>
  let nom = "";
  let erreur = "";
  
  function verifierNom() {
    erreur = nom.length < 3 ? "Le nom doit avoir au moins 3 caractères" : "";
  }
</script>

<input type="text" bind:value={nom} on:input={verifierNom} placeholder="Votre nom" />
<p style="color: red;">{erreur}</p>
```

✅ **Si le champ contient moins de 3 caractères, un message d’erreur s’affiche.**  

---

## **5. Validation avec des Expressions Régulières (Regex)**  

📌 **On peut utiliser des regex pour vérifier des formats (ex: email, mot de passe).**  

### **Exemple : Vérifier le format d’un email**  

```svelte
<script>
  let email = "";
  let erreur = "";
  
  function verifierEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    erreur = regex.test(email) ? "" : "Email invalide";
  }
</script>

<input type="email" bind:value={email} on:input={verifierEmail} placeholder="Votre email" />
<p style="color: red;">{erreur}</p>
```

✅ **Seul un email valide est accepté.**  

---

## **6. Validation Complète à la Soumission du Formulaire**  

📌 **On peut valider plusieurs champs avant d’envoyer les données.**  

### **Exemple : Validation du nom et de l’email avant soumission**  

```svelte
<script>
  let nom = "";
  let email = "";
  let erreurs = [];

  function verifierFormulaire(event) {
    event.preventDefault();
    erreurs = [];

    if (nom.length < 3) erreurs.push("Le nom doit avoir au moins 3 caractères.");
    if (!email.includes("@")) erreurs.push("L'email doit être valide.");
    
    if (erreurs.length === 0) {
      alert("Formulaire soumis avec succès !");
    }
  }
</script>

<form on:submit={verifierFormulaire}>
  <input type="text" bind:value={nom} placeholder="Votre nom" />
  <input type="email" bind:value={email} placeholder="Votre email" />
  <button type="submit">Envoyer</button>
</form>

<ul>
  {#each erreurs as erreur}
    <li style="color: red;">{erreur}</li>
  {/each}
</ul>
```

✅ **Si les champs sont invalides, les erreurs s’affichent avant la soumission.**  

---

## **7. Ajouter des Styles aux Champs Invalides**  

📌 **On peut modifier l’apparence des champs invalides avec `class:`.**  

### **Exemple : Ajouter une bordure rouge aux champs incorrects**  

```svelte
<script>
  let email = "";
  let estInvalide = false;

  function verifierEmail() {
    estInvalide = !email.includes("@");
  }
</script>

<input type="email" bind:value={email} on:input={verifierEmail} class:invalide placeholder="Votre email" />

<style>
  .invalide {
    border: 2px solid red;
  }
</style>
```

✅ **Le champ devient rouge si l’email est invalide.**  

---

## **8. Ajouter un Mot de Passe avec Affichage/Masquage**  

📌 **On peut basculer entre texte et mot de passe avec un bouton.**  

### **Exemple : Champ de mot de passe avec visibilité toggle**  

```svelte
<script>
  let motDePasse = "";
  let visible = false;
</script>

<input type={visible ? "text" : "password"} bind:value={motDePasse} placeholder="Mot de passe" />
<button on:click={() => visible = !visible}>
  {visible ? "Cacher" : "Afficher"}
</button>
```

✅ **Le mot de passe peut être affiché ou caché en cliquant sur le bouton.**  

---

## **9. Stocker les Données dans un Store (`writable()`)**  

📌 **On peut utiliser un `store` pour stocker les valeurs du formulaire.**  

### **1️⃣ Créer un store `formStore.js`**  

```js
import { writable } from "svelte/store";

export const utilisateur = writable({ nom: "", email: "" });
```

### **2️⃣ Utiliser le store dans `App.svelte`**  

```svelte
<script>
  import { utilisateur } from "./formStore.js";
</script>

<input type="text" bind:value={$utilisateur.nom} placeholder="Nom" />
<input type="email" bind:value={$utilisateur.email} placeholder="Email" />

<p>Nom : {$utilisateur.nom}</p>
<p>Email : {$utilisateur.email}</p>
```

✅ **Le formulaire est réactif et stocké dans un `store`.**  

---

## **10. Comparaison des Méthodes de Gestion des Formulaires en Svelte**  

| Méthode | Explication |
|---------|------------|
| **`bind:value`** | Lie un champ directement à une variable |
| **`on:submit`** | Capture la soumission du formulaire |
| **Validation en temps réel** | Vérifie les champs au fur et à mesure |
| **Regex (`test()`)** | Vérifie le format des données (ex: email) |
| **`class:`** | Change l’apparence des champs invalides |
| **Stores (`writable()`)** | Stocke les données globalement |

---

## **11. Conclusion**  

✅ **Svelte simplifie la gestion des formulaires avec `bind:value`.**  
✅ **On peut valider les champs en temps réel et au moment de la soumission.**  
✅ **L’affichage des erreurs peut être automatique et visuel.**  
✅ **L’utilisation des stores permet de sauvegarder les données facilement.**  

---

### **Prochain chapitre : Gestion des erreurs et messages d’alerte en Svelte !** 🚀
