// ================================================
// TechViOnyx - Main JavaScript
// ================================================

'use strict';

// ============================================
// SMOOTH SCROLLING
// ============================================
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      if (anchor.dataset.ssBound === 'true') return;
      anchor.dataset.ssBound = 'true';
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && href !== '') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal');
    this.init();
  }
  
  init() {
    if (this.elements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.elements.forEach(element => observer.observe(element));
  }
}

// ============================================
// FORM VALIDATION
// ============================================
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form && this.form.dataset.formBound !== 'true') {
      this.form.dataset.formBound = 'true';
      this.init();
    }
  }
  
  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }
  
  handleSubmit(e) {
    const externalSubmit = this.form.dataset.externalSubmit === 'true';
    if (!externalSubmit) {
      e.preventDefault();
    }
    
    let isValid = true;
    const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      if (externalSubmit) {
        return;
      }
      this.submitForm();
    }
  }
  
  validateField(field) {
    const formGroup = field.parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    const fieldName = field.getAttribute('name');
    const fieldValue = field.value.trim();
    
    // Remove previous error
    formGroup.classList.remove('error');
    
    // Validation rules
    if (fieldValue === '') {
      this.showError(formGroup, errorElement, `${this.capitalizeFirst(fieldName)} is required`);
      return false;
    }
    
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fieldValue)) {
        this.showError(formGroup, errorElement, 'Please enter a valid email address');
        return false;
      }
    }
    
    if (fieldName === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(fieldValue)) {
        this.showError(formGroup, errorElement, 'Please enter a valid phone number');
        return false;
      }
    }
    
    if (fieldName === 'message' && fieldValue.length < 10) {
      this.showError(formGroup, errorElement, 'Message must be at least 10 characters');
      return false;
    }
    
    return true;
  }
  
  showError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form Data:', data);
    
    // Show success message
    const successMessage = this.form.querySelector('.form-success');
    if (successMessage) {
      successMessage.classList.add('show');
      this.form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    }
    
    // In production, you would send this data to your server
    // Example:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  }
}

// ============================================
// BUTTON INTERACTIONS
// ============================================
class ButtonEffects {
  constructor() {
    this.init();
  }
  
  init() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      if (button.dataset.rippleBound === 'true') return;
      button.dataset.rippleBound = 'true';
      button.addEventListener('mouseenter', (e) => this.createRipple(e));
    });
  }
  
  createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================
class WhatsAppButton {
  constructor() {
    this.buttons = document.querySelectorAll('[data-whatsapp]');
    this.init();
  }
  
  init() {
    this.buttons.forEach(button => {
      if (button.dataset.waBound === 'true') return;
      button.dataset.waBound = 'true';
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = button.getAttribute('data-whatsapp');
        const message = button.getAttribute('data-message') || 'Hi, I would like to know more about your services.';
        this.openWhatsApp(phone, message);
      });
    });
  }
  
  openWhatsApp(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
}

// ============================================
// SERVICE CARDS ANIMATION
// ============================================
class ServiceCards {
  constructor() {
    this.cards = document.querySelectorAll('.service-card, .card');
    this.init();
  }
  
  init() {
    this.cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    if (this.button) {
      this.init();
    }
  }
  
  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.classList.add('show');
      } else {
        this.button.classList.remove('show');
      }
    });
    
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ============================================
// CUSTOM CURSOR - OnyxCore Premium
// ============================================
class CustomCursor {
  constructor() {
    if (window.innerWidth < 1024) {
      return;
    }
    if (window.__tvx_cursor_initialized) {
      return;
    }
    window.__tvx_cursor_initialized = true;
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';
    document.body.appendChild(this.dot);
    
    this.init();
  }
  
  init() {
    window.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
      
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .card');
      if (target) {
        this.cursor.classList.add('active');
        this.dot.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .card');
      if (target) {
        this.cursor.classList.remove('active');
        this.dot.classList.remove('active');
      }
    });
  }
}

// ============================================
// COPYRIGHT YEAR
// ============================================
class CopyrightYear {
  constructor() {
    this.yearElements = document.querySelectorAll('.current-year');
    this.init();
  }
  
  init() {
    const currentYear = new Date().getFullYear();
    this.yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }
}

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
function initMainComponents() {
  // Initialize Smooth Scrolling
  new SmoothScroll();
  
  // Initialize Scroll Reveal
  new ScrollReveal();
  
  // Initialize Form Validation
  new FormValidator('contact-form');
  
  // Initialize Button Effects
  new ButtonEffects();
  
  // Initialize WhatsApp Integration
  new WhatsAppButton();
  
  // Initialize Lazy Loading
  new LazyLoader();
  
  // Initialize Service Cards
  new ServiceCards();
  
  // Initialize Back to Top
  new BackToTop();

  // Initialize Copyright Year
  new CopyrightYear();

  // Initialize Custom Cursor
  new CustomCursor();
}

window.TvxInitMain = initMainComponents;

document.addEventListener('DOMContentLoaded', () => {
  initMainComponents();
  document.dispatchEvent(new CustomEvent('tvx:page:load'));
  console.log('TechViOnyx OnyxCore Premium Theme Initialized ✨');
});


