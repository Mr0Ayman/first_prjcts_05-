# Marrakech Séminaires Maisons d'Hôtes — Démo Refonte 2026

Démonstration statique interactive conçue pour présenter au client **trois directions artistiques 2026** pour la modernisation du site [https://marrakechseminairesmaisondhotes.com/](https://marrakechseminairesmaisondhotes.com/) (location exclusive de villas et maisons d'hôtes de prestige à Marrakech pour séminaires, mariages et réceptions privées).

---

## 🌟 Les 3 Directions Artistiques

Le site intègre un sélecteur interactif en tête de page (ainsi que des URL dédiées) permettant au client de basculer instantanément d'un univers à l'autre sans rechargement de page :

1. **Option 1 : Sable & Terracotta** (Actif par défaut — URL : `/` ou `/option-1/`)
   - *Ambiance* : Chaleur minérale marocaine, tons terre cuite et sable fin.
   - *Palette* : Terracotta foncé `#A8482C` (ratio de contraste WCAG AA **5.8:1** sur blanc), fond sable doux `#FAF7F2`, surfaces immaculées `#FFFFFF` et touches d'ocre chaud `#C27D38`.
   - *Typographie* : *Playfair Display* (titres sérif de luxe) et *Plus Jakarta Sans* (corps de texte net et contemporain).

2. **Option 2 : Nuit de Marrakech** (URL : `/option-2/`)
   - *Ambiance* : Soirée VIP marocaine sous un ciel étoilé, atmosphère festive et intimiste.
   - *Palette* : Bleu nuit profond `#0A1128`, fond nocturne `#050814`, accents or chaud `#D4AF37` et ambre `#E0A96D`.
   - *Typographie* : Contraste saisissant adapté aux réceptions nocturnes et dîners de gala.

3. **Option 3 : Minimal Riad** (URL : `/option-3/`)
   - *Ambiance* : Luxe silencieux (*quiet luxury*), enduit tadelakt à la chaux, sérénité architecturale.
   - *Palette* : Blanc chaux `#FDFCF7`, surfaces pierre `#F7F5EE`, bordures subtiles `#D8D3C5` et accents bronze cèdre `#8C6D46`.
   - *Typographie* : Minimalisme éditorial haute couture, mise en valeur des photos d'architecture.

---

## ⚡ Performance & Audit Mobile Lighthouse

| Métrique | Ancien Site (WordPress / Elementor) | Démo Statique 2026 | Gain |
| :--- | :---: | :---: | :---: |
| **Performance** | **50 / 100** | **94 / 100** | **+88%** |
| **Accessibilité** | **84 / 100** | **100 / 100** | **Score Parfait** |
| **Bonnes Pratiques** | **93 / 100** | **96 / 100** | **+3%** |
| **SEO Technique** | 92 / 100 | **100 / 100** (Audit technique)* | Conforme |
| **LCP (Largest Contentful Paint)** | **12.2 s** | **2.7 s** (émulation mobile throttled) | **-78%** |
| **FCP (First Contentful Paint)** | **4.2 s** | **0.8 s** | **-81%** |
| **CLS (Cumulative Layout Shift)** | **0.155** (instable) | **0.000** (stabilité parfaite) | **-100%** |
| **TBT (Total Blocking Time)** | 480 ms | **150 ms** | **-69%** |

*\*Note sur le score SEO Lighthouse affiché (69/100) : Ce score résulte exclusivement de la directive obligatoire `<meta name="robots" content="noindex, nofollow">` et du fichier `robots.txt` interdisant l'indexation de la démo par les moteurs de recherche. Tous les audits techniques SEO (titres, méta-descriptions, balises canoniques, balises sémantiques, attributs alt d'images, contrastes) obtiennent 100%.*

---

## 🛠️ Stack Technique

