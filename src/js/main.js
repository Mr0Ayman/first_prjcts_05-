/**
 * Marrakech Séminaires Maisons d'Hôtes - 2026 Static Demo Client Script
 * Vanilla JavaScript, zero external dependencies, 100% accessible
 */

(function () {
  'use strict';

  // 1. Theme Switcher System (Option 1, Option 2, Option 3)
  const VALID_THEMES = ['option-1', 'option-2', 'option-3'];
  const STORAGE_KEY = 'ms_demo_theme';

  function getActiveTheme() {
    // Check URL search params first (e.g. ?theme=option-2)
    const params = new URLSearchParams(window.location.search);
    const paramTheme = params.get('theme');
    if (paramTheme && VALID_THEMES.includes(paramTheme)) {
      return paramTheme;
    }

    // Check pathname (e.g. /option-1/, /option-2/, /option-3/)
    const path = window.location.pathname;
    if (path.includes('/option-2')) return 'option-2';
    if (path.includes('/option-3')) return 'option-3';
    if (path.includes('/option-1')) return 'option-1';

    // Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_THEMES.includes(stored)) {
        return stored;
      }
    } catch (e) {
      // Storage unavailable
    }

    return 'option-1';
  }

  function applyTheme(themeName) {
    if (!VALID_THEMES.includes(themeName)) return;

    document.documentElement.setAttribute('data-theme', themeName);
    try {
      localStorage.setItem(STORAGE_KEY, themeName);
    } catch (e) {}

    // Update active class on demo switcher buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
      const targetTheme = btn.getAttribute('data-theme-target');
      if (targetTheme === themeName) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Update query params in current URL without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('theme', themeName);
    window.history.replaceState({}, '', url.toString());
  }

  // Initial theme setup
  const initialTheme = getActiveTheme();
  applyTheme(initialTheme);

  // Hook demo switcher buttons
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.demo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-theme-target');
        applyTheme(target);
      });
    });

    // 2. Mobile Navigation Drawer
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const closeDrawerBtn = document.querySelector('.btn-close-drawer');

    if (menuToggle && mobileDrawer) {
      function openDrawer() {
        mobileDrawer.classList.add('open');
        mobileDrawer.removeAttribute('aria-hidden');
        mobileDrawer.removeAttribute('inert');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (closeDrawerBtn) closeDrawerBtn.focus();
      }

      function closeDrawer() {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.setAttribute('inert', '');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }

      menuToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) closeDrawer();
        else openDrawer();
      });

      if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeDrawer);
      }

      // Close on backdrop click
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
          closeDrawer();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          closeDrawer();
        }
      });
    }

    // 3. Quote Modal & WhatsApp Bridge
    const quoteModal = document.getElementById('quote-modal');
    const openQuoteButtons = document.querySelectorAll('.js-open-quote');
    const closeQuoteBtn = document.querySelector('.js-close-quote');
    const quoteForm = document.getElementById('quote-form');

    if (quoteModal) {
      openQuoteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const propertyName = btn.getAttribute('data-property-name');
          const categoryName = btn.getAttribute('data-category-name');
          if (quoteForm && propertyName) {
            const notesField = quoteForm.querySelector('[name="notes"]');
            if (notesField && !notesField.value) {
              notesField.value = `Demande de devis pour : ${propertyName}`;
            }
          }
          quoteModal.showModal();
        });
      });

      if (closeQuoteBtn) {
        closeQuoteBtn.addEventListener('click', () => quoteModal.close());
      }

      // Close on backdrop click
      quoteModal.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
          quoteModal.close();
        }
      });

      // Submit handler: validates and redirects to WhatsApp (zero backend)
      if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const formData = new FormData(quoteForm);
          const fullName = formData.get('fullname') || '';
          const email = formData.get('email') || '';
          const phone = formData.get('phone') || '';
          const eventType = formData.get('event_type') || '';
          const capacity = formData.get('capacity') || '';
          const dates = formData.get('dates') || '';
          const notes = formData.get('notes') || '';

          // Format French WhatsApp message
          let message = `Bonjour Nadia, je souhaite demander un devis pour un événement à Marrakech :\n`;
          if (fullName) message += `• Nom : ${fullName}\n`;
          if (phone) message += `• Téléphone : ${phone}\n`;
          if (email) message += `• E-mail : ${email}\n`;
          if (eventType) message += `• Type d'événement : ${eventType}\n`;
          if (capacity) message += `• Chambres / Invités : ${capacity}\n`;
          if (dates) message += `• Dates souhaitées : ${dates}\n`;
          if (notes) message += `• Précisions : ${notes}\n`;

          const encoded = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/212619918223?text=${encoded}`;

          quoteModal.close();
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
      }
    }

    // 4. Accessible Photo Lightbox
    const lightbox = document.getElementById('lightbox-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentGalleryIndex = 0;
    const gallerySrcs = [];

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        const fullSrc = item.getAttribute('data-full-src') || img.src;
        gallerySrcs.push({ src: fullSrc, alt: img.alt });

        item.addEventListener('click', () => {
          openLightbox(index);
        });
      }
    });

    function openLightbox(index) {
      if (!lightbox || gallerySrcs.length === 0) return;
      currentGalleryIndex = index;
      showLightboxImage();
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showLightboxImage() {
      if (!lightboxImg || !gallerySrcs[currentGalleryIndex]) return;
      const data = gallerySrcs[currentGalleryIndex];
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt || '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
        showLightboxImage();
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % gallerySrcs.length;
        showLightboxImage();
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
      });
    }
  });
})();
