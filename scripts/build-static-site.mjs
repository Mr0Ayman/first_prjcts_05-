import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
fs.mkdirSync(distDir, { recursive: true });

// Copy a directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Ensure public assets exist in dist
if (fs.existsSync('public')) {
  copyDirSync('public', distDir);
}
fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });
if (fs.existsSync('src/css')) copyDirSync('src/css', path.join(distDir, 'css'));
if (fs.existsSync('src/js')) copyDirSync('src/js', path.join(distDir, 'js'));

// Read CSS to inline critical styles
const fontsCss = fs.existsSync('public/fonts/fonts.css') ? fs.readFileSync('public/fonts/fonts.css', 'utf8') : '';
const themeCss = fs.existsSync('src/css/theme.css') ? fs.readFileSync('src/css/theme.css', 'utf8') : '';
const mainCss = fs.existsSync('src/css/main.css') ? fs.readFileSync('src/css/main.css', 'utf8') : '';

// Write combined minified stylesheet
const combinedCss = `${fontsCss}\n${themeCss}\n${mainCss}`;
fs.writeFileSync(path.join(distDir, 'css', 'styles.min.css'), combinedCss);

// Base HTML Page Generator
function renderPage({
  title,
  description,
  canonicalUrl,
  ogImage = '/img/villa-dhorizon-piscine.webp',
  defaultTheme = 'option-1',
  activeNav = 'home',
  content,
  heroPreload = ''
}) {
  return `<!DOCTYPE html>
<html lang="fr" data-theme="${defaultTheme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Preload Critical Assets -->
  ${heroPreload}
  <link rel="preload" href="/fonts/playfair-display-600-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/plus-jakarta-sans-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/plus-jakarta-sans-600-normal.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Inline Critical CSS for instantaneous paint -->
  <style>
    ${themeCss}
    ${mainCss}
  </style>

  <!-- Self-hosted Fonts -->
  <link rel="stylesheet" href="/fonts/fonts.css">

  <!-- JSON-LD Schema (LodgingBusiness & LocalBusiness) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "name": "Marrakech Séminaire Maisons d'Hôtes",
    "description": "Location exclusive de villas et maisons d'hôtes de prestige à Marrakech pour séminaires, mariages et événements privés.",
    "url": "https://marrakechseminairesmaisondhotes.com/",
    "telephone": ["+212619918223", "+212669719938"],
    "email": "contact.luxurymanoir@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Route de l'Ourika, Canal de Zaraba",
      "addressLocality": "Marrakech",
      "postalCode": "40000",
      "addressCountry": "MA"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100094674983961",
      "https://www.instagram.com/marrakechseminairesevents"
    ]
  }
  </script>
</head>
<body>
  <!-- Accessibility Skip Link -->
  <a href="#main-content" class="skip-link">Passer au contenu principal</a>

  <!-- Demo Switcher Bar (Easily removable for production) -->
  <aside class="demo-switcher-bar" aria-label="Sélecteur de design pour démonstration client">
    <div class="demo-label">
      <span class="demo-badge">DÉMO CLIENT 2026</span>
      <span>Direction de style :</span>
    </div>
    <div class="demo-options" role="group" aria-label="Choisir un style">
      <button type="button" class="demo-btn ${defaultTheme === 'option-1' ? 'active' : ''}" data-theme-target="option-1" aria-pressed="${defaultTheme === 'option-1'}">
        Option 1 : Sable &amp; Terracotta
      </button>
      <button type="button" class="demo-btn ${defaultTheme === 'option-2' ? 'active' : ''}" data-theme-target="option-2" aria-pressed="${defaultTheme === 'option-2'}">
        Option 2 : Nuit de Marrakech
      </button>
      <button type="button" class="demo-btn ${defaultTheme === 'option-3' ? 'active' : ''}" data-theme-target="option-3" aria-pressed="${defaultTheme === 'option-3'}">
        Option 3 : Minimal Riad
      </button>
    </div>
  </aside>

  <!-- Top Announcement Banner -->
  <header class="top-banner" role="banner">
    DES VILLAS À PARTIR DE 1000 € pour 10 personnes
  </header>

  <!-- Sticky Main Header -->
  <header class="site-header">
    <div class="header-container">
      <a href="/" class="brand-link" aria-label="Marrakech Séminaire Maisons d'Hôtes - Retour à l'accueil">
        <img src="/img/logo-marrakech-seminaire.png" alt="Marrakech Séminaire Maisons d'Hôtes" width="110" height="76" class="brand-logo" fetchpriority="high">
      </a>

      <!-- Desktop Navigation -->
      <nav class="main-nav" aria-label="Navigation principale">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="/" class="nav-link ${activeNav === 'home' ? 'active' : ''}">ACCUEIL</a>
          </li>
          <li class="nav-item nav-item-dropdown">
            <a href="/de-5-a-10-chambres/" class="nav-link dropdown-trigger ${activeNav === 'categories' ? 'active' : ''}" aria-haspopup="true">
              NOS MAISONS D'HÔTES
              <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="/de-5-a-10-chambres/" class="dropdown-link" role="menuitem">De 5 à 10 chambres</a></li>
              <li><a href="/de-10-a-20-chambres/" class="dropdown-link" role="menuitem">De 10 à 20 chambres</a></li>
              <li><a href="/de-20-a-40-chambres/" class="dropdown-link" role="menuitem">De 20 à 40 chambres</a></li>
              <li><a href="/de-40-a-60-chambres/" class="dropdown-link" role="menuitem">De 40 à 60 chambres</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="/about-us/" class="nav-link ${activeNav === 'about' ? 'active' : ''}">À PROPOS DE NOUS</a>
          </li>
          <li class="nav-item">
            <a href="/events/" class="nav-link ${activeNav === 'events' ? 'active' : ''}">ÉVÉNEMENTS</a>
          </li>
          <li class="nav-item">
            <a href="/contact/" class="nav-link ${activeNav === 'contact' ? 'active' : ''}">CONTACT</a>
          </li>
        </ul>
      </nav>

      <!-- Action buttons -->
      <div class="header-actions">
        <a href="tel:+212619918223" class="header-phone-link" aria-label="Appeler notre conciergerie au +212 619 918 223">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Appeler</span>
        </a>
        <button type="button" class="btn-cta js-open-quote">Demander un devis</button>
        <button type="button" class="menu-toggle" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="mobile-drawer">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <aside id="mobile-drawer" class="mobile-drawer" aria-label="Menu mobile" aria-hidden="true" inert>
    <div class="mobile-drawer-content">
      <div class="mobile-drawer-header">
        <img src="/img/logo-marrakech-seminaire.png" alt="Marrakech Séminaire Maisons d'Hôtes" width="90" height="62">
        <button type="button" class="btn-close btn-close-drawer" aria-label="Fermer le menu mobile">✕</button>
      </div>
      <nav class="mobile-nav" aria-label="Navigation mobile">
        <ul class="mobile-nav-list">
          <li><a href="/" class="mobile-nav-link">ACCUEIL</a></li>
          <li>
            <span class="mobile-nav-link" style="color: var(--accent);">NOS MAISONS D'HÔTES</span>
            <ul class="mobile-sub-list">
              <li><a href="/de-5-a-10-chambres/" class="mobile-sub-link">De 5 à 10 chambres</a></li>
              <li><a href="/de-10-a-20-chambres/" class="mobile-sub-link">De 10 à 20 chambres</a></li>
              <li><a href="/de-20-a-40-chambres/" class="mobile-sub-link">De 20 à 40 chambres</a></li>
              <li><a href="/de-40-a-60-chambres/" class="mobile-sub-link">De 40 à 60 chambres</a></li>
            </ul>
          </li>
          <li><a href="/about-us/" class="mobile-nav-link">À PROPOS DE NOUS</a></li>
          <li><a href="/events/" class="mobile-nav-link">ÉVÉNEMENTS</a></li>
          <li><a href="/contact/" class="mobile-nav-link">CONTACT</a></li>
        </ul>
      </nav>
      <div style="padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.75rem;">
        <a href="tel:+212619918223" class="btn-cta" style="background: var(--bg-surface-soft); color: var(--text-main); border: 1px solid var(--border-strong);">
          Appeler le +212 619 918 223
        </a>
        <button type="button" class="btn-cta js-open-quote" style="width: 100%;">
          Demander un devis
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main id="main-content">
    ${content}
  </main>

  <!-- Floating WhatsApp Action -->
  <a href="https://wa.me/212619918223?text=Bonjour,%20je%20souhaite%20des%20renseignements%20sur%20la%20location%20de%20vos%20maisons%20d'h%C3%B4tes%20%C3%A0%20Marrakech." 
     class="whatsapp-float" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="Contacter la conciergerie sur WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.031 2c-5.508 0-9.988 4.477-9.988 9.985 0 1.761.459 3.479 1.331 4.992l-1.414 5.166 5.291-1.387c1.458.795 3.102 1.214 4.78 1.214 5.507 0 9.987-4.477 9.987-9.985 0-5.508-4.48-9.985-9.987-9.985zm0 18.283c-1.498 0-2.964-.403-4.244-1.164l-.305-.181-3.149.826.84-3.07-.199-.316c-.839-1.336-1.282-2.884-1.282-4.478 0-4.568 3.717-8.285 8.339-8.285 4.569 0 8.286 3.717 8.286 8.285 0 4.568-3.717 8.283-8.286 8.283zm4.551-6.208c-.249-.125-1.477-.728-1.706-.811-.229-.083-.396-.125-.562.125-.166.249-.645.811-.791.977-.145.166-.291.187-.541.062s-1.054-.388-2.008-1.238c-.742-.661-1.243-1.478-1.388-1.727-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.416.083-.166.042-.312-.021-.437s-.562-1.352-.77-1.852c-.203-.487-.409-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312s-.874.853-.874 2.081.895 2.413 1.02 2.579c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.143.163 1.573.099.479-.072 1.477-.603 1.685-1.186.208-.583.208-1.082.146-1.186-.063-.105-.229-.167-.478-.292z"/>
    </svg>
  </a>

  <!-- Frontend-Only Quote Modal Dialog -->
  <dialog id="quote-modal" class="quote-modal" aria-labelledby="modal-title">
    <div class="quote-modal-header">
      <h2 id="modal-title" class="quote-modal-title">Demander un devis</h2>
      <button type="button" class="btn-close js-close-quote" aria-label="Fermer la boîte de dialogue">✕</button>
    </div>
    <div class="quote-modal-body">
      <form id="quote-form" class="quote-form" novalidate>
        <div class="form-group">
          <label for="form-name" class="form-label">Nom et Prénom *</label>
          <input type="text" id="form-name" name="fullname" class="form-input" required placeholder="Votre nom complet" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="form-email" class="form-label">E-mail *</label>
          <input type="email" id="form-email" name="email" class="form-input" required placeholder="votre.email@exemple.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label for="form-phone" class="form-label">Téléphone / WhatsApp *</label>
          <input type="tel" id="form-phone" name="phone" class="form-input" required placeholder="+212 6... ou +33 6..." autocomplete="tel">
        </div>
        <div class="form-group">
          <label for="form-event" class="form-label">Type d'événement</label>
          <select id="form-event" name="event_type" class="form-select">
            <option value="Séminaire d'entreprise">Séminaire d'entreprise</option>
            <option value="Mariage">Mariage</option>
            <option value="Fête de famille">Fête de famille</option>
            <option value="Anniversaire">Anniversaire</option>
            <option value="Lancement de produit">Lancement de produit</option>
            <option value="Stage de yoga">Stage de yoga</option>
            <option value="Autre événement">Autre événement</option>
          </select>
        </div>
        <div class="form-group">
          <label for="form-capacity" class="form-label">Capacité souhaitée</label>
          <select id="form-capacity" name="capacity" class="form-select">
            <option value="5 à 10 chambres (jusqu'à 20 couchages)">De 5 à 10 chambres</option>
            <option value="10 à 20 chambres">De 10 à 20 chambres</option>
            <option value="20 à 40 chambres">De 20 à 40 chambres</option>
            <option value="40 à 60 chambres">De 40 à 60 chambres</option>
          </select>
        </div>
        <div class="form-group">
          <label for="form-dates" class="form-label">Dates envisagées</label>
          <input type="text" id="form-dates" name="dates" class="form-input" placeholder="Ex: Octobre 2026 (3 nuits)">
        </div>
        <div class="form-group">
          <label for="form-notes" class="form-label">Précisions ou demandes particulières</label>
          <textarea id="form-notes" name="notes" class="form-textarea" placeholder="Vos souhaits (restauration, transfert, animations...)"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-cta" style="flex: 1;">Envoyer</button>
          <button type="button" class="btn-secondary js-close-quote" style="background: var(--bg-surface-soft); color: var(--text-main); border: 1px solid var(--border-strong);">Fermer</button>
        </div>
      </form>
    </div>
  </dialog>

  <!-- Photo Lightbox Modal -->
  <div id="lightbox-modal" class="lightbox-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Visualiseur de photos en plein écran">
    <div class="lightbox-content">
      <button type="button" id="lightbox-close" class="lightbox-close" aria-label="Fermer le visualiseur">✕</button>
      <button type="button" id="lightbox-prev" class="lightbox-nav lightbox-prev" aria-label="Photo précédente">‹</button>
      <img id="lightbox-img" src="" alt="" class="lightbox-img">
      <button type="button" id="lightbox-next" class="lightbox-nav lightbox-next" aria-label="Photo suivante">›</button>
    </div>
  </div>

  <!-- Clean Luxury Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Contact -->
        <div class="footer-col">
          <img src="/img/logo-conciergerie.png" alt="Marrakech Séminaire Conciergerie" width="130" height="59" style="margin-bottom: 1.25rem;">
          <ul class="footer-contact-list">
            <li class="footer-item">
              <strong>Route de l'Ourika, Canal de Zaraba, 40 000 Marrakech</strong>
            </li>
            <li class="footer-item">
              <a href="tel:+212619918223" class="footer-link">+(212) 619 918 223</a>
            </li>
            <li class="footer-item">
              <a href="tel:+212669719938" class="footer-link">+(212) 669 719 938</a>
            </li>
            <li class="footer-item">
              <a href="mailto:contact.luxurymanoir@gmail.com" class="footer-link">contact.luxurymanoir@gmail.com</a>
            </li>
            <li class="footer-item">
              <a href="mailto:nadiastrass@gmail.com" class="footer-link">nadiastrass@gmail.com</a>
            </li>
          </ul>
          <div class="footer-social-wrap">
            <a href="https://www.facebook.com/profile.php?id=100094674983961" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="Consulter notre page Facebook officielle">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/marrakechseminairesevents" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="Suivre nos événements sur Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Liens Utiles -->
        <div class="footer-col">
          <h2 class="footer-col-title">LIENS UTILES</h2>
          <ul class="footer-menu-list">
            <li><a href="/" class="footer-link">ACCUEIL</a></li>
            <li><a href="/events/" class="footer-link">ÉVÉNEMENTS</a></li>
            <li><a href="/about-us/" class="footer-link">À PROPOS DE NOUS</a></li>
            <li><a href="/contact/" class="footer-link">CONTACT</a></li>
          </ul>
        </div>

        <!-- Col 3: Nos Établissements -->
        <div class="footer-col">
          <h2 class="footer-col-title">Nos Établissements</h2>
          <ul class="footer-menu-list">
            <li><a href="/product/les-lys-magiques/" class="footer-link">LES LYS MAGIQUE</a></li>
            <li><a href="/product/villa-anouar-marrakech/" class="footer-link">Villa Anouar Marrakech</a></li>
            <li><a href="/product/palais-paradis-hotel/" class="footer-link">PALAIS PARADIS HÔTEL</a></li>
            <li><a href="/product/villa-dhorizon-marrakech/" class="footer-link">Villa D’Horizon Marrakech</a></li>
            <li><a href="/product/riad-le-bleu-de-la-medina/" class="footer-link">RIAD LE BLEU DE LA MEDINA</a></li>
            <li><a href="/product/jardin-les-deux-soeurs-marrakech/" class="footer-link">Jardin Les Deux Sœurs Marrakech</a></li>
          </ul>
        </div>

        <!-- Col 4: Catégories de Chambres -->
        <div class="footer-col">
          <h2 class="footer-col-title">Capacités</h2>
          <ul class="footer-menu-list">
            <li><a href="/de-5-a-10-chambres/" class="footer-link">De 5 à 10 chambres</a></li>
            <li><a href="/de-10-a-20-chambres/" class="footer-link">De 10 à 20 chambres</a></li>
            <li><a href="/de-20-a-40-chambres/" class="footer-link">De 20 à 40 chambres</a></li>
            <li><a href="/de-40-a-60-chambres/" class="footer-link">De 40 à 60 chambres</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© Copyright © 2026 Marrakech Seminaires Maison d'Hotes. All Rights Reserved.</p>
      </div>
    </div>
  </footer>

  <!-- Client Script -->
  <script defer src="/js/main.js"></script>
</body>
</html>`;
}

