## Tutoriel exhaustif : Déployer un projet Svelte sur Netlify avec intégration continue (CI/CD) via GitHub

Ce tutoriel va vous guider pour créer, configurer et déployer un projet Svelte sur Netlify, avec un flux d’intégration continue (CI/CD) via GitHub. Une fois les étapes suivies, Netlify déploiera automatiquement votre application Svelte à chaque mise à jour de votre code (push sur GitHub).

---

### 1. Prérequis

1. **Node.js** et **npm** (versions récentes recommandées).  
   - Vérifiez l’installation en exécutant dans un terminal :  
     ```bash
     node -v
     npm -v
     ```
2. **Git** installé.  
   - Vérifiez l’installation en exécutant :  
     ```bash
     git --version
     ```
3. Un compte **GitHub** où vous avez accès pour créer un dépôt.
4. Un compte **Netlify** (gratuit ou payant selon vos besoins).

---

### 2. Créer un nouveau projet Svelte

Comme pour la plupart des projets Svelte modernes, nous allons utiliser le générateur officiel via Vite :

1. Ouvrez un terminal.
2. Rendez-vous dans le dossier où vous souhaitez créer votre projet.
3. Exécutez la commande pour initialiser un projet Svelte avec Vite :

   ```bash
   npm create vite@latest nom-de-votre-projet -- --template svelte
   ```
   *(Sur certaines versions de Vite, la commande peut être `npm init vite@latest nom-de-votre-projet -- --template svelte`.)*

4. Accédez au répertoire du projet :

   ```bash
   cd nom-de-votre-projet
   ```

5. Installez les dépendances :

   ```bash
   npm install
   ```

