'use strict';

document.addEventListener('tvx:page:load', () => {
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const cards = document.querySelectorAll('.plan-card');
  if (cards.length) {
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.98)';

      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 120 * index);

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.01)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });

      card.addEventListener('click', () => {
        cards.forEach((c) => {
          c.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          c.style.borderWidth = '1px';
        });
        card.style.borderColor = 'var(--ai-accent, #7c3aed)';
        card.style.borderWidth = '3px';
      });
    });
  }

  const titles = document.querySelectorAll('.section-title');
  titles.forEach((title, index) => {
    title.style.opacity = '0';
    setTimeout(() => {
      title.style.transition = 'opacity 0.8s ease';
      title.style.opacity = '1';
    }, 300 + (100 * index));
  });

  const policies = document.querySelectorAll('.policy-section');
  policies.forEach((policy, index) => {
    policy.style.opacity = '0';
    policy.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      policy.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      policy.style.opacity = '1';
      policy.style.transform = 'translateX(0)';
    }, 450 + (120 * index));
  });
});