// -------------------------------------------------------------
// 1. HOMEPAGE CONTENT
// -------------------------------------------------------------
function buildHomeContent() {
  return `
  <!-- Hero Section -->
  <section class="hero-section" aria-label="Accueil de luxe à Marrakech">
    <picture>
      <source srcset="/img/villa-dhorizon-piscine-1200w.webp 1200w, /img/villa-dhorizon-piscine.webp 1200w" type="image/webp">
      <img src="/img/villa-dhorizon-piscine.webp" alt="Villa D'Horizon Marrakech avec piscine et palmiers" class="hero-image" width="1920" height="1080" fetchpriority="high">
    </picture>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="hero-banner-tag">DES VILLAS À PARTIR DE 1000 € pour 10 personnes</span>
      <h1 class="hero-title">MARRAKECH SÉMINAIRE MAISON D'HÔTES</h1>
      <p class="hero-subtitle">Maisons jusqu'à 60 chambres</p>
      <div class="hero-actions">
        <button type="button" class="btn-cta js-open-quote">Demander un devis</button>
        <a href="#de-5-a-10-chambres" class="btn-secondary">Découvrir nos villas</a>
      </div>
    </div>
  </section>

  <!-- Editorial Intro & Services Section (100% Verbatim French Text) -->
  <section class="intro-section" aria-label="Présentation de nos propriétés">
    <div class="intro-editorial-block">
      <p class="intro-text-lead">
        Marrakech Séminaire Maison D'Hôtes a le plaisir de vous présenter ses différentes propriétés. Nos nombreuses et différentes villas vous permettront de trouver celle adaptée à votre séjour en exclusivité.
      </p>
      <p class="intro-text-body">
        Que vous cherchiez une villa pour votre mariage où il vous faut 60 couchages ou pour une fête de famille d'une quinzaine d'invités, nous avons la villa adaptée à chacun de ces événements. De plus, si vous le désirez, nos équipes sur place supervisées par votre organisatrice d'événements, Nadia, sera là pour vous accompagner dans l'organisation de vos séminaires, de votre mariage mille et une nuit, de votre anniversaire ou d'un lancement de produit ou d'un stage de yoga. Nous sommes capables de gérer pour vous :
      </p>
    </div>

    <!-- Services Icon Grid: Verbatim fragments, icons only, strictly NO added titles/labels -->
    <div class="services-grid" role="region" aria-label="Prestations incluses et conciergerie">
      <article class="service-card">
        <div class="service-icon-wrap" aria-hidden="true">
          <!-- Car / Airport Shuttle SVG -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10l4 4v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0M7 9h6m-6 3h4"/></svg>
        </div>
        <p class="service-verbatim-text">de la prise en charge à l'aéroport avec nos prestataires de transport</p>
      </article>

      <article class="service-card">
        <div class="service-icon-wrap" aria-hidden="true">
          <!-- Food / Tasting Platter SVG -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
        </div>
        <p class="service-verbatim-text">des dégustations orientales préparées par nos équipes cuisines</p>
      </article>

      <article class="service-card">
        <div class="service-icon-wrap" aria-hidden="true">
          <!-- Music & Fire Festival Celebration SVG -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0m12 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path d="M14 12c1 1.5 2.5 2 4 2"/></svg>
        </div>
        <p class="service-verbatim-text">les performances de nos DJ, cracheur de feu et groupe folklorique pour des soirées endiablées</p>
      </article>

      <article class="service-card">
        <div class="service-icon-wrap" aria-hidden="true">
          <!-- Event Planner & Host SVG -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <p class="service-verbatim-text">Nadia sera votre relais dans l'organisation de votre séjour afin que vous puissiez profiter au maximum de votre famille, collègues et amis.</p>
      </article>
    </div>
  </section>

  <!-- 4 Room-Size Categories -->
  <section class="categories-section" id="de-5-a-10-chambres" aria-label="Catégories par nombre de chambres">
    <div class="section-header">
      <h2 class="section-title">NOS MAISONS D'HÔTES</h2>
      <div class="section-divider"></div>
    </div>

    <div class="category-grid">
      <!-- 5-10 chambres -->
      <article class="category-card">
        <div class="category-image-wrap">
          <picture>
            <source srcset="/img/villa-dhorizon-piscine-800w.webp 800w, /img/villa-dhorizon-piscine-480w.webp 480w" type="image/webp">
            <img src="/img/villa-dhorizon-piscine.webp" alt="Villa D'Horizon Marrakech" class="category-image" width="800" height="600" loading="lazy">
          </picture>
        </div>
        <div class="category-content">
          <h3 class="category-title">De 5 à 10 chambres</h3>
          <a href="/de-5-a-10-chambres/" class="category-link-btn" aria-label="Voir les propriétés de 5 à 10 chambres">
            Voir les propriétés →
          </a>
        </div>
      </article>

      <!-- 10-20 chambres -->
      <article class="category-card">
        <div class="category-image-wrap">
          <picture>
            <source srcset="/img/les-lys-magique-entree-800w.webp 800w, /img/les-lys-magique-entree-480w.webp 480w" type="image/webp">
            <img src="/img/les-lys-magique-entree.webp" alt="Les Lys Magique Entrée" class="category-image" width="800" height="600" loading="lazy">
          </picture>
        </div>
        <div class="category-content">
          <h3 class="category-title">De 10 à 20 chambres</h3>
          <a href="/de-10-a-20-chambres/" class="category-link-btn" aria-label="Voir les propriétés de 10 à 20 chambres">
            Voir les propriétés →
          </a>
        </div>
      </article>

      <!-- 20-40 chambres -->
      <article class="category-card">
        <div class="category-image-wrap">
          <picture>
            <source srcset="/img/majestic-luxury-piscine-800w.webp 800w, /img/majestic-luxury-piscine-480w.webp 480w" type="image/webp">
            <img src="/img/majestic-luxury-piscine.webp" alt="Majestic Luxury Manoir Marrakech" class="category-image" width="800" height="600" loading="lazy">
          </picture>
        </div>
        <div class="category-content">
          <h3 class="category-title">De 20 à 40 chambres</h3>
          <a href="/de-20-a-40-chambres/" class="category-link-btn" aria-label="Voir les propriétés de 20 à 40 chambres">
            Voir les propriétés →
          </a>
        </div>
      </article>

      <!-- 40-60 chambres -->
      <article class="category-card">
        <div class="category-image-wrap">
          <picture>
            <source srcset="/img/marrakech-atlas-view-800w.webp 800w, /img/marrakech-atlas-view-480w.webp 480w" type="image/webp">
            <img src="/img/marrakech-atlas-view.webp" alt="Marrakech Atlas View" class="category-image" width="800" height="600" loading="lazy">
          </picture>
        </div>
        <div class="category-content">
          <h3 class="category-title">De 40 à 60 chambres</h3>
          <a href="/de-40-a-60-chambres/" class="category-link-btn" aria-label="Voir les propriétés de 40 à 60 chambres">
            Voir les propriétés →
          </a>
        </div>
      </article>
    </div>
  </section>

  <!-- 6 Featured Properties Showcase -->
  <section class="properties-section" aria-label="Nos Établissements Phares">
    <div class="properties-container">
      <div class="section-header">
        <h2 class="section-title">Nos Établissements</h2>
        <div class="section-divider"></div>
      </div>

      <div class="properties-grid">
        <!-- 1. LES LYS MAGIQUE -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/les-lys-magique-entree-800w.webp 800w, /img/les-lys-magique-entree-480w.webp 480w" type="image/webp">
              <img src="/img/les-lys-magique-entree.webp" alt="Domaine Les Lys Magique à Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">LES LYS MAGIQUE</h3>
            </div>
            <div class="property-actions">
              <a href="/product/les-lys-magiques/" class="btn-property-detail" aria-label="Détails de Les Lys Magique">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="LES LYS MAGIQUE">Demander un devis</button>
            </div>
          </div>
        </article>

        <!-- 2. Villa Anouar Marrakech -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/villa-anouar-terrasse-800w.webp 800w, /img/villa-anouar-terrasse-480w.webp 480w" type="image/webp">
              <img src="/img/villa-anouar-terrasse.webp" alt="Villa Anouar Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">Villa Anouar Marrakech</h3>
            </div>
            <div class="property-actions">
              <a href="/product/villa-anouar-marrakech/" class="btn-property-detail" aria-label="Détails de Villa Anouar Marrakech">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="Villa Anouar Marrakech">Demander un devis</button>
            </div>
          </div>
        </article>

        <!-- 3. PALAIS PARADIS HÔTEL -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/palais-paradis-facade-800w.webp 800w, /img/palais-paradis-facade-480w.webp 480w" type="image/webp">
              <img src="/img/palais-paradis-facade.webp" alt="Palais Paradis Hôtel Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">PALAIS PARADIS HÔTEL</h3>
            </div>
            <div class="property-actions">
              <a href="/product/palais-paradis-hotel/" class="btn-property-detail" aria-label="Détails de Palais Paradis Hôtel">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="PALAIS PARADIS HÔTEL">Demander un devis</button>
            </div>
          </div>
        </article>

        <!-- 4. Villa D'Horizon Marrakech -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/villa-dhorizon-piscine-800w.webp 800w, /img/villa-dhorizon-piscine-480w.webp 480w" type="image/webp">
              <img src="/img/villa-dhorizon-piscine.webp" alt="Villa D'Horizon Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">Villa D’Horizon Marrakech</h3>
            </div>
            <div class="property-actions">
              <a href="/product/villa-dhorizon-marrakech/" class="btn-property-detail" aria-label="Détails de Villa D'Horizon Marrakech">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="Villa D’Horizon Marrakech">Demander un devis</button>
            </div>
          </div>
        </article>

        <!-- 5. RIAD LE BLEU DE LA MEDINA -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/riad-bleu-patio-800w.webp 800w, /img/riad-bleu-patio-480w.webp 480w" type="image/webp">
              <img src="/img/riad-bleu-patio.webp" alt="Riad Le Bleu de la Médina Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">RIAD LE BLEU DE LA MEDINA</h3>
            </div>
            <div class="property-actions">
              <a href="/product/riad-le-bleu-de-la-medina/" class="btn-property-detail" aria-label="Détails de Riad Le Bleu de la Médina">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="RIAD LE BLEU DE LA MEDINA">Demander un devis</button>
            </div>
          </div>
        </article>

        <!-- 6. Jardin Les Deux Sœurs Marrakech -->
        <article class="property-card">
          <div class="property-img-wrap">
            <picture>
              <source srcset="/img/jardin-deux-soeurs-800w.webp 800w, /img/jardin-deux-soeurs-480w.webp 480w" type="image/webp">
              <img src="/img/jardin-deux-soeurs.webp" alt="Jardin Les Deux Sœurs Marrakech" class="property-img" width="800" height="500" loading="lazy">
            </picture>
          </div>
          <div class="property-card-body">
            <div>
              <h3 class="property-card-title">Jardin Les Deux Sœurs Marrakech</h3>
            </div>
            <div class="property-actions">
              <a href="/product/jardin-les-deux-soeurs-marrakech/" class="btn-property-detail" aria-label="Détails de Jardin Les Deux Sœurs Marrakech">Détails →</a>
              <button type="button" class="btn-property-quote js-open-quote" data-property-name="Jardin Les Deux Sœurs Marrakech">Demander un devis</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  `;
}

