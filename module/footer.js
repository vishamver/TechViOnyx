// ================================================
// TechViOnyx - Footer Module
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

const FALLBACK_FOOTER_HTML = `
<footer class="footer" style="background:linear-gradient(135deg,#05070d,#0b1220 45%,#111827);color:#e2e8f0;padding:4rem 0 1.5rem;">
    <div class="container">
        <div class="footer-content" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2.5rem;">
            <div class="footer-section" style="display:block;">
                <p style="color:#cbd5e1; margin-bottom:1rem;">
                    Automation-Driven Growth Agency for Modern Brands
                </p>
                <div class="social-links" style="display:flex;gap:12px;flex-wrap:wrap;">
                    <a href="https://www.instagram.com/techvionyx/" class="social-link instagram" aria-label="Instagram" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/Techvionyx/" class="social-link facebook" aria-label="Facebook" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@techvionyxofficial" class="social-link youtube" aria-label="YouTube" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/techvionyx/" class="social-link linkedin" aria-label="LinkedIn" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </a>
                </div>
            </div>

            <div class="footer-section" style="display:block;">
                <h3 style="color:#ffffff;margin-bottom:1rem;font-size:1.15rem;">Quick Links</h3>
                <div class="footer-links" style="display:flex;flex-direction:column;gap:0.5rem;">
                    <a href="{{base}}" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Home</a>
                    <a href="{{base}}about/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">About Us</a>
                    <a href="{{base}}services/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Services</a>
                    <a href="{{base}}case-studies/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Case Studies</a>
                    <a href="{{base}}blog/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Blog</a>
                    <a href="{{base}}contact/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Contact</a>
                </div>
            </div>

            <div class="footer-section" style="display:block;">
                <h3 style="color:#ffffff;margin-bottom:1rem;font-size:1.15rem;">Our Services</h3>
                <div class="footer-links" style="display:flex;flex-direction:column;gap:0.5rem;">
                    <a href="{{base}}services/meta-ads/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Meta Ads</a>
                    <a href="{{base}}services/google-ads/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Google Ads</a>
                    <a href="{{base}}services/seo/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">SEO Services</a>
                    <a href="{{base}}services/website-development/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Web Development</a>
                    <a href="{{base}}services/ai-automation/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">AI Automation</a>
                    <a href="{{base}}services/social-media-management/" class="footer-link" style="color:#cbd5e1;display:inline-flex;">Social Media</a>
                </div>
            </div>

            <div class="footer-section" style="display:block;">
                <h3 style="color:#ffffff;margin-bottom:1rem;font-size:1.15rem;">Get In Touch</h3>
                <div class="footer-links" style="display:flex;flex-direction:column;gap:0.5rem;">
                    <a href="mailto:contact@techvionyx.com" class="footer-link" style="color:#cbd5e1;display:inline-flex;align-items:center;gap:0.5rem;">
                        <i class="fas fa-envelope"></i> contact@techvionyx.com
                    </a>
                    <a href="https://wa.me/919463423356" class="footer-link" target="_blank" rel="noopener" style="color:#cbd5e1;display:inline-flex;align-items:center;gap:0.5rem;">
                        <i class="fab fa-whatsapp"></i> +91 9463423356
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom" style="text-align:center;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.12);color:#94a3b8;">
            <p style="margin:0;color:#94a3b8;">&copy; <span class="current-year">2026</span> <a href="{{base}}" style="color:#7dd3fc;font-weight:600;">TechViOnyx</a>. All rights reserved. | <a href="{{base}}privacy-policy/" style="color:#7dd3fc;font-weight:600;">Privacy Policy</a> | <a href="{{base}}terms-of-service/" style="color:#7dd3fc;font-weight:600;">Terms of Service</a></p>
        </div>
    </div>
</footer>
`;

function injectFooter(html) {
  const container = document.getElementById('common-footer');
  if (!container) {
    return;
  }

  const base = getModuleBase();
  container.innerHTML = replaceBase(html, base);

  const yearEl = container.querySelector('.current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Defensive styling in case other CSS hides footer sections
  const footer = container.querySelector('.footer');
  if (footer) {
    footer.style.display = 'block';
    footer.style.visibility = 'visible';
    footer.style.opacity = '1';
  }

  container.querySelectorAll('.footer-section').forEach((section) => {
    section.style.display = 'block';
    section.style.visibility = 'visible';
    section.style.opacity = '1';
  });

  container.querySelectorAll('.footer-section h3').forEach((heading) => {
    heading.style.color = '#ffffff';
  });

  container.querySelectorAll('.footer-links').forEach((links) => {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.gap = '0.5rem';
    links.style.visibility = 'visible';
    links.style.opacity = '1';
  });

  container.querySelectorAll('.footer-link').forEach((link) => {
    link.style.color = '#cbd5e1';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.gap = '0.5rem';
  });

  const bottom = container.querySelector('.footer-bottom');
  if (bottom) {
    bottom.style.display = 'block';
    bottom.style.visibility = 'visible';
    bottom.style.opacity = '1';
  }
}

function loadFooter() {
  // Use inline footer to avoid fetch/serve issues
  injectFooter(FALLBACK_FOOTER_HTML);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}

document.addEventListener('tvx:page:load', () => {
  loadFooter();
});

