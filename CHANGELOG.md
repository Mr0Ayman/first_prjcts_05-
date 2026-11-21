# Journal des Modifications (CHANGELOG)

Toutes les modifications notables apportées à la démo client pour **Marrakech Séminaires Maison d'Hôtes** sont documentées ci-dessous.

---

## [Style 2.4.1] - Verre réfracté et en-tête mobile

- Ajout d'un système CSS réutilisable de verre avec teintes lisibles, bords lumineux, reflets, ombres et variantes pilule/carte/renforcée.
- Distorsion SVG progressive limitée à quelques surfaces et aux appareils compatibles; surfaces opaques pour transparence réduite et couleurs forcées.
- Alignement du menu hamburger à droite jusqu'à 960px, avec une cible de 48px et marge de zone de sécurité.
- Conservation du tiroir plein écran, avec fermeture Échap et piège de focus.
- Mise à jour de la documentation de la palette et des tailles responsives d'images.

### Fichiers source modifiés
- `src/css/theme.css`
- `src/css/main.css`
- `src/js/main.js`
- `scripts/build-static-site.mjs`
- `README.md`
- `CHANGELOG.md`

La commande `npm run build` a aussi régénéré 74 fichiers suivis dans `dist/` : les pages statiques FR/EN/ES, `css/styles.min.css` et `js/main.js`.

---

## [Version 2.4.0] - Arrière-Plan Continu, Visionneuse Photo & Chips Flottants

### 1. Arrière-Plan Photographique Unique et Continu sur /events/
- **Suppression du doublon d'image** : Remplacement de l'ancien système (hero + copie sous le hero) par un calque unique `position: fixed; inset: 0; height: 100lvh; z-index: 0` avec `<picture>` + srcset WebP réutilisé.
- **Dégradé forêt unifié** : Un seul overlay `linear-gradient` (sombre en haut pour la lisibilité du header, plus sombre en bas vers le footer). Plus aucune couture visible entre les sections.
- **Hero et main transparents** : `.hero--transparent` et `.main--transparent` laissent le calque fixe visible derrière, sans superposition.
- **Footer opaque** : Le pied de page reste en `--forest-deep` plein, au-dessus du calque fixe, coupant nettement le fond photographique.
- **Pas de `background-attachment: fixed`** : Technique compatible iOS.

### 2. Visionneuse Photo Native `<dialog>` (Inspirée Edge Image Viewer)
- **Dialogue natif** : Ouverture via `dialog.showModal()` avec piège de focus automatique et `::backdrop` sombre (`rgba(10,18,14,0.94)`).
- **Photo centrée** : `object-fit: contain; max-width: 94vw; max-height: 94dvh`, coins arrondis et ombre portée douce.
- **Interface épurée** : Aucun titre, aucune légende, aucun compteur, aucune bande de miniatures. Uniquement 3 boutons ronds en verre (précédent/suivant/fermer) avec icônes SVG chevron.
- **Navigation complète** : Flèches ← → clavier, Échap pour fermer, swipe gauche/droite tactile (seuil 40px), swipe vers le bas pour fermer (seuil 70px).
- **Pré-chargement intelligent** : Les photos adjacentes (n-1 et n+1) sont pré-chargées en arrière-plan.
- **Blocage du défilement** : `html:has(dialog[open]) { overflow: hidden; scrollbar-gutter: stable }` empêche le saut de page.
- **Retour du focus** : À la fermeture, le focus revient sur la miniature cliquée (`triggerElement`).

