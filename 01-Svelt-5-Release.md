
# 📌 Création d'un projet SvelteKit

## 📖 Sommaire
- [🚀 Démarrer un projet](#-démarrer-un-projet)
- [📂 Structure du projet](#-structure-du-projet)
- [🖥️ Configuration de l'éditeur](#️-configuration-de-léditeur)

---

## 🚀 Démarrer un projet

La façon la plus simple de créer une application **SvelteKit** est d'exécuter la commande suivante :

```sh
npx sv create my-app
cd my-app
npm install
npm run dev
```

📌 **Explication :**
- La première commande génère un nouveau projet dans le répertoire `my-app`, en vous demandant si vous souhaitez configurer des outils comme **TypeScript**.
- Consultez la section [Intégrations](https://kit.svelte.dev/docs/integrations) pour des indications sur la mise en place d'outils supplémentaires.
- Les commandes suivantes installent les dépendances et démarrent un **serveur local** sur `http://localhost:5173`.

Lorsque vous exécutez `npx sv create my-app`, voici la séquence complète que vous verrez dans votre terminal :

```sh
(base) niklasfischer@Niklass-MacBook-Pro projects % npx sv create demonstration
Need to install the following packages:
  sv@0.5.11
Ok to proceed? (y) y

Welcome to the Svelte CLI! (v0.5.11)

✔ Which template would you like? › SvelteKit minimal
✔ Add type checking with Typescript?
  ▸ Yes, using Typescript syntax
    Yes, using Javascript with JSDoc comments
    No

✔ Project created

✔ What would you like to add to your project? (use arrow keys / space bar)
  ▸ prettier, eslint

✔ Which package manager do you want to install dependencies with?
  ▸ npm

✔ Successfully setup integrations
✔ Successfully installed dependencies
✔ Successfully formatted modified files
```

### 🚀 Étapes suivantes

Une fois le projet généré et les dépendances installées, vous verrez les instructions suivantes :

```sh
Project next steps
1: cd demonstration
2: git init && git add -A && git commit -m "Initial commit" (optional)
3: npm run dev -- --open

To close the dev server, hit Ctrl-C

Stuck? Visit us at https://svelte.dev/chat
You're all set!
```

📌 **Explication des étapes suivantes :**
- **Naviguer dans le projet** :  
  ```sh
  cd my-app
  ```
- **Initialiser un dépôt Git (optionnel)** :  
  ```sh
  git init && git add -A && git commit -m "Initial commit"
  ```
- **Lancer le serveur de développement avec ouverture automatique du navigateur** :  
  ```sh
  npm run dev -- --open
  ```

📌 **Le projet est maintenant accessible sur** `http://localhost:5173` 🚀.

---

## 📂 Structure du projet

### 🏗️ Principes fondamentaux
1️⃣ **Chaque page de votre application est un composant Svelte.**  
2️⃣ **Vous créez des pages en ajoutant des fichiers dans le répertoire `src/routes`.**  

Ces fichiers sont rendus côté **serveur** pour offrir un chargement rapide lors de la première visite, avant que l'application **côté client** ne prenne le relais.

Essayez de modifier les fichiers pour vous familiariser avec **SvelteKit** et observer les changements en temps réel.

---

## 🖥️ Configuration de l'éditeur

Nous recommandons d'utiliser **Visual Studio Code (VS Code)** avec l'extension **Svelte**, mais **d'autres éditeurs** sont également compatibles.

🛠️ **Installation de l'extension Svelte pour VS Code :**  
1. Ouvrez **VS Code**.  
2. Allez dans l'onglet **Extensions** (`Ctrl + Shift + X`).  
3. Recherchez **Svelte for VS Code**.  
4. Installez l'extension officielle.  

🔗 Autres éditeurs supportés : [Voir la documentation officielle](https://kit.svelte.dev/docs#editor-setup).

---

✅ **Votre projet est maintenant prêt !** Essayez de modifier les fichiers pour vous familiariser avec **SvelteKit** 🚀.

![image](https://github.com/user-attachments/assets/5cd9fef2-c3e0-4b0b-afb8-8ff7e1e47c2f)


