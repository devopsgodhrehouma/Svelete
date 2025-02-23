# **Chapitre 20 - Tests et Debugging en Svelte** 🛠️🔍  

---

## **1. Introduction : Pourquoi tester une application Svelte ?**  

📌 **Les tests garantissent que votre application fonctionne correctement et évitent les régressions.**  
📌 **Le debugging permet de repérer et corriger les erreurs rapidement.**  

✅ **Types de tests en Svelte :**  
1. **Tests unitaires** → Vérifier une fonction spécifique.  
2. **Tests de composants** → Vérifier l'affichage et les interactions.  
3. **Tests end-to-end (E2E)** → Simuler l’utilisation réelle.  

---

## **2. Activer les Outils de Debugging en Svelte**  

### **📌 Console et `console.log()`**
L’outil le plus simple pour déboguer est la console JavaScript.  

```svelte
<script>
  let message = "Bonjour !";
  console.log("Message actuel :", message);
</script>

<p>{message}</p>
```

### **📌 Activer le mode Développement (`svelte:head`)**  
Ajoutez ceci dans votre `+layout.svelte` :  

```svelte
<svelte:head>
  <meta name="sveltekit:prefetch" content="auto" />
</svelte:head>
```

✅ **Cela précharge les pages et optimise le rendu.**  

---

## **3. Utiliser les DevTools Svelte**  

📌 **Installez l’extension navigateur "Svelte DevTools" pour inspecter vos composants.**  

### **Installation sur Chrome ou Firefox :**  
- 🔗 **Chrome** : [Svelte DevTools](https://chrome.google.com/webstore/detail/svelte-devtools/ckolcbmkjpjmangelgggleipnligenbj)  
- 🔗 **Firefox** : [Svelte DevTools](https://addons.mozilla.org/en-US/firefox/addon/svelte-devtools/)  

✅ **Vous pouvez voir l’état des stores et des composants en direct !**  

---

## **4. Tester un Composant avec `@testing-library/svelte`**  

📌 **Installation de la bibliothèque de test :**  

```sh
npm install --save-dev @testing-library/svelte vitest jsdom
```

### **1️⃣ Créer un Composant `Message.svelte`**  

```svelte
<script>
  export let message = "Hello World";
</script>

<p>{message}</p>
```

### **2️⃣ Créer un test `Message.test.js`**  

```js
import { render } from "@testing-library/svelte";
import Message from "../src/Message.svelte";

test("Affichage du message par défaut", () => {
  const { getByText } = render(Message);
  expect(getByText("Hello World")).toBeTruthy();
});

test("Affichage d'un message personnalisé", () => {
  const { getByText } = render(Message, { props: { message: "Salut Svelte" } });
  expect(getByText("Salut Svelte")).toBeTruthy();
});
```

📌 **Exécuter les tests :**  

```sh
npx vitest
```

✅ **Vitest permet d’exécuter rapidement les tests unitaires.**  

---

## **5. Tester les Interactions Utilisateur**  

### **1️⃣ Ajouter un bouton dans `Counter.svelte`**  

```svelte
<script>
  let count = 0;
</script>

<button on:click={() => count += 1}>
  Compteur : {count}
</button>
```

### **2️⃣ Créer un test `Counter.test.js`**  

```js
import { render, fireEvent } from "@testing-library/svelte";
import Counter from "../src/Counter.svelte";

test("Le compteur s'incrémente au clic", async () => {
  const { getByText } = render(Counter);

  const bouton = getByText("Compteur : 0");
  await fireEvent.click(bouton);

  expect(getByText("Compteur : 1")).toBeTruthy();
});
```

✅ **Ce test simule un clic sur le bouton et vérifie que le texte change.**  

---

## **6. Tester une API avec `msw` (Mock Service Worker)**  

📌 **Installation de `msw` pour simuler des API**  

```sh
npm install --save-dev msw
```

### **1️⃣ Créer `mockServer.js`**  

```js
import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
  rest.get("https://api.exemple.com/data", (req, res, ctx) => {
    return res(ctx.json({ message: "Succès" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### **2️⃣ Tester une requête API dans `Api.test.js`**  

```js
import { render, waitFor } from "@testing-library/svelte";
import ApiComponent from "../src/ApiComponent.svelte";

test("Affichage des données API", async () => {
  const { getByText } = render(ApiComponent);

  await waitFor(() => {
    expect(getByText("Succès")).toBeTruthy();
  });
});
```

✅ **Cela évite d'appeler une vraie API pendant les tests.**  

---

## **7. Tester une Application Complète avec Playwright (E2E)**  

📌 **Installation de Playwright :**  

```sh
npm install --save-dev @playwright/test
```

### **1️⃣ Créer un test `e2e.test.js`**  

```js
import { test, expect } from "@playwright/test";

test("La page d'accueil affiche le bon titre", async ({ page }) => {
  await page.goto("http://localhost:5173");
  expect(await page.title()).toBe("Mon App Svelte");
});
```

📌 **Exécuter Playwright :**  

```sh
npx playwright test
```

✅ **Playwright simule un vrai navigateur pour tester l’application complète.**  

---

## **8. Comparaison des Outils de Tests en Svelte**  

| Outil | Type de Test | Utilisation |
|-------|-------------|-------------|
| **Vitest** | Unitaire | Tester des fonctions et composants isolés |
| **@testing-library/svelte** | Composant | Tester le rendu et les interactions |
| **msw** | API Mock | Simuler des appels API |
| **Playwright** | End-to-End | Tester l’application complète |

✅ **Utiliser plusieurs outils permet de tester tous les aspects d’une application.**  

---

## **9. Debugging en SvelteKit : Gérer les Erreurs**  

### **📌 Activer le mode Débogage en Dev**  

Dans `vite.config.js` :  

```js
export default defineConfig({
  server: {
    hmr: {
      overlay: true,
    },
  },
});
```

📌 **Cela affiche les erreurs directement sur l’écran.**  

---

## **10. Résumé et Bonnes Pratiques**  

✔️ **Utilisez `console.log()` et Svelte DevTools pour le debugging rapide.**  
✔️ **Écrivez des tests unitaires avec `Vitest` et `@testing-library/svelte`.**  
✔️ **Simulez les API avec `msw` pour éviter les appels réels.**  
✔️ **Testez l’application complète avec `Playwright`.**  
✔️ **Activez les outils de debug pour repérer les erreurs plus vite.**  

---

## **11. Conclusion**  

✅ **Les tests garantissent la stabilité de votre application Svelte.**  
✅ **Un bon workflow inclut tests unitaires, API mock et E2E.**  
✅ **Le debugging avec DevTools et `console.log()` accélère le développement.**  

---

### **Prochain Chapitre : Optimisation des Performances en Svelte !
