// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navToggle.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

function closeMenuOnClickOutside(e) {
    if (!e.target.closest('nav') && !e.target.closest('.nav-toggle')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});



 // SLIDE SCRIPT CODEx

document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.mySlides');
  const dots   = document.querySelectorAll('.dot');

  function showSlides() {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d   => d.classList.remove('active'));

    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');

    // schedule next
    setTimeout(showSlides, 5000);
  }

  // kick things off
  slides[0].classList.add('active');
  dots[0].classList.add('active');
  setTimeout(showSlides, 5000);

  // manual nav (prev/next)
  document.querySelector('.prev').onclick = () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length - 1;
    showSlides();
  };
  document.querySelector('.next').onclick = () => showSlides();
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

//Lightbox Image
 // grab all thumbnails, and the single overlay + its <img>
  const thumbs    = document.querySelectorAll('.productImg');
  const overlay   = document.querySelector('.lightbox-overlay');
  const overlayImg = overlay.querySelector('img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // set the overlay <img> to match whichever thumbnail was clicked
      overlayImg.src =  thumb.src;
      overlayImg.alt = thumb.alt || 'Product image';
      // show it
      overlay.style.display = 'flex';
    });
  });

  // clicking outside the enlarged image closes the overlay
  overlay.addEventListener('click', e => {
    if (e.target !== overlayImg) {
      overlay.style.display = 'none';
      overlayImg.src = '';
    }
  });

  //VALUE PROPOSITION SCRIPT CODE
// Animate on scroll
// Scroll Animation for All Sections
document.addEventListener('DOMContentLoaded', function() {
  // Configure animation properties
  const animationSettings = {
    threshold: 0.2,
    rootMargin: '0px',
    translateDistance: '20px',
    transitionDuration: '0.6s',
    timingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: animationSettings.threshold,
    rootMargin: animationSettings.rootMargin
  });

  // Animate all scroll-triggered elements
  document.querySelectorAll('.scroll-animate').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = `translateY(${animationSettings.translateDistance})`;
    element.style.transition = `all ${animationSettings.transitionDuration} ${animationSettings.timingFunction}`;
    observer.observe(element);
  });

  // Add hover effects to value cards only
  document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.value-icon').style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.value-icon').style.transform = 'none';
    });
  });
});

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



