/* ==========================================================================
   Ömer Balcı - Software Engineer Portfolio Scripts
   Features: Swiper 11 Hero Slider, Theme Toggle, Mobile Navigation,
             ScrollSpy, Floating Action Scroll-To-Top, Toast & Clipboard Copy
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SWIPER HERO SLIDER INITIALIZATION ---
  if (typeof Swiper !== 'undefined') {
    new Swiper('.main-hero-swiper', {
      loop: true,
      speed: 700,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.hero-swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero-swiper-next',
        prevEl: '.hero-swiper-prev',
      },
    });
  }

  // --- 2. DARK / LIGHT THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlRoot.setAttribute('data-theme', 'dark');
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- 3. MOBILE HAMBURGER MENU ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.dilbeste-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 4. SCROLLSPY (ACTIVE NAV HIGHLIGHT) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.dilbeste-nav .nav-link:not(.btn-nav-cta)');

  function updateActiveNavLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --- 5. SCROLL TO TOP FAB BUTTON ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 6. CLIPBOARD TOAST & EMAIL COPY ---
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`"${text}" kopyalandı!`);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`"${text}" kopyalandı!`);
    } catch (e) {
      window.location.href = `mailto:${text}`;
    }
    document.body.removeChild(textarea);
  }

  // Attach copy event to all copy email buttons
  document.querySelectorAll('[data-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'Balci.5698@gmail.com';
      copyToClipboard(email);
    });
  });

  // --- 7. SMOOTH SCROLL FOR IN-PAGE ANCHORS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- 8. VIDEO LIGHTBOX / MODAL CONTROLLER ---
  const videoModal = document.getElementById('videoModal');
  const portfolioVideo = document.getElementById('portfolioVideo');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const videoTriggers = document.querySelectorAll('.trigger-video-modal, #playAboutVideoBtn, .moment-video-trigger-btn');

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (portfolioVideo) {
      portfolioVideo.currentTime = 0;
      portfolioVideo.play().catch(() => {});
    }
  }

  function closeVideoModalHandler() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (portfolioVideo) {
      portfolioVideo.pause();
    }
  }

  videoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openVideoModal();
    });
  });

  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', closeVideoModalHandler);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModalHandler();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeVideoModalHandler();
    }
  });

});
