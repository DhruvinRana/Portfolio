// Scroll animation for fade-in elements
const faders = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });
faders.forEach(el => fadeObserver.observe(el));

// Navbar show/hide on scroll
const navbar = document.getElementById('mainNav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('show');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('show')) {
    navbar.classList.add('show');
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-scroll').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Back to top + Dark toggle show/hide
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('toggleDark');
let hideButtonsTimeout;

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(prefersDark ? 'dark' : 'light');
  }
  updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Toggle theme
function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  updateThemeIcon();
}

// Show floating buttons
function showFloatingButtons(showButtons = true) {
  if (showButtons) {
    themeToggle.style.display = 'flex';
    backToTop.style.display = 'flex';
    themeToggle.style.opacity = '1';
    backToTop.style.opacity = '1';
  } else {
    themeToggle.style.display = 'none';
    backToTop.style.display = 'none';
    themeToggle.style.opacity = '0';
    backToTop.style.opacity = '0';
  }
  
  // Clear any existing timeout
  clearTimeout(hideButtonsTimeout);
  
  // Set new timeout to hide buttons
  if (showButtons) {
    hideButtonsTimeout = setTimeout(() => {
      themeToggle.style.opacity = '0';
      backToTop.style.opacity = '0';
      setTimeout(() => {
        themeToggle.style.display = 'none';
        backToTop.style.display = 'none';
      }, 300); // Wait for fade out animation
    }, 3000); // Hide after 5 seconds
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Theme toggle
  themeToggle.addEventListener('click', () => {
    toggleTheme();
    const isPassedHero = window.pageYOffset > window.innerHeight;
    showFloatingButtons(isPassedHero); // Reset timer when button is clicked
  });
  
  // Back to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showFloatingButtons(false); // Hide buttons after clicking
  });
  
  // Scroll events
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isPassedHero = scrollTop > window.innerHeight;
    
    // Show buttons when scrolling
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      showFloatingButtons(isPassedHero);
    }
    
    // Show/hide buttons based on scroll position
    if (scrollTop > 300) {
      showFloatingButtons(isPassedHero);
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Initially hide both buttons
  showFloatingButtons(false);
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-scroll').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade in elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(e.matches ? 'dark' : 'light');
    updateThemeIcon();
  }
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute('data-level');
      entry.target.style.setProperty('--progress', level + '%');
      entry.target.style.width = level + '%';
      progressObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

progressBars.forEach(bar => progressObserver.observe(bar));

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    projectItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 0);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});
