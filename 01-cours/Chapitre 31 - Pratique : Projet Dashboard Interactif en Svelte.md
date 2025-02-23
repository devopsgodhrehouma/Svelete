# **Chapitre 31 - Pratique : Projet Dashboard Interactif en Svelte 📊**  

---

## **1. Présentation du Projet : "Svelte Dashboard"**  

Dans ce projet, nous allons construire **un tableau de bord interactif** qui affichera :  
- 📈 **Graphiques dynamiques (statistiques, ventes, trafic, etc.)**  
- 🛠️ **Widgets interactifs** (chiffres clés, tendances)  
- 🎨 **Design responsive et animations fluides**  
- 📡 **Données récupérées via une API (REST ou GraphQL)**  
- 🔄 **Mises à jour en temps réel avec WebSockets**  

📌 **Technologies utilisées :**  
✔️ **Svelte + Svelte Stores (`writable()`)**  
✔️ **Chart.js pour les graphiques dynamiques**  
✔️ **API REST simulée pour les données**  
✔️ **Transitions et animations pour fluidifier l’interface**  
✔️ **Déploiement sur Vercel**  

---

## **2. Initialisation du Projet Svelte**  

📌 **Créer un projet Svelte avec Vite**  

```sh
npm create vite@latest svelte-dashboard --template svelte
cd svelte-dashboard
npm install
```

📌 **Lancer le projet**  

```sh
npm run dev
```

✅ **Votre projet Svelte est maintenant prêt !**  

---

## **3. Installer Chart.js pour les Graphiques**  

📌 **Installer la bibliothèque `chart.js` et l'adaptateur Svelte `svelte-chartjs`**  

```sh
npm install chart.js svelte-chartjs
```

✅ **Chart.js est maintenant prêt pour afficher des statistiques dynamiques.**  

---

## **4. Créer un `store` pour gérer les Données Statistiques 📊**  

Nous allons utiliser **un store (`writable()`)** pour gérer les chiffres et graphiques du dashboard.  

📌 **Créer un fichier `src/lib/stores.js`**  

```js
import { writable } from "svelte/store";

// Données initiales (peuvent être mises à jour en temps réel)
export const stats = writable({
  ventes: 500,
  visiteurs: 1200,
  conversion: 3.5,
});

// Fonction pour mettre à jour les chiffres (ex : WebSocket ou API)
export function updateStats(newData) {
  stats.set(newData);
}
```

✅ **Ce store centralise les données du tableau de bord.**  

---

## **5. Composant Graphique avec Chart.js (`src/lib/ChartComponent.svelte`)**  

📌 **Créer un composant `ChartComponent.svelte` pour afficher un graphique dynamique.**  

```svelte
<script>
  import { Line } from "svelte-chartjs";
  import { stats } from "./stores.js";
  import { onMount } from "svelte";

  let chartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
    datasets: [
      {
        label: "Ventes",
        data: [120, 150, 180, 220, 260],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        tension: 0.3,
      },
    ],
  };

  // Mettre à jour les données en temps réel
  onMount(() => {
    stats.subscribe((newStats) => {
      chartData.datasets[0].data.push(newStats.ventes);
      chartData.labels.push("Nouv.");
    });
  });
</script>

<Line {chartData} />
```

✅ **Ce graphique affiche l'évolution des ventes et s'actualise en direct.**  

---

## **6. Interface du Dashboard (`src/routes/+page.svelte`)**  

📌 **Créer le design principal du dashboard avec des widgets et graphiques.**  

```svelte
<script>
  import { stats, updateStats } from "$lib/stores.js";
  import ChartComponent from "$lib/ChartComponent.svelte";

  function genererDonneesAleatoires() {
    updateStats({
      ventes: Math.floor(Math.random() * 1000),
      visiteurs: Math.floor(Math.random() * 3000),
      conversion: (Math.random() * 5).toFixed(2),
    });
  }
</script>

<main>
  <h1>📊 Tableau de Bord</h1>

  <!-- Statistiques Clés -->
  <section class="widgets">
    <div class="card">
      <h3>💰 Ventes</h3>
      <p>{$stats.ventes} €</p>
    </div>
    <div class="card">
      <h3>👥 Visiteurs</h3>
      <p>{$stats.visiteurs}</p>
    </div>
    <div class="card">
      <h3>📈 Taux de Conversion</h3>
      <p>{$stats.conversion} %</p>
    </div>
  </section>

  <!-- Graphique Dynamique -->
  <section>
    <ChartComponent />
  </section>

  <button on:click={genererDonneesAleatoires}>🔄 Mettre à Jour</button>
</main>

<style>
  main {
    text-align: center;
    max-width: 800px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  .widgets {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }

  .card {
    background: #f3f3f3;
    padding: 15px;
    border-radius: 8px;
    width: 30%;
  }

  button {
    padding: 10px 15px;
    margin-top: 20px;
    cursor: pointer;
  }
</style>
```

✅ **Le dashboard affiche les statistiques et permet de les actualiser.**  

---

## **7. WebSockets pour Mettre à Jour les Données en Temps Réel 🔄**  

Nous allons utiliser un **serveur WebSocket** pour envoyer des données en temps réel au Dashboard.  

📌 **Créer un `server.js` pour gérer les WebSockets**  

```sh
npm install ws express
```

```js
const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = app.listen(3000);
const wsServer = new WebSocket.Server({ server });

function sendRandomData() {
  const data = JSON.stringify({
    ventes: Math.floor(Math.random() * 1000),
    visiteurs: Math.floor(Math.random() * 3000),
    conversion: (Math.random() * 5).toFixed(2),
  });

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Envoi des nouvelles données toutes les 5 secondes
setInterval(sendRandomData, 5000);

console.log("WebSocket en cours sur ws://localhost:3000");
```

📌 **Modifier `src/lib/stores.js` pour écouter le WebSocket**  

```js
const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = (event) => {
  const newData = JSON.parse(event.data);
  stats.set(newData);
};
```

✅ **Les statistiques se mettent à jour automatiquement toutes les 5 secondes !**  

---

## **8. Déploiement sur Vercel 🚀**  

📌 **1️⃣ Installer Vercel CLI**  

```sh
npm install -g vercel
```

📌 **2️⃣ Déployer le projet**  

```sh
vercel
```

✅ **Votre tableau de bord interactif est maintenant en ligne !**  

---

## **9. Résumé des Fonctionnalités**  

✔️ **Statistiques dynamiques avec `stores`**  
✔️ **Graphiques interactifs avec `chart.js`**  
✔️ **Actualisation en temps réel avec WebSockets**  
✔️ **Transitions et animations pour une interface fluide**  
✔️ **Déploiement sur Vercel**  

---

## **10. Conclusion 🎉**  

🚀 **Félicitations ! Vous avez construit un tableau de bord interactif en Svelte.**  
✅ **Vous pouvez maintenant ajouter des nouvelles fonctionnalités comme :**  
- **Un mode sombre**  
- **Une intégration avec Firebase pour un stockage persistant**  
- **Plusieurs types de graphiques (barres, donuts, etc.)**  

---

📌 **Prochain Projet : Application de Gestion de Budget en Svelte !** Veux-tu que je commence la rédaction ? 😊
