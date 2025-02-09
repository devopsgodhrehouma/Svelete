#  Introduction à SvelteKit

## Avant de commencer
Si vous êtes nouveau sur **Svelte** ou **SvelteKit**, nous vous recommandons de consulter le [tutoriel interactif](https://svelte.dev/tutorial).

Si vous rencontrez des difficultés, n’hésitez pas à demander de l’aide sur le [Discord de Svelte](https://svelte.dev/chat).

---

## Qu'est-ce que SvelteKit ?
**SvelteKit** est un framework permettant de développer rapidement des applications web robustes et performantes en utilisant **Svelte**.  

- **Si vous venez de React**, SvelteKit est similaire à **Next.js**.
- **Si vous venez de Vue**, SvelteKit est similaire à **Nuxt.js**.

Pour en savoir plus sur les types d’applications que vous pouvez créer avec SvelteKit, consultez la [FAQ](https://kit.svelte.dev/docs/faq).

---

##  Qu'est-ce que Svelte ?
En résumé, **Svelte** est une manière d’écrire des composants d’interface utilisateur (**UI components**) tels qu’une barre de navigation, une section de commentaires ou un formulaire de contact.  

**Svelte fonctionne grâce à un compilateur** qui convertit vos composants en **JavaScript optimisé**, permettant de générer du **HTML** et du **CSS** performants.

Vous n’avez pas besoin de connaître Svelte pour suivre ce guide, mais cela peut être utile. Pour en savoir plus, consultez le [tutoriel Svelte](https://svelte.dev/tutorial).

---

## 🔍 SvelteKit vs Svelte
| 📌 **Svelte** | 🛠️ **SvelteKit** |
|--------------|----------------|
| Permet de créer des **composants UI** réactifs. | Fournit un **cadre complet** pour développer des applications web modernes. |
| Se charge uniquement du rendu des composants. | Gère le **routing, le rendu serveur, le préchargement**, et d’autres fonctionnalités avancées. |
| Produit du **JavaScript compilé** optimisé. | Intègre **Vite**, un moteur de build rapide avec **Hot Module Replacement (HMR)**. |

**SvelteKit** facilite la création d’applications modernes en intégrant :
- **Un routeur** qui met à jour l’UI lorsqu’un utilisateur clique sur un lien.
- **Des optimisations de build** pour ne charger que le code strictement nécessaire.
- **Le préchargement des pages** pour une navigation fluide.
- **Un rendu configurable** :
  - **SSR (Server-Side Rendering)** : rendu côté serveur pour le SEO et les performances.
  - **Client-Side Rendering (CSR)** : rendu côté navigateur pour une expérience fluide.
  - **Prerendering** : génération statique des pages pour des performances maximales.
- **L’optimisation des images** pour réduire les temps de chargement.
- **Le rechargement à chaud (HMR)** via **Vite** pour un développement ultra-rapide.

📌 **Avec SvelteKit, toutes ces fonctionnalités sont intégrées par défaut**, vous permettant de vous concentrer sur l’essentiel : **le développement de votre application**.

---

## Installation et configuration de SvelteKit

Pour démarrer un nouveau projet avec **SvelteKit**, exécutez la commande suivante dans votre terminal :

```sh
npm create svelte@latest myapp
```

Une fois la configuration initiale effectuée, suivez ces étapes :

1. Accédez au répertoire du projet :
   ```sh
   cd myapp
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Initialisez Git (optionnel) :
   ```sh
   git init && git add -A && git commit -m "Initial commit"
   ```
4. Lancez le serveur de développement :
   ```sh
   npm run dev -- --open
   ```

Ci-dessous, une capture d’écran du processus de configuration de **SvelteKit** :

![image](https://github.com/user-attachments/assets/7b8cfd3a-ef27-4136-b8b7-c426a04cce33)


Vous verrez un prompt interactif vous permettant de choisir :
- Le type de projet (ex: **Skeleton project**).
- L’activation de TypeScript.
- Des options supplémentaires.

Ensuite, votre projet sera prêt ! 

![image](https://github.com/user-attachments/assets/f5823c3e-1694-40ba-9aef-d0c2f6ec0c02)

![image](https://github.com/user-attachments/assets/ce4ae237-da0f-4301-918a-ec1efae42f39)

## Structure du projet

```
MYAPP
├── .svelte-kit/
├── .vscode/
│   ├── settings.json
├── node_modules/
├── src/
├── static/
├── .gitignore
├── .npmrc
├── package-lock.json
├── package.json
├── README.md
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
```

### Dans VSCode Terminal:

```
> myapp@0.0.1 dev
> vite dev

Forced re-optimization of dependencies

VITE v5.4.8  ready in 341 ms

➜ Local:  http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
```
---
Cela indique que le serveur de développement**Vite** a démarré avec succès pour votre projet **SvelteKit** et est accessible à l'adresse `http://localhost:5173/`. 

---


![image](https://github.com/user-attachments/assets/ab4307fa-23be-41c3-aa1c-52c0fbe42f74)


---


![image](https://github.com/user-attachments/assets/70b11d0f-db2f-4b0f-8b6e-e30d93d780e9)


---


![image](https://github.com/user-attachments/assets/436b0a90-4d59-45d1-a045-46282f158fa3)

---

![image](https://github.com/user-attachments/assets/c8b176ae-289c-4781-8dc6-d580f83a4f47)


Le code :

```svelte
<script lang="ts">
  function onclick() {
    console.log(
      "The button has been clicked but from this clear defined function in the script tag"
    );
  }

  let numberOne = 5;
</script>

<button {onclick}> Click me! </button>

<h1>{numberOne}</h1>
<p>Hello!</p>

<style>
  h1 {
    color: blue;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
</style>
```

### Explication du code :

1. **Section Script** :
   - Définit une fonction `onclick` qui enregistre un message dans la console.
   - Déclare une variable `numberOne` avec une valeur de `5`.

2. **Section HTML** :
   - Un `<button>` qui appelle la fonction `onclick` lorsqu'il est cliqué.
   - Un élément `<h1>` affichant la valeur de `numberOne`.
   - Une balise `<p>` contenant le texte `"Hello!"`.

3. **Section Style** :
   - La balise `<h1>` est stylisée avec une couleur **bleue**.
   - Utilise la police `"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif`.

---

![image](https://github.com/user-attachments/assets/40dc267f-8458-4b02-afe9-2fb44fe4d56e)

Le code :

```svelte
<script lang="ts">
    function onclick() {
        console.log(
            "The button has been clicked but from this clear defined function in the script tag."
        );
    }

    let numberOne = 5;
</script>

<button {onclick}> Click me! </button>

<h1>{numberOne}</h1>
<p>Hello!</p>
<div class="container">
    <p>This is the left side</p>
    <p>This is the right side</p>
</div>

<style>
    h1 {
        color: blue;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
    }

    .container {
        display: flex;
        justify-content: space-between;
    }
</style>
```

---

### Explication du code :

1. **Section Script** :
   - Définit une fonction `onclick` qui affiche un message dans la console lorsqu'un bouton est cliqué.
   - Déclare une variable `numberOne` avec une valeur de `5`.

2. **Section HTML** :
   - Un bouton `<button>` qui appelle la fonction `onclick` lorsqu'il est cliqué.
   - Un élément `<h1>` affichant la valeur de `numberOne`.
   - Un paragraphe `<p>` contenant le texte `"Hello!"`.
   - Une `<div>` avec la classe `"container"` contenant deux paragraphes, un à gauche et un à droite.

3. **Section Style** :
   - La balise `<h1>` est stylisée avec une couleur **bleue** et une police spécifique.
   - La classe `.container` utilise `display: flex;` et `justify-content: space-between;` pour aligner les éléments enfants sur les côtés opposés.

Ce code Svelte affiche un chiffre, un message, et une disposition en **flexbox** pour organiser les paragraphes à gauche et à droite.


---


## ✅ Prêt à explorer SvelteKit ?
📖 Consultez la [documentation officielle](https://kit.svelte.dev/docs) pour commencer !




