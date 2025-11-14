// ============ UTILITY FUNCTIONS ============

// Debounce function for performance optimization
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Throttle function for smooth scrolling events
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============ NAVIGATION MENU ============

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  // Toggle aria-expanded attribute for accessibility
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// *** JAVASCRIPT REFINEMENT ***
// Combined two listeners into one.
// This now closes the menu AND sets the active link on click.
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // Close the mobile menu
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Set active link for immediate feedback
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ============ STICKY NAVBAR ============

const handleStickyNavbar = throttle(() => {
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}, 10); // Throttled to 10ms for responsiveness

window.addEventListener('scroll', handleStickyNavbar);

// ============ SCROLL TO TOP BUTTON ============

const scrollUpBtn = document.querySelector('.scroll-up-btn');

const handleScrollUpBtn = throttle(() => {
  if (window.scrollY > 500) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
}, 10); // Throttled to 10ms

window.addEventListener('scroll', handleScrollUpBtn);

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// ============ SMOOTH SCROLL OFFSET ============

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Ignore empty hashes or links that are not section links
    if (href === '#' || !document.querySelector(href)) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Calculate offset based on navbar height (80px)
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ============ INTERSECTION OBSERVER - ANIMATIONS ============

const observerOptions = {
  threshold: 0.1, // Trigger when 10% of the element is visible
  rootMargin: '0px 0px -100px 0px', // Start animation 100px before it enters view
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // Stop observing after animation
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .stat-item, .education-card, .timeline-item').forEach((el) => {
  // Set initial state for animation
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============ FORM HANDLING ============

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values using 'name' attributes
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('Please fill in all fields');
      return;
    }

    // Show success message (replace with actual form submission logic)
    console.log('Form data:', data);
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// ============ ACTIVE NAVIGATION LINK ON SCROLL ============

// This listener updates the active link as the user scrolls
window.addEventListener('scroll', throttle(() => {
  let current = '';
  const sections = document.querySelectorAll('section');
  const navHeight = navbar.offsetHeight + 20; // Add 20px buffer

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - navHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}, 100)); // Throttled to 100ms


// ============ INITIALIZE ============

console.log('Portfolio loaded successfully!');

// *** JAVASCRIPT REFINEMENT ***
// Removed the redundant 'ADD ACTIVE CLASS TO NAV LINK' listener.
// Its logic was merged into the 'NAVIGATION MENU' section.