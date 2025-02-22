# Flexible Button Styling

### **Button.svelte**
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

    let { 
        children, 
        href, 
        onclick, 
        isSecondary, 
        isDanger, 
        isMenu, 
        ...props 
    }: ComponentProps = $props();
</script>

{#if href}
    <a {href} 
       class="btn"
       class:btn-secondary={isSecondary}
       class:btn-danger={isDanger}
       class:btn-menu={isMenu}
    >
        {@render children()}
    </a>
{:else}
    <button {...props} 
            {onclick} 
            class="btn"
            class:btn-secondary={isSecondary}
            class:btn-danger={isDanger}
            class:btn-menu={isMenu}
    >
        {@render children()}
    </button>
{/if}

<style>
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

## **Explication du Code**

### **1. Définition des propriétés avec TypeScript**
- **`BasicProps`** : Déclare des propriétés communes à tous les boutons (`children`, `isSecondary`, `isDanger`, `isMenu`).
- **`ButtonProps`** : Propriétés spécifiques aux **boutons** avec un gestionnaire `onclick`.
- **`LinkProps`** : Propriétés spécifiques aux **liens**, qui ont une propriété `href` mais pas `onclick`.
- **`ComponentProps`** : Une **union de types** entre `ButtonProps` et `LinkProps`, permettant à notre composant d'être utilisé **soit comme un bouton, soit comme un lien**.

---

### **2. Logique du rendu conditionnel (`#if ... {:else} ... {/if}`)**
- **Si `href` est défini**, le composant rend un élément `<a>`, ce qui signifie que c'est un **lien**.
- **Sinon**, il rend un `<button>` avec les mêmes propriétés.

---

### **3. Gestion des classes dynamiques (`class:btn-secondary={isSecondary}`)**
- On applique **dynamiquement** des classes CSS en fonction des **props** :
  - `btn-secondary` si `isSecondary` est défini.
  - `btn-danger` si `isDanger` est défini.
  - `btn-menu` si `isMenu` est défini.

---

### **4. Partie CSS (Stylisation)**
- `.btn` : Style de base pour tous les boutons et liens.
- `.btn-secondary` : Bouton secondaire avec un fond blanc et une bordure noire.
- `.btn-danger` : Bouton rouge pour des actions potentiellement dangereuses.
- `.btn-menu` : Bouton plus petit, destiné aux menus.

---

### **Résumé**
✅ Ce composant `Button.svelte` est maintenant **flexible** et peut être utilisé comme :
1. Un **bouton classique** avec des styles différents.
2. Un **lien `<a>`** stylisé comme un bouton.

✅ Il est **dynamique** grâce aux **classes CSS conditionnelles**.

✅ Il est **typé avec TypeScript**, assurant une **meilleure robustesse** et évitant les erreurs.

---
