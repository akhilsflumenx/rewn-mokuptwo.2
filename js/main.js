/* ==========================================================================
   TECNOARREDA > INTERIOR DESIGN INTERACTIVE CONTROLLER (ENGLISH ONLY)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initStatsCounter();
  initContactForm();
  initServiceModal();
  initScrollAnimations();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   Header Scroll Effect
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const links = document.querySelectorAll('.mobile-nav-links a');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    }

    links.forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Animated Stats Counter
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = Math.ceil(target / 40);

          const timer = setInterval(() => {
            count += speed;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = count + suffix;
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.about-stats-container');
  if (statsContainer) {
    observer.observe(statsContainer);
  }
}

/* --------------------------------------------------------------------------
   Contact Form & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const toast = document.querySelector('.toast-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (toast) {
        toast.textContent = "✓ Thank you! Your request has been sent. We will contact you shortly.";
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }

      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   Service Request Modal
   -------------------------------------------------------------------------- */
function initServiceModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalBtns = document.querySelectorAll('.trigger-modal');

  if (modalOverlay) {
    modalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.about-section, .services-section, .feedback-section, .contact-section, .blog-hero, .gallery-hero, .about-hero, .contact-hero');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close all other open items
      questions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnswer = otherBtn.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) answer.classList.toggle('open', !isExpanded);
    });
  });
}
