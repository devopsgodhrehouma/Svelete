# **Chapitre 22 - Accessibilité (`a11y`) en Svelte** ♿️  

---

## **1. Introduction : Pourquoi l’Accessibilité en Svelte ?**  

L’**accessibilité** (ou `a11y`, abréviation de "accessibility") est essentielle pour permettre **à tous les utilisateurs**, y compris ceux en situation de handicap, d’interagir avec une application web.  

📌 **Pourquoi rendre une application Svelte accessible ?**  
✅ **Permet aux personnes malvoyantes d'utiliser des lecteurs d'écran.**  
✅ **Assure la navigation au clavier pour les utilisateurs qui ne peuvent pas utiliser une souris.**  
✅ **Respecte les standards du web** (WCAG, ARIA) et améliore le SEO.  
✅ **Obligation légale** dans certains pays (ex: loi RGAA en France, ADA aux USA).  

---

## **2. Vérifier l’Accessibilité avec les Outils Svelte**  

### **📌 Activer les DevTools Accessibilité**  

1️⃣ **Google Chrome / Firefox :**  
- Ouvrez **DevTools (`F12` ou `Ctrl+Shift+I`)**  
- Allez dans l’onglet **Accessibilité (Accessibility)**  
- Vérifiez les **erreurs ARIA, contrastes, navigation clavier**  

2️⃣ **Utiliser Lighthouse (Google Chrome)**  
- Ouvrez DevTools > Onglet **Lighthouse**  
- Sélectionnez **Accessibilité** et générez un rapport  

✅ **Un score d’accessibilité élevé signifie que votre application est bien conçue pour tous.**  

---

## **3. Navigation au Clavier et Focus Visible**  

📌 **Problème : Les utilisateurs qui ne peuvent pas utiliser une souris doivent naviguer avec `Tab`.**  

```svelte
<button>Cliquable</button>
```

📌 **Solution : Ajouter `tabindex` et gérer le focus**  

```svelte
<button tabindex="0" on:focus={() => console.log("Bouton en focus")}>
  Cliquable avec Tab
</button>
```

✅ **Permet aux utilisateurs clavier d’accéder au bouton.**  

### **📌 Assurer un focus visible pour la navigation clavier**  

Ajoutez du CSS pour un **focus visible** :  

```css
button:focus {
  outline: 2px solid blue;
}
```

✅ **Indispensable pour les malvoyants !**  

---

## **4. Améliorer les Formulaires pour les Lecteurs d’Écran**  

📌 **Problème : Un champ de formulaire sans label n’est pas compréhensible pour un lecteur d’écran.**  

```svelte
<input type="text" />
```

📌 **Solution : Ajouter un `label` associé au champ**  

```svelte
<label for="nom">Nom</label>
<input id="nom" type="text" />
```

✅ **Les lecteurs d’écran annoncent correctement "Nom, champ de texte".**  

### **📌 Améliorer l’Accessibilité avec ARIA (`aria-live`, `aria-label`)**  

```svelte
<button aria-label="Ajouter au panier">🛒</button>
```

✅ **Les icônes sans texte sont compréhensibles pour les lecteurs d’écran.**  

---

## **5. Utiliser `svelte:window` pour Gérer la Navigation Clavier**  

📌 **Problème : Gérer les raccourcis clavier pour les utilisateurs avancés.**  

### **📌 Exemple : Ajouter un raccourci `Esc` pour fermer un modal**  

```svelte
<script>
  let ouvert = false;

  function fermerModal(event) {
    if (event.key === "Escape") {
      ouvert = false;
    }
  }
</script>

<svelte:window on:keydown={fermerModal} />

<button on:click={() => ouvert = true}>Ouvrir Modal</button>

{#if ouvert}
  <div role="dialog" aria-modal="true">
    <p>Contenu du modal</p>
    <button on:click={() => ouvert = false}>Fermer</button>
  </div>
{/if}
```

✅ **`Esc` permet de fermer le modal, et `aria-modal="true"` informe les lecteurs d’écran.**  

---

## **6. Assurer un Contraste Suffisant**  

📌 **Problème : Un texte gris clair sur fond blanc est illisible pour les malvoyants.**  

```css
p {
  color: #999;
  background: #fff;
}
```

📌 **Solution : Utiliser un bon contraste (`AAA` recommandé)**  

```css
p {
  color: #222;
  background: #fff;
}
```

✅ **Utilisez des outils comme [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) pour tester vos couleurs.**  

---

## **7. Annoncer Dynamiquement les Changements avec `aria-live`**  

📌 **Problème : Si du texte change dynamiquement, un lecteur d’écran ne l’annoncera pas.**  

```svelte
<script>
  let message = "Aucune notification";
  
  function envoyerNotification() {
    message = "Nouveau message reçu !";
  }
</script>

<p>{message}</p>
<button on:click={envoyerNotification}>Envoyer une notification</button>
```

📌 **Solution : Utiliser `aria-live="polite"` pour annoncer les changements**  

```svelte
<p aria-live="polite">{message}</p>
```

✅ **Les lecteurs d’écran liront automatiquement le changement.**  

---

## **8. Vérifier la Sémantique HTML**  

📌 **Utilisez toujours les bons éléments HTML** :  
✔️ **`<button>` au lieu de `<div on:click>`**  
✔️ **`<nav>` pour les menus, `<main>` pour le contenu principal**  
✔️ **Ne jamais utiliser `display: none` pour cacher du contenu (préférez `aria-hidden="true"`)**  

---

## **9. Comparaison des Bonnes Pratiques Accessibilité**  

| Problème | Solution |
|----------|---------|
| **Boutons non accessibles** | Utiliser `<button>` au lieu de `<div on:click>` |
| **Formulaires non lisibles** | Ajouter un `<label>` pour chaque `<input>` |
| **Navigation clavier impossible** | Ajouter `tabindex="0"` et gérer `focus` |
| **Texte trop pâle** | Améliorer le contraste (`AAA` recommandé) |
| **Modals et alertes invisibles** | Utiliser `aria-live` et `aria-modal="true"` |
| **Changements dynamiques ignorés** | Utiliser `aria-live="polite"` pour annoncer les mises à jour |

✅ **Ces petites améliorations rendent une application utilisable par TOUS.**  

---

## **10. Résumé des Optimisations Accessibilité (`a11y`)**  

✔️ **Vérifier l’accessibilité avec Lighthouse et DevTools**  
✔️ **Assurer une navigation fluide au clavier (`tabindex`, `focus`)**  
✔️ **Utiliser les `label` pour les formulaires et `aria-label` pour les icônes**  
✔️ **Ajouter `aria-live` pour annoncer les mises à jour**  
✔️ **Améliorer le contraste pour les malvoyants**  
✔️ **Respecter la sémantique HTML pour une meilleure compréhension**  

---

## **11. Conclusion**  

✅ **Svelte permet une accessibilité fluide avec peu d’effort.**  
✅ **Une application accessible est plus facile à utiliser pour tout le monde.**  
✅ **Suivre les bonnes pratiques `a11y` améliore aussi le SEO et la performance.**  

---

### **Prochain Chapitre : Internationalisation (`i18n`) avec Svelte !** 