6. Testez le fonctionnement en local :

   ```bash
   npm run dev
   ```
   - Ouvrez [http://localhost:5173](http://localhost:5173) (ou le port affiché) dans votre navigateur.

---

### 3. Configuration du build pour la production

Le template Vite/Svelte fournit déjà une configuration par défaut pour le build. Assurez-vous simplement que votre fichier `package.json` contient :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Le répertoire de sortie par défaut après le build sera `dist`. Netlify pourra le détecter automatiquement ou vous devrez le renseigner manuellement.

---

### 4. Initialiser un dépôt Git et pousser sur GitHub

Afin de configurer l’intégration continue sur Netlify, votre code doit être sur un dépôt Git, en l’occurrence GitHub.

1. **Initialiser le dépôt localement** :

   ```bash
   git init
   ```

2. **Ajouter tous les fichiers et faire un premier commit** :

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Créer un dépôt sur GitHub** :  
   - Connectez-vous à votre compte GitHub.  
   - Créez un nouveau dépôt (Repository).  
   - Copiez l’URL du dépôt (par exemple `https://github.com/votre-nom-utilisateur/votre-projet.git`).

4. **Relier votre dépôt local à GitHub** :

   ```bash
   git remote add origin https://github.com/votre-nom-utilisateur/votre-projet.git
   ```

5. **Pousser (push) le code sur GitHub** :

   ```bash
   git push -u origin main
   ```
   *(Si vous avez un message indiquant que la branche principale est `master`, adaptez la commande en conséquence.)*

---

### 5. Déployer sur Netlify : Méthode Git (avec CI/CD)

Netlify propose deux principales méthodes de déploiement :

1. **Déploiement via Git** : Netlify surveille automatiquement votre dépôt Git (GitHub, GitLab ou Bitbucket) et déploie les mises à jour à chaque commit/push.
2. **Déploiement via Netlify CLI** : vous déployez manuellement depuis votre machine via la ligne de commande.

Ici, nous allons utiliser la méthode **Git** pour profiter du CI/CD.

#### 5.1. Connecter votre dépôt GitHub à Netlify

1. Allez sur [https://app.netlify.com/](https://app.netlify.com/) et connectez-vous à votre compte.
2. Cliquez sur **"Add new site"** > **"Import an existing project"**.
3. Choisissez **"GitHub"** comme méthode de déploiement (ou connectez-vous si ce n’est pas déjà fait).
4. Sélectionnez le dépôt GitHub correspondant à votre projet Svelte.
5. Netlify vous demandera les paramètres de build. Par défaut :
   - **Build Command** : `npm run build`
   - **Publish directory** : `dist`
6. Cliquez sur **"Deploy site"**.  
   Netlify va lancer un premier build et, une fois terminé, vous donnera un lien (généralement quelque chose comme `https://votre-projet.netlify.app`).

#### 5.2. Configuration de l’intégration continue (CI/CD)

Grâce à la connexion entre Netlify et votre dépôt GitHub, chaque push sur la branche configurée (souvent `main`) déclenchera automatiquement un nouveau déploiement.  
- Après chaque commit et push :
  ```bash
  git add .
  git commit -m "Nouvelle fonctionnalité ou correction"
  git push
  ```
- Netlify détectera le changement et lancera un build. Vous pouvez voir la progression dans l’interface Netlify (section **Deploys**).

---

### 6. (Optionnel) Déploiement via Netlify CLI

Si vous souhaitez déployer depuis votre machine locale, voici la procédure. Toutefois, cette méthode ne met pas en place l’intégration continue tant que vous n’avez pas connecté votre projet à Netlify via Git.  
1. Installer l’outil CLI de Netlify de manière globale :
   ```bash
   npm install -g netlify-cli
   ```
2. Dans le répertoire de votre projet :
   ```bash
   netlify init
   ```
   - Suivez les instructions pour créer un nouveau site ou lier à un site existant sur Netlify.
3. Ensuite, pour déployer manuellement :
   ```bash
   npm run build
   netlify deploy
   ```
   - On vous demandera le chemin du dossier à déployer (par défaut `dist`).  
   - Pour déployer en production directement :
     ```bash
     netlify deploy --prod
     ```

Cela peut être utile pour tester un déploiement ou déployer temporairement, mais pour un flux CI/CD complet, la méthode Git ci-dessus est recommandée.

---

### 7. Variables d’environnement (optionnel)

Si vous avez besoin de clés API ou d’autres secrets, vous pouvez les ajouter dans Netlify :

1. Sur votre tableau de bord Netlify, rendez-vous dans **Site settings** > **Build & deploy** > **Environment** (ou **Environment Variables** selon l’interface).
2. Ajoutez vos variables (par exemple `API_KEY`, `API_URL`, etc.).
3. Dans votre code, vous pouvez les récupérer via `import.meta.env.VITE_VARIABLE_NAME` (en cas d’utilisation de variables commençant par `VITE_` pour Vite/Svelte).  
   - Notez que pour être accessibles côté client dans une application Vite, les variables doivent être préfixées par `VITE_`.  
   - Les variables non préfixées peuvent être utilisées au moment du build ou côté serveur (fonctions Netlify, etc.).

---

### 8. Gestion des problèmes courants

1. **Erreur de build** : Vérifiez votre commande `npm run build` et vos dépendances. Assurez-vous d’avoir la bonne version de Node.js et que `vite.config.js` ne contient pas de configuration invalide.
2. **Fichiers non trouvés (404) sur Netlify** :  
   - Assurez-vous d’avoir défini le **Publish directory** sur `dist`.
   - Si vous utilisez le mode single-page application (SPA) de Svelte, configurez les redirections : créez un fichier `_redirects` dans `public` ou à la racine du `dist` pour rediriger toutes les URL vers l’index.html, par exemple :

     ```
     /*    /index.html   200
     ```
3. **Pas de déploiement automatique** :  
   - Vérifiez que votre dépôt GitHub est bien lié à Netlify.  
   - Vérifiez que la branche sur laquelle vous poussez est la même que celle configurée sur Netlify (par défaut `main`).

---

### 9. Annexes : Récapitulatif des commandes principales

1. **Créer un projet Svelte**  
   ```bash
   npm create vite@latest nom-de-votre-projet -- --template svelte
   ```
   *(ou `npm init vite@latest nom-de-votre-projet -- --template svelte`)*

2. **Naviguer dans le dossier et installer les dépendances**  
   ```bash
   cd nom-de-votre-projet
   npm install
   ```

3. **Lancer en local pour développement**  
   ```bash
   npm run dev
   ```

4. **Build pour la production**  
   ```bash
   npm run build
   ```

5. **Initialiser Git et effectuer le premier commit**  
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

6. **Relier à GitHub et pousser**  
   ```bash
   git remote add origin https://github.com/votre-nom-utilisateur/votre-projet.git
   git push -u origin main
   ```

7. **Déploiement automatique sur Netlify**  
   - Configurez depuis [https://app.netlify.com/](https://app.netlify.com/), reliez votre dépôt GitHub, définissez :
     - Build command : `npm run build`
     - Publish directory : `dist`

8. **Netlify CLI (optionnel)**  
   ```bash
   npm install -g netlify-cli
   netlify init
   npm run build
   netlify deploy
   ```

---

### 10. Conclusion

Vous disposez maintenant d’un projet Svelte fonctionnel et déployé sur Netlify. À chaque nouvelle modification (push) sur la branche configurée, Netlify déclenchera un nouveau déploiement, rendant automatiquement disponible la dernière version de votre application Svelte.

Grâce à ce tutoriel, même les débutants peuvent suivre un flux simple et automatisé, allant de la création du projet à son hébergement sur Netlify avec un cycle d’intégration continue (CI/CD).