### 3. Chips Flottants d'Albums (Style Apple Glass)
- **Remplacement de la barre sombre** : L'ancienne barre pleine largeur `.album-sticky-bar` est remplacée par une rangée de chips flottants en verre (`position: sticky; top: calc(var(--header-h) + 12px)`).
- **Chips en verre dépoli** : 48px de hauteur, `border-radius: 999px`, `backdrop-filter: blur(18px) saturate(160%)`, miniature ronde 32px + libellé (max-width 240px + ellipsis).
- **Chip actif** : Fond `--offwhite` avec texte `--forest-deep`, anneau `--clay` sur la miniature.
- **Bouton « Tous les albums »** : Rond 48px, icône grille SVG seulement (pas de libellé), style verre.
- **Rangée transparente** : `pointer-events: none` sur le conteneur, `pointer-events: auto` sur chaque chip — le fond photographique reste visible entre les chips.
- **Scroll-snap horizontal** sur mobile, défilement doux et auto-centrage du chip actif.
- **Fallback sans backdrop-filter** : `@supports not (backdrop-filter: blur(1px))` applique un fond `--forest-card` opaque.

### 4. Grille Masonry en CSS Grid avec Centrage
- **Passage de CSS `columns` à CSS Grid** : `display: grid; grid-template-columns: repeat(var(--masonry-cols, 4), 1fr)` avec `max-width` auto-centré.
- **Variable CSS `--masonry-cols`** : Définie dynamiquement par le JS à `min(nombre_de_photos, 4)` pour un centrage optimal quand un album contient peu de photos.
- **Points de rupture responsive** : 1200px → 3 colonnes, 800px → 2 colonnes, 480px → 1 colonne.

### 5. Nettoyage CSS et Scripts
- Suppression des règles orphelines : `.btn-back-albums`, `.lightbox-btn-prev/next`, anciens `.masonry-grid { columns }` et breakpoints associés.
- Suppression des scripts temporaires : `patch-build-script.mjs`, `patch-modal.mjs`, `patch-nav.mjs`, `patch-services.mjs`, `run-chrome-suite.mjs`.

### Fichiers Modifiés
| Fichier | Modifications |
|---|---|
| `src/css/main.css` | Calque fixe, hero/main transparent, `<dialog>` viewer, chips flottants, grille masonry CSS grid, nettoyage orphelins |
| `scripts/build-static-site.mjs` | Génération du calque fixe, `<dialog>` HTML, chips HTML, suppression du doublon hero/main |
| `src/js/main.js` | Section 7 (viewer : showModal, keyboard, swipe, preload), Section 6 (chips : sélecteurs, --masonry-cols) |
| `data/i18n/fr.json` | Labels aria : close, prev, next, allAlbums |
| `data/i18n/en.json` | Labels aria : close, prev, next, allAlbums |
| `data/i18n/es.json` | Labels aria : close, prev, next, allAlbums |

---

## [Version 2.3.0] - Correctifs Ergonomie, Galerie Événements & Harmonisation des Services

### 1. Correction du Menu Déroulant "Nos Services" (Fermeture Prématurée Résolue)
- **Suppression du vide pointer-events** : Le panneau déroulant `.dropdown-menu` est désormais positionné à `top: 100%` avec un pont invisible `::before` de 16px évitant toute rupture de survol entre le bouton déclencheur et les options.
- **Temporisation anti-fermeture diagonale** : Implémentation d'un délai de grâce de **180 ms** sur le `mouseleave` du conteneur avec annulation immédiate en cas de retour du pointeur (`mouseenter`).
- **Accessibilité clavier & tactile intégrale** :
  - Support des touches Flèche Bas / Flèche Haut pour parcourir les 8 prestations.
  - Touche Échap fermant le menu et réassignant le focus sur le bouton déclencheur.
  - Clic en dehors fermant automatiquement le panneau.
  - Bascule tactile `aria-expanded` fiable sur mobiles et tablettes sans hover.

