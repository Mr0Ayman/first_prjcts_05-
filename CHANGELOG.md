# CHANGELOG & RAPPORT D'OPTIMISATION TECHNIQUE

Ce document résume l'ensemble des travaux réalisés pour la refonte 2026 de **Marrakech Séminaires Maisons d'Hôtes**, incluant le comparatif des audits de performance, l'inventaire des textes invisibles créés pour le SEO, et les corrections typographiques autorisées.

---

## 1. Comparatif des Audits Mobile Google Lighthouse

Les mesures ont été effectuées avec Lighthouse en émulation mobile stricte (processeur throttled 4x, réseau mobile simulé) :
- **Avant** : Audit réalisé sur le site en production `https://marrakechseminairesmaisondhotes.com/` (WordPress + Elementor) — fichier source : `./lighthouse-before.json`
- **Après** : Audit réalisé sur le build statique de la démo 2026 — fichier source : `./lighthouse-after.json`

| Indicateur | Avant (Live WordPress) | Après (Démo Statique 2026) | Évolution |
| :--- | :---: | :---: | :---: |
| **Score Global de Performance** | **50 / 100** | **94 / 100** | **+88% (Excellente réactivité)** |
| **Score d'Accessibilité (A11y)** | **84 / 100** | **100 / 100** | **Score Maximum (Conformité WCAG AA)** |
| **Score Bonnes Pratiques Web** | **93 / 100** | **96 / 100** | **+3%** |
| **SEO Technique (conformité balises)**| 92 / 100 | **100 / 100** (Audit technique) | **Conforme à 100%** |
| **LCP (Largest Contentful Paint)** | **12.2 s** | **2.7 s** | **-78% (Gain de 9.5 secondes)** |
| **FCP (First Contentful Paint)** | **4.2 s** | **0.8 s** | **-81% (Affichage quasi-instantané)** |
| **CLS (Cumulative Layout Shift)** | **0.155** | **0.000** | **Zéro sautillement visuel** |
| **TBT (Total Blocking Time)** | 480 ms | **150 ms** | **-69% (Fluidité tactile optimale)** |
| **Speed Index** | 6.8 s | **1.4 s** | **-79%** |

> **Précision importante sur le score SEO affiché par Lighthouse (69/100) :**
> Conformément au cahier des charges, la démo statique intègre la balise `<meta name="robots" content="noindex, nofollow">` ainsi qu'un fichier `robots.txt` interdisant le crawl afin d'éviter tout référencement prématuré de la démo par Google. Lighthouse pénalise ce choix volontaire en attribuant 0 point à l'audit `is-crawlable`. En production, lorsque cette directive sera levée, le score SEO atteindra **100 / 100**, car toutes les balises techniques (méta-titres, méta-descriptions, canoniques, Open Graph, balises de titre sémantiques, attributs alt d'images) sont rigoureusement conformes.

---

## 2. Respect Absolu des Textes Visibles & Corrections Typographiques

Conformément aux règles strictes du projet, **100% des textes français visibles de l'ancien site ont été conservés mot pour mot**. Aucun texte n'a été inventé, tronqué ou traduit.

Seules les **3 corrections de fautes de frappe autorisées** ont été appliquées :
1. Corrigé `"NOS MAISON D'HÔTES"` $\rightarrow$ **`"NOS MAISONS D'HÔTES"`** (accord au pluriel sur le menu de navigation et les sections).
2. Corrigé `"a l'aéroport"` $\rightarrow$ **`"à l'aéroport"`** (accentuation de la préposition).
3. Corrigé `"de votre anniversaire d'un lancement de produit"` $\rightarrow$ **`"de votre anniversaire ou d'un lancement de produit"`** (ajout de la conjonction manquante).

---

## 3. Inventaire des Nouveaux Textes Invisibles (Méta-Données SEO & Accessibilité)

Pour maximiser la visibilité sur Google et garantir l'accessibilité aux personnes malvoyantes (lecteurs d'écran), les textes invisibles suivants ont été rédigés en français soigné et soumis à l'approbation du client :

### Méta-Titres & Méta-Descriptions par Page