// Write the main builder script and output files
console.log('Writing static demo pages...');

// 1. Output Homepage & Option entry points
const homeContent = buildHomeContent();
const heroPreload = `<link rel="preload" as="image" href="/img/villa-dhorizon-piscine-1200w.webp" type="image/webp" fetchpriority="high">`;

fs.writeFileSync(path.join(distDir, 'index.html'), renderPage({
  title: "Location villa séminaire & mariage Marrakech | Maisons d'hôtes",
  description: "Location exclusive de villas et maisons d'hôtes de prestige à Marrakech jusqu'à 60 chambres pour séminaires d'entreprise, mariages et réceptions privées.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/",
  defaultTheme: "option-1",
  activeNav: "home",
  content: homeContent,
  heroPreload
}));

// Create dedicated directories for /option-1/, /option-2/, /option-3/
for (const opt of ['option-1', 'option-2', 'option-3']) {
  const optDir = path.join(distDir, opt);
  fs.mkdirSync(optDir, { recursive: true });
  fs.writeFileSync(path.join(optDir, 'index.html'), renderPage({
    title: `Direction de Design : ${opt.toUpperCase()} | Marrakech Séminaire`,
    description: "Démonstration client 2026 : choix de direction de style pour la refonte de Marrakech Séminaire Maisons d'Hôtes.",
    canonicalUrl: `https://marrakechseminairesmaisondhotes.com/${opt}/`,
    defaultTheme: opt,
    activeNav: "home",
    content: homeContent,
    heroPreload
  }));
}

