// Mobile Menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on click outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});



 // Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');
const slideInterval = 5000;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Initialize first slide
showSlide(0);

// Auto-advance
let intervalId = setInterval(nextSlide, slideInterval);

// Manual controls
document.querySelector('.prev').addEventListener('click', () => {
  clearInterval(intervalId);
  showSlide(currentSlide - 1);
  intervalId = setInterval(nextSlide, slideInterval);
});

document.querySelector('.next').addEventListener('click', () => {
  clearInterval(intervalId);
  nextSlide();
  intervalId = setInterval(nextSlide, slideInterval);
});

// Product visibility control
let visibleProducts = 8; // Start with 8 visible products
const products = document.querySelectorAll('.product-grid'); // Changed to .product-grid
const viewMoreBtn = document.querySelector('.view-more');
const totalProducts = products.length;

function initializeProducts() {
  products.forEach((product, index) => {
    product.style.display = index < visibleProducts ? 'grid' : 'none';
  });
  updateButtonText();
}

function showMoreProducts() {
  visibleProducts = totalProducts; // Show all products
  products.forEach(product => product.style.display = 'grid');
  updateButtonText();
}

function showLessProducts() {
  visibleProducts = 8; // Reset to 8 products
  products.forEach((product, index) => {
    product.style.display = index < visibleProducts ? 'grid' : 'none';
  });
  updateButtonText();
}

function updateButtonText() {
  viewMoreBtn.textContent = visibleProducts >= totalProducts 
    ? 'Show Less' 
    : 'View More';
}

function handleViewMore() {
  if (visibleProducts >= totalProducts) {
    showLessProducts();
  } else {
    showMoreProducts();
  }
}

// Initialize and add event listener
document.addEventListener('DOMContentLoaded', initializeProducts);
viewMoreBtn.addEventListener('click', handleViewMore);

(() => {
  const lightbox = document.getElementById('gallery-lightbox');
  const slider   = document.getElementById('gb-slider');
  const closeBtn = document.getElementById('gb-close');
  const prevBtn  = document.getElementById('gb-prev');
  const nextBtn  = document.getElementById('gb-next');
  const thumbs   = Array.from(document.querySelectorAll('.productImg'));
  let currentIdx = 0;

  // Build slides dynamically
  thumbs.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    const clone = img.cloneNode();
    clone.alt = img.alt || 'Product image';
    slide.appendChild(clone);
    slider.append(slide);

    // click thumb → open at that index
    img.addEventListener('click', () => openGallery(i));
  });

 function openGallery(idx) {
  currentIdx = idx;
  slider.style.transform = `translateX(-${100 * idx}%)`;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  history.pushState({gallery: true}, '');
  closeBtn.focus();
}

  function closeGallery() {
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  history.state && history.back();
}

  function showSlide(idx) {
    currentIdx = (idx + thumbs.length) % thumbs.length;
    slider.style.transform = `translateX(-${100 * currentIdx}%)`;
  }

  // Button handlers
  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', () => showSlide(currentIdx - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIdx + 1));

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeGallery();
    }
    if (e.key === 'ArrowLeft')  showSlide(currentIdx - 1);
    if (e.key === 'ArrowRight') showSlide(currentIdx + 1);
  });

  // Swipe support
  let startX = 0;
  slider.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX);
  slider.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (delta > 50) showSlide(currentIdx - 1);
    else if (delta < -50) showSlide(currentIdx + 1);
  });

  // Handle browser back button
  window.addEventListener('popstate', e => {
    if (lightbox.getAttribute('aria-hidden') === 'false' && (!e.state || !e.state.gallery)) {
      closeGallery();
    }
  });
})();

  //VALUE PROPOSITION SCRIPT CODE
// Scroll Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

//FOOTER SCRIPT CODE

function updateContactStatus() {
  // Update local time display (e.g. "2:30PM")
  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('current-time').textContent = `${hours}:${minutes}${suffix}`;
  };

  // Check local business hours availability
  const checkAvailability = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday
    
    // Availability: Mon–Sat 9AM–8PM LOCAL TIME
    const isAvailable = currentDay !== 0 &&
                        currentHour >= 9 &&
                        currentHour < 20;

    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    statusDot.style.background = isAvailable ? '#2ecc71' : '#e74c3c';
    statusDot.style.boxShadow = isAvailable
      ? '0 0 8px rgba(46, 204, 113, 0.3)'
      : '0 0 8px rgba(231, 76, 60, 0.3)';
      
    statusText.textContent = isAvailable
      ? 'Support Team Available'
      : 'Support Team Offline';
  };

  updateTime();
  checkAvailability();
}

// Update every minute (60,000ms)
setInterval(updateContactStatus, 60000);
updateContactStatus(); // Initial call



