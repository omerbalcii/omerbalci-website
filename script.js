// --- Mobile Menu Toggle ---
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// --- Quotes Slider / Carousel ---
const quoteItems = document.querySelectorAll('.quote-item');
const prevBtn = document.getElementById('prevQuote');
const nextBtn = document.getElementById('nextQuote');
const dotsContainer = document.getElementById('quoteDots');
let currentQuote = 0;

if (quoteItems.length > 0 && dotsContainer) {
  // Create dots
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
    dots[currentQuote].classList.add('active');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showQuote(currentQuote - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showQuote(currentQuote + 1));
  }

  // Auto slide every 6 seconds
  setInterval(() => {
    showQuote(currentQuote + 1);
  }, 6000);
}