// -------------------------------------------------------------
// 2. CATEGORY PAGES (5-10, 10-20, 20-40, 40-60)
// -------------------------------------------------------------
function buildCategoryPage({ titleH1, items }) {
  const cardsHtml = items.map(item => `
    <article class="category-card" style="box-shadow: var(--card-shadow);">
      <div class="category-image-wrap">
        <picture>
          <source srcset="${item.img}-800w.webp 800w, ${item.img}-480w.webp 480w" type="image/webp">
          <img src="${item.img}.webp" alt="${item.name}" class="category-image" width="800" height="600" loading="lazy">
        </picture>
      </div>
      <div class="category-content">
        <h2 class="category-title" style="font-size: 1.25rem;">${item.name}</h2>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <a href="${item.url}" class="category-link-btn" aria-label="Détails de ${item.name}">Détails →</a>
          <button type="button" class="btn-property-quote js-open-quote" data-property-name="${item.name}">Demander un devis</button>
        </div>
      </div>
    </article>
  `).join('');

  return `
  <section style="max-width: 1320px; margin: 0 auto; padding: 4rem 1.5rem 5rem;">
    <div class="section-header">
      <h1 class="section-title">${titleH1}</h1>
      <div class="section-divider"></div>
    </div>
    <div class="category-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
      ${cardsHtml}
    </div>
  </section>
  `;
}

