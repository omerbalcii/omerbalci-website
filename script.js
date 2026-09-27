/* ==========================================================================
   Ömer Balcı - Portfolio Scripts
   Features: Dark/Light Mode, ScrollSpy, Email Copy Tooltip, Quotes Slider
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DARK / LIGHT THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or use system preference
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

  // --- 2. MOBILE MENU TOGGLE ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 3. SCROLLSPY (ACTIVE NAV HIGHLIGHT) ---
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.btn-nav)');

  function updateActiveNavLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

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

  // --- 4. COPY EMAIL TO CLIPBOARD WITH TOAST ---
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnMini = document.getElementById('copyEmailMini');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function copyEmail(email) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`"${email}" kopyalandı!`);
      }).catch(() => fallbackCopy(email));
    } else {
      fallbackCopy(email);
    }
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`"${text}" kopyalandı!`);
    } catch (err) {
      window.location.href = `mailto:${text}`;
    }
    document.body.removeChild(tempInput);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'Balci.5698@gmail.com';
      copyEmail(email);
    });
  }

  if (copyBtnMini) {
    copyBtnMini.addEventListener('click', () => {
      copyEmail('Balci.5698@gmail.com');
    });
  }

  // --- 5. QUOTES SLIDER / CAROUSEL ---
  const quoteItems = document.querySelectorAll('.quote-item');
  const prevBtn = document.getElementById('prevQuote');
  const nextBtn = document.getElementById('nextQuote');
  const dotsContainer = document.getElementById('quoteDots');
  let currentQuote = 0;

  if (quoteItems.length > 0 && dotsContainer) {
    dotsContainer.innerHTML = '';
    quoteItems.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showQuote(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function showQuote(index) {
      quoteItems.forEach(item => item.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      currentQuote = (index + quoteItems.length) % quoteItems.length;
      quoteItems[currentQuote].classList.add('active');
      if (dots[currentQuote]) {
        dots[currentQuote].classList.add('active');
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => showQuote(currentQuote - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showQuote(currentQuote + 1));
    }

    // Auto slide every 7 seconds
    setInterval(() => {
      showQuote(currentQuote + 1);
    }, 7000);
  }

});
