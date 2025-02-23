# **Chapitre 24 - Déploiement avec Vercel et Netlify 🚀**  

---

## **1. Introduction : Pourquoi déployer une application Svelte ?**  

Une fois votre application **Svelte ou SvelteKit** prête, il faut la mettre en ligne !  
📌 **Deux plateformes populaires pour héberger gratuitement une application Svelte :**  
✅ **Vercel** → Idéal pour les projets Next.js et SvelteKit, simple et rapide.  
✅ **Netlify** → Excellente option pour les sites statiques et les API Serverless.  

Nous allons voir comment **déployer facilement** une application sur **Vercel et Netlify**.  

---

## **2. Déploiement sur Vercel 🚀**  

Vercel est l’une des solutions les plus simples pour héberger une application **SvelteKit ou Svelte statique**.  

### **1️⃣ Installer Vercel CLI**  

```sh
npm install -g vercel
```

### **2️⃣ Lancer le projet localement pour tester**  

Avant le déploiement, assurez-vous que l’application fonctionne :  

```sh
npm run dev
```

✅ **Vérifiez l’application sur `http://localhost:5173`**  

### **3️⃣ Se connecter à Vercel et initialiser le projet**  

Dans votre terminal, exécutez :  

```sh
vercel login
vercel
```

📌 **Répondez aux questions :**  
- **Quel répertoire ?** `.` (Racine du projet)  
- **Framework ?** `SvelteKit`  
- **Voulez-vous créer un projet sur Vercel ?** `Yes`  
- **Nom du projet ?** _(Laissez vide pour utiliser le nom du dossier)_  

✅ **Vercel va automatiquement générer un lien de déploiement !**  

### **4️⃣ Déployer à chaque modification**  

À chaque modification, exécutez :  

```sh
vercel --prod
```

✅ **Votre application est maintenant en ligne sur une URL `https://mon-projet.vercel.app` !**  

---

## **3. Déploiement sur Netlify 🌍**  

Netlify est une plateforme très adaptée aux **sites statiques**, comme un projet **Svelte généré avec `npm run build`**.  

### **1️⃣ Installer Netlify CLI**  

```sh
npm install -g netlify-cli
```

### **2️⃣ Générer une version optimisée du site**  

Avant de déployer sur Netlify, il faut **compiler l’application** :  

```sh
npm run build
```

📌 **SvelteKit génère un dossier `build/` contenant le site prêt à être déployé.**  

### **3️⃣ Se connecter à Netlify et créer un projet**  

Dans le terminal, exécutez :  

```sh
netlify login
netlify init
```

📌 **Répondez aux questions :**  
- **Créer un nouveau site ?** `Yes`  
- **Nom du site ?** _(Laissez vide pour un nom automatique)_  
- **Répertoire à déployer ?** `build/`  

### **4️⃣ Déployer immédiatement**  

```sh
netlify deploy --prod
```

✅ **Votre site est en ligne sur `https://mon-projet.netlify.app` !**  

---

## **4. Comparaison Vercel vs Netlify**  

| Fonctionnalité | Vercel | Netlify |
|---------------|--------|---------|
| **Hébergement** | Serverless | Statiquement généré |
| **Facilité** | Ultra simple (`vercel`) | Simple (`netlify`) |
| **API Serverless** | Oui (Vercel Functions) | Oui (Netlify Functions) |
| **Domaines personnalisés** | Gratuit avec SSL | Gratuit avec SSL |
| **Gestion des environnements** | Facile (`vercel env`) | Facile (`netlify env:set`) |

📌 **Si vous utilisez `SvelteKit` avec SSR, Vercel est recommandé.**  
📌 **Si vous avez une application statique (Svelte pur), Netlify est plus optimisé.**  

---

## **5. Utiliser un Domaine Personnalisé 🌍**  

📌 **Sur Vercel :**  

```sh
vercel domains add mon-domaine.com
```

📌 **Sur Netlify :**  

```sh
netlify domains:add mon-domaine.com
```

✅ **Les certificats SSL sont générés automatiquement !**  

---

## **6. Automatiser le Déploiement avec GitHub 🚀**  

### **📌 Déploiement Automatique sur Vercel**  

1️⃣ **Allez sur [Vercel](https://vercel.com/) et connectez votre repo GitHub.**  
2️⃣ **Ajoutez un projet, sélectionnez votre repo GitHub.**  
3️⃣ **Chaque `git push` sur `main` déclenche un déploiement !**  

📌 **Ajouter un script automatique :**  

```sh
git push origin main
```

✅ **Vercel déploie immédiatement la nouvelle version !**  

### **📌 Déploiement Automatique sur Netlify**  

1️⃣ **Allez sur [Netlify](https://netlify.com/) et connectez votre repo GitHub.**  
2️⃣ **Ajoutez un projet, choisissez votre branche (`main`).**  
3️⃣ **Chaque commit sur `main` déploie automatiquement le site.**  

📌 **Ajouter un script automatique :**  

```sh
git push origin main
```

✅ **Netlify déploie instantanément la mise à jour !**  

---

## **7. Résumé et Bonnes Pratiques**  

✔️ **Vercel est idéal pour les projets Serverless avec SvelteKit.**  
✔️ **Netlify est parfait pour un site statique généré avec `npm run build`.**  
✔️ **Les déploiements peuvent être automatisés avec GitHub Actions.**  
✔️ **Un domaine personnalisé est facile à configurer via `vercel domains` ou `netlify domains`.**  
✔️ **Toujours tester localement (`npm run dev`) avant de déployer !**  

---

## **8. Conclusion**  

✅ **Vercel et Netlify offrent des solutions rapides et gratuites pour héberger un projet Svelte.**  
✅ **Le déploiement en une seule commande (`vercel` ou `netlify deploy`) simplifie la mise en production.**  
✅ **Avec GitHub, chaque commit peut être automatiquement mis en ligne.**  

---

### **Prochain Chapitre : Sécurisation et Authentification en Svelte !** 🔒 Veux-tu que je commence la rédaction ? 😊
