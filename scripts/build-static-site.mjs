import fs from 'fs';
import path from 'path';

// Directories
const distDir = path.resolve('dist');
fs.mkdirSync(distDir, { recursive: true });

// Copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
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

// 1. Copy Public Directory to Dist
copyDirSync('public', distDir);

// 2. Prepare CSS & JS
fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });

const fontsCss = fs.existsSync('public/fonts/fonts.css') ? fs.readFileSync('public/fonts/fonts.css', 'utf8') : '';
const themeCss = fs.existsSync('src/css/theme.css') ? fs.readFileSync('src/css/theme.css', 'utf8') : '';
const mainCss = fs.existsSync('src/css/main.css') ? fs.readFileSync('src/css/main.css', 'utf8') : '';
const combinedCss = `${fontsCss}\n${themeCss}\n${mainCss}`;

fs.writeFileSync(path.join(distDir, 'css', 'styles.min.css'), combinedCss);
if (fs.existsSync('src/js/main.js')) {
  fs.copyFileSync('src/js/main.js', path.join(distDir, 'js', 'main.js'));
}

// 3. Load Site Data & Translations
const site = JSON.parse(fs.readFileSync('data/site.json', 'utf8'));
const servicesData = JSON.parse(fs.readFileSync('data/services.json', 'utf8'));
const testimonials = JSON.parse(fs.readFileSync('data/testimonials.json', 'utf8'));
const manifest = fs.existsSync('public/img/images-manifest.json') 
  ? JSON.parse(fs.readFileSync('public/img/images-manifest.json', 'utf8')) 
  : [];

const i18n = {
  fr: JSON.parse(fs.readFileSync('data/i18n/fr.json', 'utf8')),
  en: JSON.parse(fs.readFileSync('data/i18n/en.json', 'utf8')),
  es: JSON.parse(fs.readFileSync('data/i18n/es.json', 'utf8'))
};

// Image Helper
function getImageInfo(keyOrPath) {
  if (!keyOrPath) return null;
  const cleanKey = path.basename(keyOrPath, path.extname(keyOrPath)).replace(/-[0-9]+w$/, '');
  const found = manifest.find(m => m.key === cleanKey);
  if (found) return found;
  return {
    src: keyOrPath.startsWith('/') ? keyOrPath : `/img/${keyOrPath}`,
    srcset: '',
    sizes: '100vw',
    width: 1200,
    height: 800
  };
}

// URL Helper
function urlFor(lang, slug = '') {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (lang === 'fr') {
    return cleanSlug ? `/${cleanSlug}/` : '/';
  }
  return cleanSlug ? `/${lang}/${cleanSlug}/` : `/${lang}/`;
}

// Generate Page Wrapper
function renderPage({
  lang = 'fr',
  slug = '',
  title,
  description,
  heroImage,
  heroAlt,
  heroTagline,
  heroTitle,
  heroSubtitle,
  pageBackground = '',
  activeNav = 'home',
  content,
  extraScripts = ''
}) {
  const dict = i18n[lang];
  const canonicalUrl = `https://marrakechseminairesmaisondhotes.com${urlFor(lang, slug)}`;
  const ogImgUrl = heroImage.startsWith('http') ? heroImage : `https://marrakechseminairesmaisondhotes.com${heroImage}`;

  // Preload critical hero image — 1920w version for most screens
  const heroInfo = getImageInfo(heroImage);
  // Build srcset for hero: derive -Nw.webp names from base path
  const heroBase = heroImage.replace(/\.webp$/, '').replace(/-\d+w$/, '');
  const heroSizes = [480, 800, 1200, 1920, 2560, 3840];
  const heroSrcset = heroSizes
    .map(w => `${heroBase}-${w}w.webp ${w}w`)
    .join(', ');
  // Preload the 1920w cut (best default); browsers with srcset pick the right one
  const heroPreloadHref = `${heroBase}-1920w.webp`;
  const heroPreload = heroImage
    ? `<link rel="preload" as="image" imagesrcset="${heroSrcset}" imagesizes="100vw" fetchpriority="high" href="${heroPreloadHref}">`
    : '';

  // JSON-LD LodgingBusiness Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "name": "Marrakech Séminaire Maisons d'Hôtes",
    "description": dict.seo.homeDesc,
    "url": "https://marrakechseminairesmaisondhotes.com/",
    "telephone": site.business.telephones,
    "email": site.business.emails[0],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": site.business.address,
      "addressLocality": site.business.locality,
      "postalCode": site.business.postalCode,
      "addressCountry": site.business.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": site.business.coordinates.latitude,
      "longitude": site.business.coordinates.longitude
    },
    "sameAs": [
      site.business.social.facebook,
      site.business.social.instagram
    ]
  };

  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Hreflang Alternates -->
  <link rel="alternate" hreflang="fr" href="https://marrakechseminairesmaisondhotes.com${urlFor('fr', slug)}">
  <link rel="alternate" hreflang="en" href="https://marrakechseminairesmaisondhotes.com${urlFor('en', slug)}">
  <link rel="alternate" hreflang="es" href="https://marrakechseminairesmaisondhotes.com${urlFor('es', slug)}">
  <link rel="alternate" hreflang="x-default" href="https://marrakechseminairesmaisondhotes.com${urlFor('fr', slug)}">

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImgUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImgUrl}">

  <!-- Preloads -->
  ${heroPreload}
  <link rel="preload" href="/fonts/cormorant-garamond-600-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/jost-500-normal-latin.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Self-Hosted Critical Fonts & Styles -->
  <link rel="stylesheet" href="/fonts/fonts.css">
  <style>
    ${themeCss}
    ${mainCss}
  </style>

  <!-- JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(schemaData, null, 2)}
  </script>
