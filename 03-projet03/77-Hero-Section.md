# Hero Section

### Creer : components HeroSection.svelte

<img width="126" alt="image" src="https://github.com/user-attachments/assets/1df653f9-3a28-41af-b4a5-cf1407d615d1" />

<br/>

### Après : **JavaScript (svelte.config.js)** code 

![image](https://github.com/user-attachments/assets/e25068e7-1866-42e3-b3c4-4720a660525c)

<br/>


```js
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            $components: "src/lib/components",
        },
    },
};

export default config;
```

<br/>

### **Explication du code (svelte.config.js) :**

1. **Importation des modules nécessaires :**
   - `@sveltejs/adapter-auto` est utilisé pour sélectionner automatiquement le meilleur adaptateur en fonction de l’environnement de déploiement.
   - `vitePreprocess` de `@sveltejs/vite-plugin-svelte` permet d’activer les fonctionnalités de prétraitement pour Svelte.

2. **Objet de configuration (`config`) :**
   - **Preprocesseur** : Utilisation de `vitePreprocess()` pour gérer le prétraitement du code Svelte.
   - **Kit (`kit`) :**
     - Définit un **adaptateur** (`adapter-auto`), qui permet à SvelteKit de s’adapter automatiquement à l’environnement d’exécution.
     - Ajoute un **alias** (`$components`) pointant vers `src/lib/components`, ce qui simplifie les imports en évitant d'écrire des chemins relatifs longs.

3. **Exportation de la configuration :**
   - `export default config;` permet d’utiliser cette configuration pour le projet **SvelteKit**.

---

### **Pourquoi c'est important ?**
Ce fichier **svelte.config.js** est **essentiel** dans un projet **SvelteKit**, car il :
✅ Définit le **système d’adaptateurs** pour gérer le rendu et l’hébergement.  
✅ Configure le **prétraitement** pour optimiser le développement et la compilation.  
✅ Permet d’utiliser des **alias** (`$components`), rendant les imports plus lisibles et évitant des chemins complexes.  

Ce fichier facilite donc **l'organisation et l'optimisation** du projet. 

<br/>
 
![image](https://github.com/user-attachments/assets/a4b7fd82-5a35-40be-aae9-8045d42fe7fb)

### Code

```typescript
export { default as HeroSection } from "./HeroSection.svelte";
```
---

<br/>

Ce code TypeScript exporte par défaut le composant **HeroSection** à partir du fichier `HeroSection.svelte`. Cela permet d'importer ce composant plus facilement ailleurs dans le projet, par exemple :

```typescript
import { HeroSection } from "$lib/components";
```

Ici, le fichier `index.ts` sert de point central pour exporter `HeroSection`, ce qui simplifie l'organisation des imports et évite d'avoir à spécifier directement le chemin du fichier `HeroSection.svelte` à chaque fois.

<br/>

![image](https://github.com/user-attachments/assets/c9fb246d-1181-46dc-bb3c-bfa72e134b06)


### Code

```svelte
<script lang="ts">
    import { HeroSection } from "$components";
</script>

<HeroSection />
```

<br/>

### Explication :
1. **Importation du composant :**  
   - Le fichier utilise TypeScript (`lang="ts"`).
   - Il importe `HeroSection` depuis le module `$components`, qui est un alias défini dans la configuration de SvelteKit (`svelte.config.js`).

2. **Utilisation du composant :**  
   - `<HeroSection />` est inséré dans le fichier `+page.svelte`, ce qui signifie qu'il est affiché sur cette page.

Cela permet d'organiser les composants dans un dossier `lib/components` et d'éviter d'avoir à spécifier leur chemin exact à chaque importation.

---
<br/>

![image](https://github.com/user-attachments/assets/9f5834ec-6f75-43b2-8754-8d24490233d9)

<br/>

![image](https://github.com/user-attachments/assets/c90cae8d-9880-470d-bd02-3c2f19628eda)


<br/>

---

![image](https://github.com/user-attachments/assets/31de2e97-8e5e-475f-97d9-1e8b56e93f4a)

<br/>

### Code

```html
<section class="default-margin hero">
    <div class="hero-text">
        <h1>Book Nest</h1>
        <h3>Your personal book library.</h3>
        <h4 class="mt-l">
            Create your very own digital library where you can keep track of every 
            book you own, read and love.
        </h4>
        <h4 class="mb-s">
            Our app offers a beautifully designed, easy-to-use interface that makes 
            managing your book collection a joy.
        </h4>
        <button>Sign up</button>
    </div>
</section>
```

### Explication :
1. **Section principale (`<section>`)** :
   - La section a une classe `"default-margin hero"`, probablement utilisée pour la mise en page et le design.

2. **Conteneur de texte (`<div class="hero-text">`)** :
   - Contient les éléments textuels qui composent le titre et la description de l’application.

3. **Titres et descriptions (`<h1>`, `<h3>`, `<h4>`)** :
   - `<h1>` affiche le titre principal **"Book Nest"**.
   - `<h3>` indique le sous-titre **"Your personal book library."**.
   - `<h4>` donne des descriptions expliquant les fonctionnalités et avantages de l’application.

4. **Bouton d'inscription (`<button>Sign up</button>`)** :
   - Un bouton pour permettre aux utilisateurs de s’inscrire à l’application.

Ce composant `HeroSection.svelte` est utilisé pour afficher une introduction attrayante sur la page d'accueil. Il peut être stylisé davantage avec du CSS pour améliorer l'affichage et l’expérience utilisateur.

---

![image](https://github.com/user-attachments/assets/d502dca7-9f4b-4370-86be-b55b2da4a127)

<br/>

<img width="821" alt="image" src="https://github.com/user-attachments/assets/295dd790-c852-48ca-9ffd-450413d1e5cb" />

---
<br/>

### Image hero.png :
![hero](https://github.com/user-attachments/assets/fc66c485-ee92-4c27-86b3-cd7b01679e20)

---
<br/>

### On change le fichier : 
<img width="521" alt="image" src="https://github.com/user-attachments/assets/a5a55ce3-d9cd-4458-9d32-adb882cfb391" />

### Code 

```svelte
<script lang="ts">
    import heroImage from '../../../assets';
</script>

<section class="default-margin hero">
    <div class="hero-text">
        <h1>Book Nest</h1>
        <h3>Your personal book library.</h3>
        <h4 class="mt-l">
            Create your very own digital library where you can keep track of every 
            book you own, read and love.
        </h4>
        <h4 class="mb-s">
            Our app offers a beautifully designed, easy-to-use interface that makes 
            managing your book collection a joy.
        </h4>
        <button>Sign up</button>
    </div>
    <img class="hero-image" src={} alt="" />
</section>
```

---

### Explication :

1. **Importation de l'image (`<script lang="ts">`)** :
   - Le script TypeScript importe une image `heroImage` depuis le dossier `assets`.

2. **Structure HTML (`<section>`)** :
   - Contient une section `hero` qui sert de bannière d'accueil.
   - Un `<div class="hero-text">` pour afficher le titre et la description.

3. **Titres et descriptions (`<h1>`, `<h3>`, `<h4>`)** :
   - `<h1>` affiche le titre principal **"Book Nest"**.
   - `<h3>` sert de sous-titre **"Your personal book library."**.
   - `<h4>` ajoute des explications sur les fonctionnalités et avantages.

4. **Bouton d'inscription (`<button>`)** :
   - Un bouton **"Sign up"** permettant aux utilisateurs de s'inscrire.

5. **Image (`<img>`)** :
   - Une image avec la classe `"hero-image"`, mais la source (`src={}`) est incomplète.
   - Il faudrait la lier à `heroImage`, probablement via `{heroImage}`.

---

### Correction suggérée :
Modifiez l'attribut `src={}` pour inclure l'image importée :

```svelte
<img class="hero-image" src="{heroImage}" alt="Hero Section Image" />
```

Cela affichera correctement l'image importée. 

---
<br/>


![image](https://github.com/user-attachments/assets/12b7b41b-afb0-481f-bec8-952fa59a3c67)

<br/>

### Code :

```javascript
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consultez https://kit.svelte.dev/docs/integrations#preprocessors
    // pour plus d'informations sur les préprocesseurs
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto ne prend en charge que certains environnements, voir https://kit.svelte.dev/docs/adapter-auto pour une liste.
        // Si votre environnement n'est pas pris en charge, ou si vous souhaitez utiliser un environnement spécifique, remplacez l'adaptateur.
        // Voir https://kit.svelte.dev/docs/adapters pour plus d'informations sur les adaptateurs.
        adapter: adapter(),
        alias: {
            $components: "src/lib/components",
            $assets: "src/assets"
        }
    }
};

export default config;
```

---

### Explication :

1. **Importation des modules** :
   - `adapter-auto` : Permet de s'adapter à l'environnement d'exécution (serveur, statique, etc.).
   - `vitePreprocess` : Active les préprocesseurs Vite pour gérer les fichiers `.svelte`.

2. **Configuration (`config` object)** :
   - `preprocess: vitePreprocess()` : Active les préprocesseurs pour une meilleure gestion du code `.svelte`.
   - `kit.adapter: adapter()` : Définit l'adaptateur pour déployer l'application.

3. **Ajout des alias (`alias`)** :
   - `$components`: Fait référence à `src/lib/components`, simplifiant l'importation des composants.
   - `$assets`: Ajout d'un alias pour `src/assets`, facilitant l'importation des fichiers statiques.

---

### Correction potentielle :
Dans votre fichier `HeroSection.svelte`, vous pouvez maintenant importer l'image plus simplement avec :

```svelte
<script lang="ts">
    import heroImage from "$assets/hero.png";
</script>
```

Cette modification améliore l'organisation du projet et évite d'écrire des chemins relatifs complexes. 

---

![image](https://github.com/user-attachments/assets/682c7b03-f8b6-45b9-a74d-3279838b51b7)



