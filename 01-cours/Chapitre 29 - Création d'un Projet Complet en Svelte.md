# **Chapitre 29 - Création d'un Projet Complet en Svelte 🚀**  

Dans ce chapitre final, nous allons **construire un projet complet en Svelte** qui inclut la plupart des notions vues précédemment :  
✅ **Composants et gestion de l’état (`store`)**  
✅ **Routage avec SvelteKit**  
✅ **Authentification avec Firebase**  
✅ **Utilisation d’une API REST et WebSockets**  
✅ **Animations et transitions**  
✅ **Gestion de formulaires et validation**  
✅ **Déploiement avec Vercel**  

---

## **1. Présentation du Projet : "SvelteChat" 🗨️**  

Nous allons créer **une application de chat en temps réel** qui permet :  
- **Inscription et connexion avec Firebase**  
- **Envoi et réception de messages via WebSockets**  
- **Stockage des messages dans une base de données (Firebase)**  
- **Interface fluide avec des animations et transitions**  
- **Déploiement sur Vercel**  

📌 **Technos utilisées :**  
✔️ **SvelteKit** pour la structure du projet  
✔️ **Firebase** pour l’authentification et le stockage des messages  
✔️ **WebSockets (`ws`)** pour le chat en temps réel  
✔️ **Svelte Stores (`writable()`)** pour gérer l’état  
✔️ **Vercel** pour héberger l’application  

---

## **2. Initialisation du Projet SvelteKit**  

📌 **Créer un projet SvelteKit**  

```sh
npm create svelte@latest sveltechat
cd sveltechat
npm install
```

📌 **Lancer le serveur**  

```sh
npm run dev
```

✅ **Vous devriez voir la page d’accueil SvelteKit sur `http://localhost:5173`.**  

---

## **3. Configuration de Firebase pour l'Authentification 🔑**  

### **1️⃣ Installer Firebase**  

```sh
npm install firebase
```

### **2️⃣ Configurer Firebase (`src/lib/firebase.js`)**  

Allez sur **[Firebase Console](https://console.firebase.google.com/)** et créez un projet.  
Ajoutez l’authentification avec **Google** et récupérez la config Firebase :  

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}
```

### **3️⃣ Gérer l’utilisateur avec un `store` (`src/lib/stores.js`)**  

```js
import { writable } from "svelte/store";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const user = writable(null);

onAuthStateChanged(auth, (u) => {
  user.set(u);
});
```

✅ **Le store `user` contient les informations de l’utilisateur connecté.**  

---

## **4. Interface de Connexion avec Firebase (`src/routes/+page.svelte`)**  

```svelte
<script>
  import { login, logout } from "$lib/firebase";
  import { user } from "$lib/stores.js";
</script>

{#if $user}
  <p>Bienvenue, {$user.displayName} !</p>
  <button on:click={logout}>Déconnexion</button>
{:else}
  <button on:click={login}>Se connecter avec Google</button>
{/if}
```

✅ **L’utilisateur peut se connecter et se déconnecter avec Google.**  

---

## **5. Configuration du Serveur WebSocket (Backend Node.js) 🔄**  

📌 **Créer un fichier `server.js` et installer WebSockets (`ws`)**  

```sh
npm install ws express
```

### **1️⃣ Configurer le serveur WebSocket (`server.js`)**  

```js
const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = app.listen(3000);
const wsServer = new WebSocket.Server({ server });

wsServer.on("connection", (socket) => {
  console.log("Client connecté");

  socket.on("message", (msg) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log("WebSocket en cours sur ws://localhost:3000");
```

✅ **Le serveur WebSocket écoute et diffuse les messages à tous les clients.**  

---

## **6. Ajout du Chat en Temps Réel (`src/routes/chat/+page.svelte`)**  

```svelte
<script>
  import { user } from "$lib/stores.js";

  let socket;
  let messages = [];
  let message = "";

  function connecter() {
    socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      messages = [...messages, event.data];
    };
  }

  function envoyerMessage() {
    if (socket && socket.readyState === WebSocket.OPEN && $user) {
      socket.send(`${$user.displayName} : ${message}`);
      message = "";
    }
  }
</script>

<button on:click={connecter}>Se connecter au chat</button>

<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>

<input type="text" bind:value={message} placeholder="Message..." />
<button on:click={envoyerMessage}>Envoyer</button>
```

✅ **Les messages sont envoyés et affichés en temps réel grâce à WebSockets.**  

---

## **7. Animations et Transitions pour le Chat**  

📌 **Ajoutez une transition `fade` pour chaque message**  

```svelte
<script>
  import { fade } from "svelte/transition";
</script>

<ul>
  {#each messages as msg (msg)}
    <li transition:fade>{msg}</li>
  {/each}
</ul>
```

✅ **Les messages apparaissent en fondu.**  

---

## **8. Déploiement du Projet sur Vercel 🚀**  

### **1️⃣ Installer Vercel CLI et déployer**  

```sh
npm install -g vercel
vercel
```

📌 **Suivez les instructions et obtenez une URL publique comme `https://sveltechat.vercel.app`.**  

✅ **Le projet est maintenant en ligne !**  

---

## **9. Résumé des Fonctionnalités du Projet**  

✔️ **Connexion avec Firebase et Google Auth**  
✔️ **Gestion de l’état avec un `store` (`writable()`)**  
✔️ **WebSockets pour un chat en temps réel**  
✔️ **Animations (`fade`) pour fluidifier l’interface**  
✔️ **Déploiement automatique avec Vercel**  

---

## **10. Conclusion 🎉**  

🚀 **Félicitations ! Vous avez construit une application complète avec Svelte.**  
✅ **Ce projet peut être amélioré avec de nouvelles fonctionnalités (emoji, notifications, etc.).**  
✅ **Svelte est un framework puissant, simple et performant pour le développement web moderne.**  

---

🎯 **Prochaines étapes : Ajouter des notifications push, un mode sombre, ou un support mobile !**  
Veux-tu approfondir un aspect particulier ? 😊
