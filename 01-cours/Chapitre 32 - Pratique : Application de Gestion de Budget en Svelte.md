# **Chapitre 32 - Pratique : Application de Gestion de Budget en Svelte 💰**  

---

## **1. Présentation du Projet : "Svelte Budget Manager"**  

Nous allons construire **une application complète de gestion de budget** qui permet :  
✅ **Ajouter des revenus et dépenses**  
✅ **Catégoriser les transactions (Nourriture, Logement, Transport, etc.)**  
✅ **Afficher un solde mis à jour dynamiquement**  
✅ **Visualiser les transactions sous forme de graphique interactif**  
✅ **Stocker les données avec `LocalStorage`**  
✅ **Déploiement sur Vercel**  

📌 **Technologies utilisées :**  
✔️ **Svelte + Svelte Stores (`writable()`)**  
✔️ **Chart.js pour les graphiques dynamiques**  
✔️ **LocalStorage pour sauvegarder les transactions**  
✔️ **Transitions (`fade`) pour un rendu fluide**  

---

## **2. Initialisation du Projet Svelte**  

📌 **Créer un projet Svelte avec Vite**  

```sh
npm create vite@latest svelte-budget --template svelte
cd svelte-budget
npm install
```

📌 **Lancer le projet**  

```sh
npm run dev
```

✅ **Votre projet Svelte est maintenant prêt !**  

---

## **3. Créer un `store` pour Gérer le Budget 🗂️**  

Nous allons utiliser **un store (`writable()`)** pour centraliser les transactions et le solde total.  

📌 **Créer un fichier `src/lib/stores.js`**  

```js
import { writable } from "svelte/store";

// Charger les transactions depuis LocalStorage
const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Store des transactions
export const transactions = writable(savedTransactions);

// Calcul du solde total
export const totalBalance = writable(
  savedTransactions.reduce((acc, t) => acc + t.amount, 0)
);

// Sauvegarde automatique des données
transactions.subscribe((t) => {
  localStorage.setItem("transactions", JSON.stringify(t));
  totalBalance.set(t.reduce((acc, t) => acc + t.amount, 0));
});

// Ajouter une transaction
export function addTransaction(text, amount, category) {
  transactions.update((t) => [
    ...t,
    { id: Date.now(), text, amount, category },
  ]);
}

// Supprimer une transaction
export function deleteTransaction(id) {
  transactions.update((t) => t.filter((tx) => tx.id !== id));
}
```

✅ **Les transactions sont maintenant stockées et mises à jour dynamiquement.**  

---

## **4. Interface Principale (`App.svelte`)**  

📌 **Créer une interface utilisateur simple et intuitive.**  

```svelte
<script>
  import { transactions, totalBalance, addTransaction, deleteTransaction } from "$lib/stores.js";
  import { fade } from "svelte/transition";

  let text = "";
  let amount = 0;
  let category = "Autre";
</script>

<main>
  <h1>💰 Gestion de Budget</h1>

  <h2>Solde Total : {$totalBalance} €</h2>

  <!-- Formulaire d'ajout -->
  <form on:submit|preventDefault={() => { addTransaction(text, parseFloat(amount), category); text = ""; amount = 0; }}>
    <input type="text" bind:value={text} placeholder="Nom de la transaction..." required />
    <input type="number" bind:value={amount} placeholder="Montant (€)" required />
    <select bind:value={category}>
      <option value="Nourriture">🥘 Nourriture</option>
      <option value="Logement">🏠 Logement</option>
      <option value="Transport">🚗 Transport</option>
      <option value="Loisirs">🎮 Loisirs</option>
      <option value="Autre">📌 Autre</option>
    </select>
    <button type="submit">Ajouter</button>
  </form>

  <!-- Liste des transactions -->
  <ul>
    {#each $transactions as tx (tx.id)}
      <li transition:fade>
        <span>{tx.text} ({tx.category})</span>
        <span class={tx.amount >= 0 ? "positive" : "negative"}>{tx.amount} €</span>
        <button on:click={() => deleteTransaction(tx.id)}>❌</button>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    max-width: 400px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  h2 {
    color: green;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input, select, button {
    padding: 10px;
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
</style>
```

✅ **Cette interface permet d’ajouter et supprimer des transactions facilement !**  

---

## **5. Graphique Dynamique avec Chart.js (`src/lib/ChartComponent.svelte`)**  

📌 **Installer Chart.js**  

```sh
npm install chart.js svelte-chartjs
```

📌 **Créer un fichier `ChartComponent.svelte` pour afficher un graphique des dépenses**  

```svelte
<script>
  import { Doughnut } from "svelte-chartjs";
  import { transactions } from "$lib/stores.js";

  let chartData = {
    labels: ["Nourriture", "Logement", "Transport", "Loisirs", "Autre"],
    datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ["red", "blue", "green", "purple", "orange"] }]
  };

  transactions.subscribe((t) => {
    let categories = { Nourriture: 0, Logement: 0, Transport: 0, Loisirs: 0, Autre: 0 };
    t.forEach(tx => { if (tx.amount < 0) categories[tx.category] += Math.abs(tx.amount); });
    chartData.datasets[0].data = Object.values(categories);
  });
</script>

<Doughnut {chartData} />
```

📌 **Ajouter le graphique dans `App.svelte`**  

```svelte
<section>
  <h3>Répartition des Dépenses</h3>
  <ChartComponent />
</section>
```

✅ **Les dépenses sont affichées sous forme de graphique circulaire !**  

---

## **6. Déploiement sur Vercel 🚀**  

📌 **1️⃣ Installer Vercel CLI**  

```sh
npm install -g vercel
```

📌 **2️⃣ Déployer le projet**  

```sh
vercel
```

✅ **L’application est maintenant en ligne sur une URL publique !**  

---

## **7. Résumé des Fonctionnalités du Projet**  

✔️ **Ajout, suppression et catégorisation des transactions**  
✔️ **Stockage des données avec `LocalStorage`**  
✔️ **Calcul et mise à jour dynamique du solde**  
✔️ **Visualisation des dépenses avec un graphique**  
✔️ **Transitions `fade` pour une interface fluide**  
✔️ **Déploiement sur Vercel**  

---

## **8. Conclusion 🎉**  

🚀 **Félicitations ! Vous avez construit une application de gestion de budget avec Svelte.**  
✅ **Prochaines améliorations possibles :**  
- 📡 **Connexion à une API pour synchroniser les données**  
- 📱 **Interface mobile optimisée (responsive)**  
- 🔔 **Notifications pour alerter en cas de budget dépassé**  

---

📌 **Prochain Projet : Un Gestionnaire de Notes en Svelte !** Veux-tu que je commence la rédaction ? 😊
