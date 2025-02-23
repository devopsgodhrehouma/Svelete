# **Chapitre 19 - Création d’un Plugin Svelte** 🔌  

---

## **1. Introduction : Pourquoi créer un Plugin en Svelte ?**  

Un **plugin Svelte** permet d'ajouter des fonctionnalités réutilisables à plusieurs projets.  
📌 **Exemples d’utilisation :**  
✅ Un **composant réutilisable** (ex: Modal, Toast, Notification)  
✅ Une **bibliothèque d’animations**  
✅ Un **hook personnalisé** (ex: détection du dark mode)  
✅ Une **intégration API simplifiée**  

---

## **2. Préparer l’Environnement pour un Plugin Svelte**  

📌 **Étape 1 : Créer un nouveau projet de plugin**  

```sh
mkdir mon-plugin-svelte
cd mon-plugin-svelte
npm init -y
npm install svelte
```

📌 **Étape 2 : Configurer `package.json` pour un plugin**  

Ajoutez ces lignes dans **`package.json`** :  

```json
{
  "name": "mon-plugin-svelte",
  "version": "1.0.0",
  "main": "index.js",
  "module": "index.js",
  "svelte": "index.js",
  "type": "module"
}
```

✅ **Cela permet à Svelte de reconnaître le plugin.**  

---

## **3. Créer un Composant Svelte Réutilisable (Ex: Toast Notification)**  

📌 **Dans `src/Toast.svelte`, ajoutez ceci :**  

```svelte
<script>
  export let message = "Notification !";
  export let type = "info"; // "info", "success", "error"

  const couleurs = {
    info: "blue",
    success: "green",
    error: "red"
  };
</script>

<div class="toast" style="background: {couleurs[type]};">
  {message}
</div>

<style>
  .toast {
    color: white;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
```

✅ **Le plugin `Toast.svelte` permet d’afficher une notification stylée.**  

---

## **4. Créer un Store Global pour le Plugin**  

📌 **Dans `src/toastStore.js`, créez un store pour afficher des notifications**  

```js
import { writable } from "svelte/store";

export const toast = writable({ message: "", type: "info", visible: false });

export function afficherToast(message, type = "info") {
  toast.set({ message, type, visible: true });

  setTimeout(() => {
    toast.set({ message: "", type, visible: false });
  }, 3000);
}
```

✅ **Le store permet d’afficher une notification et de la masquer après 3 secondes.**  

---

## **5. Connecter le Store au Composant Toast**  

📌 **Modifiez `Toast.svelte` pour écouter le `store`**  

```svelte
<script>
  import { toast } from "./toastStore.js";
</script>

{#if $toast.visible}
  <div class="toast" style="background: {$toast.type === 'success' ? 'green' : $toast.type === 'error' ? 'red' : 'blue'};">
    {$toast.message}
  </div>
{/if}
```

✅ **Désormais, le toast s’affiche via le store.**  

---

## **6. Exporter et Publier le Plugin**  

📌 **Dans `index.js`, regroupez les composants et le store**  

```js
import Toast from "./src/Toast.svelte";
import { afficherToast } from "./src/toastStore.js";

export { Toast, afficherToast };
```

📌 **Utilisation dans un autre projet Svelte**  

1️⃣ **Installer le plugin localement :**  
```sh
npm install ../mon-plugin-svelte
```

2️⃣ **Utiliser le plugin dans `App.svelte` :**  

```svelte
<script>
  import { Toast, afficherToast } from "mon-plugin-svelte";
</script>

<button on:click={() => afficherToast("Succès !", "success")}>
  Montrer un toast
</button>

<Toast />
```

✅ **Le plugin est prêt à être utilisé dans n’importe quel projet !**  

---

## **7. Publier le Plugin sur NPM**  

📌 **Étape 1 : Se connecter à NPM (si ce n’est pas encore fait)**  

```sh
npm login
```

📌 **Étape 2 : Publier le plugin**  

```sh
npm publish --access public
```

📌 **Étape 3 : Installer le plugin dans d'autres projets**  

```sh
npm install mon-plugin-svelte
```

✅ **Le plugin est désormais disponible pour toute la communauté !**  

---

## **8. Comparaison des Approches pour un Plugin**  

| Approche | Avantages | Inconvénients |
|----------|----------|--------------|
| **Composant unique (`Toast.svelte`)** | Simple à intégrer | Nécessite une déclaration manuelle |
| **Store (`toastStore.js`)** | Facile à partager entre composants | Nécessite une gestion du state |
| **Package NPM (`mon-plugin-svelte`)** | Réutilisable partout | Nécessite une publication et une maintenance |

✅ **Un bon plugin combine un composant + un store pour être flexible.**  

---

## **9. Résumé des Étapes Clés**  

✔️ **Créer un projet de plugin (`npm init`)**  
✔️ **Créer un composant Svelte (`Toast.svelte`)**  
✔️ **Gérer l’affichage avec un store (`toastStore.js`)**  
✔️ **Exporter les fonctionnalités (`index.js`)**  
✔️ **Publier le package sur NPM (`npm publish`)**  

---

## **10. Conclusion**  

✅ **Créer un plugin Svelte est simple et puissant.**  
✅ **On peut rendre un composant réutilisable et le partager sur NPM.**  
✅ **Les stores permettent de mieux gérer l’état du plugin.**  

---

### **Prochain Chapitre : Tests et Debugging en Svelte !** 
