# Version React par défaut
- Vite + Checker (pour une meilleure vérification TypeScript)
- React + TypeScript
- React-Router (pour faire Single Page Application)
- Zustand (pour la gestion du Store)
- CSS classique avec reset.css et options de thèmes light/dark

# Installation
- cloner le repo
- lancer `npm install` pour récupérer les dépendences
- lancer `npm run dev` pour tester l'app dans le navigateur sur http://localhost:5173/

# Personnalisation
- éditer et personnaliser ces fichiers images
    ⚠️ en respectant leur taille d'origine et sans changer leur nom :
    - `og-image.jpg` est la bannière apparaissant lorsque l'adresse du site est partagée sur les réseaux
    - les autres sont des copies aux différents formats de l'image de favoris utilisée par les navigateurs
        (pour l'url, les marques-pages, les icônes d'écrans mobiles, etc)
```
    public/
    ├── images/
    │   └── icons/
    │   │   ├── favicon32.png
    │   │   ├── favicon48.png
    │   │   ├── favicon64.png
    │   │   ├── favicon128.png
    │   │   ├── favicon180.png
    │   │   ├── favicon192.png
    │   │   ├── favicon384.png
    │   │   └── favicon512.png
    │   └─ og-image.jpg
    ├── favicon.ico
    └── favicon.png
```

- dans `index.html` remplacer `https://mypreconfreact.com/` par l'adresse de votre site
    (à 4 endroits des balises `<meta>`)

- remplacer **mypreconfreact** par le titre de votre site
    ⚠️ en minuscule sans caractères spéciaux ni espace
    dans :
    - `package.json`
    - `package-lock.json`
    - `index.html`

- remplacer **My Preconf REACT** par le titre de votre site
    cette fois-ci avec le formatage usuel qui peut avoir des majuscules, caractères spécieux, espaces, etc, et adapter si besoin ou désiré
    dans :
    - `index.html`                  (adapter pour les balises `description` en parlant plutôt du site)
    - `public/manifest.json`        (raccourcir dans "short_name" si le nom est long)
    - `src/components/Header.tsx`
    - `src/pages/Home.tsx`

- personnaliser les couleurs et thèmes en modifiant/enrichissant les fichiers :
    - `src/styles/themes/colors.css`
    - `src/styles/themes/light.css`
    - `src/styles/themes/dark.css`