// /de-5-a-10-chambres/
const cat5to10Dir = path.join(distDir, 'de-5-a-10-chambres');
fs.mkdirSync(cat5to10Dir, { recursive: true });
fs.writeFileSync(path.join(cat5to10Dir, 'index.html'), renderPage({
  title: "Villas 5 à 10 chambres à Marrakech | Séminaire & Mariage",
  description: "Sélection exclusive de villas de 5 à 10 chambres à Marrakech avec piscine privée et service hôtelier pour séjours et petits événements.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/de-5-a-10-chambres/",
  activeNav: "categories",
  content: buildCategoryPage({
    titleH1: "De 5 à 10 chambres",
    items: [
      { name: "Villa Anouar Marrakech (9 Chambres)", url: "/product/villa-anouar-marrakech/", img: "/img/villa-anouar-terrasse" },
      { name: "VILLA PALM BEACH MARRAKECH (10 Chambres)", url: "/product/villa-palm-beach-marrakech/", img: "/img/villa-palm-beach" },
      { name: "Villa D’Horizon Marrakech (5 Suites)", url: "/product/villa-dhorizon-marrakech/", img: "/img/villa-dhorizon-piscine" },
      { name: "VILLA AL MARRAKCHI (9 Chambres)", url: "/product/villa-al-marrakchi/", img: "/img/villa-al-marrakchi" },
      { name: "LE BRAIN DE L'ORIENT (8 Chambres)", url: "/product/le-brain-de-lorient/", img: "/img/brin-de-lorient" }
    ]
  })
}));

// /de-10-a-20-chambres/
const cat10to20Dir = path.join(distDir, 'de-10-a-20-chambres');
fs.mkdirSync(cat10to20Dir, { recursive: true });
fs.writeFileSync(path.join(cat10to20Dir, 'index.html'), renderPage({
  title: "Villas 10 à 20 chambres à Marrakech | Privatisation Exclusivité",
  description: "Grandes maisons d'hôtes et domaines de 10 à 20 chambres à Marrakech pour mariages intimes et séminaires résidentiels.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/de-10-a-20-chambres/",
  activeNav: "categories",
  content: buildCategoryPage({
    titleH1: "De 10 à 20 Chambres",
    items: [
      { name: "GREEN GARDEN MARRAKECH (19 Chambres)", url: "/product/green-garden-marrakech/", img: "/img/green-garden" },
      { name: "Jardin Les Deux Sœurs Marrakech (19 Chambres)", url: "/product/jardin-les-deux-soeurs-marrakech/", img: "/img/jardin-deux-soeurs" },
      { name: "L'OISEAU BLEU & JAUNE (17 Chambres)", url: "/product/oiseau-bleu-jaune/", img: "/img/oiseau-bleu-jaune" },
      { name: "LES LYS MAGIQUE (19 Chambres)", url: "/product/les-lys-magiques/", img: "/img/les-lys-magique-entree" }
    ]
  })
}));

// /de-20-a-40-chambres/
const cat20to40Dir = path.join(distDir, 'de-20-a-40-chambres');
fs.mkdirSync(cat20to40Dir, { recursive: true });
fs.writeFileSync(path.join(cat20to40Dir, 'index.html'), renderPage({
  title: "Domaines 20 à 40 chambres à Marrakech | Grands Événements",
  description: "Domaines de réception et résidences privatisables de 20 à 40 chambres pour grands séminaires d'entreprise et mariages mille et une nuit.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/de-20-a-40-chambres/",
  activeNav: "categories",
  content: buildCategoryPage({
    titleH1: "De 20 à 40 Chambres",
    items: [
      { name: "VU SUR GOLF (40 Chambres)", url: "/product/vu-sur-golf/", img: "/img/vu-sur-golf" },
      { name: "PALAIS PARADIS HÔTEL (30 Chambres)", url: "/product/palais-paradis-hotel/", img: "/img/palais-paradis-facade" },
      { name: "MAJESTIC LUXURY MANOIR (34 Chambres)", url: "/product/majestic-luxury-manoir-marrakech/", img: "/img/majestic-luxury-piscine" },
      { name: "ROYAL KASBAH SOURCE RESSORT (32 Chambres)", url: "/product/royal-kasbah-source-ressort/", img: "/img/royal-kasbah-source" }
    ]
  })
}));

// /de-40-a-60-chambres/
const cat40to60Dir = path.join(distDir, 'de-40-a-60-chambres');
fs.mkdirSync(cat40to60Dir, { recursive: true });
fs.writeFileSync(path.join(cat40to60Dir, 'index.html'), renderPage({
  title: "Propriétés jusqu'à 60 chambres à Marrakech | Séminaires",
  description: "Espaces hôteliers et kasbahs d'exception jusqu'à 60 chambres à Marrakech pour conférences, conventions et grands groupes.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/de-40-a-60-chambres/",
  activeNav: "categories",
  content: buildCategoryPage({
    titleH1: "De 40 à 60 Chambres",
    items: [
      { name: "Marrakech Atlas View (60 Chambres)", url: "/product/marrakech-atlas-vieu/", img: "/img/marrakech-atlas-view" },
      { name: "ROYAL KASBAH RESSORT (42 Suites Chambres)", url: "/product/royal-kasbah-ressort/", img: "/img/palais-paradis-facade" }
    ]
  })
}));

