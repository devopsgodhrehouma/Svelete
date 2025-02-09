# Header

<img width="441" alt="image" src="https://github.com/user-attachments/assets/8be47ebd-2e14-411a-b36c-5a632f94baf9" />

<br/>

---

### **index.ts**
```ts
export { default as HeroSection } from "./HeroSection.svelte";
export { default as Button } from "./Button.svelte";
```

---

## **Explication**
Ce fichier **`index.ts`** sert de **point d'entrée centralisé** pour exporter plusieurs composants de manière plus propre et plus organisée.

### **Que fait ce fichier ?**
1. **Il regroupe les exports des composants Svelte** :
   - `HeroSection.svelte`
   - `Button.svelte`
   
2. **Pourquoi utiliser ce fichier `index.ts` ?**
   - Simplifie l'importation des composants dans d'autres fichiers.
   - Au lieu de devoir écrire :
     ```ts
     import HeroSection from "../lib/components/HeroSection.svelte";
     import Button from "../lib/components/Button.svelte";
     ```
   - On peut simplement écrire :
     ```ts
     import { HeroSection, Button } from "$components";
     ```
   - Cela fonctionne grâce à l'alias `$components` défini dans `svelte.config.js`.

### **Avantages**
✅ **Organisation propre** des composants.  
✅ **Facilite la maintenance** (ajout et suppression de composants sans modifier les imports partout).  
✅ **Améliore la lisibilité et l'efficacité du code**.  

---
 **Conclusion :** Ce fichier **`index.ts`** agit comme un hub centralisé pour les composants **HeroSection** et **Button**, rendant l'importation plus intuitive et plus efficace dans le projet **SvelteKit**. 

---

