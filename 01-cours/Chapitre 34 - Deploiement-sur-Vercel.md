## Tutoriel exhaustif : Déployer un projet Svelte sur Vercel avec intégration continue via GitHub

Ce tutoriel propose un guide étape par étape pour créer, configurer et déployer un projet Svelte sur Vercel. L’objectif est de permettre à tous les niveaux d’utilisateurs, y compris les débutants, de suivre un processus clair et sans erreur. À la fin du tutoriel, vous trouverez un récapitulatif des principales commandes utilisées.

---

### 1. Prérequis

1. **Node.js** (version récente, 14+ de préférence) et **npm** installés sur votre machine.  
   - Vérifiez l’installation en tapant dans votre terminal :  
     ```bash
     node -v
     npm -v
     ```
2. **Git** installé sur votre machine.  
   - Vérifiez l’installation en tapant :  
     ```bash
     git --version
     ```
3. Un compte **GitHub**.
4. Un compte **Vercel** (gratuit ou payant, peu importe pour ce tutoriel).

---

### 2. Créer un nouveau projet Svelte

La méthode la plus simple pour démarrer un projet Svelte consiste à utiliser le template officiel fourni par la communauté Svelte. À l’aide de `npm init vite@latest`, vous pouvez initialiser un projet basé sur Vite (qui supporte Svelte).

1. Ouvrez un terminal ou un invite de commandes.
2. Naviguez jusqu’à l’endroit où vous souhaitez créer le projet.
3. Exécutez la commande suivante :

   ```bash
   npm create vite@latest nom-de-votre-projet -- --template svelte
   ```

   - `nom-de-votre-projet` est le nom du dossier/projet.
   - L’option `--template svelte` indique à Vite que vous souhaitez un template Svelte.
   - Note : Certaines versions nécessitent plutôt `npm init vite@latest nom-de-votre-projet -- --template svelte`. Si la première commande ne fonctionne pas, utilisez la seconde.

4. Une fois la commande terminée, allez dans le dossier du projet :

   ```bash
   cd nom-de-votre-projet
   ```

5. Installez les dépendances :

   ```bash
   npm install
   ```

6. Pour vérifier que tout fonctionne en local, lancez le serveur de développement :

   ```bash
   npm run dev
   ```