// -------------------------------------------------------------
// 3. PROPERTY DETAIL PAGES (Priority: Les Lys Magique)
// -------------------------------------------------------------
function buildPropertyLysContent() {
  const galleryItems = [
    { src: '/img/les-lys-magique-entree.webp', alt: 'LES LYS MAGIQUE ENTREE' },
    { src: '/img/les-lys-terrasses.webp', alt: 'TERASSES & TRANSATS' },
    { src: '/img/les-lys-piscine-bord.webp', alt: 'AU BORD DE LA PISCINE' },
    { src: '/img/les-lys-suite-executive.webp', alt: 'SUITE EXECUTIVE' },
    { src: '/img/les-lys-hammam.webp', alt: 'HAMMAM' },
    { src: '/img/les-lys-restaurant.webp', alt: 'RESTAURANT' },
    { src: '/img/les-lys-salle-conference.webp', alt: 'SALLE CONFERANCE' },
    { src: '/img/les-lys-coucher-soleil.webp', alt: 'COUCHER DE SOLEIL' },
    { src: '/img/les-lys-buffet.webp', alt: 'BUFFET EVE' }
  ];

  const galleryHtml = galleryItems.map(item => `
    <div class="gallery-item" data-full-src="${item.src}" tabindex="0" role="button" aria-label="Agrandir la photo : ${item.alt}">
      <img src="${item.src}" alt="${item.alt}" width="400" height="300" loading="lazy">
    </div>
  `).join('');

  return `
  <article style="max-width: 1240px; margin: 0 auto; padding: 3.5rem 1.5rem 5rem;">
    <!-- Breadcrumb & Header -->
    <header style="margin-bottom: 2.5rem; text-align: center;">
      <h1 class="hero-title" style="color: var(--text-main); text-shadow: none; font-size: clamp(2rem, 4vw, 3.25rem); margin-bottom: 0.5rem;">
        LES LYS MAGIQUE
      </h1>
      <div class="section-divider" style="margin-bottom: 1.5rem;"></div>
      <button type="button" class="btn-cta js-open-quote" data-property-name="LES LYS MAGIQUE">
        Demander un devis
      </button>
    </header>

    <!-- Photo Gallery Grid with Lightbox -->
    <section aria-label="Galerie photos de la propriété" style="margin-bottom: 3.5rem;">
      <div class="gallery-grid">
        ${galleryHtml}
      </div>
    </section>

    <!-- Description (Verbatim French Copy from Live Site) -->
    <section aria-label="Description de la propriété" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2.5rem 2rem; box-shadow: var(--card-shadow); margin-bottom: 3rem;">
      <h2 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-main); margin-bottom: 1.5rem;">Description</h2>
      
      <div style="font-size: 1.0625rem; color: var(--text-muted); line-height: 1.8; display: flex; flex-direction: column; gap: 1.25rem;">
        <p><strong>Boutique Hôtel &amp; Événements d'Exception à Marrakech</strong></p>
        <p>À seulement 18 kilomètres de Marrakech, sur la route de Fès, LES LYS MAGIQUE vous ouvre les portes d'un univers où élégance, raffinement et hospitalité marocaine s'unissent pour créer des expériences inoubliables. Niché dans un écrin de verdure, ce boutique hôtel de charme est une véritable invitation à la détente, au bien-être et aux célébrations les plus prestigieuses.</p>
        <p>Conçu pour offrir un séjour intimiste et exclusif, l'établissement dispose de 19 chambres élégantes, alliant confort moderne, décoration raffinée et atmosphère chaleureuse. Chaque espace a été pensé pour offrir à ses hôtes un véritable havre de paix, à quelques minutes seulement de la Ville Ocre.</p>
        
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-main); margin-top: 1rem;">Des prestations haut de gamme</h3>
        <p>Pour rendre chaque séjour unique, LES LYS MAGIQUE met à votre disposition des infrastructures de qualité :</p>
        <ul style="padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <li>Un restaurant proposant une cuisine marocaine authentique et des spécialités internationales, élaborées avec des produits soigneusement sélectionnés.</li>
          <li>Une magnifique piscine extérieure, idéale pour se détendre sous le soleil de Marrakech.</li>
          <li>Un jacuzzi intérieur pouvant accueillir jusqu'à 20 personnes, pour des moments de relaxation privilégiés.</li>
          <li>Un bar élégant, parfait pour partager un cocktail dans une ambiance conviviale.</li>
          <li>De vastes jardins paysagers et espaces verts offrant un décor enchanteur pour des brunchs, cocktails et réceptions en plein air.</li>
          <li>Un grand parking privé, pouvant accueillir plusieurs dizaines de véhicules, assurant un accès confortable à tous vos invités.</li>
        </ul>

        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-main); margin-top: 1rem;">Le lieu idéal pour tous vos événements</h3>
        <p>Plus qu'un hôtel, LES LYS MAGIQUE est une destination dédiée aux plus beaux moments de votre vie.</p>
        <p>Notre domaine accueille dans un cadre exceptionnel :</p>
        <ul style="padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <li>Mariages de prestige.</li>
          <li>Fiançailles et demandes en mariage.</li>
          <li>Anniversaires et fêtes privées.</li>
          <li>Réunions familiales.</li>
          <li>Séminaires, conférences et événements d'entreprise.</li>
          <li>Brunchs, soirées à thème, lancements de produits et réceptions sur mesure.</li>
        </ul>
      </div>

      <div style="margin-top: 2.5rem; text-align: center;">
        <button type="button" class="btn-cta js-open-quote" data-property-name="LES LYS MAGIQUE" style="padding: 0.85rem 2rem;">
          Demander un devis pour ce domaine
        </button>
      </div>
    </section>
  </article>
  `;
}

// Generate /product/les-lys-magiques/
const prodLysDir = path.join(distDir, 'product', 'les-lys-magiques');
fs.mkdirSync(prodLysDir, { recursive: true });
fs.writeFileSync(path.join(prodLysDir, 'index.html'), renderPage({
  title: "LES LYS MAGIQUE Marrakech | Boutique Hôtel & Événements",
  description: "Domaine hôtelier de prestige de 19 chambres sur la route de Fès à Marrakech pour mariages d'exception, séminaires et séjours privés.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/product/les-lys-magiques/",
  activeNav: "categories",
  content: buildPropertyLysContent()
}));

// Function to generate the other 5 property pages from the template
function generatePropertyPage({ slug, name, img, descHtml }) {
  const propDir = path.join(distDir, 'product', slug);
  fs.mkdirSync(propDir, { recursive: true });
  fs.writeFileSync(path.join(propDir, 'index.html'), renderPage({
    title: `${name} | Marrakech Séminaire Maisons d'Hôtes`,
    description: `Location exclusive de ${name} à Marrakech pour vos séminaires, mariages et séjours de prestige.`,
    canonicalUrl: `https://marrakechseminairesmaisondhotes.com/product/${slug}/`,
    activeNav: "categories",
    content: `
    <article style="max-width: 1240px; margin: 0 auto; padding: 3.5rem 1.5rem 5rem;">
      <header style="margin-bottom: 2.5rem; text-align: center;">
        <h1 class="hero-title" style="color: var(--text-main); text-shadow: none; font-size: clamp(2rem, 4vw, 3.25rem); margin-bottom: 0.5rem;">
          ${name}
        </h1>
        <div class="section-divider" style="margin-bottom: 1.5rem;"></div>
        <button type="button" class="btn-cta js-open-quote" data-property-name="${name}">
          Demander un devis
        </button>
      </header>

      <section aria-label="Photo principale" style="margin-bottom: 3.5rem;">
        <div style="border-radius: var(--card-radius); overflow: hidden; aspect-ratio: 16/9; max-width: 900px; margin: 0 auto; box-shadow: var(--card-shadow);">
          <picture>
            <source srcset="${img}-800w.webp 800w, ${img}-480w.webp 480w" type="image/webp">
            <img src="${img}.webp" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" width="900" height="506">
          </picture>
        </div>
      </section>

      <section aria-label="Description" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2.5rem 2rem; box-shadow: var(--card-shadow); max-width: 900px; margin: 0 auto;">
        <h2 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-main); margin-bottom: 1.5rem;">Description</h2>
        <div style="font-size: 1.0625rem; color: var(--text-muted); line-height: 1.8;">
          ${descHtml}
        </div>
        <div style="margin-top: 2rem; text-align: center;">
          <button type="button" class="btn-cta js-open-quote" data-property-name="${name}">
            Demander un devis
          </button>
        </div>
      </section>
    </article>
    `
  }));
}

