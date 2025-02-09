### **Chapitre 02 - Installation de Svelte et Premier Projet**  

---

## **1. Prérequis pour installer Svelte**  

Avant de commencer, vous devez avoir **Node.js** et **npm** installés sur votre machine. Node.js est un environnement qui permet d’exécuter JavaScript en dehors du navigateur, et npm est le gestionnaire de paquets utilisé pour installer des dépendances.  

### **Vérifier l’installation de Node.js et npm**  
Ouvrez un terminal et tapez :  

```sh
node -v
npm -v
```

Si Node.js n’est pas installé, téléchargez-le depuis **[nodejs.org](https://nodejs.org/)** et suivez les instructions d’installation.  

---

## **2. Créer un nouveau projet Svelte**  

Nous allons maintenant créer un projet Svelte en utilisant un **modèle de démarrage**.  

### **1. Ouvrez votre terminal et tapez :**  
```sh
npx degit sveltejs/template mon-premier-projet
cd mon-premier-projet
npm install
```

🔹 **Explication** :  
- `npx degit sveltejs/template mon-premier-projet` → Télécharge un projet Svelte de base.  
- `cd mon-premier-projet` → Entre dans le dossier du projet.  
- `npm install` → Installe les dépendances nécessaires.  

---

## **3. Démarrer le serveur de développement**  

Une fois les dépendances installées, démarrez votre projet avec :  

```sh
npm run dev
```

Vous verrez ce message dans le terminal :  

```
Local: http://localhost:5173/
```

Ouvrez votre navigateur et accédez à `http://localhost:5173/`.  

---

## **4. Structure du projet Svelte**  

Voici les principaux fichiers générés dans votre projet :  

📂 **mon-premier-projet/**  
┣ 📂 `public/` → Contient les fichiers statiques (favicon, index.html).  
┣ 📂 `src/` → Contient le code source de votre application.  
┃ ┣ 📜 `App.svelte` → Le fichier principal de votre application.  
┃ ┣ 📜 `main.js` → Le fichier qui monte l’application dans la page HTML.  
┣ 📜 `package.json` → Contient les dépendances et scripts npm.  
┣ 📜 `vite.config.js` → Configuration de Vite (serveur rapide pour Svelte).  

---

## **5. Modifier son premier fichier Svelte**  

### **Objectif : Modifier `App.svelte` pour afficher un message personnalisé.**  

Ouvrez `src/App.svelte` et remplacez le contenu par :  

```svelte
<script>
  let message = "Bienvenue dans votre premier projet Svelte !";
</script>

<h1>{message}</h1>

<style>
  h1 {
    color: green;
    font-family: Arial, sans-serif;
  }
</style>
```

### **Explication :**  
1. La variable `message` est affichée dynamiquement avec `{message}`.  
2. Le texte devient vert grâce au style défini.  

---

## **6. Résumé des commandes utilisées**  

| Commande | Explication |
|----------|------------|
| `node -v` | Vérifie la version de Node.js |
| `npm -v` | Vérifie la version de npm |
| `npx degit sveltejs/template mon-premier-projet` | Crée un projet Svelte |
| `cd mon-premier-projet` | Entre dans le dossier du projet |
| `npm install` | Installe les dépendances |
| `npm run dev` | Démarre le serveur de développement |

---

### **Prochain chapitre : Comprendre la structure d’un composant Svelte !** 🚀
