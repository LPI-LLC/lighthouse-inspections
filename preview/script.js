/* =========================================
   Lighthouse Property Inspections
   Interactive Scripts
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 60;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll-reveal animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for siblings
        const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
        const idx = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // --- Counter animation ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Contact form handling (via FormSubmit.co) ---
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Simple validation visual feedback
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
        setTimeout(() => { field.style.borderColor = ''; }, 2000);
      }
    });

    if (!valid) return;

    // Submit to FormSubmit.co
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        btn.textContent = 'Request Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.style.borderColor = '#22c55e';
        form.reset();
      } else {
        btn.textContent = 'Error — Try Again';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        btn.style.borderColor = '#ef4444';
      }
    })
    .catch(() => {
      btn.textContent = 'Error — Try Again';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      btn.style.borderColor = '#ef4444';
    })
    .finally(() => {
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3000);
    });
  });

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          link.style.color = '#D4A847';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Certification accordion ---
  const certCategories = document.querySelectorAll('.cert-category');

  certCategories.forEach(category => {
    const header = category.querySelector('.cert-category-header');
    const body = category.querySelector('.cert-category-body');

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other categories
      certCategories.forEach(other => {
        if (other !== category) {
          const otherHeader = other.querySelector('.cert-category-header');
          const otherBody = other.querySelector('.cert-category-body');
          otherHeader.setAttribute('aria-expanded', 'false');
          otherBody.style.maxHeight = null;
        }
      });

      // Toggle this category
      header.setAttribute('aria-expanded', String(!isExpanded));
      if (!isExpanded) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = null;
      }
    });

    // Initialize: expand categories marked as expanded
    if (header.getAttribute('aria-expanded') === 'true') {
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });

  // --- Strategy Panel Toggle ---
  const strategyToggle = document.getElementById('strategy-toggle');
  const strategyPanel = document.getElementById('strategy-panel');
  const strategyClose = document.getElementById('strategy-panel-close');

  if (strategyToggle && strategyPanel) {
    function togglePanel() {
      const isOpen = strategyPanel.classList.toggle('open');
      strategyToggle.classList.toggle('active');
      const dot = strategyToggle.querySelector('.strategy-toggle-dot');
      if (dot) dot.style.animation = 'none';
    }

    strategyToggle.addEventListener('click', togglePanel);
    if (strategyClose) strategyClose.addEventListener('click', togglePanel);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && strategyPanel.classList.contains('open')) {
        togglePanel();
      }
    });
  }

});