// Generate the remaining 5 featured properties
generatePropertyPage({
  slug: 'villa-anouar-marrakech',
  name: 'Villa Anouar Marrakech',
  img: '/img/villa-anouar-terrasse',
  descHtml: `<p>Villa Anouar Marrakech vous accueille dans un cadre exclusif de 9 chambres avec piscine privée et vue sur les palmiers pour vos événements privés et séminaires.</p>`
});

generatePropertyPage({
  slug: 'palais-paradis-hotel',
  name: 'PALAIS PARADIS HÔTEL',
  img: '/img/palais-paradis-facade',
  descHtml: `<p>Domaine hôtelier de charme de 30 chambres alliant architecture orientale et confort moderne, idéal pour conventions, mariages et grandes réceptions à Marrakech.</p>`
});

generatePropertyPage({
  slug: 'villa-dhorizon-marrakech',
  name: 'Villa D’Horizon Marrakech',
  img: '/img/villa-dhorizon-piscine',
  descHtml: `<p>Propriété intimiste d'exception de 5 suites avec piscine et jardins paysagers pour séjours d'affaires et réceptions privées en exclusivité totale.</p>`
});

generatePropertyPage({
  slug: 'riad-le-bleu-de-la-medina',
  name: 'RIAD LE BLEU DE LA MEDINA',
  img: '/img/riad-bleu-patio',
  descHtml: `
    <p>Idéalement situé, notre riad est accessible en voiture jusqu'à la porte d'entrée, un véritable privilège dans la médina. Vous profiterez d'un emplacement stratégique, à seulement 7 minutes à pied de la célèbre place Jemaa el-Fna, au cœur des souks traditionnels et à proximité immédiate des principaux monuments historiques de la Ville Rouge.</p>
    <p>Le Riad Le Bleu de la Médina propose 18 chambres de luxe, décorées avec soin dans un style inspiré de l'artisanat marocain. Chaque chambre dispose de sa salle de bains privative et offre un cadre raffiné, chaleureux et confortable, propice à la détente.</p>
  `
});

generatePropertyPage({
  slug: 'jardin-les-deux-soeurs-marrakech',
  name: 'Jardin Les Deux Sœurs Marrakech',
  img: '/img/jardin-deux-soeurs',
  descHtml: `<p>Magnifique propriété de 19 chambres nichée au cœur d'un parc arboré avec piscine pour vos séjours de groupe et événements privés à Marrakech.</p>`
});

// -------------------------------------------------------------
// 4. ABOUT US PAGE (/about-us/)
// -------------------------------------------------------------
const aboutDir = path.join(distDir, 'about-us');
fs.mkdirSync(aboutDir, { recursive: true });
fs.writeFileSync(path.join(aboutDir, 'index.html'), renderPage({
  title: "À Propos de Nous | Marrakech Séminaire Maisons d'Hôtes",
  description: "Découvrez notre histoire, nos valeurs et l'équipe dévouée à l'organisation de vos événements d'exception à Marrakech.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/about-us/",
  activeNav: "about",
  content: `
  <section style="max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem 5rem;">
    <header style="text-align: center; margin-bottom: 3.5rem;">
      <h1 class="hero-title" style="color: var(--text-main); text-shadow: none; font-size: clamp(2rem, 4vw, 3.25rem);">
        À PROPOS DE NOUS
      </h1>
      <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--accent); margin-top: 0.5rem;">qui somme nous</p>
      <div class="section-divider" style="margin-top: 1rem;"></div>
    </header>

    <div style="display: flex; flex-direction: column; gap: 3.5rem;">
      <!-- Mission -->
      <article style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2rem; box-shadow: var(--card-shadow);">
        <div style="border-radius: var(--card-radius); overflow: hidden; aspect-ratio: 4/3;">
          <img src="/img/about-mission.webp" alt="Notre Mission" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
        </div>
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-main); margin-bottom: 1rem;">Notre Mission</h2>
          <p style="color: var(--text-muted); line-height: 1.8;">
            Nous sommes bien plus qu’une équipe, nous sommes une famille hautement collaborative et solidaire, unie par une passion commune : créer des expériences uniques et inoubliables pour nos clients. Chaque membre de notre équipe apporte ses talents et son expertise pour faire de chaque projet une réussite exceptionnelle.
          </p>
        </div>
      </article>

      <!-- Valeurs -->
      <article style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2rem; box-shadow: var(--card-shadow);">
        <div style="order: 2;">
          <h2 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-main); margin-bottom: 1rem;">Nos Valeurs</h2>
          <p style="color: var(--text-muted); line-height: 1.8;">
            Intégrité, professionnalisme et respect sont les fondements de notre approche envers nos clients. Nous considérons chaque interaction comme une opportunité de construire des relations solides et durables, basées sur la confiance et la transparence. Nous nous efforçons de toujours agir de manière éthique et responsable, car nous croyons que c’est la clé pour établir une entreprise durable et respectueuse.
          </p>
        </div>
        <div style="order: 1; border-radius: var(--card-radius); overflow: hidden; aspect-ratio: 4/3;">
          <img src="/img/about-valeurs.webp" alt="Nos Valeurs" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
        </div>
      </article>

      <!-- Équipe -->
      <article style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2rem; box-shadow: var(--card-shadow);">
        <div style="border-radius: var(--card-radius); overflow: hidden; aspect-ratio: 4/3;">
          <img src="/img/about-equipe.webp" alt="Notre Équipe" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
        </div>
        <div>
          <p style="color: var(--text-muted); line-height: 1.8;">
            Ensemble, nous formons une équipe dévouée, passionnée par notre métier et déterminée à repousser les limites pour offrir des expériences inégalées. Chaque détail compte, et nous mettons tout en œuvre pour nous assurer que chaque séjour est parfaitement personnalisé et adapté aux besoins et aux désirs de nos clients.
          </p>
          <p style="color: var(--text-muted); line-height: 1.8; margin-top: 1rem;">
            En tant que passionnés du voyage, nous aimons partager notre connaissance et notre amour pour les destinations que nous proposons. Nous travaillons sans relâche pour découvrir les joyaux cachés et les trésors insoupçonnés qui feront de chaque séjour une aventure unique.
          </p>
        </div>
      </article>

      <!-- Welcome Banner Callout -->
      <div style="text-align: center; padding: 2.5rem 1.5rem; background: var(--bg-surface-soft); border: 1px solid var(--border-subtle); border-radius: var(--card-radius);">
        <p style="font-family: var(--font-serif); font-size: 1.125rem; font-weight: 700; letter-spacing: 0.05em; color: var(--accent); line-height: 1.7;">
          BIENVENUE DANS NOTRE UNIVERS, OÙ L’EXCELLENCE ET LA PASSION SE RENCONTRENT POUR CRÉER DES EXPÉRIENCES HORS DU COMMUN. NOUS SOMMES IMPATIENTS DE VOUS ACCUEILLIR PARMI NOUS ET DE PARTAGER ENSEMBLE DES MOMENTS D’ÉMERVEILLEMENT ET DE BONHEUR.
        </p>
      </div>
    </div>
  </section>
  `
}));