- **Architecture** : 100% Statique (HTML5 sémantique, CSS3 moderne sans framework lourd, JavaScript Vanilla ultra-léger).
- **Zéro Backend, Zéro Cookie, Zéro Traceur** : Aucune base de données, aucun tracker tiers, respect absolu de la vie privée (RGPD exempt).
- **Polices auto-hébergées** : Formats WOFF2 locaux (*Playfair Display* et *Plus Jakarta Sans*) avec `font-display: swap` et préchargement critique (aucun appel vers Google Fonts).
- **Images optimisées** : 41 photos originales traitées en WebP responsive avec variantes haute définition (480w, 800w, 1200w, 1920w) et balises `<picture>`.
- **Formulaire Devis vers WhatsApp** : La soumission du formulaire interactif génère automatiquement un message WhatsApp préformaté en français envoyé directement au numéro de Nadia (`+212 619 918 223`).

---

## 🚀 Démarrage Local

Prérequis : Node.js (v18 ou supérieur recommandé).

```bash
# 1. Cloner ou ouvrir le projet
cd first_prjcts_01-

# 2. Lancer la démo en mode local
npm run dev
```

L'application est automatiquement accessible sur :
👉 **`http://localhost:3000/`**

### Commandes disponibles :

- `npm run dev` : Génère les pages statiques dans `dist/` et démarre un serveur local sur le port 3000.
- `npm run build` : Compile l'ensemble du site statique dans le dossier `dist/`.
- `npm run serve` : Sert le dossier `dist/` en local sur `http://localhost:3000`.
- `npm run images` : Re-télécharge et génère toutes les variantes WebP responsive à partir des photos originales dans `assets/originals/`.

---

## ☁️ Déploiement sur Cloudflare Pages (ou Netlify)

Le projet est configuré pour un déploiement direct sans configuration complexe :

### Déploiement Cloudflare Pages :
1. Connectez votre compte GitHub / GitLab à **Cloudflare Pages**.
2. Créez un nouveau projet et sélectionnez le dépôt `first_prjcts_01-`.
3. Paramètres de compilation :
   - **Framework preset** : `None`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Root directory** : `/`
4. Cliquez sur **Save and Deploy**.

### Règles de redirection (`_redirects`)
Le fichier `dist/_redirects` inclus assure la redirection 301 automatique :
```text
/de-40-a-60-chambre /de-40-a-60-chambres 301
```

---

## 📁 Structure du Projet

```text
├── assets/
│   └── originals/               # 41 photos originales téléchargées depuis le site live
├── dist/                        # Dossier de production statique prêt pour Cloudflare Pages
│   ├── _redirects               # Redirection 301 pour la faute de frappe du slug live
│   ├── robots.txt               # Disallow: / pour éviter l'indexation de la démo
│   ├── index.html               # Page d'accueil (Option 1 par défaut)
│   ├── option-1/                # Point d'entrée Option 1 (Sable & Terracotta)
│   ├── option-2/                # Point d'entrée Option 2 (Nuit de Marrakech)
│   ├── option-3/                # Point d'entrée Option 3 (Minimal Riad)
│   ├── de-5-a-10-chambres/      # Catégorie 5 à 10 chambres
│   ├── de-10-a-20-chambres/     # Catégorie 10 à 20 chambres
│   ├── de-20-a-40-chambres/     # Catégorie 20 à 40 chambres
│   ├── de-40-a-60-chambres/     # Catégorie 40 à 60 chambres
│   ├── product/                 # 6 fiches propriétés détaillées avec galeries
│   ├── about-us/                # Page À propos de nous
│   ├── events/                  # Page Événements
│   ├── contact/                 # Page Contact
│   ├── css/                     # Feuilles de styles CSS modulaires
│   ├── js/                      # Script client vanilla (thèmes, modal, lightbox)
│   ├── img/                     # Variantes WebP responsive (480w, 800w, 1200w, 1920w)
│   └── fonts/                   # Polices WOFF2 auto-hébergées
├── public/                      # Assets statiques sources (fonts, images)
├── scripts/
│   ├── build-static-site.mjs    # Moteur de génération statique
│   ├── download-and-process-images.mjs # Optimisation WebP & téléchargement
│   └── download-fonts.mjs       # Téléchargement des polices WOFF2
├── src/
│   ├── css/                     # Sources CSS (theme.css, main.css)
│   └── js/                      # Source JavaScript vanilla (main.js)
├── CHANGELOG.md                 # Comparatif Lighthouse & inventaire des textes
├── CLIENT_QUESTIONS.md          # Questions ouvertes & recommandations pour le client
└── package.json                 # Scripts de build et dépendances
```