# Flexible Button Component


![image](https://github.com/user-attachments/assets/c66c934f-1b61-46be-837c-d196f4e813c4)

<br/>

![image](https://github.com/user-attachments/assets/eaea8b49-9afa-4ba9-a15b-0c6c1682346c)

<br/>

![image](https://github.com/user-attachments/assets/57f81209-dfaf-45a0-abdf-d9b39e60fb08)

<br/>

![image](https://github.com/user-attachments/assets/b1459ccd-83f5-4622-ae0c-e03a13a19be9)

<br/>

![image](https://github.com/user-attachments/assets/8a151d46-8d04-4467-a04d-6883e982ece5)

<br/>

### Creer un composant

<img width="134" alt="image" src="https://github.com/user-attachments/assets/59ecabc2-d6e2-4410-9c37-5ac45b2857e7" />

<br/>

![image](https://github.com/user-attachments/assets/5d388fcc-95ad-4262-b6c4-6d756f7bb51a)

<br/>

---

### **Button.svelte**
```svelte
<script lang="ts">
    import type { Snippet } from "svelte";

    interface BasicProps {
        children: Snippet;
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

    let { children, href, onclick, ...props }: ComponentProps = $props();
</script>

{#if href}
    <a {href} class="btn">
        {@render children()}
    </a>
{:else}
    <button {...props} {onclick} class="btn">
        {@render children()}
    </button>
{/if}
```

---

### **Explication du code : Button.svelte**

Ce composant Svelte est un **bouton réutilisable** qui peut fonctionner **soit comme un bouton normal**, soit **comme un lien (`<a>`)** en fonction des **props** fournies.

---

### **1. Définition des types avec TypeScript**
Le script utilise **TypeScript (`lang="ts"`)** pour assurer une **meilleure sécurité des types**.

#### **Interfaces définies :**
- **`BasicProps`** : Contient une seule propriété `children` qui représente le contenu du bouton.
- **`ButtonProps`** : 
  - Hérite de `BasicProps`.
  - Accepte un **événement `onclick`** (gestionnaire de clic).
  - **Ne peut pas avoir `href`** (`href?: never` → TypeScript empêche `href` d'être défini sur un bouton).
- **`LinkProps`** :
  - Hérite aussi de `BasicProps`.
  - Contient un **lien `href`**.
  - **Ne peut pas avoir `onclick`** (`onclick?: never` → Un lien ne peut pas avoir d'événement `onclick`).
- **`ComponentProps`** : 
  - Définit le **type du composant** en combinant `ButtonProps | LinkProps`.
  - Cela permet d'utiliser soit un bouton, soit un lien, **mais jamais les deux en même temps**.

---

### **2. Gestion des props**
```ts
let { children, href, onclick, ...props }: ComponentProps = $props();
```
- `$props()` est utilisé pour récupérer toutes les **propriétés passées** au composant.
- Il extrait :
  - **`children`** : Le contenu à afficher dans le bouton/lien.
  - **`href`** : S'il est défini, le composant est un lien `<a>`.
  - **`onclick`** : Gère le clic pour un bouton (non disponible pour un lien).
  - **`...props`** : Capture **toutes les autres props** pour éviter d’oublier des attributs HTML (ex: `id`, `class`).

---

### **3. Rendu conditionnel avec `{#if ...}`**
```svelte
{#if href}
    <a {href} class="btn">
        {@render children()}
    </a>
{:else}
    <button {...props} {onclick} class="btn">
        {@render children()}
    </button>
{/if}
```
#### **Explication :**
- **Si `href` est défini** → Le composant **rend un `<a>`** avec la classe `"btn"`.
- **Sinon (`:else`)** → Un `<button>` est rendu avec :
  - **Tous les props (`{...props}`)** inclus dynamiquement.
  - **Un gestionnaire `onclick`** pour capturer les clics.

> `{@render children()}` insère dynamiquement le contenu du bouton.

---

### **4. Avantages et points clés**
✅ **Composant flexible** → Fonctionne comme un **bouton normal** ou un **lien cliquable**.  
✅ **Sécurité des types** → Empêche les conflits entre `href` et `onclick`.  
✅ **Gestion dynamique des props** → Supporte n'importe quelles autres props HTML.  
✅ **Réutilisable et optimisé** → Code propre, modulaire et facile à maintenir.  

**Ce composant est idéal pour tout projet nécessitant une gestion uniforme des boutons et des liens.**

<br/>

![image](https://github.com/user-attachments/assets/44dff563-edf4-461e-ae59-2d6777a86bc4)

<img width="425" alt="image" src="https://github.com/user-attachments/assets/da82cc51-c90f-4b0c-adb0-323999667da1" />

<br/>

<img width="532" alt="image" src="https://github.com/user-attachments/assets/9f46dcd6-2fdc-4cfa-9e79-1e643c630cef" />

<br/>

![image](https://github.com/user-attachments/assets/0958e641-e1df-40bc-a85a-f87c49300945)

<br/>

![image](https://github.com/user-attachments/assets/e65bff91-8abf-4f7d-bc37-2f8ca4de1293)







![image](https://github.com/user-attachments/assets/a4cfffe5-4dcb-4cf2-9091-3b3c70c13070)


![image](https://github.com/user-attachments/assets/d0e36e96-b3db-438b-a4c9-91903a5b7f27)

![image](https://github.com/user-attachments/assets/187f49c1-a4dd-4fd8-bb1a-aaa5968dab12)

# Code :

```svelte
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
    <a {href} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu}>
        {@render children()}
    </a>
{:else}
    <button {...props} {onclick} class="btn">
        {@render children()}
    </button>
{/if}
```

### Explication  :

1. **Définition des interfaces :**
   - `BasicProps` contient des propriétés communes pour tous les composants de boutons, telles que `isSecondary`, `isDanger` et `isMenu`, qui sont des booléens optionnels.
   - `ButtonProps` hérite de `BasicProps` et ajoute une fonction `onclick` pour gérer les événements de clic, tout en indiquant que la propriété `href` ne peut pas exister (`href?: never`).
   - `LinkProps` hérite également de `BasicProps`, mais au lieu d'un événement `onclick`, il prend une URL (`href: string`) et interdit `onclick`.

2. **Utilisation de `ComponentProps` :**
   - `ComponentProps` est défini comme un type qui peut être soit `ButtonProps` soit `LinkProps`, permettant ainsi de gérer à la fois les boutons et les liens.

3. **Déclaration des propriétés dynamiques :**
   - `children` représente le contenu du bouton ou du lien.
   - `href` est utilisé si c'est un lien.
   - `onclick` est utilisé si c'est un bouton.
   - `isSecondary`, `isDanger` et `isMenu` sont utilisés pour définir des classes CSS dynamiques.

4. **Affichage conditionnel :**
   - Si `href` est défini, le composant affiche une balise `<a>`, indiquant qu'il s'agit d'un lien.
   - Sinon, un `<button>` est rendu, avec les classes dynamiques appliquées.

### Utilité :
Ce composant Svelte permet de créer des boutons et des liens de manière flexible, avec des classes dynamiques en fonction des propriétés passées. Il facilite la réutilisation et assure une gestion cohérente du style et des interactions.


![image](https://github.com/user-attachments/assets/67e99351-75f3-4ecf-b8a4-43db846372ea)

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
    <a {href} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu}>
        {children}
    </a>
{:else}
    <button {...props} {onclick} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu}>
        {children}
    </button>
{/if}
```
Voici le code corrigé si nécessaire :

### Corrections apportées :
1. **Correction de la balise `<a>`** :
   - `href` doit être défini dans `<a {href}>` pour que le lien fonctionne correctement.
   
2. **Correction de la syntaxe Svelte pour le rendu des enfants** :
   - `{@render children()}` pourrait être une erreur si `@render` n'est pas une directive Svelte standard. En général, `{children}` suffit pour afficher le contenu passé en tant qu'enfant.

### Code corrigé :
```svelte
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
    <a {href} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu}>
        {children}
    </a>
{:else}
    <button {...props} {onclick} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu}>
        {children}
    </button>
{/if}
```

---

### Explication des corrections :
1. **Suppression de `{@render children()}`** → En Svelte, `{children}` est suffisant pour afficher les éléments enfants passés au composant.
2. **Correction de la balise `<a>`** :
   - `{href}` doit être placé correctement pour qu'il soit pris en charge par la balise `<a>`.
3. **Ajout des classes dynamiques à `<button>`** :
   - Les classes `btn-secondary`, `btn-danger` et `btn-menu` doivent être appliquées également au bouton, ce qui était manquant.

Cela garantit un meilleur fonctionnement et une meilleure compatibilité avec Svelte.
---
















