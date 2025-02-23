## Tutoriel exhaustif : Déployer un projet Svelte sur AWS Amplify avec CI/CD (intégration continue)

Dans ce tutoriel, vous apprendrez à créer et à déployer une application Svelte (basée sur Vite) sur AWS Amplify. Nous verrons comment configurer l’intégration continue (CI/CD) en liant votre projet GitHub à AWS Amplify pour que chaque modification poussée (push) se traduise par un nouveau déploiement.

---

### 1. Prérequis

1. **Un compte AWS** : Si vous n’en avez pas, rendez-vous sur [https://aws.amazon.com/fr/](https://aws.amazon.com/fr/) pour créer un compte (un an de gratuité pour certains services, mais assurez-vous de comprendre la facturation).
2. **Node.js** (version 14 ou plus) et **npm** installés sur votre machine.  
   - Vérifiez via un terminal :  
     ```bash
     node -v
     npm -v
     ```
3. **Git** installé :  
   ```bash
   git --version
   ```
4. **Un compte GitHub** (ou un autre service Git compatible, mais nous utiliserons GitHub pour l’exemple).
5. Des **droits suffisants** (un rôle IAM ou un utilisateur AWS) pour accéder au service Amplify.

---

### 2. Créer un projet Svelte (avec Vite)

Nous allons utiliser le modèle officiel Vite pour Svelte :

1. Ouvrez un terminal.
2. Accédez au dossier où vous souhaitez créer votre projet Svelte.
3. Exécutez :

   ```bash
   npm create vite@latest mon-projet-svelte -- --template svelte
   ```

   *Selon la version de Vite, la commande peut être :*  
   ```bash
   npm init vite@latest mon-projet-svelte -- --template svelte
   ```

4. Entrez dans le dossier nouvellement créé :

   ```bash
   cd mon-projet-svelte
   ```

5. Installez les dépendances :

   ```bash
   npm install
   ```

6. Lancez l’environnement de développement pour tester :

   ```bash
   npm run dev
   ```

7. Ouvrez [http://localhost:5173](http://localhost:5173) (ou le port indiqué) pour voir votre application Svelte en fonctionnement local.

---

### 3. Préparer le projet pour le déploiement

1. Par défaut, Vite génère un dossier de sortie nommé `dist` lorsque l’on exécute la commande `npm run build`.
2. Assurez-vous que votre fichier `package.json` inclut les scripts suivants :

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```
3. Vous n’avez généralement pas besoin de modifier le `vite.config.js` (ou `.ts`) pour un déploiement basique. Par défaut, tout devrait fonctionner.

---

### 4. Initialiser un dépôt Git et pousser sur GitHub

Pour qu’AWS Amplify puisse récupérer votre code et configurer l’intégration continue, il doit être hébergé dans un dépôt Git, ici GitHub.

1. **Initialisez votre dépôt localement** (si ce n’est pas déjà fait) :

   ```bash
   git init
   ```

2. **Ajoutez tous vos fichiers et faites un premier commit** :

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Créez un nouveau dépôt sur GitHub** (depuis l’interface GitHub). Copiez l’URL du dépôt (ex. `https://github.com/votre-utilisateur/mon-projet-svelte.git`).

4. **Reliez votre dépôt local à GitHub** :

   ```bash
   git remote add origin https://github.com/votre-utilisateur/mon-projet-svelte.git
   ```

5. **Poussez (push) votre code vers GitHub** :

   ```bash
   git push -u origin main
   ```
   *(Ou `master` selon la branche par défaut de votre dépôt.)*

---

### 5. Déploiement via AWS Amplify Console (méthode la plus simple)

AWS Amplify propose une interface web pour configurer le déploiement en quelques clics.

#### 5.1. Accéder à AWS Amplify

1. Connectez-vous à votre **console AWS** : [https://console.aws.amazon.com/](https://console.aws.amazon.com/).
2. Dans la barre de recherche, tapez **Amplify** pour accéder au service **AWS Amplify**.

#### 5.2. Créer une nouvelle application Amplify

1. Dans la console Amplify, cliquez sur **"New app"** ou **"Host web app"** selon l’interface.
2. Sélectionnez **"Host your web app"** si vous y êtes invité.

#### 5.3. Connecter votre dépôt GitHub

1. Sélectionnez **"GitHub"** comme source de votre code.
2. Autorisez AWS Amplify à accéder à vos dépôts GitHub (si ce n’est pas déjà fait, vous devrez donner les droits depuis GitHub).
3. Choisissez le **dépôt** et la **branche** (par défaut `main` ou `master`) que vous souhaitez déployer.

#### 5.4. Configurer le build

AWS Amplify va tenter de détecter automatiquement votre configuration (framework Vite, etc.). Sinon, vous pouvez adapter les réglages :

- **Build settings** (commande de build) :  
  ```bash
  npm run build
  ```
- **Start command** (pour l’environnement de développement, si nécessaire) :  
  ```bash
  npm run dev
  ```
- **Dossier de sortie** (publish) :  
  ```bash
  dist
  ```

Amplify crée un fichier `amplify.yml` ou équivalent de configuration de build en interne. Vous pouvez le personnaliser si besoin.

#### 5.5. Lancer le déploiement

1. Cliquez sur **"Save and deploy"** (ou équivalent).
2. Amplify va exécuter la commande de build (`npm run build`) et déployer les fichiers du dossier `dist`.
3. Une fois le déploiement réussi, Amplify vous donnera une URL (quelque chose comme `https://main.xxxxxxxxx.amplifyapp.com`) où votre application Svelte est accessible publiquement.

---

### 6. Intégration continue (CI/CD)

Grâce à cette configuration, votre application est maintenant reliée à votre branche GitHub. Dès que vous enverrez une nouvelle modification :

1. Travaillez localement, effectuez vos modifications.
2. Commitez et poussez sur GitHub :
   ```bash
   git add .
   git commit -m "Nouvelles fonctionnalités"
   git push
   ```
3. AWS Amplify détectera automatiquement le nouveau commit et lancera un nouveau déploiement.
4. Vous pouvez suivre l’avancement dans la console Amplify (section **Build logs** ou **All Apps** > sélectionnez votre appli).

---

### 7. (Optionnel) Déploiement via Amplify CLI

Vous pouvez également utiliser l’outil en ligne de commande **Amplify CLI**. Cela permet une configuration plus granulaire, mais pour un simple hébergement d’application front-end, la méthode via l’interface web est souvent plus rapide.  

Si vous souhaitez explorer la CLI :

1. **Installer la CLI Amplify** (globalement) :
   ```bash
   npm install -g @aws-amplify/cli
   ```
2. **Configurer la CLI** (pour l’authentification avec vos identifiants AWS) :
   ```bash
   amplify configure
   ```
   Suivez les étapes pour créer un utilisateur IAM, configurer l’authentification, etc.
3. **Initialiser Amplify** dans votre projet :
   ```bash
   amplify init
   ```
4. **Ajouter l’hébergement** (Hosting) :
   ```bash
   amplify add hosting
   ```
   Sélectionnez **"Continuous deployment (Git-based deployments)"** ou **"Manual deployment"** selon vos préférences.
5. **Déployer** :
   ```bash
   amplify push
   ```
   Ou via l’interface Amplify pour le CI/CD.

Cependant, pour un simple déploiement front-end, la console web est généralement plus directe.

---

### 8. Gérer les variables d’environnement (optionnel)

Si votre application Svelte nécessite des variables d’environnement (ex. clés API), vous pouvez les définir dans Amplify :

1. Dans la console Amplify, allez dans votre application > **"App settings"** ou **"Environment variables"**.
2. Ajoutez vos variables (ex. `VITE_API_URL`, `SOME_SECRET`, etc.).
3. Amplify utilisera ces variables au moment du build.  
   - Dans Vite, pour pouvoir accéder à une variable côté client, elle doit commencer par `VITE_`.  
   - Ex. `VITE_API_URL` accessible via `import.meta.env.VITE_API_URL` dans votre code Svelte.

---

### 9. Problèmes et solutions courants

1. **Erreur pendant le build** :  
   - Vérifiez que la version de Node utilisée par Amplify correspond à vos besoins. Vous pouvez spécifier la version Node dans le fichier de config (Amplify console permet parfois d’indiquer la version Node dans les **Build Settings**).
   - Assurez-vous que la commande `npm run build` fonctionne en local sans erreur.
2. **Dossier de sortie incorrect** :  
   - Le dossier généré par Svelte+Vite est `dist`. Dans la console Amplify, sous **Build settings**, la clé `artifactBaseDirectory` ou `publish` doit pointer vers `dist`.
3. **404 lors du rafraîchissement de page** (sur une SPA) :  
   - Svelte est une application monopage (SPA). Vous devrez peut-être configurer les réécritures/redirections pour gérer les routes internes. Dans Amplify, vous pouvez ajouter une règle de réécriture pour que toute route (`/<*>`) redirige vers `index.html`.  
   - Exemple de règle de réécriture dans Amplify Console > **Rewrites and redirects** :
     ```
     Source address:  </*>
     Target address:  /index.html
     Type:            200 (Rewrite)
     ```
4. **Absence de déploiement automatique** :  
   - Vérifiez que votre application Amplify est bien connectée à la branche GitHub désirée.  
   - Assurez-vous que vous poussez sur la branche configurée (par exemple `main`).

---

### 10. Récapitulatif des commandes principales (Annexe)

1. **Créer un nouveau projet Svelte avec Vite**  
   ```bash
   npm create vite@latest mon-projet-svelte -- --template svelte
   ```
   *(ou `npm init vite@latest mon-projet-svelte -- --template svelte`)*

2. **Installation des dépendances**  
   ```bash
   npm install
   ```

3. **Lancement local (développement)**  
   ```bash
   npm run dev
   ```

4. **Build (production)**  
   ```bash
   npm run build
   ```
   *(sortie dans `dist`)*

5. **Initialisation d’un dépôt Git**  
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

6. **Connection à un dépôt GitHub**  
   ```bash
   git remote add origin https://github.com/votre-utilisateur/mon-projet-svelte.git
   git push -u origin main
   ```

7. **Déploiement via Amplify Console**  
   - Choisir **GitHub** comme source
   - Branch : `main` (ou autre)
   - Build command : `npm run build`
   - Publish directory : `dist`
   - Cliquer **Save and Deploy**

8. **(Optionnel) Amplify CLI**  
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   amplify add hosting
   amplify push
   ```

---

### 11. Conclusion

Vous disposez désormais d’une application Svelte déployée et hébergée sur AWS Amplify. Le processus d’intégration continue (CI/CD) se met automatiquement en place en liant votre dépôt GitHub : chaque push sur la branche configurée déclenche un nouveau déploiement. 

AWS Amplify vous permet aussi d’ajouter d’autres fonctionnalités (authentification, API, storage, etc.) si vous le souhaitez. Pour l’essentiel, le déploiement d’un front-end Svelte se résume aux étapes de build et de configuration Amplify Console/CLI décrites ici. Profitez maintenant d’une application Svelte accessible publiquement et automatiquement mise à jour à chaque commit.
