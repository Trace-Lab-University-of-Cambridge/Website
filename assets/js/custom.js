// ============================================
// TRACE Lab - Custom JavaScript
// Modern animations and interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animation to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal animation to sections and cards
  function initScrollReveal() {
    // Animate section headings
    document.querySelectorAll('.section-heading h1').forEach((el) => {
      el.classList.add('reveal');
      el.style.transitionDelay = '0.1s';
      revealObserver.observe(el);
    });

    // Animate research cards with stagger
    document.querySelectorAll('.research-card').forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.1 + (index % 3) * 0.1}s`;
      revealObserver.observe(el);
    });

    // Animate publication cards with stagger
    document.querySelectorAll('.pub-card').forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.1 + (index % 4) * 0.1}s`;
      revealObserver.observe(el);
    });

    // Animate software cards with stagger
    document.querySelectorAll('.software-card').forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.1 + (index % 3) * 0.1}s`;
      revealObserver.observe(el);
    });

    // Animate team cards with stagger
    document.querySelectorAll('.team-card').forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.05 + (index % 4) * 0.08}s`;
      revealObserver.observe(el);
    });

    // Animate about section
    document.querySelectorAll('.about-section').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });

    // Animate affiliations
    document.querySelectorAll('.affiliations-row a').forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.1 + index * 0.1}s`;
      revealObserver.observe(el);
    });
  }

  // Initialize scroll reveal
  initScrollReveal();

  // ============================================
  // SMOOTH PARALLAX ON HERO (subtle)
  // ============================================

  const heroSection = document.querySelector('.home-section:first-of-type');
  const heroContent = document.querySelector('.hero-fullscreen');

  if (heroSection && heroContent) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = heroSection.offsetHeight;

          if (scrolled < heroHeight) {
            const parallaxSpeed = 0.3;
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================

  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // ============================================
  // CARD TILT EFFECT (subtle 3D)
  // ============================================

  const cards = document.querySelectorAll('.research-card, .pub-card, .software-card, .team-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================

  const buttons = document.querySelectorAll('.view-all-link, .btn-github, .btn-docs');

  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });

  // ============================================
  // TEAM MODAL FUNCTIONALITY
  // ============================================

  const teamCards = document.querySelectorAll('.team-card');
  const modalOverlay = document.querySelector('.team-modal-overlay');
  const modal = document.querySelector('.team-modal');

  if (modalOverlay && modal) {
    // Move modal to body to avoid transform containment issues
    document.body.appendChild(modalOverlay);
    document.body.appendChild(modal);

    teamCards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Prevent the tilt effect from interfering
        e.stopPropagation();

        const name = this.dataset.name;
        const role = this.dataset.role;
        const org = this.dataset.org || '';
        const bio = this.dataset.bio || '';
        const interests = this.dataset.interests ? this.dataset.interests.split(',') : [];
        const avatar = this.querySelector('.team-avatar')?.src || '';
        const email = this.dataset.email || '';
        const scholar = this.dataset.scholar || '';
        const github = this.dataset.github || '';
        const twitter = this.dataset.twitter || '';
        const website = this.dataset.website || '';

        // Populate modal
        modal.querySelector('.modal-avatar').src = avatar;
        modal.querySelector('.modal-name').textContent = name;
        modal.querySelector('.modal-role').textContent = role;
        modal.querySelector('.modal-org').textContent = org;
        modal.querySelector('.modal-bio').textContent = bio;

        // Populate interests
        const interestTags = modal.querySelector('.interest-tags');
        interestTags.innerHTML = interests.map(i => `<span>${i.trim()}</span>`).join('');

        // Populate social links
        const footer = modal.querySelector('.modal-footer');
        footer.innerHTML = '';
        if (email) footer.innerHTML += `<a href="mailto:${email}" title="Email">✉️</a>`;
        if (scholar) footer.innerHTML += `<a href="${scholar}" target="_blank" title="Google Scholar">🎓</a>`;
        if (github) footer.innerHTML += `<a href="${github}" target="_blank" title="GitHub">💻</a>`;
        if (twitter) footer.innerHTML += `<a href="${twitter}" target="_blank" title="Twitter">🐦</a>`;
        if (website) footer.innerHTML += `<a href="${website}" target="_blank" title="Website">🌐</a>`;

        // Show modal with animation
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    function closeModal() {
      modalOverlay.classList.remove('active');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    modalOverlay.addEventListener('click', closeModal);
    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });

    // Prevent modal content click from closing
    modal.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // CURSOR GLOW EFFECT (optional, for hero)
  // ============================================

  const hero = document.querySelector('.hero-fullscreen');

  if (hero) {
    const glowElement = document.createElement('div');
    glowElement.className = 'cursor-glow';
    glowElement.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glowElement);

    hero.addEventListener('mouseenter', () => {
      glowElement.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      glowElement.style.opacity = '0';
    });

    hero.addEventListener('mousemove', (e) => {
      glowElement.style.left = e.clientX + 'px';
      glowElement.style.top = e.clientY + 'px';
    });
  }

  // ============================================
  // TYPING EFFECT FOR TAGLINE (optional)
  // ============================================

  // Uncomment to enable typing effect
  /*
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    setTimeout(typeWriter, 1000);
  }
  */

});

// ============================================
// PRELOADER (optional)
// ============================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
