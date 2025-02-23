# **Chapitre 23 - Internationalisation (`i18n`) avec Svelte** 🌍  

---

## **1. Introduction : Pourquoi l'Internationalisation (`i18n`) en Svelte ?**  

L’**internationalisation (i18n)** permet de rendre une application disponible dans **plusieurs langues** pour toucher un public mondial.  
📌 **Pourquoi ajouter `i18n` en Svelte ?**  
✅ Améliore l’expérience utilisateur en affichant la langue correcte.  
✅ Facilite la traduction dynamique des textes sans modifier le code.  
✅ Compatible avec `JSON`, `gettext`, ou des services comme `i18next`.  
✅ Nécessaire pour respecter certaines normes et marchés internationaux.  

---

## **2. Approche Basique : Stocker les Traductions dans un Objet JavaScript**  

📌 **Première approche simple : stocker les textes dans un objet.**  

### **1️⃣ Créer un fichier `locales.js`**  

```js
export const traductions = {
  fr: {
    bienvenue: "Bienvenue sur notre site !",
    changerLangue: "Changer la langue",
  },
  en: {
    bienvenue: "Welcome to our site!",
    changerLangue: "Change Language",
  },
};
```

### **2️⃣ Utiliser cet objet dans `App.svelte`**  

```svelte
<script>
  import { traductions } from "./locales.js";

  let langue = "fr"; // Langue par défaut

  function changerLangue() {
    langue = langue === "fr" ? "en" : "fr";
  }
</script>

<h1>{traductions[langue].bienvenue}</h1>
<button on:click={changerLangue}>
  {traductions[langue].changerLangue}
</button>
```

✅ **Les textes changent dynamiquement selon la langue sélectionnée !**  

---

## **3. Approche Avancée : Utiliser un Store pour le Changement de Langue**  

📌 **Utiliser un `store` permet de gérer la langue globalement.**  

### **1️⃣ Créer un fichier `i18nStore.js`**  

```js
import { writable } from "svelte/store";
import { traductions } from "./locales.js";

export const langue = writable("fr");

export const t = writable(traductions["fr"]);

langue.subscribe((val) => {
  t.set(traductions[val]); // Met à jour les traductions
});
```

### **2️⃣ Utiliser le `store` dans `App.svelte`**  

```svelte
<script>
  import { langue, t } from "./i18nStore.js";

  function changerLangue() {
    langue.update((val) => (val === "fr" ? "en" : "fr"));
  }
</script>

<h1>{$t.bienvenue}</h1>
<button on:click={changerLangue}>{$t.changerLangue}</button>
```

✅ **Les textes changent dans toute l’application !**  

---

## **4. Charger les Traductions depuis un Fichier JSON**  

📌 **Plutôt que de stocker les traductions dans un fichier `.js`, on peut utiliser un fichier `.json`**.  

### **1️⃣ Créer un fichier `locales/fr.json`**  

```json
{
  "bienvenue": "Bienvenue sur notre site !",
  "changerLangue": "Changer la langue"
}
```

### **2️⃣ Créer un fichier `locales/en.json`**  

```json
{
  "bienvenue": "Welcome to our site!",
  "changerLangue": "Change Language"
}
```

### **3️⃣ Modifier `i18nStore.js` pour charger les fichiers JSON**  

```js
import { writable } from "svelte/store";

export const langue = writable("fr");
export const t = writable({});

// Charger dynamiquement les fichiers JSON
async function chargerTraductions(lang) {
  const res = await fetch(`/locales/${lang}.json`);
  t.set(await res.json());
}

// Mettre à jour la langue et charger les traductions
langue.subscribe((val) => {
  chargerTraductions(val);
});

// Charger la langue au démarrage
chargerTraductions("fr");
```

✅ **Les fichiers JSON permettent de gérer plus facilement les traductions !**  

---

## **5. Détecter Automatiquement la Langue du Navigateur**  

📌 **Problème : Comment définir la langue initiale de l’application ?**  

📌 **Solution : Utiliser `navigator.language` pour détecter la langue par défaut**  

### **1️⃣ Modifier `i18nStore.js`**  

```js
const langueDefaut = navigator.language.startsWith("fr") ? "fr" : "en";
export const langue = writable(langueDefaut);
```

✅ **L’application démarre directement dans la langue du navigateur !**  

---

## **6. Ajouter une Sélection de Langue avec un Menu Déroulant**  

📌 **Améliorer l’interface avec un `select` pour choisir la langue.**  

### **Dans `App.svelte` :**  

```svelte
<script>
  import { langue, t } from "./i18nStore.js";
</script>

<select bind:value={$langue}>
  <option value="fr">🇫🇷 Français</option>
  <option value="en">🇬🇧 English</option>
</select>

<h1>{$t.bienvenue}</h1>
```

✅ **L’utilisateur peut choisir sa langue via une liste déroulante.**  

---

## **7. Gérer l’Internationalisation (`i18n`) dans SvelteKit**  

📌 **SvelteKit permet de charger la langue dynamiquement via `load()`**  

### **1️⃣ Ajouter un paramètre de langue dans l’URL (`/fr/about` ou `/en/about`)**  

1. **Créer `src/routes/[lang]/+layout.svelte`**  

```svelte
<script>
  export let params;
</script>

<h1>{params.lang === "fr" ? "Bienvenue" : "Welcome"}</h1>

<a href="/fr">🇫🇷 Français</a> | <a href="/en">🇬🇧 English</a>
```

✅ **La langue est détectée automatiquement dans l’URL !**  

---

## **8. Comparaison des Approches `i18n` en Svelte**  

| Approche | Avantages | Inconvénients |
|----------|----------|--------------|
| **Objet `JS` en dur** | Simple et rapide | Difficile à maintenir |
| **Store `writable()`** | Gestion facile de la langue | Ne fonctionne que dans Svelte |
| **Fichiers JSON** | Bonne séparation des données | Requiert des requêtes `fetch()` |
| **URL (`/fr/` `/en/`)** | Compatible SEO & SvelteKit | Nécessite plus de configuration |

✅ **Le choix dépend des besoins du projet !**  

---

## **9. Résumé et Bonnes Pratiques**  

✔️ **Utiliser des fichiers JSON pour une meilleure gestion des traductions**  
✔️ **Stocker la langue actuelle dans un `store` pour faciliter l’accès**  
✔️ **Détecter la langue par défaut avec `navigator.language`**  
✔️ **Proposer un `menu déroulant` ou `URL` (`/fr/` `/en/`) pour changer de langue**  
✔️ **Toujours tester les traductions pour éviter des erreurs (`undefined`)**  

---

## **10. Conclusion**  

✅ **Avec Svelte, l’internationalisation est simple et efficace.**  
✅ **Utiliser `JSON` et `stores` permet de gérer les traductions dynamiquement.**  
✅ **L’intégration avec SvelteKit rend l’i18n encore plus fluide avec les `params`.**  

---

### **Prochain Chapitre : Déploiement avec Vercel et Netlify !** 🚀 Veux-tu que je commence la rédaction ? 😊
