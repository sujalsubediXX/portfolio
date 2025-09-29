// Loading screen
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Current year for footer
const currentYear = new Date().getFullYear();
document.querySelector("#datenow").textContent = currentYear;

// Intersection Observer for animations
const cards = document.querySelectorAll(".skill-card, .project-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        
        // Animate progress bars for skills
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.progress-bar');
          if (progressBar) {
            const level = progressBar.getAttribute('data-level');
            setTimeout(() => {
              progressBar.style.width = `${level}%`;
            }, 300);
          }
        }
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  observer.observe(card);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme toggle
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  themeSwitch.checked = true;
  document.body.classList.add('dark-theme');
}

// Cursor effects
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
  cursorFollower.classList.add('active');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
  cursorFollower.classList.remove('active');
});

// Add active class to cursor when hovering over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursorFollower.classList.add('active');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursorFollower.classList.remove('active');
  });
});

// Form submission animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // In a real implementation, you would wait for the form submission to complete
    // For demo purposes, we'll reset after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
      setTimeout(() => {
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
      }, 2000);
    }, 3000);
  });
}

// Typing animation for hero section
function resetTypingAnimation() {
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    typingElement.style.animation = 'none';
    setTimeout(() => {
      typingElement.style.animation = '';
    }, 10);
  }
}

// Reset typing animation when navigating back to home
document.querySelectorAll('a[href="#home"]').forEach(link => {
  link.addEventListener('click', resetTypingAnimation);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.1);
    el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});