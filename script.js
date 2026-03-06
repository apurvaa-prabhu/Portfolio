/* global document, window */

'use strict';

// ============================================================
// Navigation – Hamburger Toggle
// ============================================================

/**
 * Toggles the mobile navigation menu's visibility.
 */
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

// ============================================================
// Smooth Scrolling
// ============================================================

/**
 * Adds smooth scrolling to all navigation links that reference
 * an on-page section via a hash (#id).
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu after clicking a nav link
      const navMenu = document.getElementById('nav-menu');
      const hamburger = document.getElementById('hamburger');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// ============================================================
// Project Filtering
// ============================================================

/**
 * Filters project cards by the given category.
 * @param {string} category - 'all', 'web', 'mobile', or 'data'
 */
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(function (card) {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * Initialises the project filter buttons.
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state and aria-pressed
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      filterProjects(this.getAttribute('data-filter'));
    });
  });
}

// ============================================================
// Lightbox
// ============================================================

/**
 * Opens the lightbox with the given image src and alt text.
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt / caption text
 */
function openLightbox(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  if (lightboxCaption) lightboxCaption.textContent = alt || '';

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Return focus to close button when lightbox opens
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the lightbox.
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!lightbox) return;

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lightboxImg) {
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }
}

/**
 * Initialises lightbox click handlers on project images.
 */
function initLightbox() {
  const closeBtn = document.getElementById('lightbox-close');
  const lightbox = document.getElementById('lightbox');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    // Close when clicking the backdrop (outside the image)
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const lb = document.getElementById('lightbox');
      if (lb && lb.classList.contains('active')) closeLightbox();
    }
  });

  // Attach click handler to each project image
  document.querySelectorAll('.project-image').forEach(function (figure) {
    const img = figure.querySelector('img');
    if (!img) return;

    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'View larger image: ' + img.alt);

    function handleOpen() {
      openLightbox(img.src, img.alt);
    }

    figure.addEventListener('click', handleOpen);
    figure.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpen();
      }
    });
  });
}

// ============================================================
// Form Validation
// ============================================================

/**
 * Validates a single input or textarea element and shows/clears
 * the associated error message.
 * @param {HTMLElement} field - The input or textarea element
 * @returns {boolean} Whether the field is valid
 */
function validateField(field) {
  const errorEl = document.getElementById(field.id + '-error');
  let errorMsg = '';

  if (field.required && !field.value.trim()) {
    errorMsg = 'This field is required.';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value.trim())) {
      errorMsg = 'Please enter a valid email address.';
    }
  }

  if (errorEl) errorEl.textContent = errorMsg;

  if (errorMsg) {
    field.classList.add('invalid');
    field.classList.remove('valid');
    return false;
  }

  if (field.value.trim()) {
    field.classList.add('valid');
    field.classList.remove('invalid');
  } else {
    field.classList.remove('valid', 'invalid');
  }
  return true;
}

/**
 * Initialises the contact form with real-time validation and
 * a submission handler.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = form.querySelectorAll('input[required], textarea[required]');

  // Real-time feedback on blur
  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(this);
    });

    field.addEventListener('input', function () {
      // Clear error as soon as the user starts typing
      if (this.classList.contains('invalid')) {
        validateField(this);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let formIsValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) formIsValid = false;
    });

    const statusEl = document.getElementById('form-status');

    if (!formIsValid) {
      if (statusEl) {
        statusEl.textContent = 'Please fix the errors above before submitting.';
        statusEl.className = 'form-status error';
      }
      // Move focus to the first invalid field for accessibility
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate successful submission
    if (statusEl) {
      statusEl.textContent = 'Your message has been sent successfully! I will get back to you soon.';
      statusEl.className = 'form-status success';
    }
    form.reset();
    fields.forEach(function (field) {
      field.classList.remove('valid', 'invalid');
    });
  });
}

// ============================================================
// Footer – Current Year
// ============================================================

/**
 * Inserts the current year into the footer copyright notice.
 */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// Initialisation
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  initSmoothScrolling();
  initProjectFilters();
  initLightbox();
  initContactForm();
  setCurrentYear();
});
