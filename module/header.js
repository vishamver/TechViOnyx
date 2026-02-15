// ================================================
// TechViOnyx - Header Module
// ================================================

'use strict';

function getModuleBase() {
  const pathname = (window.location.pathname || '').replace(/\\/g, '/');
  const cleaned = pathname.replace(/\/index\.html$/, '').replace(/^\/|\/$/g, '');
  if (!cleaned) return '';
  const depth = cleaned.split('/').length;
  return '../'.repeat(depth);
}

function replaceBase(html, base) {
  const safeBase = base === '' ? '/' : base;
  return html.replace(/\{\{base\}\}/g, safeBase);
}

const FALLBACK_HEADER_HTML = `
<header class="header">
        <nav class="nav">
            <a href="{{base}}" class="logo" aria-label="TechViOnyx Home">
                <img src="{{base}}assets/logo-techvionyx.webp" alt="TechViOnyx Logo">
            </a>
            
            <ul class="nav-menu">
                <li><a href="{{base}}" class="nav-link">Home</a></li>
                <li><a href="{{base}}about/" class="nav-link">About</a></li>
                <li><a href="{{base}}services/" class="nav-link">Services</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle">Pricing <span class="dropdown-arrow">&#9662;</span></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <h3 class="dropdown-category">AI & Automation</h3>
                            <a href="{{base}}price/ai-automation/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#129302;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">AI Automation Solutions</span>
                                </div>
                            </a>
                            <a href="{{base}}price/automation-with-ads/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#9889;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Ad Automation Systems</span>
                                </div>
                            </a>
                            
                            <h3 class="dropdown-category">Content & Creative</h3>
                            <a href="{{base}}price/content-creation/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#9997;&#65039;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Professional Content Creation</span>
                                </div>
                            </a>
                            <a href="{{base}}price/graphic-design/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#127912;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Graphic Design Services</span>
                                </div>
                            </a>
                            <a href="{{base}}price/video-editing/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#127916;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Professional Video Editing</span>
                                </div>
                            </a>
                            
                            <h3 class="dropdown-category">Digital Advertising</h3>
                            <a href="{{base}}price/google-ads/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128269;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Google Ads Management</span>
                                </div>
                            </a>
                            <a href="{{base}}price/meta-ads/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128241;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Meta (Facebook) Ads</span>
                                </div>
                            </a>
                            
                            <h3 class="dropdown-category">Development</h3>
                            <a href="{{base}}price/software-development/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#9881;&#65039;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Custom Software Development</span>
                                </div>
                            </a>
                            <a href="{{base}}price/mobile-app-development/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128241;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Mobile App Development</span>
                                </div>
                            </a>
                            <a href="{{base}}price/website-development/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128187;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Website Development</span>
                                </div>
                            </a>
                            
                            <h3 class="dropdown-category">Growth & Strategy</h3>
                            <a href="{{base}}price/seo/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128640;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Search Engine Optimization</span>
                                </div>
                            </a>
                            <a href="{{base}}price/social-media-management/" class="dropdown-item">
                                <div class="dropdown-item-icon">&#128226;</div>
                                <div class="dropdown-item-content">
                                    <span class="dropdown-item-title">Social Media Management</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li><a href="{{base}}case-studies/" class="nav-link">Case Studies</a></li>
                <li><a href="{{base}}blog/" class="nav-link">Blog</a></li>
                <li><a href="{{base}}contact/" class="nav-cta">Get Started</a></li>
            </ul>
            
            <button class="nav-toggle" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
`;

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.boundHandleScroll = () => this.handleScroll();
    this.boundHandleOutsideClick = (e) => this.handleOutsideClick(e);

    this.init();
  }

  init() {
    window.addEventListener('scroll', this.boundHandleScroll);

    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    document.addEventListener('click', this.boundHandleOutsideClick);

    this.setActiveLink();
  }

  handleScroll() {
    if (this.header && window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else if (this.header) {
      this.header.classList.remove('scrolled');
    }
  }

  toggleMenu() {
    if (!this.navToggle || !this.navMenu) return;
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMenu() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.classList.remove('active');
      this.navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  handleOutsideClick(e) {
    if (this.navMenu && this.navMenu.classList.contains('active')) {
      const dropdownToggle = e.target.closest('.dropdown-toggle');
      const dropdownMenu = e.target.closest('.dropdown-menu');

      if (!this.navMenu.contains(e.target) &&
          !this.navToggle.contains(e.target) &&
          !(dropdownToggle && this.navMenu.contains(dropdownToggle)) &&
          !(dropdownMenu && this.navMenu.contains(dropdownMenu))) {
        this.closeMenu();
      }
    }
  }

  setActiveLink() {
    const normalizePath = (url) => {
      try {
        const pathname = new URL(url, window.location.origin).pathname;
        return pathname.replace(/\/+$/, '') || '/';
      } catch {
        return '/';
      }
    };

    const currentPath = normalizePath(window.location.href);

    this.navLinks.forEach(link => {
      const linkPath = normalizePath(link.getAttribute('href') || '');
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.boundHandleScroll);
    document.removeEventListener('click', this.boundHandleOutsideClick);
  }
}

async function loadHeader() {
  const base = getModuleBase();
  const headerHost = document.getElementById('common-header');

  try {
    const headerRes = await fetch(`${base}module/comman-header/index.html`);
    const headerHtml = replaceBase(await headerRes.text(), base);
    if (headerHost) headerHost.innerHTML = headerHtml;
  } catch (err) {
    if (headerHost) headerHost.innerHTML = replaceBase(FALLBACK_HEADER_HTML, base);
  }

  if (window.__tvx_nav_instance && typeof window.__tvx_nav_instance.destroy === 'function') {
    window.__tvx_nav_instance.destroy();
  }
  window.__tvx_nav_instance = new Navigation();
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
});

document.addEventListener('tvx:page:load', () => {
  loadHeader();
});