// ============================================
// PJAX NAVIGATION (NO FULL REFRESH)
// ============================================
class PjaxNavigator {
  constructor() {
    this.mainId = 'main-content';
    this.loadedScripts = window.__tvx_loaded_scripts || new Set();
    window.__tvx_loaded_scripts = this.loadedScripts;
    document.querySelectorAll('script[src]').forEach(script => {
      const src = script.src || script.getAttribute('src');
      if (src) this.loadedScripts.add(src);
    });
    this.bind();
  }

  bind() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !this.isPjaxLink(link)) return;
      e.preventDefault();
      this.navigate(link.href);
    });

    window.addEventListener('popstate', () => {
      this.navigate(window.location.href, { push: false });
    });
  }

  isPjaxLink(link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (link.dataset.noPjax === 'true') return false;

    let url;
    try {
      url = new URL(link.href, window.location.origin);
    } catch {
      return false;
    }
    if (url.origin !== window.location.origin) return false;
    return true;
  }

  async navigate(url, options = {}) {
    const { push = true } = options;
    const main = document.getElementById(this.mainId);
    if (!main) return;

    try {
      const res = await fetch(url, { headers: { 'X-Requested-With': 'PJAX' } });
      if (!res.ok) throw new Error('Failed to fetch');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newMain = doc.getElementById(this.mainId);
      if (!newMain) throw new Error('Main content not found');

      main.replaceWith(newMain);

      if (doc.title) document.title = doc.title;

      if (push) {
        window.history.pushState({}, '', url);
      }

      this.syncStylesheets(doc, url);
      this.loadScripts(doc, url).then(() => {
        this.afterSwap();
      });
    } catch (err) {
      window.location.href = url;
    }
  }

  syncStylesheets(doc, baseUrl) {
    const base = new URL(baseUrl, window.location.origin);
    const resolveHref = (href) => {
      try {
        return new URL(href, base).href;
      } catch {
        return href;
      }
    };

    const newLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
      .map(l => l.getAttribute('href'))
      .filter(Boolean)
      .map(resolveHref);
    const currentLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    const isGlobal = (href) => {
      return href.includes('css/style.css') ||
        href.includes('module/header.css') ||
        href.includes('module/footer.css') ||
        href.includes('cdnjs.cloudflare.com/ajax/libs/font-awesome');
    };

    currentLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const resolved = link.href || resolveHref(href);
      if (!isGlobal(resolved) && !newLinks.includes(resolved)) {
        link.remove();
      }
    });

    newLinks.forEach(href => {
      const exists = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .some(link => link.href === href);
      if (!exists) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  loadScripts(doc, baseUrl) {
    const base = new URL(baseUrl, window.location.origin);
    const resolveSrc = (src) => {
      try {
        return new URL(src, base).href;
      } catch {
        return src;
      }
    };
    const scripts = Array.from(doc.querySelectorAll('script[src]'));
    const toLoad = scripts
      .map(s => s.getAttribute('src'))
      .filter(Boolean)
      .map(resolveSrc)
      .filter(src => !this.loadedScripts.has(src));

    return new Promise((resolve) => {
      if (toLoad.length === 0) {
        resolve();
        return;
      }

      let loaded = 0;
      toLoad.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = () => {
          this.loadedScripts.add(src);
          loaded += 1;
          if (loaded === toLoad.length) resolve();
        };
        script.onerror = () => {
          loaded += 1;
          if (loaded === toLoad.length) resolve();
        };
        document.body.appendChild(script);
      });
    });
  }

  afterSwap() {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (typeof window.TvxInitMain === 'function') {
      window.TvxInitMain();
    }
    this.ensurePriceCurrencySwitcher();
    this.cleanupScopedStyles();
    this.updateActiveNavLinks();
    document.dispatchEvent(new CustomEvent('tvx:page:load'));
  }

  cleanupScopedStyles() {
    const pathname = window.location.pathname || '';
    const isPrice = pathname.includes('/price/');
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.href || '';
      if (!isPrice && href.includes('/price/css/')) {
        link.remove();
      }
    });
  }

  ensurePriceCurrencySwitcher() {
    const hasPrices = document.querySelector('.plan-price, .trial-price');
    if (!hasPrices) return;

    const src = `${window.location.origin}/price/js/price-currency.js`;
    if (!this.loadedScripts.has(src)) {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = () => {
        this.loadedScripts.add(src);
        if (typeof window.TvxInitCurrencySwitcher === 'function') {
          window.TvxInitCurrencySwitcher();
        }
      };
      script.onerror = () => {
        if (typeof window.TvxInitCurrencySwitcher === 'function') {
          window.TvxInitCurrencySwitcher();
        }
      };
      document.body.appendChild(script);
      return;
    }

    if (typeof window.TvxInitCurrencySwitcher === 'function') {
      window.TvxInitCurrencySwitcher();
    }
  }

  updateActiveNavLinks() {
    const normalizePath = (url) => {
      try {
        const pathname = new URL(url, window.location.origin).pathname;
        return pathname.replace(/\/+$/, '') || '/';
      } catch {
        return '/';
      }
    };

    const currentPath = normalizePath(window.location.href);
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const linkPath = normalizePath(link.getAttribute('href') || '');
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }
}

new PjaxNavigator();
// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for resize events
function throttle(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = null;
      }, wait);
    }
  };
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    SmoothScroll,
    ScrollReveal,
    FormValidator,
    ButtonEffects,
    WhatsAppButton,
    LazyLoader,
    ServiceCards,
    BackToTop
  };
}