</head>
<body>
  <svg class="glass-filter-defs" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <filter id="glass-refract" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.018 0.035" numOctaves="2" seed="7" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
  <!-- Accessibility Skip Link -->
  <a href="#main-content" class="skip-link">Passer au contenu principal</a>

  <!-- Top Announcement Bar (Only One Instance) -->
  <aside class="top-bar" role="note">
    ${dict.topBanner}
  </aside>

  <!-- Sticky Luxury Header: transparent over hero, pill nav on desktop -->
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="${urlFor(lang, '')}" class="brand" aria-label="Marrakech Séminaire Maison d'Hôtes">
        <span class="brand-emblem" aria-hidden="true">M</span>
        <span class="brand-text">
          Marrakech Séminaire
          <small>Maison d'Hôtes</small>
        </span>
      </a>

      <!-- Desktop Navigation — centered translucent pill -->
      <nav class="desktop-nav" aria-label="${dict.nav.menu}">
        <div class="nav-pill glass glass--pill">
          <ul class="nav-list">
            <li>
              <a href="${urlFor(lang, '')}" class="nav-link ${activeNav === 'home' ? 'active' : ''}" ${activeNav === 'home' ? 'aria-current="page"' : ''}>${dict.nav.home}</a>
            </li>
            <li>
              <a href="${urlFor(lang, 'about-us')}" class="nav-link ${activeNav === 'about' ? 'active' : ''}" ${activeNav === 'about' ? 'aria-current="page"' : ''}>${dict.nav.about}</a>
            </li>
            <li class="dropdown-container">
              <button type="button" class="dropdown-trigger ${activeNav === 'services' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true" ${activeNav === 'services' ? 'aria-current="true"' : ''}>
                ${dict.nav.services}
                <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="dropdown-menu glass glass--card" role="menu">
                ${Object.keys(servicesData).map(k => {
                  const s = servicesData[k];
                  const svcUrl = urlFor(lang, 'nos-services/' + s.slug);
                  const isCurrentSvc = slug === 'nos-services/' + s.slug;
                  return `
                  <a href="${svcUrl}" class="dropdown-item" role="menuitem" ${isCurrentSvc ? 'aria-current="page"' : ''}>
                    ${s.title[lang] || s.title.fr}
                  </a>
                  `;
                }).join('')}
              </div>
            </li>
            <li>
              <a href="${urlFor(lang, 'events')}" class="nav-link ${activeNav === 'events' ? 'active' : ''}" ${activeNav === 'events' ? 'aria-current="page"' : ''}>${dict.nav.events}</a>
            </li>
            <li>
              <a href="${urlFor(lang, 'contact')}" class="nav-link ${activeNav === 'contact' ? 'active' : ''}" ${activeNav === 'contact' ? 'aria-current="page"' : ''}>${dict.nav.contact}</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Header Actions Right: lang switcher + CTA + hamburger -->
      <div class="header-actions">
        <!-- Language Switcher FR | EN | ES -->
        <div class="lang-switcher glass glass--pill" aria-label="${dict.nav.language}">
          <a href="${urlFor('fr', slug)}" class="lang-link ${lang === 'fr' ? 'is-active' : ''}" hreflang="fr" ${lang === 'fr' ? 'aria-current="page"' : ''}>FR</a>
          <span class="lang-divider" aria-hidden="true">|</span>
          <a href="${urlFor('en', slug)}" class="lang-link ${lang === 'en' ? 'is-active' : ''}" hreflang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
          <span class="lang-divider" aria-hidden="true">|</span>
          <a href="${urlFor('es', slug)}" class="lang-link ${lang === 'es' ? 'is-active' : ''}" hreflang="es" ${lang === 'es' ? 'aria-current="page"' : ''}>ES</a>
        </div>

        <!-- CTA Pill Button -->
        <button type="button" class="btn-clay js-open-quote">
          ${dict.nav.quoteBtn}
        </button>

        <!-- Mobile Hamburger -->
        <button type="button" class="mobile-toggle" aria-label="${dict.nav.menu}" aria-expanded="false" aria-controls="mobile-drawer">
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Fullscreen Navigation Drawer -->
  <aside id="mobile-drawer" class="mobile-drawer glass glass--strong" aria-label="${dict.nav.menu}" inert>
    <div class="mobile-drawer-header">
      <span class="brand-text">
        Marrakech Séminaire
        <small>Maison d'Hôtes</small>
      </span>
      <button type="button" class="btn-ghost glass glass--pill btn-sm btn-close-drawer" aria-label="${dict.nav.close}">
        ${dict.nav.close} ✕
      </button>
    </div>

    <ul class="mobile-nav-list">
      <li class="mobile-nav-item">
        <a href="${urlFor(lang, '')}">${dict.nav.home}</a>
      </li>
      <li class="mobile-nav-item">
        <a href="${urlFor(lang, 'about-us')}">${dict.nav.about}</a>
      </li>
      <li class="mobile-nav-item">
        <button type="button" class="mobile-accordion-trigger" aria-expanded="false">
          <span>${dict.nav.services}</span>
          <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mobile-accordion-content">
          ${Object.keys(servicesData).map(k => {
            const s = servicesData[k];
            const svcUrl = urlFor(lang, 'nos-services/' + s.slug);
            const isCurrentSvc = slug === 'nos-services/' + s.slug;
            return `<a href="${svcUrl}" ${isCurrentSvc ? 'aria-current="page"' : ''}>${s.title[lang] || s.title.fr}</a>`;
          }).join('')}
        </div>
      </li>
      <li class="mobile-nav-item">
        <a href="${urlFor(lang, 'events')}">${dict.nav.events}</a>
      </li>
      <li class="mobile-nav-item">
        <a href="${urlFor(lang, 'contact')}">${dict.nav.contact}</a>
      </li>
    </ul>

    <div class="mobile-drawer-footer">
      <!-- Language Switcher in Mobile Drawer -->
      <div class="lang-switcher" style="justify-content: center; font-size: 14px;">
        <a href="${urlFor('fr', slug)}" class="lang-link ${lang === 'fr' ? 'is-active' : ''}">FR</a>
        <span class="lang-divider">|</span>
        <a href="${urlFor('en', slug)}" class="lang-link ${lang === 'en' ? 'is-active' : ''}">EN</a>
        <span class="lang-divider">|</span>
        <a href="${urlFor('es', slug)}" class="lang-link ${lang === 'es' ? 'is-active' : ''}">ES</a>
      </div>

      <a href="tel:+212619918223" class="btn-ghost glass glass--pill" style="width: 100%;">
        ${dict.nav.call} : +212 619 918 223
      </a>
      <button type="button" class="btn-gold js-open-quote" style="width: 100%;">
        ${dict.nav.quoteBtn}
      </button>
    </div>
  </aside>

  <!-- Continuous Single Photo Background (No Seams, 100lvh Fixed) when pageBackground is full -->
  ${pageBackground === 'full' && heroImage ? `
  <div class="fixed-bg-layer" aria-hidden="true">
    <picture>
      ${heroSizes.map(w => `<source type="image/webp" media="(max-width: ${w}px)" srcset="${heroBase}-${w}w.webp">`).join('\n      ')}
      <img src="${heroBase}-1920w.webp" alt="" class="fixed-bg-img" loading="eager" fetchpriority="high" width="1920" height="1080">
    </picture>
    <div class="fixed-bg-overlay" aria-hidden="true"></div>
  </div>
  ` : ''}

  <!-- Hero Section: 100vh full-bleed, header overlaid, content bottom-left -->
  <section class="hero${heroImage.includes('home') || activeNav === 'home' ? '' : ' hero--inner'}${pageBackground === 'full' ? ' hero--transparent' : ''}" aria-label="${heroTitle}">
    ${pageBackground === 'full' ? '' : (heroImage && !heroImage.includes('gradient') ? `
    <div class="hero-bg-wrapper">
      <picture>
        <source
          type="image/webp"
          srcset="${heroSrcset}"
          sizes="100vw">
        <img src="${heroPreloadHref}"
             alt="${heroAlt}"
             class="hero-bg-img"
             fetchpriority="high"
             loading="eager"
             width="1920"
             height="1080">
      </picture>
    </div>
    <div class="hero-gradient" aria-hidden="true"></div>
    <div class="hero-grain" aria-hidden="true"></div>
    ` : `<div class="hero-bg-gradient-only" aria-hidden="true"></div>`)}
    <div class="hero-content">
      ${heroTagline ? `<span class="hero-tagline">${heroTagline}</span>` : ''}
      <h1 class="hero-title">${heroTitle}</h1>
      <p class="hero-subtitle">${heroSubtitle}</p>
      <div class="hero-actions">
        <button type="button" class="btn-clay js-open-quote">${dict.hero.cta}</button>
        <a href="#main-content" class="btn-arrow" aria-label="${dict.hero.cta}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Main Content Area -->
  <main id="main-content"${pageBackground === 'full' ? ' class="main--transparent"' : ''}>
    ${content}
  </main>

  <!-- Floating WhatsApp Quick Contact -->
  <a href="https://wa.me/212619918223" 
     class="whatsapp-float" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="WhatsApp (+212 619 918 223)">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.031 2c-5.508 0-9.988 4.477-9.988 9.985 0 1.761.459 3.479 1.331 4.992l-1.414 5.166 5.291-1.387c1.458.795 3.102 1.214 4.78 1.214 5.507 0 9.987-4.477 9.987-9.985 0-5.508-4.48-9.985-9.987-9.985zm0 18.283c-1.498 0-2.964-.403-4.244-1.164l-.305-.181-3.149.826.84-3.07-.199-.316c-.839-1.336-1.282-2.884-1.282-4.478 0-4.568 3.717-8.285 8.339-8.285 4.569 0 8.286 3.717 8.286 8.285 0 4.568-3.717 8.283-8.286 8.283zm4.551-6.208c-.249-.125-1.477-.728-1.706-.811-.229-.083-.396-.125-.562.125-.166.249-.645.811-.791.977-.145.166-.291.187-.541.062s-1.054-.388-2.008-1.238c-.742-.661-1.243-1.478-1.388-1.727-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.416.083-.166.042-.312-.021-.437s-.562-1.352-.77-1.852c-.203-.487-.409-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312s-.874.853-.874 2.081.895 2.413 1.02 2.579c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.143.163 1.573.099.479-.072 1.477-.603 1.685-1.186.208-.583.208-1.082.146-1.186-.063-.105-.229-.167-.478-.292z"/>
    </svg>
  </a>

  <!-- Accessible Quote Request Modal Dialog (Hidden scrollbar clipped by card) -->
  <div id="quote-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" inert>
    <div class="modal-card glass glass--strong">
      <div class="modal-fade-top" aria-hidden="true"></div>
      <div class="modal-scroll-container">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title">${dict.quoteModal.title}</h2>
          <button type="button" class="modal-btn-close js-close-quote" aria-label="${dict.nav.close}">✕</button>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14.5px;">${dict.quoteModal.intro}</p>
        
        <form id="quote-form">
          <div class="form-group">
            <label class="form-label" for="q-name">${dict.quoteModal.fullName} *</label>
            <input type="text" id="q-name" name="fullName" class="form-input" required autocomplete="name">
          </div>
          <div class="form-group">
            <label class="form-label" for="q-phone">${dict.quoteModal.phone} *</label>
            <input type="tel" id="q-phone" name="phone" class="form-input" required autocomplete="tel">
          </div>
          <div class="form-group">
            <label class="form-label" for="q-event">${dict.quoteModal.eventType}</label>
            <select id="q-event" name="eventType" class="form-select">
              ${site.services.map(s => {
                const sName = s.title[lang] || s.title.fr;
                return `<option value="${sName}" data-slug="${s.slug}">${sName}</option>`;
              }).join('\n              ')}
              <option value="${lang === 'fr' ? 'Autre événement' : (lang === 'es' ? 'Otro evento' : 'Other event')}" data-slug="autre">${lang === 'fr' ? 'Autre événement' : (lang === 'es' ? 'Otro evento' : 'Other event')}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="q-guests">${dict.quoteModal.guests}</label>
            <input type="text" id="q-guests" name="guests" class="form-input" placeholder="ex. 30 personnes / 15 chambres">
          </div>
          <div class="form-group">
            <label class="form-label" for="q-dates">${dict.quoteModal.dates}</label>
            <input type="text" id="q-dates" name="dates" class="form-input" placeholder="${dict.quoteModal.datesPlaceholder || 'ex. Printemps'}">
          </div>
          <div class="form-group">
            <label class="form-label" for="q-notes">${dict.quoteModal.notes}</label>
            <textarea id="q-notes" name="notes" class="form-textarea" placeholder="${dict.quoteModal.notes}"></textarea>
          </div>

          <button type="submit" class="btn-clay" style="width: 100%; margin-top: 10px;">
            ${dict.quoteModal.whatsappSubmit}
          </button>
          <p style="font-size: 12px; color: var(--text-secondary); text-align: center; margin-top: 14px;">
            ${dict.quoteModal.disclaimer}
          </p>
        </form>
      </div>
      <div class="modal-fade-bottom" aria-hidden="true"></div>
    </div>
  </div>

  <!-- Global Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand & Contact Details -->
        <div class="footer-brand">
          <span class="brand-text" style="font-size: 1.25rem;">
            Marrakech Séminaire
            <small>Maison d'Hôtes</small>
          </span>
          <p>${site.business.address}</p>
          <p>
            <a href="tel:+212619918223">+(212) 619 918 223</a><br>
            <a href="tel:+212669719938">+(212) 669 719 938</a><br>
            <a href="mailto:${site.business.emails[0]}">${site.business.emails[0]}</a><br>
            <a href="mailto:${site.business.emails[1]}">${site.business.emails[1]}</a>
          </p>
          <div class="footer-socials">
            <a href="${site.business.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="${site.business.social.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2c2.7 0 3 0 4.1.1 2.5.1 3.7 1.3 3.8 3.8.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.5-1.3 3.7-3.8 3.8-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.5-.1-3.7-1.3-3.8-3.8C2 15 2 14.7 2 12s0-3 .1-4.1C2.2 5.4 3.4 4.2 5.9 4.1 7 4 7.3 4 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.2-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
            </a>
          </div>
        </div>

        <!-- Links Column -->
        <div>
          <p class="footer-heading">${dict.footer.linksTitle}</p>
          <ul class="footer-links">
            <li><a href="${urlFor(lang, '')}">${dict.nav.home}</a></li>
            <li><a href="${urlFor(lang, 'about-us')}">${dict.nav.about}</a></li>
            <li><a href="${urlFor(lang, 'nos-services')}">${dict.nav.services}</a></li>
            <li><a href="${urlFor(lang, 'events')}">${dict.nav.events}</a></li>
            <li><a href="${urlFor(lang, 'contact')}">${dict.nav.contact}</a></li>
          </ul>
        </div>

        <!-- Establishments Column -->
        <div>
          <p class="footer-heading">${dict.footer.propertiesTitle}</p>
          <ul class="footer-links">
            ${site.properties.map(p => `
              <li><a href="${urlFor(lang, 'product/' + p.slug)}">${p.name}</a></li>
            `).join('')}
          </ul>
        </div>

        <!-- Capacities Column -->
        <div>
          <p class="footer-heading">${dict.footer.capacitiesTitle}</p>
          <ul class="footer-links">
            ${site.categories.map(c => `
              <li><a href="${urlFor(lang, c.slug)}">${c.title}</a></li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        ${dict.footer.copyright}
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/main.js" defer></script>
  ${extraScripts}
</body>
</html>`;
}

// --------------------------------------------------------------------------
// Testimonials Carousel Component (Homepage & Services Page)
// --------------------------------------------------------------------------
function renderTestimonialsSection(lang) {
  const dict = i18n[lang];
  const consentedList = testimonials.filter(t => t.consent === true);
  const itemsToRender = consentedList.length > 0 ? consentedList : [
    {
      firstName: dict.sections.placeholderTestimonialTitle,
      eventType: "Séminaire d'entreprise",
      date: "2025",
      text: dict.sections.placeholderTestimonialText
    },
    {
      firstName: dict.sections.placeholderTestimonialTitle,
      eventType: "Mariage d'exception",
      date: "2025",
      text: dict.sections.placeholderTestimonialText
    },
    {
      firstName: dict.sections.placeholderTestimonialTitle,
      eventType: "Fête de famille",
      date: "2025",
      text: dict.sections.placeholderTestimonialText
    }
  ];

  return `
    <section class="section testimonials-section" aria-labelledby="sec-testimonials-title">
      <div class="container">
        <div class="sec-header">
          <h2 id="sec-testimonials-title" class="sec-title">${dict.sections.testimonials}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
          <p class="sec-intro">${dict.sections.testimonialsIntro}</p>
        </div>

        <div class="carousel-container" role="region" aria-label="${dict.sections.testimonials}">
          <div class="carousel-track" tabindex="0" aria-label="Liste des témoignages">
            ${itemsToRender.map(item => `
              <article class="testimonial-card glass glass--card">
                <div class="testimonial-header">
                  <span class="testimonial-author">${item.firstName}</span>
                  <span class="testimonial-date">${item.date}</span>
                </div>
                <div class="testimonial-event-type">${item.eventType}</div>
                <p class="testimonial-text">« ${item.text} »</p>
              </article>
            `).join('')}
          </div>

          <div class="carousel-controls">
            <button type="button" class="carousel-btn carousel-btn-prev" aria-label="${dict.eventsPage.prev}">
              ‹
            </button>
            <button type="button" class="carousel-btn carousel-btn-next" aria-label="${dict.eventsPage.next}">
              ›
            </button>
          </div>
        </div>

        <div class="testimonials-footer-cta">
          <button type="button" class="btn-gold btn-sm js-open-quote">${dict.nav.quoteBtn}</button>
          <a href="https://wa.me/212619918223?text=${encodeURIComponent(dict.sections.shareStory)}" target="_blank" rel="noopener noreferrer">
            ${dict.sections.shareStory} →
          </a>
        </div>
      </div>
    </section>
  `;
}

// --------------------------------------------------------------------------
// Build All Pages for FR, EN, ES
// --------------------------------------------------------------------------
const languages = ['fr', 'en', 'es'];

languages.forEach(lang => {
  const dict = i18n[lang];

  // Helper to write file into dist
  function writeHtml(slug, htmlContent) {
    const pagePath = urlFor(lang, slug).replace(/^\//, '');
    const targetDir = pagePath ? path.join(distDir, pagePath) : distDir;
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
  }

  // ==========================================
  // 1. HOMEPAGE
  // ==========================================
  const homeContent = `
    <!-- Intro & Verbatim Service Cards — SAND section -->
    <section class="section section--sand" aria-labelledby="intro-title">
      <div class="container">
        <div class="sec-header">
          <h2 id="intro-title" class="sec-title">${dict.intro.title}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
        </div>

        <div class="intro-lead">
          <p>${dict.intro.p1}</p>
          <p>${dict.intro.p2}</p>
        </div>

        <!-- 4 Verbatim Cards + 4 Placeholder Cards -->
        <div class="services-grid">
          <!-- Verbatim 1: Airport transfer -->
          <div class="service-card glass glass--card">
            <div class="service-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l-2 3v-9a8 8 0 0 1 8-8h2a8 8 0 0 1 8 6z"/></svg>
            </div>
            <p class="service-card-text">${dict.intro.s1}</p>
          </div>

          <!-- Verbatim 2: Oriental tastings -->
          <div class="service-card glass glass--card">
            <div class="service-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M17 8h1a3 3 0 0 1 0 6h-1M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM7 2v3M11 2v3M15 2v3"/></svg>
            </div>
            <p class="service-card-text">${dict.intro.s2}</p>
          </div>

          <!-- Verbatim 3: DJ, Fire eater, Folk group -->
          <div class="service-card glass glass--card">
            <div class="service-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
            </div>
            <p class="service-card-text">${dict.intro.s3}</p>
          </div>

          <!-- Verbatim 4: Nadia as relay -->
          <div class="service-card glass glass--card">
            <div class="service-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>
            </div>
            <p class="service-card-text">${dict.intro.s4}</p>
          </div>

          <!-- Placeholder 1 -->
          <!-- TODO: client to confirm -->
          <div class="service-card is-placeholder">
            <div class="service-placeholder-title">${dict.intro.pPlaceholder1Title}</div>
            <p class="service-card-text">${dict.intro.pPlaceholder1Text}</p>
          </div>

          <!-- Placeholder 2 -->
          <!-- TODO: client to confirm -->
          <div class="service-card is-placeholder">
            <div class="service-placeholder-title">${dict.intro.pPlaceholder2Title}</div>
            <p class="service-card-text">${dict.intro.pPlaceholder2Text}</p>
          </div>

          <!-- Placeholder 3 -->
          <!-- TODO: client to confirm -->
          <div class="service-card is-placeholder">
            <div class="service-placeholder-title">${dict.intro.pPlaceholder3Title}</div>
            <p class="service-card-text">${dict.intro.pPlaceholder3Text}</p>
          </div>

          <!-- Placeholder 4 -->
          <!-- TODO: client to confirm -->
          <div class="service-card is-placeholder">
            <div class="service-placeholder-title">${dict.intro.pPlaceholder4Title}</div>
            <p class="service-card-text">${dict.intro.pPlaceholder4Text}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Room-Size Categories — FOREST section -->
    <section class="section section--forest" aria-labelledby="capacities-title">
      <div class="container">
        <div class="sec-header">
          <h2 id="capacities-title" class="sec-title">${dict.sections.ourVillas}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
        </div>

        <div class="room-grid">
          ${site.categories.map(cat => `
          <a href="${urlFor(lang, cat.slug)}" class="room-card glass glass--card">
              <div class="room-card-img-wrap">
                <img src="${cat.image}" alt="${cat.title} - Marrakech Séminaire" loading="lazy" width="600" height="375">
              </div>
              <div class="room-card-body">
                <h3 class="room-card-title">${cat.title}</h3>
                <span class="btn-clay btn-sm">${dict.nav.quoteBtn}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Establishments — SAND section -->
    <section class="section section--sand" aria-labelledby="properties-title">
      <div class="container">
        <div class="sec-header">
          <h2 id="properties-title" class="sec-title">${dict.sections.ourProperties}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
        </div>

        <div class="properties-grid">
          ${site.properties.map(prop => `
            <article class="property-card">
              <div class="property-img-wrap">
                <img src="${prop.image}" alt="${prop.alt[lang] || prop.alt.fr}" loading="lazy" width="1200" height="525">
              </div>
              <div class="property-body">
                <div>
                  <h3 class="property-title">${prop.name}</h3>
                  <p style="color: var(--text-secondary); font-size: 13.5px; margin-top: 4px;">${prop.capacity}</p>
                </div>
                <div class="property-actions">
                  <a href="${urlFor(lang, 'product/' + prop.slug)}" class="btn-ghost glass glass--pill btn-sm">
                    ${prop.name}
                  </a>
                  <button type="button" class="btn-gold btn-sm js-open-quote">
                    ${dict.nav.quoteBtn}
                  </button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Events Gallery Teaser Banner — FOREST section -->
    <section class="section section--forest" style="padding-top: 20px;">
      <div class="container">
        <div class="events-teaser-box">
          <h2 class="sec-title">${dict.sections.eventsTeaser}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
          <p>${dict.sections.eventsTeaserText}</p>
          <a href="${urlFor(lang, 'events')}" class="btn-gold">
            ${dict.sections.eventsTeaserBtn}
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials Panel -->
    ${renderTestimonialsSection(lang)}
  `;

  writeHtml('', renderPage({
    lang,
    slug: '',
    title: dict.seo.homeTitle,
    description: dict.seo.homeDesc,
    heroImage: site.pages.home.hero,
    heroAlt: site.pages.home.heroAlt[lang] || site.pages.home.heroAlt.fr,
    heroTitle: dict.hero.title,
    heroSubtitle: dict.hero.subtitle,
    activeNav: 'home',
    content: homeContent
  }));

  // ==========================================
  // 2. ABOUT US PAGE (/about-us/)
  // ==========================================
  const aboutContent = `
    <section class="section">
      <div class="container-narrow">
        <div class="about-prose">
          <p>${dict.about.p1}</p>
          <p>${dict.about.p2}</p>
          <p>${dict.about.p3}</p>
          <p>${dict.about.p4}</p>
          <p>${dict.about.p5}</p>
          <p style="color: var(--gold); font-weight: 600;">${dict.about.p6}</p>

          <div style="margin-top: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
            <button type="button" class="btn-gold js-open-quote">${dict.nav.quoteBtn}</button>
            <a href="tel:+212619918223" class="btn-ghost glass glass--pill">${dict.nav.call} : +212 619 918 223</a>
          </div>
        </div>
      </div>
    </section>
  `;

  writeHtml('about-us', renderPage({
    lang,
    slug: 'about-us',
    title: dict.seo.aboutTitle,
    description: dict.seo.aboutDesc,
    heroImage: site.pages.about.hero,
    heroAlt: site.pages.about.heroAlt[lang] || site.pages.about.heroAlt.fr,
    heroTitle: dict.about.h1,
    heroSubtitle: dict.hero.subtitle,
    activeNav: 'about',
    content: aboutContent
  }));

  // ==========================================
  // 3. NOS SERVICES OVERVIEW PAGE (/nos-services/)
  // ==========================================
  const servicesOverviewContent = `
    <section class="section section--forest">
      <div class="container">
        <div class="sec-header">
          <h2 class="sec-title">${dict.sections.ourServices}</h2>
          <div class="sec-divider" aria-hidden="true"></div>
        </div>

        <div class="services-overview-grid">
          ${Object.keys(servicesData).map(k => {
            const svc = servicesData[k];
            const svcUrl = urlFor(lang, 'nos-services/' + svc.slug);
            const svcTitle = svc.title[lang] || svc.title.fr;
            return `
              <a href="${svcUrl}" class="service-overview-card" aria-label="${svcTitle}">
                <div class="service-overview-img-wrap">
                  <img src="${svc.image}" alt="${svcTitle} - Marrakech Séminaire" loading="lazy" width="800" height="550">
                </div>
                <div class="service-overview-body">
                  <h3 class="service-overview-title">${svcTitle}</h3>
                  <span class="service-overview-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </span>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials Section on Services Page -->
    ${renderTestimonialsSection(lang)}
  `;

  writeHtml('nos-services', renderPage({
    lang,
    slug: 'nos-services',
    title: dict.seo.servicesTitle,
    description: dict.seo.servicesDesc,
    heroImage: site.pages.services.hero,
    heroAlt: site.pages.services.heroAlt[lang] || site.pages.services.heroAlt.fr,
    heroTitle: dict.sections.ourServices,
    heroSubtitle: dict.hero.subtitle,
    activeNav: 'services',
    content: servicesOverviewContent
  }));

  // ==========================================
  // 3b. INDIVIDUAL DEDICATED SERVICE PAGES (/nos-services/<slug>/)
  // ==========================================
  Object.keys(servicesData).forEach(k => {
    const svc = servicesData[k];
    const svcSlug = 'nos-services/' + svc.slug;
    const svcTitle = svc.title[lang] || svc.title.fr;
    const svcIntro = svc.intro[lang] || svc.intro.fr;
    const details = dict.serviceDetail;

    const photosList = svc.photos && svc.photos.length > 0 ? svc.photos : [];
    const showPlaceholders = site.showPhotoPlaceholders !== false && photosList.length === 0;

    const servicePageContent = `
      <div class="service-page-wrap">
        <div class="container">
          <!-- 3. Opportunity Intro Paragraph -->
          <div class="service-opportunity-box">
            <p class="service-opportunity-text">${svcIntro}</p>
          </div>

          <!-- 4. H2 Pourquoi nous choisir ? -->
          <div class="service-section-block">
            <h2 class="service-section-title">${details.whyUsTitle}</h2>
            <div class="service-why-box">
              <p>${details.whyUsText}</p>
            </div>
          </div>

          <!-- 5. H2 Ce que nous vous proposons -->
          <div class="service-section-block">
            <h2 class="service-section-title">${details.whatWeOfferTitle}</h2>
            <div class="service-offers-list">
              ${details.offers.map((offerText) => `
                <div class="service-offer-item">
                  <div class="service-offer-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div>${offerText}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 6. Row of Photo Placeholders or Real Photos -->
          <div class="service-photos-section">
            ${photosList.length > 0 ? `
              <div class="service-photos-grid">
                ${photosList.map((p, pIdx) => `
                  <div class="service-overview-img-wrap" style="border-radius: var(--radius-md);">
                    <img src="${p.src}" alt="${p.alt || svcTitle}" loading="lazy" width="600" height="450">
                  </div>
                `).join('')}
              </div>
            ` : (showPlaceholders ? `
              <div class="service-photos-grid">
                ${[1, 2, 3, 4].map(idx => `
                  <div class="service-photo-placeholder" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    <span class="service-photo-placeholder-label">${details.photoPlaceholderLabel}</span>
                  </div>
                `).join('')}
              </div>
              <p class="service-photo-notice">${details.photoPlaceholderNotice}</p>
            ` : '')}
          </div>

          <!-- 7. Closing line + CTA Button -->
          <div class="service-closing-box">
            <p class="service-closing-text">${details.closingCta}</p>
            <button type="button" class="btn-clay js-open-quote" data-service="${svc.slug}">
              ${dict.nav.quoteBtn}
            </button>
          </div>
        </div>
      </div>
    `;

    writeHtml(svcSlug, renderPage({
      lang,
      slug: svcSlug,
      title: svc.metaTitle[lang] || svc.metaTitle.fr,
      description: svc.metaDesc[lang] || svc.metaDesc.fr,
      heroImage: svc.image,
      heroAlt: svcTitle + ' - Marrakech Séminaire',
      heroTitle: svcTitle,
      heroSubtitle: dict.hero.subtitle,
      activeNav: 'services',
      content: servicePageContent
    }));
  });

  // ==========================================
  // 4. EVENTS PAGE (/events/)
  // ==========================================
  const eventsContent = `
    <!-- Floating Glass Album Chips Selector -->
    <nav id="album-chips-bar" class="album-chips-bar" aria-label="${dict.eventsPage.h1}">
      <div class="album-chips-wrapper">
        <div class="album-chips-scroll" id="album-chips-scroll">
          <!-- Icon-only button to return to all albums -->
          <button type="button" 
                  id="btn-back-albums" 
                  class="chip-all-albums glass glass--pill"
                  aria-label="${dict.eventsPage.backToAlbums}" 
                  title="${dict.eventsPage.backToAlbums}">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
            </svg>
          </button>

          <!-- Glass Album Chips List -->
          <div class="album-chips-list" id="album-chips-list" role="tablist">
            ${site.albums.map(a => {
              const name = a.name[lang] || a.name.fr;
              return `
              <button type="button" 
                      class="album-chip glass glass--pill"
                      data-album-slug="${a.slug}" 
                      role="tab" 
                      aria-selected="false" 
                      title="${name}">
                <img src="${a.cover}" alt="" class="chip-thumb" width="32" height="32" loading="lazy">
                <span class="chip-label">${name}</span>
              </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </nav>

    <section class="section" style="padding-top: 20px;">
      <div class="container">
        <!-- 4 Large Liquid Glass Floating Cards (Initial State) -->
        <div id="album-overview" class="album-overview">
          ${site.albums.map(a => `
            <div class="album-card glass glass--card" role="button" tabindex="0" data-album-slug="${a.slug}" aria-label="${a.name[lang] || a.name.fr}">
              <img src="${a.cover}" alt="${a.name[lang] || a.name.fr}" class="album-cover-img" loading="lazy" width="600" height="800">
              <div class="album-card-overlay" aria-hidden="true"></div>
              <div class="album-card-content">
                <span class="album-count">${dict.eventsPage.photosCount.replace('{count}', a.photos.length)}</span>
                <h2 class="album-card-title">${a.name[lang] || a.name.fr}</h2>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Masonry Grid for Photos -->
        <div id="masonry-container" class="masonry-grid" style="display: none;" role="region" aria-label="Photos"></div>
      </div>
    </section>

    <!-- Native HTML5 Dialog Photo Viewer (Edge Image Viewer style) -->
    <dialog id="photo-viewer-dialog" class="photo-viewer-dialog" aria-modal="true">
      <div class="pv-inner" id="pv-inner">
        <button type="button" class="pv-btn-close glass glass--pill" id="pv-close" aria-label="${dict.eventsPage.close}" title="${dict.eventsPage.close}">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button type="button" class="pv-btn-nav pv-btn-prev glass glass--pill" id="pv-prev" aria-label="${dict.eventsPage.prev}" title="${dict.eventsPage.prev}">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="pv-img-container" id="pv-img-container">
          <div class="pv-spinner" id="pv-spinner" aria-hidden="true"></div>
          <img id="pv-img" class="pv-img" src="" alt="" loading="eager">
        </div>
        <button type="button" class="pv-btn-nav pv-btn-next glass glass--pill" id="pv-next" aria-label="${dict.eventsPage.next}" title="${dict.eventsPage.next}">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </dialog>

    <!-- Data script for clientside album switching -->
    <script id="albums-data-json" type="application/json">
      ${JSON.stringify(site.albums)}
    </script>
  `;

  writeHtml('events', renderPage({
    lang,
    slug: 'events',
    title: dict.seo.eventsTitle,
    description: dict.seo.eventsDesc,
    heroImage: site.pages.events.hero,
    heroAlt: site.pages.events.heroAlt[lang] || site.pages.events.heroAlt.fr,
    heroTitle: dict.eventsPage.h1,
    heroSubtitle: dict.eventsPage.subtitle,
    pageBackground: site.pages.events.pageBackground || 'full',
    activeNav: 'events',
    content: eventsContent
  }));

  // ==========================================
  // 5. CONTACT PAGE (/contact/)
  // ==========================================
  const contactContent = `
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-card">
            <h2 class="sec-title" style="text-align: left; font-size: 2rem; margin-bottom: 24px;">
              ${dict.contactPage.h1}
            </h2>
            <p style="color: var(--text-secondary); margin-bottom: 32px;">${dict.contactPage.subtitle}</p>

            <div class="contact-item">
              <div class="contact-icon" aria-hidden="true">📍</div>
              <div>
                <p class="contact-label">${dict.contactPage.addressTitle}</p>
                <p style="color: var(--text-white);">${site.business.address}</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon" aria-hidden="true">📞</div>
              <div>
                <p class="contact-label">${dict.contactPage.phoneTitle}</p>
                <p><a href="tel:+212619918223" style="color: var(--gold); font-weight: 600;">+(212) 619 918 223</a></p>
                <p><a href="tel:+212669719938" style="color: var(--text-secondary);">+(212) 669 719 938</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon" aria-hidden="true">✉️</div>
              <div>
                <p class="contact-label">${dict.contactPage.emailTitle}</p>
                <p><a href="mailto:${site.business.emails[0]}" style="color: var(--text-secondary);">${site.business.emails[0]}</a></p>
                <p><a href="mailto:${site.business.emails[1]}" style="color: var(--text-secondary);">${site.business.emails[1]}</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon" aria-hidden="true">⏱️</div>
              <div>
                <p class="contact-label">${dict.contactPage.hoursTitle}</p>
                <p style="color: var(--text-secondary);">${dict.contactPage.hoursText}</p>
              </div>
            </div>
          </div>

          <!-- Direct Form -->
          <div class="contact-card">
            <h3 class="modal-title" style="margin-bottom: 20px;">${dict.quoteModal.title}</h3>
            <form action="https://wa.me/212619918223" method="get" target="_blank" rel="noopener noreferrer">
              <div class="form-group">
                <label class="form-label" for="c-name">${dict.quoteModal.fullName} *</label>
                <input type="text" id="c-name" name="name" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="c-phone">${dict.quoteModal.phone} *</label>
                <input type="tel" id="c-phone" name="phone" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="c-notes">${dict.quoteModal.notes}</label>
                <textarea id="c-notes" name="notes" class="form-textarea"></textarea>
              </div>
              <button type="submit" class="btn-gold" style="width: 100%;">
                ${dict.quoteModal.whatsappSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  writeHtml('contact', renderPage({
    lang,
    slug: 'contact',
    title: dict.seo.contactTitle,
    description: dict.seo.contactDesc,
    heroImage: site.pages.contact.hero,
    heroAlt: site.pages.contact.heroAlt[lang] || site.pages.contact.heroAlt.fr,
    heroTitle: dict.contactPage.h1,
    heroSubtitle: dict.hero.subtitle,
    activeNav: 'contact',
    content: contactContent
  }));

  // ==========================================
  // 6. ROOM-SIZE CATEGORIES (4 Pages)
  // ==========================================
  site.categories.forEach(cat => {
    const matchingProps = site.properties.filter(p => p.categorySlug === cat.slug);
    const catSeoKey = cat.slug === 'de-5-a-10-chambres' ? 'cat5_10'
      : cat.slug === 'de-10-a-20-chambres' ? 'cat10_20'
      : cat.slug === 'de-20-a-40-chambres' ? 'cat20_40'
      : 'cat40_60';

    const catContent = `
      <section class="section">
        <div class="container">
          <div class="sec-header">
            <h2 class="sec-title">${cat.title}</h2>
            <div class="sec-divider" aria-hidden="true"></div>
            <p class="sec-intro">${dict.intro.p1}</p>
          </div>

          <div class="properties-grid">
            ${matchingProps.map(prop => `
              <article class="property-card">
                <div class="property-img-wrap">
                  <img src="${prop.image}" alt="${prop.alt[lang] || prop.alt.fr}" loading="lazy" width="1200" height="525">
                </div>
                <div class="property-body">
                  <div>
                    <h3 class="property-title">${prop.name}</h3>
                    <p style="color: var(--text-secondary); font-size: 13.5px; margin-top: 4px;">${prop.capacity}</p>
                  </div>
                  <div class="property-actions">
                    <a href="${urlFor(lang, 'product/' + prop.slug)}" class="btn-ghost glass glass--pill btn-sm">${prop.name}</a>
                    <button type="button" class="btn-gold btn-sm js-open-quote">${dict.nav.quoteBtn}</button>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    writeHtml(cat.slug, renderPage({
      lang,
      slug: cat.slug,
      title: dict.seo[`${catSeoKey}Title`],
      description: dict.seo[`${catSeoKey}Desc`],
      heroImage: cat.image,
      heroAlt: `${cat.title} - Marrakech Séminaire`,
      heroTitle: cat.title,
      heroSubtitle: dict.hero.subtitle,
      activeNav: 'home',
      content: catContent
    }));
  });

  // ==========================================
  // 7. 6 PROPERTY PAGES (/product/<slug>/)
  // ==========================================
  site.properties.forEach(prop => {
    const propContent = `
      <section class="section">
        <div class="container">
          <div class="sec-header">
            <h2 class="sec-title">${prop.name}</h2>
            <div class="sec-divider" aria-hidden="true"></div>
            <p class="sec-intro">${prop.capacity} — ${dict.intro.p1}</p>
          </div>

          <div style="border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--line-gold); margin-bottom: 40px;">
            <img src="${prop.image}" alt="${prop.alt[lang] || prop.alt.fr}" style="width: 100%; max-height: 600px; object-fit: cover;">
          </div>

          <div class="container-narrow" style="text-align: center;">
            <p style="font-size: 1.2rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
              ${dict.intro.p2}
            </p>
            <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <button type="button" class="btn-gold js-open-quote">${dict.nav.quoteBtn}</button>
              <a href="tel:+212619918223" class="btn-ghost glass glass--pill">${dict.nav.call} : +212 619 918 223</a>
            </div>
          </div>
        </div>
      </section>
    `;

    writeHtml(`product/${prop.slug}`, renderPage({
      lang,
      slug: `product/${prop.slug}`,
      title: `${prop.name} | Marrakech Séminaire Maison d'Hôtes`,
      description: `Découvrez la villa ${prop.name} à Marrakech pour votre séminaire d'entreprise, mariage ou séjour en exclusivité.`,
      heroImage: prop.image,
      heroAlt: prop.alt[lang] || prop.alt.fr,
      heroTitle: prop.name,
      heroSubtitle: prop.capacity,
      activeNav: 'home',
      content: propContent
    }));
  });
});

// --------------------------------------------------------------------------
// Legacy Option 1, 2, 3 Pages (Preserved & Untouched)
// --------------------------------------------------------------------------
['option-1', 'option-2', 'option-3'].forEach(opt => {
  const optDir = path.join(distDir, opt);
  fs.mkdirSync(optDir, { recursive: true });
  fs.writeFileSync(path.join(optDir, 'index.html'), renderPage({
    lang: 'fr',
    slug: opt,
    title: `Direction de Design : ${opt.toUpperCase()} | Marrakech Séminaire`,
    description: "Démonstration client 2026 : choix de direction de style pour la refonte de Marrakech Séminaire Maisons d'Hôtes.",
    heroImage: site.pages.home.hero,
    heroAlt: "Marrakech Séminaire",
    heroTitle: i18n.fr.hero.title,
    heroSubtitle: i18n.fr.hero.subtitle,
    activeNav: 'home',
    content: `<div class="container section"><p style="text-align:center; color: var(--text-secondary);">Page legacy archivée pour démonstration.</p></div>`
  }));
});

// --------------------------------------------------------------------------
// Duplicate _redirects rules for each language
// --------------------------------------------------------------------------
const redirectsContent = `
# Redirects for Marrakech Séminaires Maisons d'Hôtes
/de-40-a-60-chambre /de-40-a-60-chambres 301
/en/de-40-a-60-chambre /en/de-40-a-60-chambres 301
/es/de-40-a-60-chambre /es/de-40-a-60-chambres 301
`;
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent.trim() + '\n');

// --------------------------------------------------------------------------
// robots.txt with Disallow: / (Demo Must NOT be Indexed)
// --------------------------------------------------------------------------
const robotsTxt = `User-agent: *\nDisallow: /\n`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

console.log('Static site build complete! Output written to dist/');
