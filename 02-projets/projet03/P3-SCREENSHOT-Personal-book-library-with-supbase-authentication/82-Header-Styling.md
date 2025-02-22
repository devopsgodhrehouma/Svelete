# Header Styling

![image](https://github.com/user-attachments/assets/137c2fc3-7089-416a-bf76-802dbcaeb422)

### **`Header.svelte`**

```svelte
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

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 4vw;
    }

    .logo {
        height: 72px;
    }
</style>
```

---

### **Explication :**
Ce fichier **`Header.svelte`** définit l'**en-tête principal** de l'application avec :
- Un **logo** cliquable qui redirige vers la page d'accueil (`/`).
- Une **barre de navigation** avec deux boutons :
  - **"Create account"** (`/register`)
  - **"Login"** (`/login`), stylisé comme **bouton secondaire**.

#### **Détails du code :**
1. **Mise en page du `<header>` :**
   - **`display: flex;`** → Utilisation de **Flexbox** pour organiser les éléments horizontalement.
   - **`justify-content: space-between;`** → Espace entre le logo et les boutons.
   - **`align-items: center;`** → Centrage vertical des éléments.
   - **`padding: 12px 4vw;`** → Ajout d'un **espacement fluide** sur les côtés.

2. **Style du logo (`.logo`) :**
   - **`height: 72px;`** → Ajustement de la hauteur pour qu'il reste **proportionné**.

---

### **Pourquoi ce code est important ?**
✅ **Modularité** : Il utilise des **composants réutilisables** (`Button.svelte`).  
✅ **Responsive** : L'utilisation de **vw** assure une adaptation aux écrans.  
✅ **Simplicité** : Il est **léger**, facile à maintenir et améliorable.

**Prochaine étape :** Ajouter des **styles dynamiques** aux boutons pour un meilleur **feedback visuel** ! 

--- 
<br/>

![image](https://github.com/user-attachments/assets/adcf0ff3-69eb-4d99-b4a7-95161236ba20)

--- 
<br/>

![image](https://github.com/user-attachments/assets/26130f15-2e4a-4e7e-b5a2-08a56b41168d)

--- 
<br/>

![image](https://github.com/user-attachments/assets/b28bfd29-8895-4d14-bf96-58c9bfb357c2)

--- 
<br/>

![image](https://github.com/user-attachments/assets/3b964b76-87b0-411e-8355-5957868204e2)

--- 
<br/>

![image](https://github.com/user-attachments/assets/c0176bd0-2fe5-4fa3-ba3b-f4730b63b1c0)










