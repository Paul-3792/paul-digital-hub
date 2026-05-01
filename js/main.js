/* ============================================================
   PAUL DIGITAL HUB — main.js
   Author: Opara Paul
   
   TABLE OF CONTENTS
   1. Navbar: shrink on scroll + active link highlight
   2. Mobile menu: open/close hamburger
   3. Scroll animations: fade-in elements when visible
   4. Skill bars: animate widths when they scroll into view
   5. Contact form: validation + success message
   6. Smooth scroll: handle nav link clicks cleanly
   ============================================================ */


/* ============================================================
   1. NAVBAR BEHAVIOR
   - Adds "scrolled" class when user scrolls down (shrinks nav)
   - Highlights the active nav link based on scroll position
   ============================================================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {

  // Shrink navbar padding when scrolled down
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  highlightActiveLink();
});

function highlightActiveLink() {
  // All sections on the page
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 100; // offset for navbar height

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.style.color = '';  // reset all
        // If the link's href matches the current section id
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = '#e8622a';   // accent orange
        }
      });
    }
  });
}


/* ============================================================
   2. MOBILE MENU (HAMBURGER)
   Opens and closes the mobile menu drawer
   ============================================================ */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');

  // Animate the hamburger bars into an X
  const spans = hamburger.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');

  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Called by onclick on mobile menu links (in HTML)
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

// Close menu if user clicks anywhere outside it
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});


/* ============================================================
   3. SCROLL ANIMATIONS
   Uses IntersectionObserver — a browser API that fires a
   callback when an element enters the visible viewport.
   
   All elements with class "animate-fadeup" start invisible.
   When they scroll into view, we add class "visible" which
   triggers the CSS transition defined in animations.css.
   ============================================================ */

const animatedElements = document.querySelectorAll('.animate-fadeup');

// Create the observer
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is now visible — add class to animate it in
        entry.target.classList.add('visible');
        // Stop observing once it's animated (no need to repeat)
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,       // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // Trigger slightly before entering view
  }
);

// Watch all animated elements
animatedElements.forEach(el => fadeObserver.observe(el));


/* ============================================================
   4. SKILL BARS ANIMATION
   When the skill bars scroll into view, animate their widths
   from 0 to the target percentage stored in data-width=""
   ============================================================ */

const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar       = entry.target;
        const targetWidth = bar.getAttribute('data-width'); // e.g. "90"
        // Small delay so it looks intentional
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 200);
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

barFills.forEach(bar => barObserver.observe(bar));


/* ============================================================
   5. CONTACT FORM
   - Validates all fields before submission
   - Shows a success message (since there's no backend here)
   - To actually send emails, connect to EmailJS or Formspree
   ============================================================ */

const contactForm    = document.getElementById('contactForm');
const formSuccess    = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();   // Stop the page from reloading

  // Get form values
  const fname   = document.getElementById('fname').value.trim();
  const lname   = document.getElementById('lname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Basic validation: check all fields are filled
  if (!fname || !lname || !email || !service || !message) {
    shakeForm();
    alert('Please fill in all fields before sending.');
    return;
  }

  // Validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // All good — show success state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = '✓ Sent!';
  submitBtn.style.background = '#2ecc71';
  submitBtn.disabled = true;

  // Show the success message
  formSuccess.style.display = 'block';

  // Reset form after 4 seconds
  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent  = 'Send Message →';
    submitBtn.style.background = '';
    submitBtn.disabled     = false;
    formSuccess.style.display = 'none';
  }, 4000);

  /*
    ========================================================
    TO ACTUALLY SEND EMAILS — use one of these free options:
    
    OPTION 1: Formspree (easiest — no code changes needed)
    - Go to https://formspree.io
    - Create a free account
    - Create a form, copy your endpoint URL
    - Replace <form id="contactForm" novalidate> with:
      <form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
    
    OPTION 2: EmailJS (stays on one page, sends to your Gmail)
    - Go to https://www.emailjs.com and create a free account
    - npm install @emailjs/browser OR add their CDN script
    - Replace the success block above with:
      emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { name: fname, email, message })
    ========================================================
  */
});

// Shake animation if form is submitted incomplete
function shakeForm() {
  contactForm.style.animation = 'none';
  contactForm.offsetHeight;   // Force reflow
  contactForm.style.animation = 'shake 0.4s ease';
}

// Add shake keyframes to the document dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-8px); }
    75%       { transform: translateX(8px); }
  }
`;
document.head.appendChild(shakeStyle);


/* ============================================================
   6. SMOOTH SCROLL OFFSET
   When clicking anchor links (e.g. #about), the browser
   scrolls but the fixed navbar covers the content.
   This adjusts the scroll position to account for navbar height.
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;  // Skip plain # links

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = navbar.offsetHeight;
    const targetTop    = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
});


/* ============================================================
   ON PAGE LOAD
   Run these immediately when the script executes
   ============================================================ */

// Highlight active link on initial load
highlightActiveLink();

// Log a friendly note for devs inspecting the console
console.log(
  '%c👋 Paul Digital Hub',
  'font-size:18px; font-weight:bold; color:#0000FF;'
);
console.log('Built with ❤️ in Abuja, Nigeria.');



  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      success.style.display = 'block';
      form.reset();
    } else {
      alert("Something went wrong. Try again.");
    }
  });