7. Ouvrez [http://localhost:5173](http://localhost:5173) (ou le port indiqué) dans votre navigateur pour voir votre application Svelte en action.

---

### 3. Configuration du projet pour la production

Par défaut, Vite se charge de la configuration du build. Généralement, vous n’avez pas grand-chose à modifier pour que le projet soit prêt pour le déploiement. Toutefois, vérifiez :

1. Dans votre fichier `package.json`, vous devriez avoir un script `build` déjà présent :

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

2. Il se peut que votre template Svelte ait un fichier `vite.config.js` (ou `vite.config.ts`). Laissez-le tel quel, sauf si vous avez des besoins spécifiques.

---

### 4. Initialisation d’un dépôt Git et envoi sur GitHub

Pour bénéficier de l’intégration continue sur Vercel, vous devez héberger votre code sur un dépôt en ligne, ici **GitHub**.

1. **Initialiser votre dépôt local** :

   ```bash
   git init
   ```

2. **Ajouter tous les fichiers et faire un premier commit** :

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Créer un dépôt sur GitHub** :  
   - Connectez-vous à GitHub.  
   - Créez un nouveau dépôt (Repository).  
   - Copiez l’URL de ce nouveau dépôt (par exemple `https://github.com/votre-nom-utilisateur/votre-projet.git`).

4. **Relier votre dépôt local à GitHub** :

   ```bash
   git remote add origin https://github.com/votre-nom-utilisateur/votre-projet.git
   ```

5. **Envoyer (push) votre code sur GitHub** :

   ```bash
   git push -u origin main
   ```
   - Selon la configuration initiale de votre dépôt, la branche par défaut peut être `master` ou `main`. Ajustez si nécessaire.

---

### 5. Configurer votre projet sur Vercel

1. **Se connecter à Vercel** : Accédez à [https://vercel.com](https://vercel.com) et connectez-vous.
2. Sur votre tableau de bord Vercel, cliquez sur **"New Project"** ou **"Add New…"** selon l’interface.
3. Sélectionnez **"Import Git Repository"** et connectez votre compte GitHub à Vercel si ce n’est pas déjà fait.  
   - Vous devrez peut-être autoriser Vercel à accéder à vos dépôts GitHub.
4. Choisissez le dépôt GitHub que vous venez de créer (celui contenant votre application Svelte).
5. Vercel détectera automatiquement que vous avez un projet basé sur `Vite` et devrait configurer les commandes et répertoires suivants :
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist` (c’est là où Vite mettra les fichiers produits).
6. Cliquez sur **"Deploy"** pour lancer le premier déploiement.

Une fois le déploiement terminé, vous aurez une URL (généralement `https://nom-de-votre-projet.vercel.app`) où votre application Svelte sera accessible publiquement.

---

### 6. Intégration continue (CI) : Mises à jour automatiques

Grâce à la connexion entre GitHub et Vercel, chaque fois que vous pusherez une nouvelle modification sur la branche configurée (en général `main` ou `master`), Vercel lancera automatiquement un nouveau déploiement. Ainsi :

1. Travaillez localement sur votre projet.
2. Quand vous êtes prêt, exécutez :
   ```bash
   git add .
   git commit -m "Nouvelle fonctionnalité ou correction"
   git push
   ```
3. Vercel détectera ce push et construira une nouvelle version de votre application. Vous pourrez suivre la progression du déploiement sur le tableau de bord Vercel.

---

### 7. Gestion des environnements et variables d’environnement (optionnel)

Si votre projet Svelte nécessite des variables d’environnement (par exemple des clés API), vous pouvez les configurer directement dans Vercel :

1. Allez sur votre projet Vercel.
2. Dans les **"Settings"**, recherchez l’option **"Environment Variables"**.
3. Ajoutez vos variables d’environnement (ex. `API_URL`, `API_KEY`, etc.).
4. Vercel les injectera automatiquement pendant le build.

Dans votre code Svelte, vous pouvez alors y accéder, par exemple via `import.meta.env.VITE_API_URL` si vous les avez définies comme `VITE_API_URL`.

---

### 8. Résolution des problèmes courants

1. **Port non accessible** : Par défaut, Vercel gère la configuration du port, vous n’avez pas besoin de spécifier un port dans la configuration Vite.
2. **Erreur "Module not found"** : Assurez-vous que vos importations sont correctes et que vous n’avez pas de dépendances manquantes. Tapez `npm install` avant de builder si vous avez ajouté de nouvelles dépendances.
3. **La commande `npm run build` échoue** : Vérifiez la version de Node.js, assurez-vous d’avoir la bonne configuration dans `vite.config.js`.  
4. **La build est trop longue ou en échec sur Vercel** : Vérifiez la taille de vos dépendances ou le nombre de fichiers. La version gratuite de Vercel a certaines limites, mais la plupart des projets Svelte de base passent sans problème.

---

### 9. Annexes : Récapitulatif des commandes principales

1. **Créer un projet Svelte (avec Vite)**  
   ```bash
   npm create vite@latest nom-de-votre-projet -- --template svelte
   ```
   *(ou `npm init vite@latest nom-de-votre-projet -- --template svelte` selon la version)*

2. **Se rendre dans le dossier du projet**  
   ```bash
   cd nom-de-votre-projet
   ```

3. **Installer les dépendances**  
   ```bash
   npm install
   ```

4. **Lancer l’application en local**  
   ```bash
   npm run dev
   ```

5. **Construire (build) le projet pour la production**  
   ```bash
   npm run build
   ```

6. **Initialiser un dépôt Git**  
   ```bash
   git init
   ```

7. **Ajouter tous les fichiers et faire un commit**  
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

8. **Relier le dépôt local à un dépôt GitHub**  
   ```bash
   git remote add origin https://github.com/votre-nom-utilisateur/votre-projet.git
   ```

9. **Pousser le code sur GitHub**  
   ```bash
   git push -u origin main
   ```

---

### 10. Conclusion

Vous disposez désormais d’un guide complet pour déployer un projet Svelte sur Vercel avec intégration continue via GitHub. Chaque nouvelle mise à jour envoyée à votre branche principale déclenchera automatiquement un nouveau déploiement. Vous pouvez partager le lien généré par Vercel à vos utilisateurs et ainsi leur permettre d’accéder à votre application Svelte.

N’hésitez pas à adapter ce tutoriel en fonction de vos besoins spécifiques (ajout de librairies, configuration avancée de Vite, tests automatisés, etc.). Le flux de base resterait toutefois le même : créer, pousser sur GitHub, configurer sur Vercel et maintenir votre application grâce à l’intégration continue.
