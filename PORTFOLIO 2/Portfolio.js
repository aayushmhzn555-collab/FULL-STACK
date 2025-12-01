// --- MENU TOGGLE ---
const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
      }
    });
  });
}

// --- CONTACT FORM ---
const contactForm = document.getElementById('contact-form-id');
const msgDiv = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');

    let errors = [];
    if (!name.value.trim()) errors.push('Name is required.');
    if (!email.value.trim()) errors.push('Email is required.');
    else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) errors.push('Enter a valid email.');
    }

    if (errors.length > 0) {
      msgDiv.textContent = errors.join(' ');
      msgDiv.style.color = 'crimson';
    } else {
      msgDiv.textContent = 'Thank you! Your message has been received (demo).';
      msgDiv.style.color = 'green';
      contactForm.reset();
    }
  });
}

// --- FOOTER YEAR ---
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// --- FADE-IN ON SCROLL ---
const faders = document.querySelectorAll('.fade-in');

const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
