// -------------------------------------------------------------
// Prakash Balayar Portfolio - Interaction Controller Script
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initEmailCopier();
  initContactForm();
  initScrollReveal();
});

// 1. Sticky Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 2. Mobile Nav Drawer open/close toggle
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
  
  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    
    // Toggle hamburger icon animation
    const spans = mobileToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when navigation links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// 3. Email Copier Utility
function initEmailCopier() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('emailLink');
  const copyIcon = document.getElementById('copyIcon');
  const copyCheckIcon = document.getElementById('copyCheckIcon');

  if (!copyBtn || !emailLink) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = emailLink.innerText.trim();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Add success state
      copyBtn.classList.add('copied');
      copyIcon.classList.add('hidden-icon');
      copyCheckIcon.classList.remove('hidden-icon');
      
      showToast('Email address copied to clipboard!');

      // Reset state after 2 seconds
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyIcon.classList.remove('hidden-icon');
        copyCheckIcon.classList.add('hidden-icon');
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showToast('Could not copy email automatically.', true);
    });
  });
}

// 4. Testimonials Slider State Controller
let currentSlide = 0;
// In desktop we have 2 visible, in mobile we show 1. We slide index by index.
function updateTestimonialsDisplay() {
  const grid = document.getElementById('testimonialsGrid');
  const cards = document.querySelectorAll('.testimonial-card');
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Show one card at a time with smooth opacity fade in
    cards.forEach((card, idx) => {
      if (idx === currentSlide) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => { card.style.opacity = '1'; }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  } else {
    // Show all cards in desktop grid
    cards.forEach(card => {
      card.style.display = 'flex';
      card.style.opacity = '1';
    });
  }
}

function nextTestimonial() {
  const cards = document.querySelectorAll('.testimonial-card');
  currentSlide = (currentSlide + 1) % cards.length;
  updateTestimonialsDisplay();
}

function prevTestimonial() {
  const cards = document.querySelectorAll('.testimonial-card');
  currentSlide = (currentSlide - 1 + cards.length) % cards.length;
  updateTestimonialsDisplay();
}

// Track viewport changes to adjust slider cards
window.addEventListener('resize', updateTestimonialsDisplay);
setTimeout(updateTestimonialsDisplay, 100);

// 5. Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById('submitBtn');
  const captchaBox = document.getElementById('captchaBox');

  if (!form || !submitBtn) return;

  // Validate Captcha Box
  if (captchaBox && !captchaBox.checked) {
    showToast('Please check the CAPTCHA box to confirm you are human.', true);
    return;
  }

  // Get Form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Set loading animation state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Prakash's WhatsApp Number (977-9863590097) in international number format: 9779863590097
  const whatsappNumber = "9779863590097";

  // Build the message text neatly
  const textMessage = `Hello Prakash!
My name is *${name}* (${email}).

*Message:*
${message}`;

  // URL encode the message text
  const encodedText = encodeURIComponent(textMessage);

  // Construct WhatsApp link
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  setTimeout(() => {
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    // Show success toast
    showToast('Redirecting to WhatsApp...');

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Reset the form
    form.reset();
  }, 1000);
}

// 6. Global Toast Notifications Helper
function showToast(message, isWarning = false) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('.toast-icon');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  
  if (isWarning) {
    toastIcon.style.backgroundColor = '#F59E0B'; // Yellow warning color
    toastIcon.textContent = '⚠';
  } else {
    toastIcon.style.backgroundColor = '#10B981'; // Green success color
    toastIcon.textContent = '✓';
  }

  toast.classList.add('show');

  // Fade out
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// 7. Modals Controllers (Case Study & About Me)
function openCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }
}

function closeCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
  }
}

function openAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }
}

function closeAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
  }
}

// Close active modal on Esc key press
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCaseStudyModal();
    closeAboutModal();
  }
});

// 8. Intersection Observer for Scroll Reveals
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-element');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}