// -------------------------------------------------------------
// 5. EVENTS PAGE (/events/)
// -------------------------------------------------------------
const eventsDir = path.join(distDir, 'events');
fs.mkdirSync(eventsDir, { recursive: true });
const eventGalleryItems = [
  { src: '/img/event-oriental-night-1.webp', alt: 'Soirée orientale aux lanternes' },
  { src: '/img/event-day-after.webp', alt: 'Brunch Day After' },
  { src: '/img/event-oriental-night-2.webp', alt: 'Dîner sous les étoiles' },
  { src: '/img/event-soiree-dj.webp', alt: 'Soirée DJ et danse' },
  { src: '/img/event-soiree-danse.webp', alt: 'Spectacle d\'artistes et musiciens' },
  { src: '/img/event-oriental-buffet.webp', alt: 'Buffet gastronomique marocain' },
  { src: '/img/event-fire-eater.webp', alt: 'Performance cracheur de feu' }
];

const eventGalleryHtml = eventGalleryItems.map(item => `
  <div class="gallery-item" data-full-src="${item.src}" tabindex="0" role="button" aria-label="Agrandir la photo : ${item.alt}">
    <img src="${item.src}" alt="${item.alt}" width="400" height="300" loading="lazy">
  </div>
`).join('');

fs.writeFileSync(path.join(eventsDir, 'index.html'), renderPage({
  title: "Organisation d'Événements & Mariages | Marrakech Séminaire",
  description: "Galerie et organisation de séminaires d'entreprise, mariages orientaux, anniversaires et soirées privées à Marrakech.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/events/",
  activeNav: "events",
  content: `
  <section style="max-width: 1240px; margin: 0 auto; padding: 4rem 1.5rem 5rem;">
    <header style="text-align: center; margin-bottom: 3.5rem;">
      <h1 class="hero-title" style="color: var(--text-main); text-shadow: none; font-size: clamp(2rem, 4vw, 3.25rem);">
        Nos Événements
      </h1>
      <div class="section-divider" style="margin-top: 1rem;"></div>
    </header>

    <div class="gallery-grid">
      ${eventGalleryHtml}
    </div>

    <div style="margin-top: 3.5rem; text-align: center;">
      <button type="button" class="btn-cta js-open-quote" style="padding: 0.85rem 2rem;">
        Demander un devis pour votre événement
      </button>
    </div>
  </section>
  `
}));

// -------------------------------------------------------------
// 6. CONTACT PAGE (/contact/)
// -------------------------------------------------------------
const contactDir = path.join(distDir, 'contact');
fs.mkdirSync(contactDir, { recursive: true });
fs.writeFileSync(path.join(contactDir, 'index.html'), renderPage({
  title: "Contact & Devis Villa Séminaire Marrakech | Conciergerie",
  description: "Contactez notre équipe et Nadia, organisatrice d'événements à Marrakech, pour réserver votre villa ou recevoir un devis personnalisé.",
  canonicalUrl: "https://marrakechseminairesmaisondhotes.com/contact/",
  activeNav: "contact",
  content: `
  <section style="max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem 5rem;">
    <header style="text-align: center; margin-bottom: 3.5rem;">
      <h1 class="hero-title" style="color: var(--text-main); text-shadow: none; font-size: clamp(2rem, 4vw, 3.25rem);">
        Contact
      </h1>
      <p style="font-size: 1.125rem; color: var(--text-muted); margin-top: 0.5rem;">POUR PLUS D’INFORMATIONS</p>
      <div class="section-divider" style="margin-top: 1rem;"></div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem;">
      <!-- Contact Info Box -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2.5rem 2rem; box-shadow: var(--card-shadow);">
        <h2 style="font-family: var(--font-serif); font-size: 1.625rem; color: var(--text-main); margin-bottom: 1.5rem;">
          MARRAKECH SEMINAIRES MAISON D'HOTES
        </h2>
        
        <p style="font-weight: 600; color: var(--accent); margin-bottom: 1.25rem;">Informations de contact</p>
        
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 1.25rem;">
          <li style="display: flex; gap: 0.85rem; align-items: flex-start;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0; margin-top: 3px;" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <div>
              <a href="mailto:contact.luxurymanoir@gmail.com" style="color: var(--text-main); display: block; font-weight: 500;">contact.luxurymanoir@gmail.com</a>
              <a href="mailto:nadiastrass@gmail.com" style="color: var(--text-main); display: block; font-weight: 500;">nadiastrass@gmail.com</a>
            </div>
          </li>

          <li style="display: flex; gap: 0.85rem; align-items: flex-start;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0; margin-top: 3px;" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <p style="font-weight: 600; color: var(--text-main);">Nadia 🇲🇦🇫🇷</p>
              <a href="tel:+212619918223" style="color: var(--text-main); display: block; font-weight: 500;">+(212) 619 918 223</a>
              <a href="tel:+212669719938" style="color: var(--text-main); display: block; font-weight: 500;">+(212) 669 719 938</a>
            </div>
          </li>

          <li style="display: flex; gap: 0.85rem; align-items: flex-start;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0; margin-top: 3px;" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <p style="color: var(--text-main); font-weight: 500;">Route de l’Ourika, Canal de Zaraba, 40 000 Marrakech</p>
          </li>
        </ul>

        <div style="margin-top: 2rem;">
          <a href="https://wa.me/212619918223" target="_blank" rel="noopener noreferrer" class="btn-cta" style="width: 100%; background: #25D366; color: #fff;">
            Contacter Nadia sur WhatsApp
          </a>
        </div>
      </div>

      <!-- Contact / Devis Form Box -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--card-radius); padding: 2.5rem 2rem; box-shadow: var(--card-shadow);">
        <h2 style="font-family: var(--font-serif); font-size: 1.625rem; color: var(--text-main); margin-bottom: 1.5rem;">
          Contactez Nous
        </h2>
        <form class="quote-form" onsubmit="event.preventDefault(); document.getElementById('quote-form').dispatchEvent(new Event('submit'));">
          <div class="form-group">
            <label class="form-label">Nom *</label>
            <input type="text" class="form-input" required placeholder="Votre nom">
          </div>
          <div class="form-group">
            <label class="form-label">Prénom *</label>
            <input type="text" class="form-input" required placeholder="Votre prénom">
          </div>
          <div class="form-group">
            <label class="form-label">E-mail *</label>
            <input type="email" class="form-input" required placeholder="Votre e-mail">
          </div>
          <div class="form-group">
            <label class="form-label">Téléphone *</label>
            <input type="tel" class="form-input" required placeholder="Votre téléphone">
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea class="form-textarea" placeholder="Votre message"></textarea>
          </div>
          <button type="button" class="btn-cta js-open-quote" style="width: 100%; margin-top: 0.5rem;">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  </section>
  `
}));

// -------------------------------------------------------------
// 7. TECHNICAL FILES (_redirects, robots.txt)
// -------------------------------------------------------------
// Cloudflare Pages / Netlify _redirects file
fs.writeFileSync(path.join(distDir, '_redirects'), `/de-40-a-60-chambre /de-40-a-60-chambres 301\n`);

// robots.txt for demo
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nDisallow: /\n`);

console.log('Static demo site successfully built to dist/ !');
