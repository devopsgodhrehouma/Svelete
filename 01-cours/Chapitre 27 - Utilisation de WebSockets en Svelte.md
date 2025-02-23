# **Chapitre 27 - Utilisation de WebSockets en Svelte 🔥**  

---

## **1. Introduction : Pourquoi utiliser WebSockets en Svelte ?**  

Les WebSockets permettent d'établir **une connexion bidirectionnelle en temps réel** entre le client et le serveur. Contrairement aux requêtes HTTP classiques, WebSockets maintiennent **une connexion ouverte** et permettent **d'envoyer et de recevoir des données en continu**.  

📌 **Pourquoi utiliser WebSockets en Svelte ?**  
✅ **Mises à jour en temps réel** (ex: chat, notifications, streaming de données).  
✅ **Évite les requêtes HTTP répétitives (`polling`)** et réduit la charge serveur.  
✅ **Améliore l’expérience utilisateur avec des interactions instantanées.**  

Dans ce chapitre, nous allons :  
1. **Créer un WebSocket serveur avec Node.js**  
2. **Se connecter au serveur WebSocket en Svelte**  
3. **Envoyer et recevoir des messages en temps réel**  
4. **Afficher des mises à jour automatiques**  
5. **Gérer les erreurs et reconnexions automatiques**  

---

## **2. Créer un WebSocket Server avec Node.js (Backend) 🛠️**  

📌 **Nous allons créer un serveur WebSocket avec `ws`, une bibliothèque simple pour Node.js.**  

### **1️⃣ Installer `ws` et configurer le serveur WebSocket**  

Dans un projet Node.js, installez WebSocket :  

```sh
npm install ws
```

### **2️⃣ Créer un serveur WebSocket (`server.js`)**  

```js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Envoyer un message de bienvenue au client
  socket.send(JSON.stringify({ message: "Bienvenue sur le WebSocket !" }));

  // Réception des messages du client
  socket.on("message", (data) => {
    console.log("Message reçu :", data.toString());

    // Diffuser le message à tous les clients connectés
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Gérer la déconnexion du client
  socket.on("close", () => {
    console.log("Client déconnecté");
  });
});

console.log("Serveur WebSocket démarré sur ws://localhost:8080");
```

✅ **Ce serveur écoute sur le port `8080`, envoie des messages et les diffuse à tous les clients connectés.**  

---

## **3. Se Connecter au WebSocket en Svelte (Frontend) 🖥️**  

📌 **Nous allons créer une interface en Svelte qui se connecte au WebSocket.**  

### **1️⃣ Se connecter au WebSocket dans `App.svelte`**  

```svelte
<script>
  let socket;
  let messages = [];
  let message = "";

  // Connexion au WebSocket
  function connecter() {
    socket = new WebSocket("ws://localhost:8080");

    // Écouter les messages reçus
    socket.onmessage = (event) => {
      messages = [...messages, JSON.parse(event.data).message];
    };

    // Gérer la fermeture
    socket.onclose = () => {
      console.log("WebSocket déconnecté");
    };
  }

  // Envoyer un message au serveur
  function envoyerMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
      message = "";
    }
  }
</script>

<button on:click={connecter}>Se connecter au WebSocket</button>

<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>

<input type="text" bind:value={message} placeholder="Tapez un message..." />
<button on:click={envoyerMessage}>Envoyer</button>
```

✅ **Ce code permet de se connecter au serveur WebSocket et d'envoyer/recevoir des messages en direct.**  

---

## **4. Afficher les Messages en Temps Réel 📡**  

📌 **Nous allons maintenant améliorer l'affichage des messages.**  

### **1️⃣ Ajouter des styles CSS**  

```svelte
<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 8px;
    margin: 4px 0;
    background: #f3f3f3;
    border-radius: 4px;
  }
</style>
```

✅ **Les messages sont maintenant bien formatés et lisibles.**  

---

## **5. Reconnexion Automatique en Cas de Déconnexion 🔄**  

📌 **Que se passe-t-il si la connexion WebSocket est interrompue ?**  
✅ **Nous allons implémenter une reconnexion automatique.**  

### **1️⃣ Modifier la fonction `connecter()` pour gérer la reconnexion**  

```svelte
<script>
  let socket;
  let messages = [];
  let message = "";
  let reconnectTimer;

  function connecter() {
    socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      messages = [...messages, JSON.parse(event.data).message];
    };

    socket.onclose = () => {
      console.log("Connexion perdue, tentative de reconnexion...");
      reconnectTimer = setTimeout(connecter, 3000); // Reconnexion après 3 secondes
    };
  }

  function envoyerMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
      message = "";
    }
  }

  // Démarrer la connexion au chargement
  connecter();
</script>
```

✅ **Le WebSocket tente de se reconnecter automatiquement en cas de déconnexion !**  

---

## **6. Comparaison WebSocket vs API REST**  

| Critère | API REST | WebSockets |
|---------|---------|------------|
| **Mode de communication** | Requêtes à la demande (HTTP) | Connexion bidirectionnelle permanente |
| **Performance** | Chaque requête crée une nouvelle connexion | Connexion persistante, faible latence |
| **Cas d’utilisation** | Chargement ponctuel de données | Chat, notifications, données en direct |
| **Complexité** | Facile à comprendre | Nécessite la gestion des connexions |

✅ **WebSockets sont idéaux pour les mises à jour en temps réel !**  

---

## **7. Résumé et Bonnes Pratiques**  

✔️ **Utiliser WebSockets pour les mises à jour en temps réel (chat, notifications, jeux, etc.).**  
✔️ **Mettre en place une reconnexion automatique pour éviter les interruptions.**  
✔️ **Toujours traiter les erreurs (`onerror`, `onclose`) pour assurer la robustesse.**  
✔️ **Limiter les connexions simultanées pour éviter une surcharge du serveur.**  
✔️ **Si une mise à jour en temps réel n'est pas nécessaire, REST peut suffire.**  

---

## **8. Conclusion**  

✅ **WebSockets permettent une communication en temps réel avec une faible latence.**  
✅ **Svelte facilite l’intégration des WebSockets avec `bind:value` et les stores (`writable()`).**  
✅ **Avec un bon système de gestion des connexions, votre application sera plus fluide et réactive.**  

---

### **Prochain Chapitre : Gestion des Animations et Transitions en Svelte !** 🎬 Veux-tu que je commence la rédaction ? 😊
