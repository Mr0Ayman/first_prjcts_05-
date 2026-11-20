/**
 * Marrakech Séminaire Maison d'Hôtes
 * Client Demo Interactivity & Accessibility Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language preference persistence (try/catch protected, NO auto-redirect)
  try {
    const currentLang = document.documentElement.lang || 'fr';
    localStorage.setItem('preferred_lang', currentLang);
  } catch (e) {
    // LocalStorage unavailable/blocked
  }

  // 2. Sticky Header Scroll Detection (switch from absolute to fixed when scrolled)
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

    // 3. Accessible Desktop Dropdown Navigation (with hover delay + full keyboard/touch support)
  const dropdownContainers = document.querySelectorAll('.dropdown-container');
  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.dropdown-trigger');
    const menu = container.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    let isExpanded = false;
    let closeTimeout = null;

    const setExpanded = (expanded) => {
      isExpanded = expanded;
      trigger.setAttribute('aria-expanded', String(expanded));
      if (expanded) {
        container.classList.add('is-open');
      } else {
        container.classList.remove('is-open');
      }
    };

    const cancelClose = () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    };

    const scheduleClose = () => {
      cancelClose();
      closeTimeout = setTimeout(() => {
        setExpanded(false);
      }, 180);
    };

    // On devices with fine pointer / hover support, open on enter and close with 180ms delay
    if (window.matchMedia('(hover: hover)').matches) {
      container.addEventListener('mouseenter', () => {
        cancelClose();
        setExpanded(true);
      });
      container.addEventListener('mouseleave', () => {
        scheduleClose();
      });
    }

    // Toggle on trigger click / tap
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      cancelClose();
      setExpanded(!isExpanded);
    });

    // Keyboard support: Escape closes, arrows navigate items
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cancelClose();
        setExpanded(false);
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        const items = Array.from(menu.querySelectorAll('.dropdown-item'));
        if (items.length === 0) return;
        if (!isExpanded) {
          setExpanded(true);
          items[0].focus();
        } else {
          const activeIdx = items.indexOf(document.activeElement);
          if (activeIdx === -1 || activeIdx === items.length - 1) {
            items[0].focus();
          } else {
            items[activeIdx + 1].focus();
          }
        }
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        const items = Array.from(menu.querySelectorAll('.dropdown-item'));
        if (items.length === 0) return;
        if (isExpanded) {
          const activeIdx = items.indexOf(document.activeElement);
          if (activeIdx <= 0) {
            trigger.focus();
          } else {
            items[activeIdx - 1].focus();
          }
          e.preventDefault();
        }
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        cancelClose();
        setExpanded(false);
      }
    });
  });

  // 4. Mobile Fullscreen Drawer & Accordion
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const btnCloseDrawer = document.querySelector('.btn-close-drawer');
  const accordionTriggers = document.querySelectorAll('.mobile-accordion-trigger');

  if (mobileToggle && mobileDrawer) {
    const openDrawer = () => {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.removeAttribute('inert');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('modal-open');
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('inert', '');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('modal-open');
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    btnCloseDrawer?.addEventListener('click', closeDrawer);

    // Accordion in drawer
    accordionTriggers.forEach(accBtn => {
      accBtn.addEventListener('click', () => {
        const isExp = accBtn.getAttribute('aria-expanded') === 'true';
        accBtn.setAttribute('aria-expanded', String(!isExp));
        const content = accBtn.nextElementSibling;
        if (content) {
          content.classList.toggle('is-open', !isExp);
        }
      });
    });

    // Close on link click inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 5. Testimonials Carousel Controls
  const carouselTrack = document.getElementById('testimonials-track');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (carouselTrack) {
    const scrollCard = (direction) => {
      const card = carouselTrack.querySelector('.testimonial-card');
      const step = card ? card.offsetWidth + 24 : 320;
      carouselTrack.scrollBy({
        left: direction * step,
        behavior: 'smooth'
      });
    };

    btnPrev?.addEventListener('click', () => scrollCard(-1));
    btnNext?.addEventListener('click', () => scrollCard(1));

    // Keyboard support when focused on carousel
    carouselTrack.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollCard(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollCard(1);
      }
    });
  }

    // 6. Events Page: Floating Glass Album Chips, Hash Routing & Masonry Filter
  const albumCards = document.querySelectorAll('.album-card');
  const albumOverview = document.getElementById('album-overview');
  const chipsBar = document.getElementById('album-chips-bar') || document.getElementById('album-sticky-bar');
  const chipsList = document.getElementById('album-chips-list') || document.getElementById('album-pills-list');
  const chipsScroll = document.getElementById('album-chips-scroll');
  const masonryContainer = document.getElementById('masonry-container') || document.getElementById('events-masonry');
  const btnBackOverview = document.getElementById('btn-back-albums') || document.getElementById('btn-back-overview');

  // Load Album Data from embedded JSON if present
  let albumsData = {};
  const dataScript = document.getElementById('albums-data-json') || document.getElementById('albums-data');
  if (dataScript) {
    try {
      const parsed = JSON.parse(dataScript.textContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(a => { if (a && a.slug) albumsData[a.slug] = a; });
      } else if (typeof parsed === 'object' && parsed !== null) {
        albumsData = parsed;
      }
    } catch (e) {
      console.warn('Failed to parse albums data JSON', e);
    }
  }

  if (albumOverview && chipsBar && masonryContainer) {
    const lang = document.documentElement.lang || 'fr';

    const renderAlbumPhotos = (albumKey) => {
      const album = albumsData[albumKey];
      if (!album || !album.photos) return;

      const albumTitle = (typeof album.name === 'object' && album.name !== null)
        ? (album.name[lang] || album.name.fr || albumKey)
        : (album.name || album.title || albumKey);

      // Center grid by adapting column count to min(photos, 4)
      const colCount = Math.min(Math.max(album.photos.length, 1), 4);
      masonryContainer.style.setProperty('--masonry-cols', String(colCount));
      masonryContainer.innerHTML = '';

      album.photos.forEach((photo, idx) => {
        const photoAlt = (typeof photo.alt === 'object' && photo.alt !== null)
          ? (photo.alt[lang] || photo.alt.fr || albumTitle)
          : (photo.alt || albumTitle);

        const item = document.createElement('div');
        item.className = 'masonry-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `${albumTitle} photo ${idx + 1}`);
        item.innerHTML = `
          <img src="${photo.src}" 
               alt="${photoAlt}" 
               loading="lazy" 
               width="${photo.width || 800}" 
               height="${photo.height || 600}">
        `;

        // Click & keyboard to open native dialog photo viewer
        item.addEventListener('click', () => {
          openViewer(album.photos, idx, item);
        });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openViewer(album.photos, idx, item);
          }
        });

        masonryContainer.appendChild(item);
      });
    };

    const applyAlbumState = (albumKey) => {
      // Toggle visibility
      albumOverview.style.display = 'none';
      chipsBar.classList.add('is-active');
      masonryContainer.style.display = 'grid';

      // Update chip active states
      const chips = chipsList?.querySelectorAll('.album-chip, .album-pill') || [];
      chips.forEach(chip => {
        const slug = chip.getAttribute('data-album-slug') || chip.getAttribute('data-album');
        const isCurrent = slug === albumKey;
        chip.classList.toggle('is-active', isCurrent);
        chip.setAttribute('aria-selected', String(isCurrent));
        if (isCurrent && typeof chip.scrollIntoView === 'function') {
          chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });

      // Render photos
      renderAlbumPhotos(albumKey);
    };

    const activateAlbum = (albumKey, updateHistory = true) => {
      if (!albumsData[albumKey]) return;

      if (updateHistory && window.location.hash !== '#' + albumKey) {
        history.pushState({ album: albumKey }, '', '#' + albumKey);
      }

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          applyAlbumState(albumKey);
        });
      } else {
        applyAlbumState(albumKey);
      }

      // Smooth scroll to chips bar
      const barTop = chipsBar.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: barTop, behavior: 'smooth' });
    };

    const applyOverviewState = () => {
      albumOverview.style.display = 'grid';
      chipsBar.classList.remove('is-active');
      masonryContainer.style.display = 'none';
      masonryContainer.innerHTML = '';

      const chips = chipsList?.querySelectorAll('.album-chip, .album-pill') || [];
      chips.forEach(chip => {
        chip.classList.remove('is-active');
        chip.setAttribute('aria-selected', 'false');
      });
    };

    const showOverview = (updateHistory = true) => {
      if (updateHistory && window.location.hash) {
        history.pushState({ album: null }, '', window.location.pathname + window.location.search);
      }

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          applyOverviewState();
        });
      } else {
        applyOverviewState();
      }
    };

    // Big Album Cards click & keyboard
    albumCards.forEach(card => {
      const getSlug = () => card.getAttribute('data-album-slug') || card.getAttribute('data-album');
      card.addEventListener('click', () => {
        const key = getSlug();
        if (key) activateAlbum(key, true);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const key = getSlug();
          if (key) activateAlbum(key, true);
        }
      });
    });

    // Glass Chips click
    const chips = chipsList?.querySelectorAll('.album-chip, .album-pill') || [];
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-album-slug') || chip.getAttribute('data-album');
        if (key) activateAlbum(key, true);
      });
    });

    // Back to overview icon button
    btnBackOverview?.addEventListener('click', () => {
      showOverview(true);
    });

    // Browser Back / Forward hash navigation
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && albumsData[hash]) {
        activateAlbum(hash, false);
      } else {
        showOverview(false);
      }
    });

    // Check initial hash on load
    const initialHash = window.location.hash.replace(/^#/, '');
    if (initialHash && albumsData[initialHash]) {
      activateAlbum(initialHash, false);
    }
  }

  // 7. Native HTML5 Dialog Photo Viewer (Edge Image Viewer inspired)
  const dialog = document.getElementById('photo-viewer-dialog');
  const pvInner = document.getElementById('pv-inner');
  const pvImg = document.getElementById('pv-img');
  const pvContainer = document.getElementById('pv-img-container');
  const pvBtnClose = document.getElementById('pv-close');
  const pvBtnPrev = document.getElementById('pv-prev');
  const pvBtnNext = document.getElementById('pv-next');

  let currentGallery = [];
  let currentIndex = 0;
  let triggerElement = null;
  let touchStartX = 0;
  let touchStartY = 0;

  const updatePhoto = (idx) => {
    if (!currentGallery.length) return;
    currentIndex = (idx + currentGallery.length) % currentGallery.length;
    const photo = currentGallery[currentIndex];
    const lang = document.documentElement.lang || 'fr';
    const photoAlt = (photo.alt && typeof photo.alt === 'object')
      ? (photo.alt[lang] || photo.alt.fr || '')
      : (photo.alt || '');

    if (pvContainer) pvContainer.classList.add('pv-loading');
    if (pvImg) {
      pvImg.onload = () => {
        if (pvContainer) pvContainer.classList.remove('pv-loading');
      };
      pvImg.onerror = () => {
        if (pvContainer) pvContainer.classList.remove('pv-loading');
      };
      pvImg.src = photo.src;
      pvImg.alt = photoAlt;
    }

    // Preload next and previous photos in background
    if (currentGallery.length > 1) {
      const nextPhoto = currentGallery[(currentIndex + 1) % currentGallery.length];
      const prevPhoto = currentGallery[(currentIndex - 1 + currentGallery.length) % currentGallery.length];
      if (nextPhoto) { const imgN = new Image(); imgN.src = nextPhoto.src; }
      if (prevPhoto) { const imgP = new Image(); imgP.src = prevPhoto.src; }
    }
  };

  const openViewer = (photos, startIdx, triggerEl) => {
    currentGallery = photos;
    triggerElement = triggerEl;
    updatePhoto(startIdx);
    if (dialog) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      pvBtnClose?.focus();
    }
  };

  const closeViewer = () => {
    if (dialog) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  };

  if (dialog) {
    pvBtnClose?.addEventListener('click', closeViewer);
    pvBtnPrev?.addEventListener('click', () => updatePhoto(currentIndex - 1));
    pvBtnNext?.addEventListener('click', () => updatePhoto(currentIndex + 1));

    // Clicking dark backdrop closes viewer
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target === pvInner) {
        closeViewer();
      }
    });

    // Native cancel event (Escape key) restores trigger focus
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeViewer();
    });

    // Keyboard Arrow navigation
    document.addEventListener('keydown', (e) => {
      if (!dialog.open) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updatePhoto(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updatePhoto(currentIndex + 1);
      }
    });

    // Touch swipe support (left/right navigate, down closes)
    pvInner?.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    pvInner?.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        // Horizontal swipe
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) updatePhoto(currentIndex + 1);
          else updatePhoto(currentIndex - 1);
        }
        // Swipe down to close
        else if (deltaY > 70 && Math.abs(deltaY) > Math.abs(deltaX)) {
          closeViewer();
        }
      }
    }, { passive: true });
  }

  // 8. Quote Request Modal Dialog
  const quoteModal = document.getElementById('quote-modal');
  const quoteTriggers = document.querySelectorAll('.js-open-quote');
  const quoteCloseBtns = document.querySelectorAll('.js-close-quote');
  const quoteForm = document.getElementById('quote-form');
  const eventSelect = document.getElementById('q-event');

  if (quoteModal) {
    let lastActiveElement = null;

    const openQuoteModal = (preselectedService = null) => {
      lastActiveElement = document.activeElement;
      
      // Preselect service if specified
      if (eventSelect && preselectedService) {
        for (let i = 0; i < eventSelect.options.length; i++) {
          const opt = eventSelect.options[i];
          if (opt.value.toLowerCase() === preselectedService.toLowerCase() ||
              opt.getAttribute('data-slug') === preselectedService) {
            eventSelect.selectedIndex = i;
            break;
          }
        }
      }

      quoteModal.classList.add('is-open');
      quoteModal.removeAttribute('inert');
      document.body.classList.add('modal-open');
      
      // Focus first input
      setTimeout(() => {
        const firstInput = quoteModal.querySelector('input, select, textarea');
        firstInput?.focus();
      }, 50);
    };

    const closeQuoteModal = () => {
      quoteModal.classList.remove('is-open');
      quoteModal.setAttribute('inert', '');
      document.body.classList.remove('modal-open');
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    };

    quoteTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const svc = btn.getAttribute('data-service') || null;
        openQuoteModal(svc);
      });
    });

    quoteCloseBtns.forEach(btn => {
      btn.addEventListener('click', closeQuoteModal);
    });

    // Close on backdrop click (outside modal card)
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });

    // Escape closes modal & focus trap
    quoteModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeQuoteModal();
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusable = quoteModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Pre-fill and submit via WhatsApp (front-end only, zero persistence)
    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(quoteForm);
        const name = formData.get('fullName') || '';
        const phone = formData.get('phone') || '';
        const eventType = formData.get('eventType') || '';
        const guests = formData.get('guests') || '';
        const dates = formData.get('dates') || '';
        const notes = formData.get('notes') || '';

        const msg = `Bonjour Nadia, je souhaite un devis pour Marrakech Séminaires Maisons d'Hôtes :\n- Nom : ${name}\n- Téléphone : ${phone}\n- Événement : ${eventType}\n- Invités/Chambres : ${guests}\n- Période : ${dates}\n- Précisions : ${notes}`;
        const waUrl = `https://wa.me/212619918223?text=${encodeURIComponent(msg)}`;

        window.open(waUrl, '_blank', 'noopener,noreferrer');
        closeQuoteModal();
      });
    }
  }
});