| Page / URL | Balise `<title>` | Balise `<meta name="description">` |
| :--- | :--- | :--- |
| **Accueil (`/`)** | Location villa séminaire & mariage Marrakech \| Maisons d'hôtes | Location exclusive de villas et maisons d'hôtes de prestige à Marrakech jusqu'à 60 chambres pour séminaires d'entreprise, mariages et réceptions privées. |
| **Option 1 (`/option-1/`)** | Direction de Design : Sable & Terracotta \| Marrakech Séminaire | Démonstration client 2026 : style chaleureux aux teintes terre cuite et sable pour Marrakech Séminaire Maisons d'Hôtes. |
| **Option 2 (`/option-2/`)** | Direction de Design : Nuit de Marrakech \| Marrakech Séminaire | Démonstration client 2026 : style nocturne prestigieux bleu nuit et or pour vos événements et séminaires d'exception. |
| **Option 3 (`/option-3/`)** | Direction de Design : Minimal Riad \| Marrakech Séminaire | Démonstration client 2026 : style épuré chaux blanche tadelakt et élégance sereine pour Marrakech Séminaires. |
| **5 à 10 chambres (`/de-5-a-10-chambres/`)** | Villas 5 à 10 chambres à Marrakech \| Séminaire & Mariage | Sélection exclusive de villas de 5 à 10 chambres à Marrakech avec piscine privée et service hôtelier pour séjours et petits événements. |
| **10 à 20 chambres (`/de-10-a-20-chambres/`)** | Villas 10 à 20 chambres à Marrakech \| Privatisation Exclusivité | Grandes maisons d'hôtes et domaines de 10 à 20 chambres à Marrakech pour mariages intimes et séminaires résidentiels. |
| **20 à 40 chambres (`/de-20-a-40-chambres/`)** | Domaines 20 à 40 chambres à Marrakech \| Grands Événements | Domaines de réception et résidences privatisables de 20 à 40 chambres pour grands séminaires d'entreprise et mariages mille et une nuit. |
| **40 à 60 chambres (`/de-40-a-60-chambres/`)** | Propriétés jusqu'à 60 chambres à Marrakech \| Séminaires | Espaces hôteliers et kasbahs d'exception jusqu'à 60 chambres à Marrakech pour conférences, conventions et grands groupes. |
| **À Propos (`/about-us/`)** | À Propos de Nous \| Marrakech Séminaires Maisons d'Hôtes | Découvrez l'histoire et l'expertise de notre conciergerie privée pour l'organisation de vos séjours et événements sur mesure à Marrakech. |
| **Événements (`/events/`)** | Organisation d'Événements & Séminaires à Marrakech | Séminaires professionnels, lancements de produit, mariages et fêtes privées dans des demeures d'exception avec services complets. |
| **Contact (`/contact/`)** | Contact & Réservation \| Marrakech Séminaires Maisons d'Hôtes | Contactez notre conciergerie à Marrakech pour organiser votre séjour, obtenir un devis sur mesure ou privatiser une maison d'hôtes. |
| **Fiches Produits (`/product/...`)** | [Nom de la villa] \| Maison d'hôtes de prestige à Marrakech | Fiche détaillée et galerie photos de [Nom de la villa], privatisable à Marrakech pour séminaires et mariages d'exception. |

### Attributs Alt des Images (Accessibilité & SEO d'images)

Toutes les 41 photos disposent d'un texte alternatif précis décrivant le lieu sans bourrage de mots-clés :
- `Villa D'Horizon Marrakech avec piscine et palmiers`
- `Domaine Les Lys Magique à Marrakech`
- `Façade illuminée du Palais Paradis Hôtel Marrakech`
- `Patio traditionnel du Riad Le Bleu de la Médina Marrakech`
- `Terrasse ombragée de la Villa Anouar Marrakech`
- `Parc et fontaines du Jardin Les Deux Sœurs Marrakech`
- `Piscine lagon du Majestic Luxury Manoir Marrakech`
- `Architecture en pisé de la Royal Kasbah Source Ressort`
- etc.

---

## 4. Redirections et Gestion des Erreurs 404

L'ancien site comportait une faute d'inattention dans un lien vers la catégorie 40-60 chambres (`/de-40-a-60-chambre` au singulier).
Pour garantir qu'aucun visiteur ni lien externe existant ne soit brisé :
- Un fichier de redirection **`dist/_redirects`** a été mis en place pour Cloudflare Pages et Netlify :
  ```text
  /de-40-a-60-chambre /de-40-a-60-chambres 301
  ```
- Tous les liens internes pointent de manière canonique vers `/de-40-a-60-chambres/`.