### 2. Arrière-Plan Photographique Intégral sur la Page Événements (/events/)
- **Calque photographique sur tout le conteneur principal** : L'image hero (étincelles et ambiance festive) s'étend désormais sur l'intégralité de `<main class="main--full-bg">` jusqu'au bord supérieur du pied de page.
- **Technique de positionnement absolue optimisée** : Réutilisation directe du srcset WebP sans duplication ni `background-attachment: fixed` (qui pose problème sur iOS).
- **Dégradé vert forêt progressif (WCAG AA)** : Assombrissement graduel vers le bas (`rgba(38, 61, 50, 0.72)` à `rgba(26, 43, 35, 1.0)`) assurant une lisibilité maximale pour les cartes liquid glass et la grille de photos.
- **Pied de page net** : Le footer reste en vert forêt nocturne opaque (`--forest-deep`) débutant exactement à la frontière de `<main>`.
- **Configuration dynamique** : Piloté par la clé `"pageBackground": "full"` dans `data/site.json`.

### 3. Résolution Complète de l'Ouverture des Albums Photos
- **Correction des sélecteurs & structures de données** :
  - Réconciliation de l'ID du script de données (`#albums-data-json`) et parsing automatique du tableau d'albums indexé par slug.
  - Harmonisation des attributs HTML `data-album-slug` sur les cartes et les pilules.
  - Résolution des identifiants cibles du conteneur (`#masonry-container`) et du bouton retour (`#btn-back-albums`).
  - Ajout des identifiants de contrôle sur la modale Lightbox (`#lightbox-close`, `#lightbox-prev`, `#lightbox-next`, `#lightbox-img`, `#lightbox-caption`).
- **Navigation par ancre d'URL & Historique du navigateur** :
  - La sélection d'un album met à jour l'URL avec l'ancre correspondante (ex. `/events/#mariages`, `/events/#soiree-berbere`).
  - L'accès direct avec ancre dans l'URL ouvre automatiquement l'album ciblé au chargement.
  - Support complet des boutons Précédent / Suivant du navigateur via l'événement `popstate`.
  - Intégration de l'API View Transitions (`document.startViewTransition`) avec repli gracieux instantané pour les navigateurs ne la supportant pas.
- **Validation Chrome réel headless** : Tests automatisés validés sous Chrome headless sur FR, /en/ et /es/.

### 4. Harmonisation des Libellés et Accessibilité
- **Lien d'évitement (.skip-link)** : Masquage visuel complet hors focus via `clip-path: inset(50%)` et `overflow: hidden` (empêchant toute apparition parasite sur le hero), apparaissant en haut à gauche aux couleurs de la charte dès réception du focus clavier Tab.
- **Unification stricte des 8 Services** : Libellés rigoureusement identiques entre menu déroulant, tiroir mobile, titres H1 de page, cartes récapitulatives et sélecteur de devis :
  1. *Séminaires d'entreprise*
  2. *Mariages d'exception*
  3. *Anniversaires & Célébrations*
  4. *Team building*
  5. *Fêtes de famille*
  6. *Lancements de produit*
  7. *Stages de yoga & bien-être*
  8. *Soirées et animations*