![image](https://github.com/user-attachments/assets/73855fa4-a80e-48e8-9dce-cda2eca38bde)

<br/>

---

### **HeroSection.svelte**
```svelte
<script lang="ts">
    import heroImage from "$assets/hero.png";
    import { Button } from "$components";
</script>

<section class="default-margin hero">
    <div class="hero-text">
        <h1>Book Nest</h1>
        <h3>Your personal book library.</h3>
        <h4 class="mt-l">
            Create your very own digital library where you can keep track of every book you own, read and love.
        </h4>
        <h4 class="mb-s">
            Our app offers a beautifully designed, easy-to-use interface that makes managing your book collection a joy
        </h4>
        <Button>Sign Up</Button>
    </div>
    <img class="hero-image" src={heroImage} alt="Book Nest Hero Image" />
</section>

<style>
    .hero {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 100px;
        margin-bottom: 80px;
    }

    .hero-image {
        width: 40%;
    }

    .hero-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 55%;
        padding-right: 50px;
    }
</style>
```

---

### **`HeroSection.svelte`**
- **Importe** :
  - `heroImage` depuis les assets (`hero.png`).
  - `Button` depuis `$components` pour l'utiliser.
- **Structure** :
  - Une section `.hero` contenant :
    - Un **titre principal (`h1`)** et une **description (`h3, h4`)**.
    - Un **bouton "Sign Up"** en utilisant le composant `<Button>`.
    - Une **image de héros** (`hero.png`).
- **Styles** :
  - Utilise **Flexbox** pour organiser les éléments (`justify-content: space-between`).
  - Taille et marges ajustées pour une **mise en page harmonieuse**.

---

![image](https://github.com/user-attachments/assets/49589718-72fb-4247-a12c-b1993ee84d1c)

---
<br/>

![image](https://github.com/user-attachments/assets/1756e9f0-d16b-4ca2-8df0-7b6eed11e781)

---
<br/>

<img width="554" alt="image" src="https://github.com/user-attachments/assets/e05a622d-4bd5-4a25-9c65-a73a51ccfdf3" />


---
<br/>


<img width="458" alt="image" src="https://github.com/user-attachments/assets/5316ddfc-840b-4098-823e-922c293a0363" />

---
<br/>

![image](https://github.com/user-attachments/assets/be5db46a-d5d4-4af4-9e74-7fe0ec6d63bc)

---
<br/>

![image](https://github.com/user-attachments/assets/90aea5ab-2a9d-438e-8b5b-d7d2cce45784)

---
<br/>

```
<script lang="ts">
    import type { Snippet } from "svelte";

    interface BasicProps {
        children: Snippet;
        isSecondary?: boolean;
        isDanger?: boolean;
        isMenu?: boolean;
    }

    interface ButtonProps extends BasicProps {
        onclick: (e: MouseEvent) => void;
        href?: never;
    }

    interface LinkProps extends BasicProps {
        href: string;
        onclick?: never;
    }

    type ComponentProps = ButtonProps | LinkProps;

    let { children, href, onclick, isSecondary, isDanger, isMenu, ...props }: ComponentProps = $props();
</script>

{#if href}
    <a {href} class="btn"
       class:btn-secondary={isSecondary}
       class:btn-danger={isDanger}
       class:btn-menu={isMenu}
    >
        {@render children()}
    </a>
{:else}
    <button {...props} {onclick} class="btn"
       class:btn-secondary={isSecondary}
       class:btn-danger={isDanger}
       class:btn-menu={isMenu}
    >
        {@render children()}
    </button>
{/if}

<style>
    a {
        display: block;
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    .btn {
        padding: 12px 24px;
        min-width: 230px;
        text-align: center;
        background-color: black;
        border-radius: 12px;
        color: white;
        border: 1px solid white;
        font-weight: normal;
        font-size: 22px;
    }

    .btn-secondary {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .btn-danger {
        background-color: rgb(136, 4, 4);
    }

    .btn-menu {
        min-width: 150px;
        padding: 8px 20px;
    }
</style>
```

---
<br/>

![image](https://github.com/user-attachments/assets/8021adec-3178-411e-b1ea-e9d506edd7fb)

---
<br/>

![image](https://github.com/user-attachments/assets/dbdf148c-82c7-49d6-861c-42d7c1fc753d)

---
<br/>

<img width="147" alt="image" src="https://github.com/user-attachments/assets/6384a6ec-d77a-4763-8de1-ab6c4b7b3806" />

---
<br/>

![image](https://github.com/user-attachments/assets/23485334-bf55-43d0-bbce-c124784f33ba)

---
<br/>

### **`index.ts`**
```typescript
export { default as HeroSection } from "./HeroSection.svelte";
export { default as Button } from "./Button.svelte";
export { default as Header } from "./Layout/Header.svelte";
```

---

### **Explication : **
Ce fichier `index.ts` est utilisé pour **réexporter** des composants, ce qui facilite leur importation ailleurs dans le projet.

- **`HeroSection`** : Il est importé depuis `HeroSection.svelte` et réexporté.
- **`Button`** : Le composant `Button.svelte` est aussi réexporté.
- **`Header`** : Il est importé depuis `Layout/Header.svelte`, ce qui signifie que `Header.svelte` est situé dans un sous-dossier `Layout`.

#### **Utilisation :**
Grâce à ce fichier `index.ts`, on peut importer les composants plus facilement ailleurs dans le projet. Au lieu d’écrire :
```typescript
import HeroSection from "../lib/components/HeroSection.svelte";
import Button from "../lib/components/Button.svelte";
import Header from "../lib/components/Layout/Header.svelte";
```
On peut simplement écrire :
```typescript
import { HeroSection, Button, Header } from "$lib/components";
```

---
<br/>

### **`+layout.svelte`**
```svelte
<script lang="ts">
    import { Header } from "$components";
    import "../../app.css";

    let { children } = $props();
</script>

<Header />
{@render children()}
```

---

### **Explication :**
Ce fichier `+layout.svelte` définit la **mise en page globale** pour toutes les pages de l'application SvelteKit. Il agit comme un **template** qui enveloppe toutes les routes de l'application.

#### **Explication des parties :**

1. **Imports :**
   - **`Header`** : Le composant `Header` est importé depuis le dossier `$components`, qui est un alias défini dans `svelte.config.js`.
   - **`app.css`** : Fichier CSS global qui applique le style de l'application.

2. **Récupération des enfants (`children`) :**
   - `let { children } = $props();` : Cette ligne récupère le contenu des **sous-composants/pages** qui seront injectés à l'intérieur de cette mise en page.

3. **Affichage de la mise en page :**
   - `<Header />` : Insère le **Header** global en haut de chaque page.
   - `{@render children()}` : Affiche dynamiquement le contenu des pages qui utilisent ce layout.

---

### **Utilisation dans SvelteKit :**
- Ce fichier `+layout.svelte` est un **layout root**, ce qui signifie que **toutes les pages** de `src/routes/` seront **encapsulées** dans ce layout.
- Exemple d'une page `+page.svelte` :
  ```svelte
  <h1>Bienvenue</h1>
  <p>Ceci est ma page d'accueil.</p>
  ```
  → Cette page sera **automatiquement enveloppée** par le layout et affichée sous le `Header`.

---

### **Pourquoi utiliser `+layout.svelte` ?**
- ✅ Centralise la structure commune (ex. navigation, header, footer).
- ✅ Facilite la gestion des styles globaux.
- ✅ Évite la répétition du code dans chaque page.

Ce fichier est essentiel pour créer une **expérience utilisateur cohérente** dans une application **SvelteKit**. 

---
<br/>

<img width="119" alt="image" src="https://github.com/user-attachments/assets/0f1b0cce-c50f-4a4f-b3e1-67e86577d255" />

---
<br/>

![image](https://github.com/user-attachments/assets/a53e171f-946e-4467-a609-89919f39c339)

---
<br/>

### **Code extrait (`Header.svelte`)**
```svelte
<script lang="ts">
    import bookNestLogo from "$assets/app-logo.svg";
</script>

<header>
    <a href="/">
        <img class="logo" src={bookNestLogo} alt="Go to home" />
    </a>
</header>
```

---
<br/>


### **Utilisation dans l’application :**
Ce composant peut être utilisé **dans le layout principal** (`+layout.svelte`) pour afficher un en-tête commun à toutes les pages :
```svelte
<script lang="ts">
    import { Header } from "$components";
</script>

<Header />
{@render children()}
```

---
<br/>

![image](https://github.com/user-attachments/assets/84484b18-0ff0-4361-ac86-4e81a9ee5c3f)

---
<br/>


### **`Header.svelte`**
```svelte
<script lang="ts">
    import bookNestLogo from "$assets/app-logo.svg";
    import { Button } from "$components";
</script>

<header>
    <a href="/">
        <img class="logo" src={bookNestLogo} alt="Go to home" />
    </a>
    <nav>
        <ul>
            <li>
                <Button isMenu={true} href="/register">Create account</Button>
            </li>
            <li>
                <Button isMenu={true} isSecondary={true} href="/login">Login</Button>
            </li>
        </ul>
    </nav>
</header>
```

---

### **Explication :**
Ce fichier **`Header.svelte`** définit un **en-tête** de navigation contenant :
- Un **logo** qui redirige vers la page d'accueil (`/`).
- Une **navigation (`<nav>`)** avec des boutons permettant :
  - La création d’un compte (`/register`).
  - La connexion (`/login`).

#### **Détails du code :**
1. **Import des ressources :**
   - `bookNestLogo` : Import du logo stocké dans `$assets`.
   - `Button` : Import du composant `Button` depuis `$components` (composant personnalisé).

2. **Structure du `<header>` :**
   - Lien avec une **image** (`logo`) qui renvoie à la page d'accueil.
   - Une barre de navigation (`<nav>`) avec une liste `<ul>` contenant deux **boutons** :
     - **Bouton "Create account"** : Utilise `<Button>` avec `isMenu={true}`.
     - **Bouton "Login"** : Ajoute l’attribut `isSecondary={true}` pour un style différent.

---

### **Connexion avec le composant `Button.svelte`**
Les **boutons** utilisent un composant réutilisable `Button.svelte`, qui est stylisé en fonction des props **isMenu** et **isSecondary**.

---

### **Intégration dans l’application**
Ce fichier sera affiché dans **le layout principal (`+layout.svelte`)**, assurant ainsi que l’en-tête est **présent sur toutes les pages**.

Exemple :
```svelte
<script lang="ts">
    import { Header } from "$components";
</script>

<Header />
{@render children()}
```

---

**Résumé :** Ce code améliore l’expérience utilisateur en offrant une barre de navigation claire avec des **boutons stylisés dynamiquement** via des props. 

---
<br/>

![image](https://github.com/user-attachments/assets/007582d7-b4bf-4957-9179-e2932910610a)

---
<br/>











