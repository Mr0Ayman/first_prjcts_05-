# Marrakech Séminaire Maison d'Hôtes — Démo Client 2026

Démo statique haute performance, accessible (WCAG AA), responsive et multilingue (FR, EN, ES) pour **Marrakech Séminaires Maison d'Hôtes**.

---

## 1. Architecture Technique & Philosophie

- **Générateur statique natif Node.js** : sans framework lourd (Next.js, React, Vue proscrits), zéro dépendance serveur en production.
- **Rendu statique multi-langues** :
  - Français (par défaut) : `/`, `/about-us/`, `/nos-services/`, `/events/`, `/contact/`, `/de-5-a-10-chambres/`, etc.
  - Anglais : `/en/...`
  - Espagnol : `/es/...`
- **Typographie auto-hébergée (zéro appel externe Google Fonts)** :
  - *Cormorant Garamond* (500, 600, 700) pour les titres élégants
  - *Jost* (400, 500, 600, 700) pour les corps de texte et la navigation
  - Formats WOFF2 avec sous-ensembles Latin et Latin-Ext, `font-display: swap`.
- **Direction Visuelle Luxury Dark Mode** :
  - Fond noir absolu (`#000000` / `#0B0B0B`)
  - Accentuation dorée tan-gold (`#C59A68`)
  - Cadre de page doré fin (`.page-frame`)
  - En-tête transparent sur le hero se métamorphosant en barre sombre avec flou d'arrière-plan au scroll (`backdrop-filter`)
  - Cartes d'albums événementiels style Apple Liquid Glass avec interaction fluide FLIP / View Transitions.

---

## 2. Commandes Utiles

| Commande | Rôle |
| :--- | :--- |
| `npm run build` | Génère l'ensemble du site statique dans `dist/` (FR, EN, ES, redirections, robots.txt) |
| `npm run images` | *(En local uniquement)* Traite récursivement `assets/originals/` avec Sharp pour produire les WebP optimisés (480, 800, 1200, 1920 px) dans `public/img/` |
| `npm run fonts` | Télécharge et convertit les polices Cormorant Garamond et Jost dans `public/fonts/` |
| `npm run serve` | Lance un serveur de prévisualisation local sur `http://localhost:3000` |
| `npm run dev` | Reconstruit le site et lance le serveur local de prévisualisation |

---

## 3. Guide de Gestion & Mises à Jour

### A. Ajouter ou Remplacer des Photos
1. Placez vos fichiers originaux en haute définition dans le dossier approprié sous `assets/originals/` :
   - `assets/originals/hero/` pour les photos de fond d'en-tête (ex. : `hero-bg.jpg`)
   - `assets/originals/albums/<slug>/` pour les albums événementiels (`soiree-berbere`, `mariages`, etc.)
   - `assets/originals/properties/<slug>/` pour les villas
   - `assets/originals/services/<slug>/` pour les prestations
2. Exécutez le script d'optimisation d'images en local :
   ```bash
   npm run images
   ```
   Ce script génère automatiquement les déclinaisons WebP responsives (480w, 800w, 1200w, 1920w) et met à jour `public/img/images-manifest.json`.
3. Référencez les nouveaux chemins d'images dans `data/site.json`.
4. Reconstruisez le site :
   ```bash
   npm run build
   ```
5. Validez vos changements dans Git (`git add public/img/ data/site.json && git commit`).
   > *Rappel : `assets/originals/` est exclu de Git via `.gitignore` pour éviter de surcharger le dépôt GitHub avec des fichiers bruts de plusieurs centaines de mégaoctets.*

### B. Mettre à Jour ou Ajouter des Témoignages
1. Ouvrez `data/testimonials.json`.
2. Ajoutez ou modifiez une entrée :
   ```json
   {
     "firstName": "Alexandre & Sophie",
     "eventType": "Mariage en exclusivité",
     "date": "Octobre 2025",
     "text": "Un séjour inoubliable pour nos 50 invités. L'accompagnement de Nadia et la cuisine étaient au-delà de nos attentes.",
     "source": "Avis vérifié WhatsApp",
     "consent": true
   }
   ```
3. **Règle** : Seules les entrées ayant `"consent": true` sont affichées sur le site. Si la liste est vide ou en attente, le site affiche automatiquement les 3 cartes d'attente réservées.
4. Reconstruisez le site (`npm run build`).

### C. Renommer ou Réorganiser les Albums Photos
1. Ouvrez `data/site.json`.
2. Dans la section `"albums"`, modifiez l'objet `name` de l'album souhaité :
   ```json
   {
     "slug": "soiree-a-confirmer",
     "name": {
       "fr": "Soirées Mille et Une Nuits",
       "en": "Arabian Nights Evenings",
       "es": "Veladas Mil y Una Noches"
     },
     "cover": "/img/event-soiree-dj.webp",
     "photos": [ ... ]
   }
   ```
3. Reconstruisez le site (`npm run build`).

### D. Modifier les Textes et Traductions
- **Français (source de vérité)** : `data/i18n/fr.json`
- **Anglais (DRAFT)** : `data/i18n/en.json`
- **Espagnol (DRAFT)** : `data/i18n/es.json`

Toutes les modifications textuelles, balises SEO, attributs `alt` et textes de boutons sont centralisés dans ces fichiers JSON.

---

## 4. Déploiement Netlify

Le projet est configuré pour un hébergement statique ultra-rapide sur Netlify :
- **Fichier de configuration** : `netlify.toml`
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"

  [build.environment]
    NETLIFY_NEXT_PLUGIN_SKIP = "true"
  ```
- **Règles de redirection** : `dist/_redirects` gère automatiquement la redirection 301 de `/de-40-a-60-chambre` vers `/de-40-a-60-chambres/` en français, anglais et espagnol.
- **Protection anti-indexation** : `dist/robots.txt` contient `Disallow: /` et chaque page intègre `<meta name="robots" content="noindex, nofollow">` pour garantir que cette prévisualisation client ne concurrence pas le site WordPress en ligne.
- **Dépendances sur Netlify** : `npm run build` s'exécute sans dépendre de Sharp ni des originaux bruts grâce aux assets WebP pré-optimisés et commités dans `public/img/`.