- **Mise à jour du document client** : Ajout des sections 12 (validation des libellés de services) et 13 (validation de l'en-tête de colonne « Capacités » du pied de page) dans `CLIENT_QUESTIONS.md`.

---

## [Version 2.1.0] - Direction Artistique "Terre & Architecture" & Nouveau Hero Reference

### 1. Nouvelle Palette de Couleurs "Earth & Architecture"
- **Remplacement complet de l'ancienne palette noir et or tan-gold** par les 5 teintes minérales et architecturales :
  - `--forest: #263D32` (Fond sombre principal, vert forêt profond)
  - `--forest-deep: #1A2D24` (Pied de page, calque modal, tiroir sombre)
  - `--forest-card: #2E4A3A` (Surfaces de cartes surélevées)
  - `--sage: #899783` (Réservé exclusivement aux filets, bordures décoratives, icônes et séparateurs – jamais de texte courant afin d'éviter tout échec de contraste)
  - `--sand: #E8DDC9` (Fond clair pour l'alternance des sections d'accueil et des avis clients)
  - `--clay: #B96E4F` (Teinte d'accentuation pour les bordures, cercles et anneaux de focus)
  - `--clay-btn: #9E573C` (Remplissage des boutons d'action CTA assurant un contraste de **5.1:1** avec le texte blanc cassé, conforme WCAG AA)
  - `--offwhite: #F8F6F0` (Texte principal sur fond sombre, contraste supérieur à 10:1 AAA)
- **Alternance architecturale des sections** :
  - Hero et en-tête : superposition forest
  - Intro et cartes de services verbatim : fond sable `--sand` avec cartes claires/contrastées
  - Catégories de chambres et propriétés : sections forest `--forest` et cartes contrastées
  - Galerie d'événements et lightbox : ambiance forest `--forest` avec effet liquid glass dépoli
  - Témoignages : fond sable `--sand` avec cartes de verre dépoli clair
  - Pied de page : vert forêt nocturne `--forest-deep`
- **Suppression intégrale de tous les anciens codes hexadécimaux** (`#C59A68`, `#C79A55`, `#171008`, `#000`, `#0B0B0B`, `#070707`, `#141414`, etc.).

### 2. Nouveau Hero Inspiré du Modèle de Référence
- **Format 100vh plein écran (edge-to-edge)** sans cadre extérieur ni bordure fixe.
- **En-tête suspendu sur le hero** :
  - Logo et emblème sur la gauche
  - Navigation principale centrée sous forme de **pillule translucide (pill nav)** avec `backdrop-filter: blur(16px)` et bordure légère
  - Sélecteur de langue `FR | EN | ES` et bouton d'action pillule `Demander un devis` en clay sur la droite
  - Défilement fluide : la barre devient un bandeau fixe forest satiné lors du scroll
- **Composition en bas à gauche (bottom-left content)** :
  - Titre principal monumental serif Cormorant Garamond (`clamp(2.8rem, 6vw, 6.5rem)`)
  - Sous-titre *"Maisons jusqu'à 60 chambres"*
  - Groupe CTA exclusif : bouton pillule `Demander un devis` accompagné d'un bouton flèche circulaire directionnel.
- **Dégradé vert forêt progressif** (`rgba(38, 61, 50, 0.15)` en haut jusqu'à `0.92` en bas) pour préserver la lisibilité WCAG AA sur toute photographie.
- **Heros intérieurs adaptatifs** : hauteur calibrée à 60vh sur toutes les pages intérieures (`/about-us/`, `/nos-services/`, `/events/`, `/contact/`, catégories et fiches villas).

### 3. Pipeline d'Images 4K Responsive
- Mise à niveau du script `download-and-process-images.mjs` pour traiter la photo hero avec 6 découpes WebP progressives : `480w`, `800w`, `1200w`, `1920w`, `2560w`, `3840w` avec `sizes="100vw"`.
- Version `1920w` préchargée par défaut via `<link rel="preload" as="image" imagesrcset="..." imagesizes="100vw" fetchpriority="high">` pour optimiser le LCP.
- Génération d'une image d'attente vectorielle 4K (3840x2160) représentant la silhouette de Marrakech, de la Koutoubia et du Haut Atlas en vert forêt et argile.
- Création du document `CREDITS.md` pour inventorier les sources libres et les directives de remplacement photo par le client.

---

## [Version 2.0.0] - Refonte Majeure & Direction Visuelle Luxury Dark

### 1. Nettoyage de l'Environnement & Architecture
- Suppression définitive des résidus Next.js (`app/`, `components/`, `standalone.html`).
- Configuration Netlify stricte (`NETLIFY_NEXT_PLUGIN_SKIP = "true"`, `command = "npm run build"`, `publish = "dist"`).
- Gitignore renforcé avec `assets/originals/`.

### 2. Typographie 100% Auto-Hébergée
- *Cormorant Garamond* et *Jost* intégrées localement en WOFF2 latin et latin-ext (`font-display: swap`).

### 3. Système Multi-Langues Statique (FR, EN, ES)
- 48 pages HTML générées au build sous `/`, `/en/` et `/es/` avec balises `hreflang` et x-default.
- Correction stricte et verbatim des 3 fautes identifiées en français.
