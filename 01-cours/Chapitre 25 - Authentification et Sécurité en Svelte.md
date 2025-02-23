# **Chapitre 25 - Authentification et Sécurité en Svelte 🔒**  

---

## **1. Introduction : Pourquoi l'Authentification et la Sécurité en Svelte ?**  

L'authentification est une fonctionnalité essentielle pour sécuriser une application. **Svelte** ne propose pas de solution intégrée, mais il peut être combiné avec **JWT, Firebase, OAuth** ou encore des solutions backend comme **Express.js et Supabase**.

📌 **Pourquoi sécuriser une application Svelte ?**  
✅ **Protéger les données utilisateur** (éviter les accès non autorisés).  
✅ **Empêcher les attaques (XSS, CSRF, injections)**.  
✅ **Gérer les sessions utilisateur avec JWT ou cookies sécurisés**.  

---

## **2. Authentification avec Firebase 🔥 (Facile et rapide)**  

📌 **Firebase Auth permet d'ajouter rapidement un système d'authentification avec Google, Facebook, ou Email.**  

### **1️⃣ Installer Firebase SDK**
Dans votre projet, installez Firebase :

```sh
npm install firebase
```

### **2️⃣ Configurer Firebase (`firebaseConfig.js`)**

Allez sur **[Firebase Console](https://console.firebase.google.com/)**, créez un projet et récupérez les clés API.

```js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_DOMAINE.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export function loginGoogle() {
  return signInWithPopup(auth, provider);
}

export function deconnexion() {
  return signOut(auth);
}
```

### **3️⃣ Ajouter l'authentification dans `Auth.svelte`**

```svelte
<script>
  import { auth, loginGoogle, deconnexion } from "./firebaseConfig.js";
  import { onAuthStateChanged } from "firebase/auth";
  import { writable } from "svelte/store";

  let utilisateur = writable(null);

  onAuthStateChanged(auth, (user) => {
    utilisateur.set(user);
  });
</script>

{#if $utilisateur}
  <p>Bienvenue, {$utilisateur.displayName} !</p>
  <button on:click={deconnexion}>Se déconnecter</button>
{:else}
  <button on:click={loginGoogle}>Se connecter avec Google</button>
{/if}
```

✅ **L'utilisateur peut maintenant se connecter avec Google !**  

---

## **3. Authentification avec JWT et un Backend Express.js 🛠️**  

### **1️⃣ Installer JSON Web Token (JWT)**
Si vous utilisez un backend, installez JWT dans votre serveur Node.js :

```sh
npm install express jsonwebtoken cors
```

### **2️⃣ Créer un backend sécurisé (`server.js`)**

```js
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const utilisateurs = [{ id: 1, username: "admin", password: "1234" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = utilisateurs.find((u) => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: "Identifiants incorrects" });

  const token = jwt.sign({ id: user.id, username: user.username }, "SECRET_KEY", { expiresIn: "1h" });

  res.json({ token });
});

app.listen(3000, () => console.log("Serveur en cours sur http://localhost:3000"));
```

### **3️⃣ Ajouter l'authentification JWT dans `Auth.svelte`**

```svelte
<script>
  import { writable } from "svelte/store";

  let token = writable(localStorage.getItem("token") || "");
  let username = "";
  let password = "";

  async function connexion() {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
      token.set(data.token);
      localStorage.setItem("token", data.token);
    }
  }

  function deconnexion() {
    token.set("");
    localStorage.removeItem("token");
  }
</script>

{#if $token}
  <p>Connecté</p>
  <button on:click={deconnexion}>Se déconnecter</button>
{:else}
  <input type="text" bind:value={username} placeholder="Nom d'utilisateur" />
  <input type="password" bind:value={password} placeholder="Mot de passe" />
  <button on:click={connexion}>Se connecter</button>
{/if}
```

✅ **Connexion avec JWT, stockage sécurisé avec `localStorage`.**  

---

## **4. Sécuriser l’Application Contre les Attaques 🔐**  

📌 **Menaces courantes :**  
✔️ **XSS (Cross-Site Scripting)** → Injection de scripts malveillants.  
✔️ **CSRF (Cross-Site Request Forgery)** → Attaque qui force une action non voulue.  
✔️ **Injections SQL** → Tentative d’accès aux bases de données via des entrées non sécurisées.  

### **✅ Protection contre le XSS en Svelte**  

Toujours **échapper les entrées utilisateur** avant de les afficher :

```svelte
<script>
  let commentaire = "";
</script>

<input type="text" bind:value={commentaire} />
<p>{#html commentaire}</p> <!-- ⚠️ Mauvaise pratique ! -->

<!-- ✅ Utiliser un affichage sécurisé -->
<p>{commentaire}</p>
```

✅ **Éviter `{#html}` sauf si c’est vraiment nécessaire.**  

---

### **✅ Protection contre le CSRF (avec Tokens Anti-CSRF)**  

Ajoutez un **token CSRF** lors des requêtes sensibles :  

```svelte
<script>
  let csrfToken = "RANDOM_CSRF_TOKEN";
</script>

<form method="POST" action="/envoyer">
  <input type="hidden" name="csrf_token" value={csrfToken} />
  <button type="submit">Envoyer</button>
</form>
```

✅ **Empêche un site malveillant d’exécuter des actions non autorisées.**  

---

## **5. Protéger les Routes avec un Middleware (Backend Express.js)**  

Ajoutez un **middleware JWT** pour protéger les routes privées :

```js
const verifierToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Non autorisé" });

  jwt.verify(token.split(" ")[1], "SECRET_KEY", (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
};

app.get("/profil", verifierToken, (req, res) => {
  res.json({ message: "Accès autorisé", user: req.user });
});
```

✅ **Les utilisateurs non authentifiés ne peuvent pas accéder aux routes privées.**  

---

## **6. Résumé et Bonnes Pratiques**  

✔️ **Firebase Auth pour une solution simple et rapide.**  
✔️ **JWT pour gérer les sessions utilisateur avec un backend.**  
✔️ **Échapper les entrées utilisateur pour éviter les attaques XSS.**  
✔️ **Ajouter des tokens CSRF pour protéger contre les attaques CSRF.**  
✔️ **Utiliser des middleware (`verifierToken()`) pour protéger les API.**  

---

## **7. Conclusion**  

✅ **Svelte permet une authentification fluide avec Firebase, JWT ou OAuth.**  
✅ **Sécuriser les entrées et les requêtes est crucial pour protéger les utilisateurs.**  
✅ **Un bon système d’authentification améliore la confiance et l’expérience utilisateur.**  

---

### **Prochain Chapitre : Intégration d’une API REST et GraphQL en Svelte !** 🚀 Veux-tu que je commence la rédaction ? 😊
